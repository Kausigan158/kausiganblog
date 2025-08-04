import Navbar from '../components/Navbar';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import { getPostById as getPostByIdMain, blogPosts } from '../data/blogPosts';
import { swissArbitrationPosts } from '../data/arbitration-insights/swiss-arbitration/swissArbitrationPosts';
import { territorialDisputesPosts } from '../data/arbitration-insights/territorial-disputes/territorialDisputesPosts';
import { legalInsightsPosts } from '../data/legal-insights/legalInsightsPosts';

const allPosts = [...blogPosts, ...swissArbitrationPosts, ...territorialDisputesPosts, ...legalInsightsPosts];
const getPostById = (id) => allPosts.find(post => post.id === id);

const BlogDetail = () => {
  const { id } = useParams();
  const post = id ? getPostById(id) : null;

  if (!post) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Banner */}
      <div className="relative h-96 md:h-[500px] overflow-hidden mt-16">
        <img 
          src={post.imageUrl} 
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        {/* Back Button */}
        <div className="absolute top-8 left-8">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-300 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <div className="mb-4">
              <span className="bg-netflix-red text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
                {post.category}
              </span>
            </div>
            
            <h1 className="hero-title text-3xl md:text-5xl lg:text-6xl mb-6 leading-tight">
              {post.title}
            </h1>
            
            {/* Blog Metadata */}
            <div className="mt-4 mb-6">
              <p className="text-sm italic text-muted-foreground font-inter" style={{ letterSpacing: '0.01em' }}>
                By {post.author} · {post.publishedDate} · {post.readTime}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Main Content */}
          <article className="w-full">
            <div className="prose prose-lg prose-invert max-w-none">
              <div 
                className="prose-content"
                dangerouslySetInnerHTML={{ 
                  __html: post.content
                    .replace(/^# (.+$)/gm, '<h1 class="text-3xl font-playfair font-bold mt-8 mb-4 text-foreground">$1</h1>')
                    .replace(/^## (.+$)/gm, '<h2 class="text-2xl font-playfair font-semibold mt-6 mb-3 text-foreground">$1</h2>')
                    .replace(/^### (.+$)/gm, '<h3 class="text-xl font-semibold mt-4 mb-2 text-foreground">$1</h3>')
                }} 
              />
            </div>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-muted rounded-full text-sm text-muted-foreground hover:bg-muted/80 transition-colors duration-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;