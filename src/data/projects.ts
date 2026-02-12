export type ProjectCategory = "Motion Design" | "Social Media" | "Edits" | "Landing Pages" | "UI/UX";

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  description: string;
  thumbnail: string;
  images: string[];
  tools: string[];
  role: string;
  videoUrl?: string;
  externalUrl?: string;
  figmaUrl?: string;
  year: string;
}

export const projects: Project[] = [
  {
    id: "motion-reel-2024",
    title: "Motion Design",
    category: "Motion Design",
    description: "",
    thumbnail: "./Motion.svg",
    images: [
      "/Motion-2.svg",
      "/Motion.svg",
    ],
    tools: ["After Effects"],
    role: "Motion Designer",
    videoUrl: "https://www.youtube.com/embed/Y-zTmkA46nU?si=wZGyEGILkH_uWxxN",
    year: "2026",
  },
  {
    id: "brand-social-campaign",
    title: "Social Media",
    category: "Social Media",
    description: "",
    thumbnail: "/Adv-2.svg",
    images: [
      "/Adv-1.svg",
      "/Adv-2.svg",
    ],
    tools: ["Photoshop", "Illustrator", "Figma"],
    role: "Designer & Diretor Criativo",
    year: "2025",
  },
    
  /*{
    id: "cinematic-edit",
    title: "Edits",
    category: "bg",
    description: "",
    thumbnail: "./Frame-3.svg",
    images: [
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&h=800&fit=crop",
    ],
    tools: ["Premiere Pro", "DaVinci Resolve", "After Effects"],
    role: "Editor & Colorista",
    videoUrl: "https://youtu.be/Y-zTmkA46nU",
    year: "2024",
  },
  {
    id: "saas-landing",
    title: "Landing Pages",
    category: "BG",
    description: "",
    thumbnail: "./Frame-4.svg",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
    ],
    tools: ["Figma", "React", "Tailwind CSS"],
    role: "UI Designer & Dev",
    externalUrl: "https://example.com",
    year: "2024",
  },
  {
    id: "fintech-app",
    title: "Fintech App — UI/UX",
    category: "UI/UX",
    description: "",
    thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=800&fit=crop",
    ],
    tools: ["Figma", "FigJam", "Maze"],
    role: "UI/UX Designer",
    figmaUrl: "https://figma.com",
    year: "2023",
  },
  {
    id: "music-video-edit",
    title: "Music Video Edit",
    category: "Edits",
    description: "",
    thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=800&fit=crop",
    ],
    tools: ["Premiere Pro", "After Effects"],
    role: "Editor",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    year: "2023",
  },
  {
    id: "ecommerce-redesign",
    title: "E-commerce Redesign",
    category: "UI/UX",
    description: "",
    thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop",
    ],
    tools: ["Figma", "Hotjar", "Google Analytics"],
    role: "UX Designer",
    figmaUrl: "https://figma.com",
    year: "2023",
  },
  {
    id: "social-media-pack",
    title: "Social Media Pack — Fitness",
    category: "Social Media",
    description: "",
    thumbnail: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&h=800&fit=crop",
    ],
    tools: ["Photoshop", "Illustrator", "Canva"],
    role: "Designer Gráfico",
    year: "2023",
  },*/
];

export const categories: ProjectCategory[] = [
  "Motion Design",
  "Social Media",
  "Edits",
  "Landing Pages",
  "UI/UX",
];
