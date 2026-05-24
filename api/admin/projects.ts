import type { VercelRequest, VercelResponse } from "@vercel/node";
import type { Project, ProjectCategory } from "../../src/data/projects";

type UploadFile = {
  name: string;
  type: string;
  dataUrl: string;
};

type ProjectPayload = {
  title: string;
  category: ProjectCategory;
  description: string;
  tools: string;
  role: string;
  videoUrl?: string;
  externalUrl?: string;
  figmaUrl?: string;
  githubUrl?: string;
  year: string;
};

type AdminPayload = {
  password?: string;
  project?: ProjectPayload;
  thumbnail?: UploadFile | null;
  images?: UploadFile[];
};

type GitHubTreeEntry = {
  path: string;
  mode: "100644";
  type: "blob";
  sha: string;
};

const categories: ProjectCategory[] = ["Motion Design", "Social Media", "Edits", "Front-end"];

const jsonHeaders = {
  Accept: "application/vnd.github+json",
  "Content-Type": "application/json",
  "X-GitHub-Api-Version": "2022-11-28",
};

const sanitizeSlug = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

const sanitizeFileName = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "");

const stripDataUrl = (value: string) => {
  const [, base64] = value.split(",");
  return base64 || "";
};

const decodeBase64Text = (value: string) => Buffer.from(value, "base64").toString("utf8");

const getRequiredEnv = (name: string) => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Variavel ${name} nao configurada`);
  }

  return value;
};

const githubRequest = async <T>(path: string, token: string, init: RequestInit = {}) => {
  const response = await fetch(`https://api.github.com${path}`, {
    ...init,
    headers: {
      ...jsonHeaders,
      Authorization: `Bearer ${token}`,
      ...(init.headers || {}),
    },
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`GitHub respondeu ${response.status}: ${details}`);
  }

  return response.json() as Promise<T>;
};

