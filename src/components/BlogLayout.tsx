import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from './Navbar';

interface BlogLayoutProps {
  title: string;
  subtitle?: string;
  author: string;
  date: string;
  readTime: string;
  blogNumber: string;
  category: string;
  imageUrl: string;
  children: ReactNode;
}

export default function BlogLayout({ 
  title, 
  subtitle, 
  author, 
  date, 
  readTime, 
  blogNumber, 
  category,
  imageUrl,
  children 
}: BlogLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-96 md:h-[500px] overflow-hidden mt-16">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
        
        {/* Back Button */}
        <div className="absolute top-8 left-8">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-white/90 hover:text-white transition-colors duration-300 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto bg-black/60 backdrop-blur-sm p-6 md:p-8 rounded-lg">
              {/* Category Tag */}
              <div className="mb-6 text-center">
                <span className="bg-netflix-red text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
                  {category}
                </span>
              </div>
              
              {/* Title - Centered */}
              <h1 className="hero-title text-2xl md:text-4xl lg:text-5xl xl:text-6xl mb-6 leading-tight text-center font-merriweather font-bold">
                {title}
              </h1>
              
              {/* Subtitle - Centered */}
              {subtitle && (
                <p className="text-white/90 text-base md:text-lg mb-6 leading-relaxed text-center font-inter font-normal max-w-3xl mx-auto">
                  {subtitle}
                </p>
              )}
              
              {/* Metadata - Centered */}
              <div className="mt-6 mb-4 text-center">
                <p className="text-white/80 text-sm md:text-base font-inter leading-relaxed">
                  By {author} · {date} · {readTime}
                </p>
              </div>
              
              {/* Blog Number - Centered */}
              <p className="text-white/70 text-xs md:text-sm font-inter text-center">
                Blog {blogNumber}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Body */}
      <main className="blog-body bg-background">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-4xl mx-auto">
            <article className="prose prose-lg prose-invert max-w-none">
              {children}
            </article>
          </div>
        </div>
      </main>
    </div>
  );
} 