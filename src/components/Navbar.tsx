import { Button } from "@/components/ui/button";
import { Dumbbell, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Dumbbell className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            FitClassify
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#home" className="text-foreground hover:text-primary transition-colors">
            Home
          </a>
          <a href="#assessment" className="text-foreground hover:text-primary transition-colors">
            Body Type Test
          </a>
          <a href="#results" className="text-foreground hover:text-primary transition-colors">
            Results
          </a>
          <Button variant="hero" className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t p-4 space-y-4">
          <a href="#home" className="block text-foreground hover:text-primary">
            Home
          </a>
          <a href="#assessment" className="block text-foreground hover:text-primary">
            Body Type Test
          </a>
          <a href="#results" className="block text-foreground hover:text-primary">
            Results
          </a>
          <Button variant="hero" className="w-full bg-gradient-primary">
            Get Started
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;