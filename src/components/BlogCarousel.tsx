import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import BlogCard from './BlogCard';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  publishedDate: string;
  readTime: string;
  category: string;
  imageUrl: string;
}

interface BlogCarouselProps {
  title: string;
  posts: BlogPost[];
  delay?: number;
}

const BlogCarousel = ({ title, posts, delay = 0 }: BlogCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320; // Width of card + gap
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={`mb-12 animate-fade-in-up stagger-${Math.min(delay, 5)}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-playfair font-semibold text-foreground">
          {title}
        </h2>
        
        {/* Navigation Arrows */}
        <div className="hidden md:flex items-center space-x-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors duration-300 group"
          >
            <ChevronLeft size={20} className="text-muted-foreground group-hover:text-foreground" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors duration-300 group"
          >
            <ChevronRight size={20} className="text-muted-foreground group-hover:text-foreground" />
          </button>
        </div>
      </div>

      {/* Blog Cards Container */}
      <div 
        ref={scrollRef}
        className="flex space-x-12 overflow-x-auto carousel-container pb-8 px-2"
      >
        {posts.map((post, index) => (
          <div
            key={post.id}
            className={`animate-slide-in-right stagger-${Math.min(index + 1, 5)} mx-2`}
            style={{ animationDelay: `${delay * 0.1 + index * 0.1}s` }}
          >
            <BlogCard {...post} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogCarousel;