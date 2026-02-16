import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import piggyPathLogo from "@/assets/Logo.jpeg";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 Smart section navigation
  const goToSection = (id: string) => {
    setMobileMenuOpen(false);

    // If already on homepage → scroll directly
    if (location.pathname === "/") {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      return;
    }

    // Otherwise go to homepage first
    navigate("/");

    // wait for DOM to render
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  const navLinkClass =
    "text-muted-foreground hover:text-foreground transition-colors text-left";

  const handleNavClick = (sectionId: string) => {
    // If we're not on index page, navigate there first
    if (location.pathname !== "/index") {
      navigate("/index");
      // Wait for navigation, then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      // Already on index page, just scroll
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };


  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-4 px-4 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <img
          src={piggyPathLogo}
          alt="PiggyPath"
          className="h-20 w-auto object-contain cursor-pointer scale-125 hover:scale-105 transition-transform"
          onClick={() => navigate("/index")}
        />

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">

          <button onClick={() => goToSection("why")} className={navLinkClass}>
            Why PiggyPath
          </button>

          <button onClick={() => goToSection("team")} className={navLinkClass}>
            Team
          </button>

          <button onClick={() => goToSection("about")} className={navLinkClass}>
            About Us
          </button>

          <button
            type="button"
            onClick={() => handleNavClick("why")}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Why PiggyPath
          </button>
          <button
            type="button"
            onClick={() => handleNavClick("team")}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Team
          </button>
          <button
            type="button"
            onClick={() => handleNavClick("about")}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            About Us
          </button>
          
          <button
            onClick={() => navigate("/feedback")}
            className={navLinkClass}
          >
            Feedback
          </button>
        </nav>

        {/* Desktop Login */}
        <div className="hidden md:flex items-center gap-4">
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-foreground"
            onClick={() => navigate("/")}
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


            <button onClick={() => goToSection("why")} className={navLinkClass}>
              Why PiggyPath
            </button>

            <button onClick={() => goToSection("team")} className={navLinkClass}>
              Team
            </button>

            <button onClick={() => goToSection("about")} className={navLinkClass}>
              About Us
            </button>


            <button
              type="button"
              onClick={() => handleNavClick("why")}
              className="text-left text-muted-foreground hover:text-foreground transition-colors"
            >
              Why PiggyPath
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("team")}
              className="text-left text-muted-foreground hover:text-foreground transition-colors"
            >
              Team
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("about")}
              className="text-left text-muted-foreground hover:text-foreground transition-colors"
            >
              About Us
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate("/feedback");
              }}
              className={navLinkClass}
            >
              Feedback
            </button>

            <div className="flex flex-col gap-2 pt-4 border-t border-border">
              <Button
                variant="ghost"
                className="justify-start text-muted-foreground"
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/");
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
