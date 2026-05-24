import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Figma, Github, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import { useProjects } from "@/hooks/use-projects";

const getYouTubeEmbedUrl = (url: string) => {
  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${parsedUrl.pathname.replace("/", "")}`;
    }

    if (parsedUrl.pathname.startsWith("/watch")) {
      const videoId = parsedUrl.searchParams.get("v");
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    }

    if (parsedUrl.pathname.startsWith("/shorts/")) {
      return `https://www.youtube.com/embed/${parsedUrl.pathname.split("/")[2]}`;
    }

    return url;
  } catch {
    return url;
  }
};

const getYouTubeWatchUrl = (url: string) => {
  const embedUrl = getYouTubeEmbedUrl(url);
  const videoId = embedUrl.match(/youtube\.com\/embed\/([^?]+)/)?.[1];

  return videoId ? `https://www.youtube.com/watch?v=${videoId}` : url;
};

const ProjectDetail = () => {
  const { id } = useParams();
  const { projects, isLoading } = useProjects();
  const project = projects.find((p) => p.id === id);
  const videoEmbedUrl = project?.videoUrl ? getYouTubeEmbedUrl(project.videoUrl) : "";
  const videoWatchUrl = project?.videoUrl ? getYouTubeWatchUrl(project.videoUrl) : "";

  if (!project && !isLoading) {
    return (
      <Layout>
        <div className="py-24 text-center container mx-auto px-6">
          <h1 className="text-3xl font-heading font-bold mb-4">Projeto não encontrado</h1>
          <Button asChild variant="outline">
            <Link to="/projetos">
              <ArrowLeft className="mr-2" size={16} /> Voltar aos projetos
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  if (!project) {
    return (
      <Layout>
        <div className="py-24 text-center container mx-auto px-6">
          <p className="text-muted-foreground">Carregando projeto...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link
              to="/projetos"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-sky-500 transition-colors mb-8"
            >
              <ArrowLeft className="mr-2" size={16} /> Voltar aos projetos
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge>{project.category}</Badge>
              <span className="text-sm text-muted-foreground">{project.year}</span>
              <span className="text-sm text-muted-foreground">— {project.role}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">{project.title}</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mb-10">{project.description}</p>

            <div className="flex flex-wrap gap-3 mb-12">
              {videoEmbedUrl && (
                <Button asChild variant="outline" size="sm">
                  <a href="#video">
                    <Play size={14} className="mr-2" /> Assistir video
                  </a>
                </Button>
              )}
              {project.externalUrl && (
                <Button asChild variant="outline" size="sm">
                  <a href={project.externalUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={14} className="mr-2" /> Acessar projeto
                  </a>
                </Button>
              )}
              {project.figmaUrl && (
                <Button asChild variant="outline" size="sm">
                  <a href={project.figmaUrl} target="_blank" rel="noopener noreferrer">
                    <Figma size={14} className="mr-2" /> Abrir no Figma
                  </a>
                </Button>
              )}
              {project.githubUrl && (
                <Button asChild variant="outline" size="sm">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github size={14} className="mr-2" /> Ver codigo
                  </a>
                </Button>
              )}
            </div>

            {videoEmbedUrl && (
              <div id="video" className="mb-12 scroll-mt-24">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <h2 className="font-heading text-2xl font-bold">Video do projeto</h2>
                  <a
                    href={videoWatchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80"
                  >
                    Abrir no YouTube <ExternalLink size={14} className="ml-2" />
                  </a>
                </div>
                <div className="aspect-video rounded-xl overflow-hidden bg-card border border-border">
                  <iframe
                    src={videoEmbedUrl}
                    title={project.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            <div className="grid gap-6 mb-12">
              {project.images.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="rounded-xl overflow-hidden border border-border"
                >
                  <img src={img} alt={`${project.title} - ${i + 1}`} className="w-full" loading="lazy" />
                </motion.div>
              ))}
            </div>

            <div>
              <h3 className="text-sm text-muted-foreground uppercase tracking-widest mb-3">Ferramentas</h3>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <Badge key={tool} variant="secondary">{tool}</Badge>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectDetail;
