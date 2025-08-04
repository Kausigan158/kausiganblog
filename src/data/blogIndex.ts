export interface BlogEntry {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  date: string;
  readTime: string;
  blogNumber: string;
  category: string;
  imageUrl: string;
  slug: string;
  tags: string[];
}

export const blogEntries: BlogEntry[] = [
  {
    id: 'swiss-arbitration-eu-law',
    title: 'Is Swiss Arbitration Still Safe from EU Law — Not Anymore',
    subtitle: 'When people talk about international arbitration, Switzerland almost always comes up as a safe zone.',
    author: 'Kausigan Srinivasan',
    date: 'July 27, 2025',
    readTime: '3 min read',
    blogNumber: '1',
    category: 'ARBITRATION-INSIGHTS',
    imageUrl: '/src/assets/ai-revolution-hero.jpg',
    slug: 'swiss-arbitration',
    tags: ['Arbitration', 'Switzerland', 'EU Law', 'International Law', 'Legal Trends']
  },
  {
    id: 'borders-battles-briefs',
    title: 'Borders, Battles and Briefs: Why Arbitration Might Be the Most Peaceful Weapon',
    subtitle: 'Exploring how arbitration serves as a peaceful alternative to warfare in violent territorial conflicts.',
    author: 'Kausigan Srinivasan',
    date: 'August 15, 2025',
    readTime: '6 min read',
    blogNumber: '2',
    category: 'ARBITRATION-INSIGHTS',
    imageUrl: '/src/assets/ai-revolution-hero.jpg',
    slug: 'borders-battles-briefs',
    tags: ['Arbitration', 'Territorial Disputes', 'Equity', 'Peace', 'International Law', 'Conflict Resolution']
  },
  {
    id: 'malaysia-arbitration-growth',
    title: 'Malaysia Arbitration: Growing Pains and Opportunities',
    subtitle: 'Examining the rapid growth of arbitration in Malaysia and its challenges.',
    author: 'Kausigan Srinivasan',
    date: 'September 3, 2025',
    readTime: '5 min read',
    blogNumber: '3',
    category: 'ARBITRATION-INSIGHTS',
    imageUrl: '/src/assets/fintech-regulation.jpg',
    slug: 'malaysia-arbitration',
    tags: ['Arbitration', 'Malaysia', 'Growth', 'Opportunities', 'Legal Development']
  }
];

export const getBlogBySlug = (slug: string): BlogEntry | undefined => {
  return blogEntries.find(blog => blog.slug === slug);
};

export const getBlogsByCategory = (category: string): BlogEntry[] => {
  return blogEntries.filter(blog => blog.category.toLowerCase() === category.toLowerCase());
};

export const getAllBlogs = (): BlogEntry[] => {
  return blogEntries;
}; 