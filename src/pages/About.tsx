import { motion } from "framer-motion";
import Layout from "@/components/Layout";

const skills = [
  { name: "Figma", level: 95 },
  { name: "After Effects", level: 90 }, 
  { name: "Photoshop", level: 92 },
  { name: "Illustrator", level: 56 },
  { name: "React / HTML/CSS", level: 80 },
  { name: "Next.js", level: 90 },
];

const stats = [
  { value: "40+", label: "Projetos Entregues" },
  { value: "30+", label: "Clientes Satisfeitos" },
  { value: "5+", label: "Anos de Experiência" },
  { value: "6", label: "Ferramentas Dominadas" },
];

const About = () => {
  return (
    <Layout>
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <p className="text-sky-500 text-sm font-medium tracking-widest uppercase mb-2">Sobre Mim</p>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-8">
              Designer <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-blue-300 to-sky-500 bg-[length:200%_auto] hover:bg-right transition-all duration-500 cursor-default">multidisciplinar</span>
            </h1>

            <div className="grid md:grid-cols-[1fr_1.5fr] gap-12 mb-20">
              {/* Avatar */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="aspect-square rounded-2xl bg-card border border-border overflow-hidden"
              >
                <img
                  src="./foto.svg"
                  alt="Foto de perfil"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Bio */}
              <div>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Desenvolvedor Front-End e Motion Designer apaixonado por transformar 
                  ideias em experiências digitais impactantes. Combino código limpo 
                  (React, JavaScript) com design visual envolvente (Figma, After Effects) 
                  para criar projetos que unem estética e funcionalidade.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Com 5+ anos gerenciando equipes criativas e entregando projetos para 
                  clientes internacionais, aprendi que bom design não é apenas bonito — 
                  precisa resolver problemas reais. Minha abordagem híbrida me permite 
                  não só desenhar interfaces incríveis, mas também programá-las do zero.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Atualmente cursando Ciências da Computação para aprofundar minha 
                  base técnica, sempre buscando a interseção perfeita entre arte e código.
                </p>
              </div>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="text-center p-6 rounded-xl bg-card border border-border">
                  <p className="text-3xl md:text-4xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-blue-300 to-sky-500 bg-[length:200%_auto] hover:bg-right transition-all duration-500 cursor-default">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
                </div>
              ))}
            </motion.div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8">
                Skills & Ferramentas
              </h2>
              <div className="grid gap-5">
                {skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: i * 0.05 }}
                        className="h-full rounded-full glow-white font-medium bg-gradient-to-r from-sky-500 via-white to-sky-500 bg-[length:200%_auto] hover:bg-right transition-all duration-500 text-black shadow-[0_0_20px_-5px_oklch(68.5% 0.169 237.323)] border-0 px-8"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
