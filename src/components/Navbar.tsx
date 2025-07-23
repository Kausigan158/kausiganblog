import { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['Latest', 'Tech Insights', 'Legal Trends', 'Opinion Picks', 'Industry News'];

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-md z-50 border-b border-border/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-netflix-red rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <span className="text-xl font-playfair font-bold hidden sm:block">BlogFlix</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/category/${category.toLowerCase().replace(' ', '-')}`}
                className="text-muted-foreground hover:text-foreground transition-colors duration-300 relative group"
              >
                {category}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-netflix-red transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            <Link
              to="/experience"
              className="text-muted-foreground hover:text-foreground transition-colors duration-300 relative group"
            >
              Experience
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-netflix-red transition-all duration-300 group-hover:w-full" />
            </Link>
          </div>

          {/* Search and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              {isSearchOpen ? (
                <div className="flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search blogs..."
                    className="w-64 px-4 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-netflix-red transition-all duration-300 typewriter"
                    autoFocus
                  />
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="ml-2 p-2 text-muted-foreground hover:text-foreground"
                  >
                    <X size={20} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  <Search size={20} />
                </button>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-muted-foreground hover:text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/20">
            <div className="flex flex-col space-y-4">
              {categories.map((category, index) => (
                <Link
                  key={category}
                  to={`/category/${category.toLowerCase().replace(' ', '-')}`}
                  className={`text-muted-foreground hover:text-foreground transition-all duration-300 animate-slide-in-right stagger-${index + 1}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {category}
                </Link>
              ))}
              <Link
                to="/experience"
                className={`text-muted-foreground hover:text-foreground transition-all duration-300 animate-slide-in-right stagger-${categories.length + 1}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Experience
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;