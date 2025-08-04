import Navbar from '../components/Navbar';
import { useEffect, useRef, useState } from 'react';

function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animationId: number;
    let stars = [] as { x: number; y: number; radius: number; alpha: number }[];
    const { width, height } = dimensions;
    canvas.width = width;
    canvas.height = height;
    stars = [];
    for (let i = 0; i < 150; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5,
        alpha: Math.random()
      });
    }
    function drawStars() {
      ctx.clearRect(0, 0, width, height);
      for (let star of stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
      }
      animationId = requestAnimationFrame(drawStars);
    }
    drawStars();
    return () => cancelAnimationFrame(animationId);
  }, [dimensions]);

  return (
    <canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}

const useScrollFadeIn = (threshold = 0.2) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, visible] as const;
};

const AboutMe = () => {
  // For scroll-triggered fade-in
  const [cardRef, cardVisible] = useScrollFadeIn();
  const [bioRef, bioVisible] = useScrollFadeIn();
  const [visionRef, visionVisible] = useScrollFadeIn();
  const [expertiseRef, expertiseVisible] = useScrollFadeIn();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Cinematic animated starfield background */}
      <StarfieldBackground />
      {/* Tech grid and nebula overlay */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {/* Tech grid */}
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="grid" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ff3b3b"/>
              <stop offset="1" stopColor="#111"/>
            </linearGradient>
          </defs>
          {[...Array(11)].map((_, i) => (
            <line key={i} x1={i*10} y1="0" x2={i*10} y2="100" stroke="url(#grid)" strokeWidth="0.2" />
          ))}
          {[...Array(11)].map((_, i) => (
            <line key={i+20} x1="0" y1={i*10} x2="100" y2={i*10} stroke="url(#grid)" strokeWidth="0.2" />
          ))}
        </svg>
        {/* Nebula/gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff3b3b22] via-[#ff990022] to-[#11111188] pointer-events-none" style={{ filter: 'blur(8px)' }} />
      </div>
      <Navbar />
      <div className="pt-24 pb-20 flex flex-col items-center justify-center">
        {/* Floating Heading */}
        <div className="w-full flex flex-col items-center mb-10">
          <div className="w-12 h-12 flex items-center justify-center bg-card rounded-full shadow-lg border-2 border-netflix-red mb-6 overflow-hidden animate-float hover:animate-pulse-glow">
            {/* SVG Logo (as before) */}
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
              <rect x="0" y="0" width="64" height="72" fill="url(#sky)"/>
              <rect x="29" y="20" width="6" height="32" rx="3" fill="url(#vel-gold)" stroke="#C08401" strokeWidth="1.2"/>
              <ellipse cx="32" cy="18" rx="12" ry="18" fill="url(#vel-gold)" stroke="#C08401" strokeWidth="2"/>
              <path d="M32 12 Q36 20 32 28 Q28 20 32 12" fill="none" stroke="#b8860b" strokeWidth="1.2"/>
              <path d="M32 16 Q34 20 32 24 Q30 20 32 16" fill="none" stroke="#b8860b" strokeWidth="0.8"/>
              <ellipse cx="32" cy="24" rx="3" ry="4" fill="url(#vel-gem)" filter="url(#glow)"/>
              <ellipse cx="32" cy="24" rx="1.2" ry="1.8" fill="#fff" opacity="0.5"/>
              <path d="M32 52 Q38 62 28 70" stroke="#ff3b3b" strokeWidth="2.5" fill="none"/>
              <path d="M32 52 Q26 66 36 70" stroke="#ff3b3b" strokeWidth="2.5" fill="none"/>
              <ellipse cx="32" cy="52" rx="6" ry="2.5" fill="#FFD700" stroke="#C08401" strokeWidth="1.2"/>
              <ellipse cx="48" cy="50" rx="7" ry="10" fill="url(#peacock-blue)" stroke="#1E90FF" strokeWidth="1.2"/>
              <rect x="46" y="40" width="3" height="10" rx="1.5" fill="url(#peacock-blue)"/>
              <ellipse cx="47.5" cy="39" rx="2" ry="1.5" fill="#1E90FF"/>
              <ellipse cx="48.2" cy="39.2" rx="0.4" ry="0.3" fill="#fff"/>
              <path d="M47.5 37 Q47 35 46.5 36.5" stroke="#FFD700" strokeWidth="0.5"/>
              <path d="M48 37 Q48.5 35 49 36.5" stroke="#FFD700" strokeWidth="0.5"/>
              <ellipse cx="54" cy="56" rx="2.5" ry="1.1" fill="url(#peacock-green)"/>
              <ellipse cx="56" cy="52" rx="2.2" ry="1" fill="url(#peacock-green)"/>
              <ellipse cx="52" cy="60" rx="2.2" ry="1" fill="url(#peacock-green)"/>
              <ellipse cx="50" cy="54" rx="2.2" ry="1" fill="url(#peacock-green)"/>
              <ellipse cx="54" cy="56" rx="0.5" ry="0.3" fill="#FFD700"/>
              <ellipse cx="56" cy="52" rx="0.5" ry="0.3" fill="#FFD700"/>
              <ellipse cx="52" cy="60" rx="0.5" ry="0.3" fill="#FFD700"/>
              <ellipse cx="50" cy="54" rx="0.5" ry="0.3" fill="#FFD700"/>
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
          <h1 className="text-5xl md:text-6xl font-extrabold font-playfair mb-4 hero-title text-shadow-red animate-float-up tracking-tight uppercase text-center hover:animate-pulse-glow">
            About Me
          </h1>
        </div>
        {/* Main Card */}
        <div ref={cardRef} className={`max-w-2xl w-full bg-black/80 rounded-2xl shadow-2xl p-10 text-center border-2 border-netflix-red/60 backdrop-blur-md glowing-outline transition-all duration-700 ${cardVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}>
          <p ref={bioRef} className={`text-2xl font-bold text-foreground mb-8 leading-relaxed transition-all duration-700 ${bioVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}>
            Kausigan Srinivasan is a passionate legal professional specializing in <span className="text-netflix-red">arbitration</span> and dispute resolution. With a strong background in both traditional legal practice and modern legal technology, he is dedicated to providing <span className="text-netflix-red">insightful analysis</span> and practical guidance for professionals and students alike.
          </p>
          <div className={`text-left text-lg text-card-foreground space-y-6 transition-all duration-700 ${visionVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`} ref={visionRef}>
            <h2 className="text-3xl font-bold mb-2 font-playfair text-netflix-red uppercase tracking-wide">Vision</h2>
            <p className="text-foreground/90">
              To bridge the gap between legal theory and practice, and to empower the next generation of legal professionals with knowledge, ethics, and a spirit of innovation. This blog is a reflection of that mission, focusing on arbitration, legal trends, and professional growth.
            </p>
            <h2 className="text-3xl font-bold mb-2 font-playfair text-netflix-red uppercase tracking-wide">Expertise</h2>
            <ul className={`list-disc pl-8 space-y-2 transition-all duration-700 ${expertiseVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`} ref={expertiseRef}>
              <li className="hover:text-netflix-red transition-colors">Arbitration & Dispute Resolution</li>
              <li className="hover:text-netflix-red transition-colors">Legal Research & Writing</li>
              <li className="hover:text-netflix-red transition-colors">Contract Drafting & Negotiation</li>
              <li className="hover:text-netflix-red transition-colors">Legal Technology & Innovation</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Custom CSS for stars, grid, floating, glowing, and fade-in */}
      <style>{`
        .animate-stars {
          background: transparent url('data:image/svg+xml;utf8,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="1.2" fill="white" opacity="0.7"/><circle cx="80" cy="30" r="0.8" fill="white" opacity="0.5"/><circle cx="60" cy="80" r="1.1" fill="white" opacity="0.6"/><circle cx="30" cy="60" r="0.7" fill="white" opacity="0.4"/><circle cx="50" cy="50" r="1.5" fill="white" opacity="0.8"/></svg>') repeat;
          animation: stars-move 60s linear infinite;
          z-index: 0;
        }
        @keyframes stars-move {
          0% { background-position: 0 0; }
          100% { background-position: 100px 100px; }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite alternate;
        }
        @keyframes float {
          0% { transform: translateY(0); }
          100% { transform: translateY(-12px); }
        }
        .animate-float-up {
          animation: floatUp 1.2s cubic-bezier(0.4,0,0.2,1) both;
        }
        @keyframes floatUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 1.2s cubic-bezier(0.4,0,0.2,1) both;
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .glowing-outline {
          box-shadow: 0 0 24px 2px #ff3b3b44, 0 0 0 2px #ff3b3b66;
          border-radius: 1.5rem;
        }
        .text-shadow-red {
          text-shadow: 0 2px 16px #ff3b3b88, 0 1px 2px #000;
        }
        .animate-pulse-glow {
          animation: pulseGlow 1.2s infinite alternate;
        }
        @keyframes pulseGlow {
          0% { box-shadow: 0 0 24px 2px #ff3b3b44, 0 0 0 2px #ff3b3b66; }
          100% { box-shadow: 0 0 36px 8px #ff3b3b99, 0 0 0 4px #ff3b3b88; }
        }
      `}</style>
    </div>
  );
}

export default AboutMe; 