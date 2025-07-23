import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import BlogCarousel from '../components/BlogCarousel';
import { blogPosts, getPostsByCategory } from '../data/blogPosts';

const Index = () => {
  // Organize posts by category for carousels
  const latestPosts = blogPosts.slice(0, 6);
  const techInsights = getPostsByCategory('tech-insights');
  const legalTrends = getPostsByCategory('legal-trends');
  const opinionPicks = getPostsByCategory('opinion-picks');
  const industryNews = getPostsByCategory('industry-news');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Blog Carousels Section */}
      <div className="relative z-10 -mt-16">
        <div className="container mx-auto px-4 pb-20">
          {/* Latest Blogs Carousel */}
          <BlogCarousel 
            title="Latest Blogs" 
            posts={latestPosts}
            delay={0}
          />

          {/* Tech Insights Carousel */}
          {techInsights.length > 0 && (
            <BlogCarousel 
              title="Tech Insights" 
              posts={techInsights}
              delay={1}
            />
          )}

          {/* Legal Trends Carousel */}
          {legalTrends.length > 0 && (
            <BlogCarousel 
              title="Legal Trends" 
              posts={legalTrends}
              delay={2}
            />
          )}

          {/* Opinion Picks Carousel */}
          {opinionPicks.length > 0 && (
            <BlogCarousel 
              title="Opinion Picks" 
              posts={opinionPicks}
              delay={3}
            />
          )}

          {/* Industry News Carousel */}
          {industryNews.length > 0 && (
            <BlogCarousel 
              title="Industry News" 
              posts={industryNews}
              delay={4}
            />
          )}

          {/* Call to Action Section */}
          <div className="mt-20 text-center animate-fade-in-up stagger-5">
            <div className="bg-card p-12 rounded-2xl shadow-hero">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">
                Stay Updated with
                <span className="hero-title ml-2">BlogFlix</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Get the latest insights on technology, legal trends, and industry analysis delivered directly to your inbox. 
                Join thousands of professionals who trust BlogFlix for cutting-edge content.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full sm:w-96 px-6 py-4 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-netflix-red transition-all duration-300"
                />
                <button className="netflix-button w-full sm:w-auto">
                  Subscribe Now
                </button>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                No spam, unsubscribe at any time. We respect your privacy.
              </p>
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
                <div className="w-8 h-8 bg-netflix-red rounded-md flex items-center justify-center">
                  <span className="text-white font-bold text-lg">B</span>
                </div>
                <span className="text-xl font-playfair font-bold">BlogFlix</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Your premier destination for insights on technology, legal trends, and industry analysis. 
                Empowering professionals with cutting-edge content.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <div className="space-y-2">
                <a href="/category/tech-insights" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">Tech Insights</a>
                <a href="/category/legal-trends" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">Legal Trends</a>
                <a href="/category/opinion-picks" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">Opinion Picks</a>
                <a href="/category/industry-news" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">Industry News</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2">
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">About Us</a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">Our Team</a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">Careers</a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">Contact</a>
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
              © 2024 BlogFlix. All rights reserved. Designed with ❤️ for the modern professional.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
