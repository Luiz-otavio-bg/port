import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Play, Palette, Monitor, Film, Smartphone, PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Layout from "@/components/Layout";
import { useProjects } from "@/hooks/use-projects";
import { aboutBio, aboutSkills, aboutStats } from "@/data/about";

const services = [
  { icon: Play, label: "Motion", description: "Movimento com ritmo e intencao" },
  { icon: Smartphone, label: "Social Media", description: "Pecas que seguram o olhar" },
  { icon: Film, label: "Edits", description: "Corte, cor e energia" },
  { icon: Monitor, label: "Front-end", description: "Interfaces que saem do Figma" },
  { icon: PenTool, label: "UI/UX", description: "Fluxos simples de entender" },
  { icon: Palette, label: "Direcao visual", description: "Consistencia para a marca" },
];

const Index = () => {
  const { projects } = useProjects();
  const featuredProjects = projects.slice(0, 4);

  return (
    <Layout>
      <section className="relative flex min-h-[88vh] items-center overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-20 text-center text-[16vw] font-bold uppercase leading-none text-foreground/[0.035]">
          Portfolio
        </div>
        <div className="container relative z-10 mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]"
          >
            <div>
              <div className="mb-8 flex items-center gap-4 text-sm text-muted-foreground">
                <img src="/logo.ico" alt="" className="h-8 w-8 object-contain invert dark:invert-0" />
                <span className="h-px w-14 bg-border" />
                <span>Portfolio pessoal</span>
              </div>
              <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary">
                Front-end, motion e direcao visual
              </p>
              <h1 className="mb-6 text-5xl font-bold leading-[0.95] md:text-7xl lg:text-8xl">
                Ideias
                <br />
                com forma,
                <br />
                ritmo e tela.
              </h1>
              <p className="mb-10 max-w-xl text-lg text-muted-foreground md:text-xl">
                Eu crio paginas, identidades visuais e conteudos digitais com um pe no design e outro no codigo.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="glow-primary border-0 bg-primary px-8 font-medium text-primary-foreground hover:bg-primary/90">
                  <Link to="/projetos">
                    Ver projetos <ArrowRight className="ml-2" size={18} />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="px-8 text-base">
                  <Link to="/contato">Me chamar</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-6 top-10 hidden text-xs uppercase tracking-widest text-muted-foreground [writing-mode:vertical-rl] lg:block">
                Design + codigo
              </div>
              <div className="relative overflow-hidden rounded-lg border border-border bg-card p-5 shadow-2xl shadow-foreground/10">
                <div className="mb-5 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Luiz Otavio</span>
                  <span>2026</span>
                </div>
                <div className="grid items-end gap-6 md:grid-cols-[0.85fr_1.15fr]">
                  <div className="pb-6">
                    <Carousel opts={{ align: "start", loop: true }} className="w-full">
                      <CarouselContent>
                        <CarouselItem>
                          <div className="min-h-[250px]">
                            <p className="mb-8 text-xs uppercase tracking-widest text-primary">Sobre mim</p>
                            <p className="mb-5 text-6xl font-light italic leading-none md:text-7xl">Ola</p>
                            <p className="text-sm leading-relaxed text-muted-foreground">{aboutBio[0]}</p>
                          </div>
                        </CarouselItem>
                        <CarouselItem>
                          <div className="min-h-[250px]">
                            <p className="mb-8 text-xs uppercase tracking-widest text-primary">Numeros</p>
                            <div className="grid grid-cols-2 gap-6">
                              {aboutStats.map((stat) => (
                                <div key={stat.label}>
                                  <p className="text-3xl font-light">{stat.value}</p>
                                  <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CarouselItem>
                        <CarouselItem>
                          <div className="min-h-[250px]">
                            <p className="mb-8 text-xs uppercase tracking-widest text-primary">Ferramentas</p>
                            <div className="space-y-4">
                              {aboutSkills.slice(0, 4).map((skill) => (
                                <div key={skill.name}>
                                  <div className="mb-2 flex items-center justify-between text-sm">
                                    <span>{skill.name}</span>
                                    <span className="text-muted-foreground">{skill.level}%</span>
                                  </div>
                                  <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                                    <div className="h-full rounded-full bg-primary" style={{ width: `${skill.level}%` }} />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CarouselItem>
                      </CarouselContent>
                      <div className="mt-6 flex items-center gap-2">
                        <CarouselPrevious className="static translate-y-0" />
                        <CarouselNext className="static translate-y-0" />
                      </div>
                    </Carousel>
                  </div>
                  <img
                    src="/about-photo.png"
                    alt="Retrato de Luiz Otavio"
                    className="mx-auto max-h-[460px] w-full object-contain grayscale"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 flex items-end justify-between"
          >
            <div>
              <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">Trabalhos</p>
              <h2 className="font-heading text-3xl font-bold md:text-5xl">Coisas que eu ja coloquei no mundo</h2>
            </div>
            <Link to="/projetos" className="hidden items-center gap-2 font-medium text-primary transition-colors hover:text-primary/80 md:flex">
              Ver portfolio <ArrowRight size={16} />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                  className="group block overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:border-primary/50"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-medium uppercase tracking-wider text-primary">{project.category}</span>
                    <h3 className="mt-1 font-heading text-lg font-semibold transition-colors group-hover:text-primary">
                      {project.title}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Button asChild variant="outline">
              <Link to="/projetos">Ver portfolio</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-card/50 py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">Especialidades</p>
            <h2 className="font-heading text-3xl font-bold md:text-5xl">Onde eu costumo entrar no projeto</h2>
          </motion.div>

          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group rounded-lg border border-border bg-card p-6 text-center transition-all duration-300 hover:border-primary/50"
              >
                <service.icon className="mx-auto mb-3 text-primary transition-transform group-hover:scale-110" size={28} />
                <h3 className="font-heading text-sm font-semibold md:text-base">{service.label}</h3>
                <p className="mt-1 hidden text-xs text-muted-foreground md:block">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-6 cursor-default font-heading text-3xl font-bold md:text-5xl">
              Tem uma ideia parada? <span className="text-gradient">Vamos tirar ela do rascunho.</span>
            </h2>
            <p className="mx-auto mb-8 max-w-lg text-lg text-muted-foreground">
              Me chama com o contexto, o prazo e o que voce quer colocar de pe. Eu te respondo com um caminho possivel.
            </p>
            <Button asChild size="lg" className="glow-primary border-0 bg-primary px-8 font-medium text-primary-foreground hover:bg-primary/90">
              <Link to="/contato">
                Me contar a ideia <ArrowRight className="ml-2" size={18} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
