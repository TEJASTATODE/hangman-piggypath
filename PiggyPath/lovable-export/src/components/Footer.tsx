import { Twitter, Instagram, Linkedin, Mail } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import piggyPathLogo from "@/assets/Frame8.png";
import { Button } from "@/components/ui/button";

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

          {/* LEFT SECTION */}
          <div>
            <img
              src={piggyPathLogo}
              alt="PiggyPath"
              className="h-16 mb-4 scale-150"
            />

            <div className="flex flex-col gap-2 text-sm mb-4">
              <button
                onClick={() => handleSectionClick("why")}
                className="text-background/70 hover:text-background transition-colors text-left"
              >
                Why PiggyPath
              </button>

              <button
                onClick={() => handleSectionClick("about")}
                className="text-background/70 hover:text-background transition-colors text-left"
              >
                About
              </button>

              <button
                onClick={() => handleSectionClick("team")}
                className="text-background/70 hover:text-background transition-colors text-left"
              >
                Team
              </button>
            </div>

            <p className="text-background/50 text-xs mt-4">
              2025 © PiggyPath™ - v1.1
            </p>
          </div>

          {/* MIDDLE SECTION */}
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

          {/* RIGHT SECTION — BUTTON SOCIALS */}
          <div>
            <h4 className="font-semibold mb-4">GET SOCIAL :</h4>

            <div className="flex flex-col gap-3">

              <Button
                onClick={() =>
                  window.open("mailto:piggypath.org@gmail.com", "_blank")
                }
                className="justify-start gap-2"
              >
                <Mail size={18} />
                Email Us
              </Button>

              <Button
                onClick={() =>
                  window.open("https://x.com/Piggypath_Edu", "_blank")
                }
                className="justify-start gap-2"
              >
                <Twitter size={18} />
                Twitter / X
              </Button>

              <Button
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/company/piggypath",
                    "_blank"
                  )
                }
                className="justify-start gap-2"
              >
                <Linkedin size={18} />
                LinkedIn
              </Button>

              <Button
                onClick={() =>
                  window.open(
                    "https://www.instagram.com/piggy_path",
                    "_blank"
                  )
                }
                className="justify-start gap-2"
              >
                <Instagram size={18} />
                Instagram
              </Button>

            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
