import {Twitter, Instagram, Linkedin,Mail } from "lucide-react";
import piggyPathLogo from "@/assets/piggypath-logo.png";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <img src={piggyPathLogo} alt="PiggyPath" className="h-8 mb-4 brightness-0 invert" />
            <p className="text-background/70 text-sm leading-relaxed">
              PiggyPath is a gamified financial literacy
              app for Gen Z, designed to help young
              adults learn budgeting, saving, and
              investing through fun and interactive
              games.
            </p>
            <p className="text-background/50 text-xs mt-4">
              2025 © PiggyPath™ - v1.1
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-lg">LATEST POSTS :</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-background/70 hover:text-background text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Insights Over Instincts
                </a>
              </li>
              <li>
                <a href="#" className="text-background/70 hover:text-background text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  5 tips from PiggyPath
                </a>
              </li>
              <li>
                <a href="#" className="text-background/70 hover:text-background text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  How to Get Trending
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-">GET SOCIAL :</h4>
            <div className="grid grid-cols-2 gap-2 max-w-[110px]">
              {[Twitter, Mail, Linkedin, Instagram].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-9 h-9 bg-background/10 hover:bg-primary hover:text-primary-foreground rounded-lg flex items-center justify-center transition-colors"
                >
                  <Icon className="w-5 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
