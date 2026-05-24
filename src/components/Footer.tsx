import { Instagram, Linkedin, Globe } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background/80 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/logo.ico" alt="" className="h-7 w-7 object-contain invert dark:invert-0" />
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-foreground">Luiz Otavio</p>
          </div>
          <div className="flex items-center gap-6">
            <a href="https://www.instagram.com/therealluiiz/" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram size={20} />
            </a>
            <a href="https://www.linkedin.com/in/luiz-otavio-dev/" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="/" className="text-muted-foreground hover:text-primary transition-colors">
              <Globe size={20} />
            </a>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} — Todos os direitos reservados
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
