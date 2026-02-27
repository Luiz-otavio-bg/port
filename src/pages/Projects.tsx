import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { projects, categories, type ProjectCategory } from "@/data/projects";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | "Todos">("Todos");

  const filtered = activeFilter === "Todos"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <Layout>
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sky-500 text-sm font-medium tracking-widest uppercase mb-2">Portfólio</p>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-10">
              Meus <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-blue-300 to-sky-500 bg-[length:200%_auto] hover:bg-right transition-all duration-500 cursor-default">Projetos</span>
            </h1>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-12">
            {["Todos", ...categories].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat as ProjectCategory | "Todos")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === cat
                    ? "bg-sky-500 text-primary-foreground glow-primary"
                    : "bg-secondary text-secondary-foreground hover:bg-sky-500/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
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
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs">{project.category}</Badge>
                        <span className="text-xs text-muted-foreground">{project.year}</span>
                      </div>
                      <h3 className="text-lg font-heading font-semibold group-hover:text-sky-500 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{project.description}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
