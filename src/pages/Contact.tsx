import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Instagram, Linkedin, Globe, Mail, MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false); // Novo estado
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Erro ao enviar");

      toast({
        title: "Mensagem enviada!",
        description: "Obrigado pelo contato. Retornarei em breve!",
      });
      
      setFormData({ name: "", email: "", projectType: "", message: "" });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Ops! Algo deu errado",
        description: "Não foi possível enviar sua mensagem. Tente novamente mais tarde.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <p className="text-sky-500 text-sm font-medium tracking-widest uppercase mb-2">Contato</p>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4">
              Vamos <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-blue-300 to-sky-500 bg-[length:200%_auto] hover:bg-right transition-all duration-500">conversar?</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Conte-me sobre seu projeto. Estou disponível para freelances e colaborações.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-[1fr_1.2fr] gap-12 max-w-4xl mx-auto">
            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h3 className="font-heading font-semibold text-lg mb-4">Informações</h3>
                <div className="space-y-4 text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <Mail size={18} className="text-sky-500" />
                    <span>bgoficial2026@outlook.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={18} className="text-sky-500" />
                    <span>Brasil</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-heading font-semibold text-lg mb-4">Redes Sociais</h3>
                <div className="flex gap-4">
                  <a href="https://www.instagram.com/therealluiiz/" className="p-3 rounded-lg bg-card border border-border hover:border-sky-500/50 transition-colors">
                    <Instagram size={20} className="text-muted-foreground hover:text-sky-500" />
                  </a>
                  <a href="https://www.linkedin.com/in/luiz-otavio-dev/" className="p-3 rounded-lg bg-card border border-border hover:border-sky-500/50 transition-colors">
                    <Linkedin size={20} className="text-muted-foreground hover:text-sky-500" />
                  </a>
                  <a href="/" className="p-3 rounded-lg bg-card border border-border hover:border-sky-500/50 transition-colors">
                    <Globe size={20} className="text-muted-foreground hover:text-sky-500" />
                  </a>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-card border border-border">
                <p className="text-sm text-muted-foreground">
                  🟢 Disponível para novos projetos
                </p>
              </div>
            </motion.div>

            {/* Form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-5"
            >
              <div>
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Seu nome"
                  required
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="seu@email.com"
                  required
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label>Tipo de Projeto</Label>
                <Select
                  value={formData.projectType}
                  onValueChange={(value) => setFormData({ ...formData, projectType: value })}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Selecione uma opção" />
                  </SelectTrigger>
                  <SelectContent className="">
                    <SelectItem value="motion">Motion Graphics</SelectItem>
                    <SelectItem value="social">Social Media</SelectItem>
                    <SelectItem value="edit">Edição de Vídeo</SelectItem>
                    <SelectItem value="landing">Landing Page</SelectItem>
                    <SelectItem value="uiux">UI/UX Design</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="message">Mensagem</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Conte-me sobre seu projeto..."
                  rows={5}
                  required
                  className="mt-1.5"
                />
              </div>
              <Button type="submit" size="lg" className="w-full glow-primary font-medium bg-gradient-to-r from-sky-500 via-white to-sky-500 bg-[length:200%_auto] hover:bg-right transition-all duration-500 text-black shadow-[0_0_20px_-5px_oklch(68.5% 0.169 237.323)] border-0 px-8">
                Enviar Mensagem <Send className="ml-2" size={16} />
              </Button>
            </motion.form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
