import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Play, Palette, Monitor, Film, Smartphone, PenTool, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

const services = [
  {
    icon: Play,
    title: "Motion Graphics",
    description: "Animações 2D/3D para vídeos, redes sociais e apresentações. Crio motion graphics que dão vida às suas ideias com impacto visual.",
  },
  {
    icon: Smartphone,
    title: "Social Media",
    description: "Design completo para redes sociais — posts, carrosséis, stories e reels com identidade visual consistente e engajadora.",
  },
  {
    icon: Film,
    title: "Edição de Vídeo",
    description: "Edição profissional com color grading, sound design e efeitos visuais. De videoclipes a filmes institucionais.",
  },
  {
    icon: Monitor,
    title: "Landing Pages",
    description: "Design e desenvolvimento de páginas de alta conversão com layouts modernos, responsivos e focados em resultados.",
  },
  {
    icon: PenTool,
    title: "UI/UX Design",
    description: "Interfaces intuitivas e atraentes, desde pesquisa e wireframes até protótipos de alta fidelidade no Figma.",
  },
  {
    icon: Palette,
    title: "Identidade Visual",
    description: "Criação de marcas completas — logo, paleta de cores, tipografia e manual de identidade visual.",
  },
];

const Services = () => {
  return (
    <Layout>
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-sky-500 text-sm font-medium tracking-widest uppercase mb-2">Serviços</p>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4">
              O que eu <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-blue-300 to-sky-500 bg-[length:200%_auto] hover:bg-right transition-all duration-500 cursor-default">ofereço</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Soluções criativas completas para elevar a presença da sua marca.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group p-8 rounded-xl bg-card border border-border hover:border-sky-500/50 transition-all duration-300"
              >
                <service.icon className="text-sky-500 mb-4 group-hover:scale-110 transition-transform" size={32} />
                <h3 className="text-xl font-heading font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mt-16"
          >
            <Button asChild size="lg" className="glow-primary bg-gradient-to-r from-sky-500 via-white to-sky-500 bg-[length:200%_auto] hover:bg-right transition-all duration-500 text-black shadow-[0_0_20px_-5px_oklch(68.5% 0.169 237.323)] border-0 px-10">
              <Link to="/contato">
                Solicitar Orçamento <ArrowRight className="ml-2" size={18} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
