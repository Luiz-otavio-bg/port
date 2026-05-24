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

const projectTypeLabels: Record<string, string> = {
  motion: "Motion Graphics",
  social: "Social Media",
  edit: "Edicao de Video",
  landing: "Landing Page",
  uiux: "UI/UX Design",
  outro: "Outro",
};

const buildMailtoUrl = (formData: {
  name: string;
  email: string;
  projectType: string;
  message: string;
}) => {
  const projectType = projectTypeLabels[formData.projectType] || formData.projectType;
  const subject = `Novo Contato: ${formData.name} - ${projectType}`;
  const body = [
    `Nome: ${formData.name}`,
    `Email: ${formData.email}`,
    `Tipo de Projeto: ${projectType}`,
    "",
    formData.message,
  ].join("\n");

  return `mailto:bgoficial2026@outlook.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
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
        body: JSON.stringify({
          ...formData,
          projectType: projectTypeLabels[formData.projectType] || formData.projectType,
        }),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.error || `Erro ao enviar (${response.status})`);
      }

      toast({
        title: "Mensagem enviada!",
        description: "Obrigado pelo contato. Retornarei em breve!",
      });

      setFormData({ name: "", email: "", projectType: "", message: "" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Nao foi possivel enviar sua mensagem.";

      if (message.includes("404")) {
        window.location.href = buildMailtoUrl(formData);
      }

      toast({
        variant: "destructive",
        title: "Ops! Algo deu errado",
        description: message.includes("404")
          ? "A API local nao esta ativa. Abri seu app de email como fallback."
          : message,
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
            className="mb-16 text-center"
          >
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">Contato</p>
            <h1 className="mb-4 font-heading text-4xl font-bold md:text-6xl">
              Vamos <span className="text-gradient">conversar?</span>
            </h1>
            <p className="mx-auto max-w-xl text-lg text-muted-foreground">
              Me manda a ideia do jeito que ela esta agora. Pode ser briefing fechado ou so um rascunho.
            </p>
          </motion.div>

          <div className="mx-auto grid max-w-4xl gap-12 md:grid-cols-[1fr_1.2fr]">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h3 className="mb-4 font-heading text-lg font-semibold">Informacoes</h3>
                <div className="space-y-4 text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <Mail size={18} className="text-primary" />
                    <span>bgoficial2026@outlook.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={18} className="text-primary" />
                    <span>Brasil</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-4 font-heading text-lg font-semibold">Redes Sociais</h3>
                <div className="flex gap-4">
                  <a href="https://www.instagram.com/therealluiiz/" className="rounded-lg border border-border bg-card p-3 transition-colors hover:border-primary/50">
                    <Instagram size={20} className="text-muted-foreground hover:text-primary" />
                  </a>
                  <a href="https://www.linkedin.com/in/luiz-otavio-dev/" className="rounded-lg border border-border bg-card p-3 transition-colors hover:border-primary/50">
                    <Linkedin size={20} className="text-muted-foreground hover:text-primary" />
                  </a>
                  <a href="/" className="rounded-lg border border-border bg-card p-3 transition-colors hover:border-primary/50">
                    <Globe size={20} className="text-muted-foreground hover:text-primary" />
                  </a>
                </div>
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <p className="text-sm text-muted-foreground">Disponivel para novos projetos</p>
              </div>
            </motion.div>

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
                  required
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Selecione uma opcao" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="motion">Motion Graphics</SelectItem>
                    <SelectItem value="social">Social Media</SelectItem>
                    <SelectItem value="edit">Edicao de Video</SelectItem>
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
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="glow-primary w-full border-0 bg-primary px-8 font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    Enviando <Loader2 className="ml-2 animate-spin" size={16} />
                  </>
                ) : (
                  <>
                    Enviar Mensagem <Send className="ml-2" size={16} />
                  </>
                )}
              </Button>
            </motion.form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
