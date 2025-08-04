import { Play, Info, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import aiRevolutionHero from '../assets/ai-revolution-hero.jpg';

const Hero = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={aiRevolutionHero}
          alt="Kausigan Srinivasan's Blog"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            {/* Category Badge */}
            <div className="mb-4 animate-fade-in-up">
              <span className="bg-netflix-red text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
                Welcome
              </span>
            </div>

            {/* Title with Animation */}
            <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight animate-fade-in-up stagger-1">
              Kausigan Srinivasan's Blog
            </h1>

            {/* Description */}
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl animate-fade-in-up stagger-3">
              Your premier destination for insights on technology, legal trends, and industry analysis. 
              Empowering professionals with cutting-edge content and thought leadership.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in-up stagger-4">
              <Link to="/about">
                <button className="netflix-button flex items-center space-x-2 w-full sm:w-auto justify-center">
                  <Play size={20} fill="currentColor" />
                  <span>Learn More</span>
                </button>
              </Link>
              
              <Link to="/experience">
                <button className="flex items-center space-x-2 px-8 py-4 bg-muted/20 backdrop-blur-sm text-foreground rounded-lg font-semibold hover:bg-muted/30 transition-all duration-300 w-full sm:w-auto justify-center">
                  <Info size={20} />
                  <span>My Experience</span>
                </button>
              </Link>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="w-6 h-10 border border-muted-foreground rounded-full flex justify-center">
                <div className="w-1 h-2 bg-muted-foreground rounded-full mt-2 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;