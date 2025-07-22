import { useParams, Navigate, Link } from 'react-router-dom';
import { Calendar, Clock, User, Share2, Twitter, Facebook, Linkedin, ArrowLeft } from 'lucide-react';
import { getPostById } from '../data/blogPosts';
import Navbar from '../components/Navbar';

const BlogDetail = () => {
  const { id } = useParams();
  const post = id ? getPostById(id) : null;

  if (!post) {
    return <Navigate to="/" replace />;
  }

  const shareUrl = window.location.href;
  const shareText = `Check out this article: ${post.title}`;

  const shareOnPlatform = (platform: string) => {
    let url = '';
    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
    }
    window.open(url, '_blank');
  };

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
            
            <div className="flex flex-wrap items-center space-x-6 text-sm text-white/80">
              <div className="flex items-center space-x-2">
                <User size={16} />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar size={16} />
                <span>{post.publishedDate}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={16} />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content */}
            <article className="flex-1">
              <div className="prose prose-lg prose-invert max-w-none">
                <div className="text-xl text-muted-foreground mb-8 leading-relaxed font-light">
                  {post.excerpt}
                </div>
                
                <div 
                  className="prose-content"
                  dangerouslySetInnerHTML={{ 
                    __html: post.content.replace(/\n/g, '<br>').replace(/^# (.+$)/gm, '<h1 class="text-3xl font-playfair font-bold mt-8 mb-4">$1</h1>').replace(/^## (.+$)/gm, '<h2 class="text-2xl font-playfair font-semibold mt-6 mb-3">$1</h2>').replace(/^### (.+$)/gm, '<h3 class="text-xl font-semibold mt-4 mb-2">$1</h3>')
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

              {/* Share Section */}
              <div className="mt-8 pt-8 border-t border-border">
                <h3 className="text-lg font-semibold mb-4">Share this article</h3>
                <div className="flex space-x-4">
                  <button
                    onClick={() => shareOnPlatform('twitter')}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
                  >
                    <Twitter size={16} />
                    <span>Twitter</span>
                  </button>
                  <button
                    onClick={() => shareOnPlatform('facebook')}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                  >
                    <Facebook size={16} />
                    <span>Facebook</span>
                  </button>
                  <button
                    onClick={() => shareOnPlatform('linkedin')}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors duration-300"
                  >
                    <Linkedin size={16} />
                    <span>LinkedIn</span>
                  </button>
                  <button
                    onClick={() => navigator.clipboard.writeText(shareUrl)}
                    className="flex items-center space-x-2 px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors duration-300"
                  >
                    <Share2 size={16} />
                    <span>Copy Link</span>
                  </button>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:w-80">
              <div className="sticky top-24">
                {/* Author Card */}
                <div className="bg-card p-6 rounded-xl mb-8 shadow-card">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-netflix-red rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {post.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{post.author}</h4>
                      <p className="text-sm text-muted-foreground">Author</p>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-card p-6 rounded-xl shadow-card">
                  <h4 className="font-semibold text-foreground mb-4">Article Stats</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Reading Time</span>
                      <span className="font-medium">{post.readTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Published</span>
                      <span className="font-medium">{post.publishedDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Category</span>
                      <span className="font-medium">{post.category}</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;