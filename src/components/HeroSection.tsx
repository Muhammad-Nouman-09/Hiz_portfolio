import { Button } from "@/components/ui/button";
import { ArrowRight, Download } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const handleContactClick = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center text-white overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(14, 165, 233, 0.8)), url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-float" />
        <div className="absolute top-40 right-20 w-16 h-16 bg-accent/20 rounded-lg rotate-45 animate-float" style={{ animationDelay: "-2s" }} />
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-white/15 rounded-full animate-float" style={{ animationDelay: "-4s" }} />
        <div className="absolute bottom-20 right-40 w-24 h-24 bg-accent/10 rounded-lg animate-float" style={{ animationDelay: "-1s" }} />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Hi, I'm <span className="text-gradient bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">Hiz</span>
          </h1>
          
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-white/90">
            Social Media Manager | Web Developer (React.js) | Graphic Designer | MS Office Expert
          </h2>
          
          <p className="text-lg md:text-xl mb-8 text-white/80 max-w-2xl mx-auto leading-relaxed">
            Helping businesses grow online with creative design, smart management, and powerful web solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="hero" 
              size="lg"
              onClick={handleContactClick}
              className="text-lg px-8 py-4 bg-white text-primary hover:bg-white/90 hover:scale-105"
            >
              Hire Me <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-4 border-white/30 text-white hover:bg-white/10 hover:border-white/50"
              asChild
            >
              <a
                href="https://vqynykgagjatimhxixod.supabase.co/storage/v1/object/sign/resumes/resumes.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83OTc1MDE5Yy1hNmU3LTRmMzEtYWQ1MS01N2ExYmUwZGM3MTAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyZXN1bWVzL3Jlc3VtZXMucGRmIiwiaWF0IjoxNzU4NjUzODc1LCJleHAiOjE3OTAxODk4NzV9.-MEorIfzRJp197F-LMY2LoA9r-CPnkjaJQV2yxzCa54"
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                Download CV <Download className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;