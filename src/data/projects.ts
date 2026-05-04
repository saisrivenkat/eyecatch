export interface Project {
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string;
  size: "large" | "small";
  services?: string[];
  videoSrc?: string;
  videoPoster?: string;
  bannerImage?: string;
  fullDescription?: string;
}

export const projects: Project[] = [
  {
    slug: "tropoleap",
    title: "Tropoleap",
    category: "Logo",
    description:
      "At Tropoleap, we excel at merging cutting-edge technology with gaming. Our team is composed of lifelong technologists who have worked with Fortune 500 companies and beyond.",
    image: "/images/projects/tropoleap.jpg",
    size: "large",
    services: ["Logo Ideation, design and rationale"],
    videoSrc:
      "https://eyecatch.co.in/wp-content/uploads/2025/08/Tropoleap-1-1.mp4",
    videoPoster:
      "https://eyecatch.co.in/wp-content/themes/eyecatch-theme/assets/img/ec%20crow.gif",
    bannerImage:
      "https://eyecatch.sgp1.cdn.digitaloceanspaces.com/2025/12/Tropoleap-Banner-05.jpg",
    fullDescription:
      "At Tropoleap, we excel at merging cutting-edge technology with gaming. Our team is composed of lifelong technologists who have worked with Fortune 500 companies and have achieved significant milestones in the gaming industry.",
  },
  {
    slug: "knose",
    title: "Knose",
    category: "Branding",
    description:
      "The nose that knows — designed to detect every scent across the blue planet.",
    image: "/images/projects/knose.jpg",
    size: "small",
  },
  {
    slug: "keiros",
    title: "Keiros",
    category: "Branding",
    description:
      "A precision device engineered to pinpoint any location ‘to the point’.",
    image: "/images/projects/keiros.jpg",
    size: "small",
  },
  {
    slug: "art-telangana",
    title: "ART@Telangana",
    category: "Branding",
    description:
      "Telangana stands as a vibrant repository of masters in mural art, painting, caricature, and installations. Honoring this rich legacy, Art @ Telangana is a distinguished platform.",
    image: "/images/projects/art-telangana.jpg",
    size: "large",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
