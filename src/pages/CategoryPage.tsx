import { useParams, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BlogCard from '../components/BlogCard';
import { getPostsByCategory, blogPosts } from '../data/blogPosts';
import { swissArbitrationPosts } from '../data/arbitration-insights/swiss-arbitration/swissArbitrationPosts';
import { territorialDisputesPosts } from '../data/arbitration-insights/territorial-disputes/territorialDisputesPosts';
import { legalInsightsPosts } from '../data/legal-insights/legalInsightsPosts';

const allPosts = [...blogPosts, ...swissArbitrationPosts, ...territorialDisputesPosts, ...legalInsightsPosts];

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  
  if (!category) {
    return <Navigate to="/" replace />;
  }

  const posts = category === 'latest'
    ? allPosts.slice(0, 4)
    : allPosts.filter(post => post.category === category);
  
  // Format category name for display
  const categoryName = category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header Section */}
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">
              <span className="hero-title">{categoryName}</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our latest insights and analysis in {categoryName.toLowerCase()}
            </p>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="pb-20">
        <div className="container mx-auto px-4">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-card p-12 rounded-2xl shadow-hero max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">
                  No Posts Available
                </h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  No posts are currently available in {categoryName}. Check back soon for new content.
                </p>
                <div className="flex justify-center">
                  <button 
                    onClick={() => window.history.back()}
                    className="netflix-button"
                  >
                    Go Back
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {posts.map((post, index) => (
                <div
                  key={post.id}
                  className={`animate-fade-in-up stagger-${Math.min(index + 1, 5)}`}
                >
                  <BlogCard {...post} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;