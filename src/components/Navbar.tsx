import { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import { swissArbitrationPosts } from '../data/arbitration-insights/swiss-arbitration/swissArbitrationPosts';

const allPosts = [...blogPosts, ...swissArbitrationPosts];

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const categories = ['Arbitration Insights', 'Legal Insights'];

  // Filter posts by title or excerpt
  const filteredPosts = searchQuery.trim()
    ? allPosts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-md z-50 border-b border-border/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/about" className="flex items-center space-x-2" aria-label="About Kausigan Srinivasan">
            <div className="w-12 h-12 flex items-center justify-center bg-card rounded-full shadow-lg border-2 border-netflix-red overflow-hidden">
              {/* Divine Murugan Vel and Peacock Cinematic SVG Logo (fits circle, full edge visible) */}
              <svg width="100%" height="100%" viewBox="0 0 64 72" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
                <defs>
                  <radialGradient id="vel-gem" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#ff3b3b"/>
                    <stop offset="80%" stop-color="#b30000"/>
                  </radialGradient>
                  <linearGradient id="vel-gold" x1="32" y1="8" x2="32" y2="64" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#fffbe6"/>
                    <stop offset="0.4" stop-color="#FFD700"/>
                    <stop offset="1" stop-color="#C08401"/>
                  </linearGradient>
                  <radialGradient id="peacock-blue" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#aee7ff"/>
                    <stop offset="80%" stop-color="#1E90FF"/>
                  </radialGradient>
                  <radialGradient id="peacock-green" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#baffc9"/>
                    <stop offset="80%" stop-color="#2ecc40"/>
                  </radialGradient>
                  <linearGradient id="sky" x1="0" y1="0" x2="64" y2="72" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stop-color="#2d1a1a"/>
                    <stop offset="0.3" stop-color="#ff3b3b"/>
                    <stop offset="0.7" stop-color="#ff9900"/>
                    <stop offset="1" stop-color="#111"/>
                  </linearGradient>
                </defs>
                {/* Stormy sky background */}
                <rect x="0" y="0" width="64" height="72" fill="url(#sky)"/>
                {/* Vel shaft */}
                <rect x="29" y="20" width="6" height="32" rx="3" fill="url(#vel-gold)" stroke="#C08401" strokeWidth="1.2"/>
                {/* Vel spearhead */}
                <ellipse cx="32" cy="18" rx="12" ry="18" fill="url(#vel-gold)" stroke="#C08401" strokeWidth="2"/>
                {/* Carvings */}
                <path d="M32 12 Q36 20 32 28 Q28 20 32 12" fill="none" stroke="#b8860b" strokeWidth="1.2"/>
                <path d="M32 16 Q34 20 32 24 Q30 20 32 16" fill="none" stroke="#b8860b" strokeWidth="0.8"/>
                {/* Glowing red gem */}
                <ellipse cx="32" cy="24" rx="3" ry="4" fill="url(#vel-gem)" filter="url(#glow)"/>
                <ellipse cx="32" cy="24" rx="1.2" ry="1.8" fill="#fff" opacity="0.5"/>
                {/* Red ribbon */}
                <path d="M32 52 Q38 62 28 70" stroke="#ff3b3b" strokeWidth="2.5" fill="none"/>
                <path d="M32 52 Q26 66 36 70" stroke="#ff3b3b" strokeWidth="2.5" fill="none"/>
                {/* Vel base */}
                <ellipse cx="32" cy="52" rx="6" ry="2.5" fill="#FFD700" stroke="#C08401" strokeWidth="1.2"/>
                {/* Peacock body */}
                <ellipse cx="48" cy="50" rx="7" ry="10" fill="url(#peacock-blue)" stroke="#1E90FF" strokeWidth="1.2"/>
                {/* Peacock neck */}
                <rect x="46" y="40" width="3" height="10" rx="1.5" fill="url(#peacock-blue)"/>
                {/* Peacock head */}
                <ellipse cx="47.5" cy="39" rx="2" ry="1.5" fill="#1E90FF"/>
                {/* Peacock eye */}
                <ellipse cx="48.2" cy="39.2" rx="0.4" ry="0.3" fill="#fff"/>
                {/* Peacock crown */}
                <path d="M47.5 37 Q47 35 46.5 36.5" stroke="#FFD700" strokeWidth="0.5"/>
                <path d="M48 37 Q48.5 35 49 36.5" stroke="#FFD700" strokeWidth="0.5"/>
                {/* Peacock feathers (simplified, radiating) */}
                <ellipse cx="54" cy="56" rx="2.5" ry="1.1" fill="url(#peacock-green)"/>
                <ellipse cx="56" cy="52" rx="2.2" ry="1" fill="url(#peacock-green)"/>
                <ellipse cx="52" cy="60" rx="2.2" ry="1" fill="url(#peacock-green)"/>
                <ellipse cx="50" cy="54" rx="2.2" ry="1" fill="url(#peacock-green)"/>
                {/* Feather eyes */}
                <ellipse cx="54" cy="56" rx="0.5" ry="0.3" fill="#FFD700"/>
                <ellipse cx="56" cy="52" rx="0.5" ry="0.3" fill="#FFD700"/>
                <ellipse cx="52" cy="60" rx="0.5" ry="0.3" fill="#FFD700"/>
                <ellipse cx="50" cy="54" rx="0.5" ry="0.3" fill="#FFD700"/>
                {/* Soft shadow under logo */}
                <ellipse cx="32" cy="68" rx="20" ry="3" fill="#000" opacity="0.18"/>
                <filter id="glow" x="-10" y="-10" width="84" height="84">
                  <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </svg>
            </div>
            <span className="text-xl font-playfair font-bold hidden sm:block text-yellow-100 drop-shadow">Kausigan Srinivasan's Blog</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-muted-foreground hover:text-foreground transition-colors duration-300 relative group"
            >
              Home
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-netflix-red transition-all duration-300 group-hover:w-full" />
            </Link>
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
            
          </div>

          {/* Search and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              {isSearchOpen ? (
                <div className="flex items-center relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search blogs..."
                    className="w-64 px-4 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-netflix-red transition-all duration-300 typewriter"
                    autoFocus
                    onKeyDown={e => {
                      if (e.key === 'Escape') {
                        setIsSearchOpen(false);
                        setSearchQuery('');
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="ml-2 p-2 text-muted-foreground hover:text-foreground"
                  >
                    <X size={20} />
                  </button>
                  {/* Dropdown results */}
                  {searchQuery.trim() && filteredPosts.length > 0 && (
                    <div className="absolute left-0 top-12 w-80 max-h-80 overflow-y-auto bg-card border border-border rounded-lg shadow-lg z-50 animate-fade-in-up">
                      {filteredPosts.map(post => (
                        <button
                          key={post.id}
                          className="w-full text-left px-4 py-3 hover:bg-muted/60 transition-colors border-b border-border last:border-b-0"
                          onClick={() => {
                            setIsSearchOpen(false);
                            setSearchQuery('');
                            navigate(`/blog/${post.id}`);
                          }}
                        >
                          <div className="font-semibold text-foreground truncate">{post.title}</div>
                          <div className="text-sm text-muted-foreground truncate">{post.excerpt}</div>
                        </button>
                      ))}
                    </div>
                  )}
                  {searchQuery.trim() && filteredPosts.length === 0 && (
                    <div className="absolute left-0 top-12 w-80 bg-card border border-border rounded-lg shadow-lg z-50 animate-fade-in-up px-4 py-3 text-muted-foreground">
                      No results found.
                    </div>
                  )}
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
              <Link
                to="/"
                className="text-muted-foreground hover:text-foreground transition-all duration-300 animate-slide-in-right stagger-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              {categories.map((category, index) => (
                <Link
                  key={category}
                  to={`/category/${category.toLowerCase().replace(' ', '-')}`}
                  className={`text-muted-foreground hover:text-foreground transition-all duration-300 animate-slide-in-right stagger-${index + 2}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {category}
                </Link>
              ))}
              <Link
                to="/experience"
                className={`text-muted-foreground hover:text-foreground transition-all duration-300 animate-slide-in-right stagger-${categories.length + 2}`}
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