const getExistingProjects = async (owner: string, repo: string, branch: string, token: string) => {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/public/projects.json?ref=${branch}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    },
  );

  if (response.status === 404) {
    return [] as Project[];
  }

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Nao foi possivel ler projects.json: ${details}`);
  }

  const data = (await response.json()) as { content?: string };
  const content = data.content?.replace(/\n/g, "") || "";

  return JSON.parse(decodeBase64Text(content)) as Project[];
};

const createBlob = async (owner: string, repo: string, token: string, content: string, encoding: "base64" | "utf-8") =>
  githubRequest<{ sha: string }>(`/repos/${owner}/${repo}/git/blobs`, token, {
    method: "POST",
    body: JSON.stringify({ content, encoding }),
  });

const createCommit = async (files: Array<{ path: string; content: string; encoding: "base64" | "utf-8" }>, message: string) => {
  const token = getRequiredEnv("GITHUB_TOKEN");
  const owner = process.env.GITHUB_OWNER || "Luiz-otavio-bg";
  const repo = process.env.GITHUB_REPO || "port";
  const branch = process.env.GITHUB_BRANCH || "main";

  const ref = await githubRequest<{ object: { sha: string } }>(
    `/repos/${owner}/${repo}/git/ref/heads/${branch}`,
    token,
  );
  const baseCommitSha = ref.object.sha;

  const baseCommit = await githubRequest<{ tree: { sha: string } }>(
    `/repos/${owner}/${repo}/git/commits/${baseCommitSha}`,
    token,
  );

  const entries: GitHubTreeEntry[] = await Promise.all(
    files.map(async (file) => {
      const blob = await createBlob(owner, repo, token, file.content, file.encoding);

      return {
        path: file.path,
        mode: "100644" as const,
        type: "blob" as const,
        sha: blob.sha,
      };
    }),
  );

  const tree = await githubRequest<{ sha: string }>(`/repos/${owner}/${repo}/git/trees`, token, {
    method: "POST",
    body: JSON.stringify({
      base_tree: baseCommit.tree.sha,
      tree: entries,
    }),
  });

  const commit = await githubRequest<{ sha: string }>(`/repos/${owner}/${repo}/git/commits`, token, {
    method: "POST",
    body: JSON.stringify({
      message,
      tree: tree.sha,
      parents: [baseCommitSha],
    }),
  });

  await githubRequest(`/repos/${owner}/${repo}/git/refs/heads/${branch}`, token, {
    method: "PATCH",
    body: JSON.stringify({ sha: commit.sha }),
  });

  return { owner, repo, branch, commitSha: commit.sha };
};

const buildProject = (project: ProjectPayload, thumbnailPath: string, imagePaths: string[]): Project => ({
  id: sanitizeSlug(project.title),
  title: project.title.trim(),
  category: project.category,
  description: project.description.trim(),
  thumbnail: thumbnailPath,
  images: imagePaths,
  tools: project.tools
    .split(",")
    .map((tool) => tool.trim())
    .filter(Boolean),
  role: project.role.trim(),
  year: project.year.trim(),
  ...(project.videoUrl?.trim() ? { videoUrl: project.videoUrl.trim() } : {}),
  ...(project.externalUrl?.trim() ? { externalUrl: project.externalUrl.trim() } : {}),
  ...(project.figmaUrl?.trim() ? { figmaUrl: project.figmaUrl.trim() } : {}),
  ...(project.githubUrl?.trim() ? { githubUrl: project.githubUrl.trim() } : {}),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Metodo nao permitido" });
  }

  try {
    const adminPassword = getRequiredEnv("ADMIN_PASSWORD");
    const payload = req.body as AdminPayload;

    if (payload.password !== adminPassword) {
      return res.status(401).json({ error: "Senha invalida" });
    }

    if (!payload.project || !payload.thumbnail || !payload.images?.length) {
      return res.status(400).json({ error: "Projeto, capa e imagens sao obrigatorios" });
    }

    if (!payload.project.title.trim() || !payload.project.role.trim() || !payload.project.year.trim()) {
      return res.status(400).json({ error: "Titulo, funcao e ano sao obrigatorios" });
    }

    if (!categories.includes(payload.project.category)) {
      return res.status(400).json({ error: "Categoria invalida" });
    }

    const token = getRequiredEnv("GITHUB_TOKEN");
    const owner = process.env.GITHUB_OWNER || "Luiz-otavio-bg";
    const repo = process.env.GITHUB_REPO || "port";
    const branch = process.env.GITHUB_BRANCH || "main";
    const slug = sanitizeSlug(payload.project.title);
    const timestamp = Date.now();

    const thumbnailName = sanitizeFileName(payload.thumbnail.name);
    const thumbnailPath = `/uploads/${slug}-${timestamp}-cover-${thumbnailName}`;
    const imagePaths = payload.images.map((image, index) => {
      const fileName = sanitizeFileName(image.name);
      return `/uploads/${slug}-${timestamp}-${index + 1}-${fileName}`;
    });

    const nextProject = buildProject(payload.project, thumbnailPath, imagePaths);
    const existingProjects = await getExistingProjects(owner, repo, branch, token);
    const projects = existingProjects.filter((project) => project.id !== nextProject.id);
    projects.push(nextProject);

    const files = [
      {
        path: `public${thumbnailPath}`,
        content: stripDataUrl(payload.thumbnail.dataUrl),
        encoding: "base64" as const,
      },
      ...payload.images.map((image, index) => ({
        path: `public${imagePaths[index]}`,
        content: stripDataUrl(image.dataUrl),
        encoding: "base64" as const,
      })),
      {
        path: "public/projects.json",
        content: `${JSON.stringify(projects, null, 2)}\n`,
        encoding: "utf-8" as const,
      },
    ];

    const result = await createCommit(files, `Add portfolio project: ${nextProject.title}`);

    return res.status(200).json({
      success: true,
      project: nextProject,
      commitSha: result.commitSha,
    });
  } catch (error) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Erro interno ao publicar projeto",
    });
  }
}
