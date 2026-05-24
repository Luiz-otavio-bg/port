import { useMemo, useState } from "react";
import { Loader2, Lock, UploadCloud } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { categories, type ProjectCategory } from "@/data/projects";

type UploadFile = {
  name: string;
  type: string;
  dataUrl: string;
};

const fileToUpload = (file: File) =>
  new Promise<UploadFile>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve({ name: file.name, type: file.type, dataUrl: String(reader.result) });
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

const Admin = () => {
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    category: "Social Media" as ProjectCategory,
    description: "",
    tools: "",
    role: "",
    videoUrl: "",
    externalUrl: "",
    figmaUrl: "",
    year: new Date().getFullYear().toString(),
  });

  const uploadCount = useMemo(() => imageFiles.length + (thumbnailFile ? 1 : 0), [imageFiles.length, thumbnailFile]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const thumbnail = thumbnailFile ? await fileToUpload(thumbnailFile) : null;
      const images = await Promise.all(imageFiles.map(fileToUpload));

      const response = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password,
          project: formData,
          thumbnail,
          images,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Nao foi possivel publicar o projeto.");
      }

      toast({
        title: "Projeto enviado",
        description: "O GitHub recebeu um commit e a Vercel deve publicar em seguida.",
      });

      setFormData({
        title: "",
        category: "Social Media",
        description: "",
        tools: "",
        role: "",
        videoUrl: "",
        externalUrl: "",
        figmaUrl: "",
        year: new Date().getFullYear().toString(),
      });
      setThumbnailFile(null);
      setImageFiles([]);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Upload nao concluido",
        description: error instanceof Error ? error.message : "Tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <section className="py-24">
        <div className="container mx-auto max-w-3xl px-6">
          <div className="mb-10">
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-sky-500">Admin</p>
            <h1 className="font-heading text-4xl font-bold md:text-5xl">Novo projeto</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-5 rounded-lg border border-border bg-card p-6 md:grid-cols-2">
              <div className="md:col-span-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock size={15} /> Senha admin
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  className="mt-1.5"
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="title">Titulo</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(event) => setFormData({ ...formData, title: event.target.value })}
                  required
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label>Categoria</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value as ProjectCategory })}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="year">Ano</Label>
                <Input
                  id="year"
                  value={formData.year}
                  onChange={(event) => setFormData({ ...formData, year: event.target.value })}
                  required
                  className="mt-1.5"
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="role">Funcao</Label>
                <Input
                  id="role"
                  value={formData.role}
                  onChange={(event) => setFormData({ ...formData, role: event.target.value })}
                  required
                  className="mt-1.5"
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="description">Descricao</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(event) => setFormData({ ...formData, description: event.target.value })}
                  className="mt-1.5"
                  rows={4}
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="tools">Ferramentas</Label>
                <Input
                  id="tools"
                  value={formData.tools}
                  onChange={(event) => setFormData({ ...formData, tools: event.target.value })}
                  placeholder="Photoshop, Figma, After Effects"
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="thumbnail">Capa</Label>
                <Input
                  id="thumbnail"
                  type="file"
                  accept="image/*"
                  onChange={(event) => setThumbnailFile(event.target.files?.[0] || null)}
                  required
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="images">Imagens do projeto</Label>
                <Input
                  id="images"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(event) => setImageFiles(Array.from(event.target.files || []))}
                  required
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="videoUrl">Video embed</Label>
                <Input
                  id="videoUrl"
                  value={formData.videoUrl}
                  onChange={(event) => setFormData({ ...formData, videoUrl: event.target.value })}
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="externalUrl">Link ao vivo</Label>
                <Input
                  id="externalUrl"
                  value={formData.externalUrl}
                  onChange={(event) => setFormData({ ...formData, externalUrl: event.target.value })}
                  className="mt-1.5"
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="figmaUrl">Figma</Label>
                <Input
                  id="figmaUrl"
                  value={formData.figmaUrl}
                  onChange={(event) => setFormData({ ...formData, figmaUrl: event.target.value })}
                  className="mt-1.5"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              size="lg"
              className="w-full bg-sky-500 text-white hover:bg-sky-500/80"
            >
              {isSubmitting ? (
                <>
                  Publicando <Loader2 className="ml-2 animate-spin" size={16} />
                </>
              ) : (
                <>
                  Publicar projeto {uploadCount > 0 && `(${uploadCount} arquivos)`}
                  <UploadCloud className="ml-2" size={16} />
                </>
              )}
            </Button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default Admin;
