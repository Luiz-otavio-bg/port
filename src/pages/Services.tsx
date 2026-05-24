import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Play, Palette, Monitor, Film, Smartphone, PenTool, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

const services = [
  {
    icon: Play,
    title: "Motion",
    description: "Animacoes, vinhetas e movimentos para quando a imagem parada nao da conta da mensagem.",
  },
  {
    icon: Smartphone,
    title: "Social Media",
    description: "Posts, carrosseis e pecas com cara de campanha, nao de arquivo jogado no feed.",
  },
  {
    icon: Film,
    title: "Edicao",
    description: "Corte, ritmo, cor e acabamento para deixar o video mais direto e mais assistivel.",
  },
  {
    icon: Monitor,
    title: "Front-end",
    description: "Paginas e interfaces responsivas, com cuidado visual e codigo pronto para ir ao ar.",
  },
  {
    icon: PenTool,
    title: "UI/UX",
    description: "Fluxos, telas e prototipos que ajudam a tirar a ideia da cabeca antes de virar produto.",
  },
  {
    icon: Palette,
    title: "Direcao visual",
    description: "Paleta, tipografia, composicao e consistencia para o projeto parecer uma coisa so.",
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
            className="mb-16 text-center"
          >
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">Servicos</p>
            <h1 className="mb-4 font-heading text-4xl font-bold md:text-6xl">
              Posso entrar no projeto <span className="text-gradient">do visual ao codigo</span>
            </h1>
            <p className="mx-auto max-w-xl text-lg text-muted-foreground">
              Se a ideia precisa virar tela, campanha, movimento ou uma mistura disso tudo, eu ajudo a dar forma.
            </p>
          </motion.div>

          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group rounded-lg border border-border bg-card p-8 transition-all duration-300 hover:border-primary/50"
              >
                <service.icon className="mb-4 text-primary transition-transform group-hover:scale-110" size={32} />
                <h3 className="mb-3 font-heading text-xl font-semibold">{service.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{service.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16 text-center"
          >
            <Button asChild size="lg" className="glow-primary border-0 bg-primary px-10 text-primary-foreground hover:bg-primary/90">
              <Link to="/contato">
                Me contar o projeto <ArrowRight className="ml-2" size={18} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
