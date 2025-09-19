import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import BlogCarousel from '../components/BlogCarousel';
import BlogCard from '../components/BlogCard';
import EmailSubscription from '../components/EmailSubscription';
import { blogPosts } from '../data/blogPosts';
import { swissArbitrationPosts } from '../data/arbitration-insights/swiss-arbitration/swissArbitrationPosts';
import { territorialDisputesPosts } from '../data/arbitration-insights/territorial-disputes/territorialDisputesPosts';
import { legalInsightsPosts } from '../data/legal-insights/legalInsightsPosts';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, TrendingUp, Users, Award } from 'lucide-react';

const allPosts = [...blogPosts, ...swissArbitrationPosts, ...territorialDisputesPosts, ...legalInsightsPosts];

const Index = () => {
  // Get latest posts for featured section
  const latestPosts = allPosts
    .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
    .slice(0, 3);

  // Debug: Log all posts to see what's being loaded
  console.log('All posts:', allPosts);
  console.log('Latest posts:', latestPosts);
  console.log('Arbitration posts:', allPosts.filter(post => post.category === 'arbitration-insights'));

  // Organize posts by category for carousels
  const arbitrationPosts = allPosts.filter(post => post.category === 'arbitration-insights');
  const legalPosts = allPosts.filter(post => post.category === 'legal-insights');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Featured Posts Section */}
      {latestPosts.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
                <span className="hero-title">Featured Articles</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover the latest insights and analysis from the world of arbitration, investment law, and international legal trends.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestPosts.map((post, index) => (
                <div
                  key={post.id}
                  className={`animate-fade-in-up stagger-${Math.min(index + 1, 5)}`}
                >
                  <BlogCard {...post} />
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link to="/category/arbitration-insights">
                <button className="netflix-button flex items-center space-x-2 mx-auto">
                  <span>View All Articles</span>
                  <ArrowRight size={20} />
                </button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">
                About <span className="hero-title">Kausigan Srinivasan</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                A passionate legal professional and thought leader specializing in international arbitration, 
                investment law, and emerging legal technologies. With expertise spanning across multiple 
                jurisdictions and practice areas, I provide cutting-edge insights that bridge the gap 
                between traditional legal practice and modern innovation.
              </p>
              <p className="text-base text-muted-foreground mb-8 leading-relaxed">
                Through this blog, I share comprehensive analysis of landmark cases, emerging trends, 
                and practical insights that help legal professionals navigate the complex landscape of 
                international dispute resolution and investment protection.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/about">
                  <button className="netflix-button">
                    Learn More About Me
                  </button>
                </Link>
                
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-card p-6 rounded-xl shadow-lg border border-border/20">
                <TrendingUp className="w-8 h-8 text-netflix-red mb-4" />
                <h3 className="font-semibold mb-2">Industry Expertise</h3>
                <p className="text-sm text-muted-foreground">
                  Deep knowledge in international arbitration and investment law
                </p>
              </div>
              <div className="bg-card p-6 rounded-xl shadow-lg border border-border/20">
                <Users className="w-8 h-8 text-netflix-red mb-4" />
                <h3 className="font-semibold mb-2">Global Perspective</h3>
                <p className="text-sm text-muted-foreground">
                  Experience across multiple jurisdictions and legal systems
                </p>
              </div>
              <div className="bg-card p-6 rounded-xl shadow-lg border border-border/20">
                <Award className="w-8 h-8 text-netflix-red mb-4" />
                <h3 className="font-semibold mb-2">Thought Leadership</h3>
                <p className="text-sm text-muted-foreground">
                  Published insights on emerging legal trends and technologies
                </p>
              </div>
              <div className="bg-card p-6 rounded-xl shadow-lg border border-border/20">
                <BookOpen className="w-8 h-8 text-netflix-red mb-4" />
                <h3 className="font-semibold mb-2">Educational Content</h3>
                <p className="text-sm text-muted-foreground">
                  Comprehensive analysis of landmark cases and legal developments
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Carousels Section */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 pb-20">
          {/* Show message when no blog posts exist */}
          {allPosts.length === 0 ? (
            <div className="text-center py-20 animate-fade-in-up">
              <div className="bg-card p-12 rounded-2xl shadow-hero max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">
                  No Blog Posts Available
                </h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Blog posts have been removed. New content will be added soon.
                </p>
                <div className="flex justify-center">
                  <button className="netflix-button">
                    Check Back Later
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Arbitration Insights Carousel */}
              {arbitrationPosts.length > 0 && (
                <BlogCarousel 
                  title="Arbitration Insights" 
                  posts={arbitrationPosts}
                  delay={0}
                />
              )}
              {/* Legal Insights Carousel */}
              {legalPosts.length > 0 && (
                <BlogCarousel 
                  title="Legal Insights" 
                  posts={legalPosts}
                  delay={1}
                />
              )}
            </>
          )}
          
          {/* Call to Action Section */}
          <div className="mt-20 text-center animate-fade-in-up stagger-5">
            <div className="bg-card p-12 rounded-2xl shadow-hero">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">
                Stay Updated with
                <span className="hero-title ml-2">Kausigan Srinivasan's Blog</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Get the latest insights, case studies, and industry news delivered directly to your inbox. Join professionals who trust Kausigan Srinivasan's Blog for cutting-edge content.
              </p>
              <EmailSubscription />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-muted/30 border-t border-border/20 py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-14 h-14 flex items-center justify-center bg-card rounded-full shadow-lg border-2 border-netflix-red">
                  {/* Logo removed. Add your logo here if needed. */}
                </div>
                <span className="text-xl font-playfair font-bold text-yellow-100 drop-shadow">Kausigan Srinivasan's Blog</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Your premier destination for insights on technology, legal trends, and industry analysis. 
                Empowering professionals with cutting-edge content.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <div className="space-y-2">
                <Link to="/category/arbitration-insights" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">Arbitration Insights</Link>
                <Link to="/category/legal-insights" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">Legal Insights</Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Pages</h4>
              <div className="space-y-2">
                <Link to="/about" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">About Me</Link>
                <Link to="/experience" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">Experience</Link>
                <Link to="/blog/swiss-arbitration" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">Swiss Arbitration</Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <div className="space-y-2">
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">Privacy Policy</a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">Terms of Service</a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">Cookie Policy</a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">Disclaimer</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border/20 mt-8 pt-8 text-center">
            <p className="text-muted-foreground text-sm">
              © 2024 Kausigan Srinivasan's Blog. All rights reserved. Legal insights for the modern professional.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
