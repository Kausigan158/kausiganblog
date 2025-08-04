// Import generated images
import aiRevolutionHero from '../assets/ai-revolution-hero.jpg';
import blockchainContracts from '../assets/blockchain-contracts.jpg';
import remoteWorkLegal from '../assets/remote-work-legal.jpg';
import fintechRegulation from '../assets/fintech-regulation.jpg';
import environmentalLaw from '../assets/environmental-law.jpg';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedDate: string;
  readTime: string;
  category: string;
  imageUrl: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  // Swiss arbitration blogs moved to './swiss-arbitration/swissArbitrationPosts.ts'
];

export const getPostsByCategory = (category: string): BlogPost[] => {
  if (category === 'latest') {
    return blogPosts.slice(0, 4);
  }
  return blogPosts.filter(post => {
    const normalized = post.category.toLowerCase().replace(/ /g, '-');
    return normalized === category.toLowerCase();
  });
};

export const getPostById = (id: string): BlogPost | undefined => {
  return blogPosts.find(post => post.id === id);
};

// Swiss arbitration blogs are now in their own module
export { swissArbitrationPosts } from './arbitration-insights/swiss-arbitration/swissArbitrationPosts';

// Territorial disputes blogs
export { territorialDisputesPosts } from './arbitration-insights/territorial-disputes/territorialDisputesPosts';

// Legal insights blogs
export { legalInsightsPosts } from './legal-insights/legalInsightsPosts';