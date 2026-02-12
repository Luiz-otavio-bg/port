import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Figma, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import { projects } from "@/data/projects";

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
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

            {/* External links */}
            <div className="flex flex-wrap gap-3 mb-12">
              {project.externalUrl && (
                <Button asChild variant="outline" size="sm">
                  <a href={project.externalUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={14} className="mr-2" /> Ver ao Vivo
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
            </div>

            {/* Video embed */}
            {project.videoUrl && (
              <div className="mb-12">
                <div className="aspect-video rounded-xl overflow-hidden bg-card border border-border">
                  <iframe
                    src={project.videoUrl}
                    title={project.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            {/* Images */}
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

            {/* Tools */}
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
