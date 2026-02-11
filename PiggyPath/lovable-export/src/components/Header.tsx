import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import piggyPathLogo from "@/assets/Logo.jpeg";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-4 px-4 py-4 flex items-center justify-between">
        
        <img
          src={piggyPathLogo}
          alt="PiggyPath"
          className="h-20 w-auto object-contain cursor-pointer scale-125 hover:scale-105 transition-transform"
          onClick={() => navigate("/")}
        />

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#why" className="text-muted-foreground hover:text-foreground transition-colors">
            Why PiggyPath
          </a>
          <a href="#team" className="text-muted-foreground hover:text-foreground transition-colors">
            Team
          </a>
          <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
            About Us
          </a>
        </nav>

        {/* Desktop Login */}
        <div className="hidden md:flex items-center gap-4">
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-foreground"
            onClick={() => navigate("/login")}
          >
            Log In
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="w-6 h-6 text-foreground" />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border py-4">
          <nav className="container mx-auto px-4 flex flex-col gap-4">
            <a href="#why" className="text-muted-foreground hover:text-foreground transition-colors">
              Why PiggyPath
            </a>
            <a href="#team" className="text-muted-foreground hover:text-foreground transition-colors">
              Team
            </a>
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
              About Us
            </a>

            <div className="flex flex-col gap-2 pt-4 border-t border-border">
              <Button
                variant="ghost"
                className="justify-start text-muted-foreground"
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/login");
                }}
              >
                Log In
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;