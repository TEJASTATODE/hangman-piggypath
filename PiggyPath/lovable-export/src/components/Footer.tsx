import { Twitter, Instagram, Linkedin, Mail } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import piggyPathLogo from "@/assets/Frame8.png";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSectionClick = (sectionId: string) => {
    if (location.pathname !== "/index") {
      navigate("/index");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-black text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <img src={piggyPathLogo} alt="PiggyPath" className="h-16 mb-4 scale-150" />
            {/* <p className="text-background/70 text-sm leading-relaxed">
              PiggyPath is a gamified financial literacy
              app for Gen Z, designed to help young
              adults learn budgeting, saving and
              investing through fun and interactive
              games.
            </p> */}
            <div className="flex flex-col gap-2 text-sm mb-4">
              <button
                onClick={() => handleSectionClick('why')}
                className="text-background/70 hover:text-background transition-colors text-left"
              >
                Why PiggyPath
              </button>
              
              <button
                onClick={() => handleSectionClick('about')}
                className="text-background/70 hover:text-background transition-colors text-left"
              >
                About
              </button>
              
              <button
                onClick={() => handleSectionClick('team')}
                className="text-background/70 hover:text-background transition-colors text-left"
              >
                Team
              </button>
            </div>
            <p className="text-background/50 text-xs mt-4">
              2025 © PiggyPath™ - v1.1
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-lg">LATEST POSTS :</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://www.instagram.com/p/DTktwaNEqJD/?igsh=bHl1NjltZzlpaGZt" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-background/70 hover:text-background text-sm flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  PiggyPath is where finance meets gaming and learning finally clicks.
                </a>
              </li>
              <li>
                <a 
                  href="https://www.instagram.com/p/DT9vwV4ESQk/?igsh=Ym9kZXFsNWQ4emxm" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-background/70 hover:text-background text-sm flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Happy Republic Day
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">GET SOCIAL :</h4>
            <div className="grid grid-cols-2 gap-2 max-w-[110px]">
              <a
                href="https://x.com/Piggypath_Edu"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-background/10 hover:bg-primary hover:text-primary-foreground rounded-lg flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-4" />
              </a>
              <a
                href="mailto:piggypath.org@gmail.com"
                className="w-9 h-9 bg-background/10 hover:bg-primary hover:text-primary-foreground rounded-lg flex items-center justify-center transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/piggypath"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-background/10 hover:bg-primary hover:text-primary-foreground rounded-lg flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-4" />
              </a>
              <a
                href="https://www.instagram.com/piggy_path?igsh=MXJremw2a3BsYW41bA%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-background/10 hover:bg-primary hover:text-primary-foreground rounded-lg flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;