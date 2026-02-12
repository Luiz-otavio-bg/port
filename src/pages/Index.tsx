import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Play, Palette, Monitor, Film, Smartphone, PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { projects } from "@/data/projects";

const services = [
  { icon: Play, label: "Motion Graphics", description: "Animações" },
  { icon: Smartphone, label: "Social Media", description: "Design para redes sociais" },
  { icon: Film, label: "Edição de Vídeo", description: "Edits" },
  { icon: Monitor, label: "Landing Pages", description: "Páginas de alta conversão" },
  { icon: PenTool, label: "UI/UX Design", description: "Interfaces intuitivas" },
  { icon: Palette, label: "Branding", description: "Identidade visual completa" },
];

const featuredProjects = projects.slice(0, 4);

const Index = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="min-h-[90vh] flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:390px_200px]" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <p className="text-sky-500 font-medium mb-4 tracking-widest uppercase text-sm">
              Motion Design & Edição | UI/UX Design | Front-end Developer
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
              Criando
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-blue-300 to-sky-500 bg-[length:200%_auto] hover:bg-right transition-all duration-500">experiências</span>
              <br />
              visuais únicas.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10">
              
              Transformando ideias em design impactante.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="glow-white font-medium bg-gradient-to-r from-sky-500 via-white to-sky-500 bg-[length:200%_auto] hover:bg-right transition-all duration-500 text-black shadow-[0_0_20px_-5px_oklch(68.5% 0.169 237.323)] border-0 px-8">
                <Link to="/projetos">
                  Ver Projetos <ArrowRight className="ml-2" size={18} />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base px-8">
                <Link to="/contato">Fale Comigo</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <p className="text-sky-500 text-sm font-medium tracking-widest uppercase mb-2">Trabalhos</p>
              <h2 className="text-3xl md:text-5xl font-heading font-bold">Projetos em destaque</h2>
            </div>
            <Link
              to="/projetos"
              className="hidden md:flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-blue-300 to-sky-500 bg-[length:200%_auto] hover:bg-right transition-all duration-500 font-medium"
            >
              Ver todos <ArrowRight size={16} />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  to={`/projetos/${project.id}`}
                  className="group block rounded-xl overflow-hidden bg-card border border-border hover:border-sky-500/50 transition-all duration-300"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-medium text-sky-600 tracking-wider uppercase">
                      {project.category}
                    </span>
                    <h3 className="text-lg font-heading font-semibold mt-1 group-hover:text-sky-600 transition-colors">
                      {project.title}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Button asChild variant="outline">
              <Link to="/projetos">Ver todos os projetos</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-sky-500 text-sm font-medium tracking-widest uppercase mb-2">Especialidades</p>
            <h2 className="text-3xl md:text-5xl font-heading font-bold">O que eu faço</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
            {services.map((service, i) => (
              <motion.div
                key={service.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group p-6 rounded-xl bg-card border border-border hover:border-sky-500/50 transition-all duration-300 text-center"
              >
                <service.icon
                  className="mx-auto mb-3 text-sky-500 group-hover:scale-110 transition-transform"
                  size={28}
                />
                <h3 className="font-heading font-semibold text-sm md:text-base">{service.label}</h3>
                <p className="text-xs text-muted-foreground mt-1 hidden md:block">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 cursor-default">
              Vamos criar algo <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-blue-300 to-sky-500 bg-[length:200%_auto] hover:bg-right transition-all duration-500 cursor-default">incrível</span> juntos?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">
              Estou disponível para novos projetos e colaborações.
            </p>
            <Button asChild size="lg" className="glow-white font-medium bg-gradient-to-r from-sky-500 via-white to-sky-500 bg-[length:200%_auto] hover:bg-right transition-all duration-500 text-black shadow-[0_0_20px_-5px_oklch(68.5% 0.169 237.323)] border-0 px-8">
              <Link to="/contato">
                Entre em Contato <ArrowRight className="ml-2" size={18} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
