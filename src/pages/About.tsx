import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { aboutBio, aboutSkills, aboutStats } from "@/data/about";

const About = () => {
  return (
    <Layout>
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl"
          >
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">Sobre Mim</p>
            <h1 className="mb-8 font-heading text-4xl font-bold md:text-6xl">
              Designer <span className="text-gradient">multidisciplinar</span>
            </h1>

            <div className="mb-20 grid gap-12 md:grid-cols-[1fr_1.5fr]">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="aspect-square overflow-hidden rounded-lg border border-border bg-card"
              >
                <img src="/about-photo.png" alt="Foto de Luiz Otavio" className="h-full w-full object-cover grayscale" />
              </motion.div>

              <div>
                {aboutBio.map((paragraph) => (
                  <p key={paragraph} className="mb-6 text-lg leading-relaxed text-muted-foreground last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-20 grid grid-cols-2 gap-6 md:grid-cols-4"
            >
              {aboutStats.map((stat) => (
                <div key={stat.label} className="rounded-lg border border-border bg-card p-6 text-center">
                  <p className="font-heading text-3xl font-bold text-primary md:text-4xl">{stat.value}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="mb-8 font-heading text-2xl font-bold md:text-3xl">Skills & Ferramentas</h2>
              <div className="grid gap-5">
                {aboutSkills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <div className="mb-2 flex justify-between">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-secondary">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: i * 0.05 }}
                        className="h-full rounded-full bg-primary"
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
