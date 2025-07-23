import { useParams, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BlogCard from '../components/BlogCard';
import { getPostsByCategory } from '../data/blogPosts';

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  
  if (!category) {
    return <Navigate to="/" replace />;
  }

  const posts = getPostsByCategory(category);
  
  if (posts.length === 0) {
    return <Navigate to="/" replace />;
  }

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <div
                key={post.id}
                className={`animate-fade-in-up stagger-${Math.min(index + 1, 5)}`}
              >
                <BlogCard {...post} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;