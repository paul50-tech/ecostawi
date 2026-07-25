export interface Programme {
  id: string;
  title: string;
  description: string;
  category: string;
  details: string[];
  image: string;
  metrics: {
    label: string;
    value: string;
  }[];
}

export interface NewsStory {
  id: string;
  title: string;
  category: 'Field Stories' | 'Research' | 'Climate Insights' | 'Partner Stories' | 'Success Stories';
  date: string;
  author: string;
  summary: string;
  content: string[];
  image: string;
  reads: number;
  tags?: string[];
  readTime?: string;
}

export interface Project {
  id: string;
  name: string;
  location: string;
  county: string;
  coordinates: { lat: number; lng: number };
  status: 'Planning' | 'Active' | 'Completed';
  type: 'Forest Restoration' | 'Mangrove Restoration' | 'Blue Economy' | 'Climate Smart Agriculture' | 'Carbon Project';
  sizeHectares: number;
  treesPlanted?: number;
  carbonOffsetTons: number;
  communityPartners: number;
  dronePath?: { lat: number; lng: number }[];
}

export interface CareerPost {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  description: string;
  requirements: string[];
}
