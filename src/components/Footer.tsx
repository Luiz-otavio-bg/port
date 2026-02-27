import { Instagram, Linkedin, Globe } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className=" text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-blue-300 to-sky-500 bg-[length:200%_auto] hover:bg-right transition-all duration-500 cursor-default">Luiz Otavio - BG</p>
          <div className="flex items-center gap-6">
            <a href="https://www.instagram.com/therealluiiz/" className="text-muted-foreground hover:text-sky-500 transition-colors">
              <Instagram size={20} />
            </a>
            <a href="https://www.linkedin.com/in/luiz-otavio-dev/" className="text-muted-foreground hover:text-sky-500 transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="" className="text-muted-foreground hover:text-sky-500 transition-colors">
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
