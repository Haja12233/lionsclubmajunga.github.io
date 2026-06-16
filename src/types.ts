export interface EventAction {
  id: string;
  title: string;
  category: "sante" | "nutrition" | "education" | "culture";
  tag: string;
  description: string;
  fullStory: string;
  image: string;
  stats: string;
  impactIcon: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  image: string;
  author: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  text: string;
  rating: number;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  type: "sponsor" | "entreprise" | "institution";
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "sante" | "education" | "nutrition" | "evenements" | "galas";
  image: string;
  date: string;
}
