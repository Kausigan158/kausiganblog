import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContentProtection } from './hooks/use-content-protection';
import Index from "./pages/Index";
import BlogDetail from "./pages/BlogDetail";
import CategoryPage from "./pages/CategoryPage";
import Experience from "./pages/Experience";
import NotFound from "./pages/NotFound";
import AboutMe from "./pages/AboutMe";
import SwissArbitrationBlog from "./pages/SwissArbitrationBlog";

const queryClient = new QueryClient();

const App = () => {
  // Apply content protection to the entire application
  // useContentProtection(); // Temporarily disabled for testing

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/about" element={<AboutMe />} />
            <Route path="/blog/swiss-arbitration" element={<SwissArbitrationBlog />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
