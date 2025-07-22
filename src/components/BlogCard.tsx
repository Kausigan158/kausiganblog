import { Calendar, Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  publishedDate: string;
  readTime: string;
  category: string;
  imageUrl: string;
  featured?: boolean;
}

const BlogCard = ({ 
  id, 
  title, 
  excerpt, 
  author, 
  publishedDate, 
  readTime, 
  category, 
  imageUrl, 
  featured = false 
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className={`blog-card bg-card rounded-xl overflow-hidden group cursor-pointer ${
        featured ? 'w-full' : 'w-80 flex-shrink-0'
      }`}>
        <div className="relative">
          <img 
            src={imageUrl} 
            alt={title}
            className={`w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
              featured ? 'h-64' : 'h-48'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-netflix-red text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
              {category}
            </span>
          </div>

          {/* Hover Play Button Effect */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm transform scale-75 group-hover:scale-100 transition-transform duration-300">
              <div className="w-0 h-0 border-l-8 border-l-white border-t-4 border-t-transparent border-b-4 border-b-transparent ml-1" />
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className={`font-playfair font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-netflix-red transition-colors duration-300 ${
            featured ? 'text-2xl' : 'text-lg'
          }`}>
            {title}
          </h3>
          
          <p className="text-muted-foreground mb-4 line-clamp-3 text-sm leading-relaxed">
            {excerpt}
          </p>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <User size={12} />
                <span>{author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar size={12} />
                <span>{publishedDate}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock size={12} />
                <span>{readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;