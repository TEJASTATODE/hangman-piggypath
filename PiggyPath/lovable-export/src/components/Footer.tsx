import { useState } from "react";
import { Twitter, Instagram, Linkedin, Mail } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import piggyPathLogo from "@/assets/Frame8.png";

const COMMENT_ENDPOINT = "https://example.com/api/comments"; // 🔁 replace with your backend / Apps Script URL

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !comment.trim()) {
      setStatus("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);
      setStatus("");

      const res = await fetch(COMMENT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, comment, date: new Date() }),
      });

      if (!res.ok) throw new Error("Failed to send comment");

      setName("");
      setComment("");
      setStatus("Comment sent successfully ✅");
    } catch (err) {
      setStatus("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-black text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12">

          {/* Brand */}
          <div>
            <img src={piggyPathLogo} alt="PiggyPath" className="h-16 mb-4 scale-150" />

            <div className="flex flex-col gap-2 text-sm mb-4">
              <button
                onClick={() => handleSectionClick("why")}
                className="text-background/70 hover:text-background text-left"
              >
                Why PiggyPath
              </button>

              <button
                onClick={() => handleSectionClick("about")}
                className="text-background/70 hover:text-background text-left"
              >
                About
              </button>

              <button
                onClick={() => handleSectionClick("team")}
                className="text-background/70 hover:text-background text-left"
              >
                Team
              </button>
            </div>

            <p className="text-background/50 text-xs mt-4">
              2025 © PiggyPath™ - v1.1
            </p>
          </div>

          {/* Latest Posts */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">LATEST POSTS :</h4>
            <ul className="space-y-3 text-sm">
              <li className="text-background/70">
                • PiggyPath is where finance meets gaming.
              </li>
              <li className="text-background/70">
                • Happy Republic Day
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">GET SOCIAL :</h4>
            <div className="grid grid-cols-2 gap-2 max-w-[110px]">
              {[ 
                { icon: Twitter, link: "https://x.com/Piggypath_Edu" },
                { icon: Mail, link: "mailto:piggypath.org@gmail.com" },
                { icon: Linkedin, link: "https://www.linkedin.com/company/piggypath" },
                { icon: Instagram, link: "https://www.instagram.com/piggy_path" },
              ].map(({ icon: Icon, link }, i) => (
                <a
                  key={i}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-background/10 hover:bg-primary rounded-lg flex items-center justify-center"
                >
                  <Icon className="w-5 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Comment Section */}
          <div>
            <h4 className="font-semibold mb-4">Leave a Comment</h4>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 rounded bg-background/10 text-sm"
              />

              <textarea
                placeholder="Your comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                className="w-full p-2 rounded bg-background/10 text-sm"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:opacity-90 py-2 rounded text-sm"
              >
                {loading ? "Sending…" : "Send Comment"}
              </button>

              {status && (
                <p className="text-xs text-background/70">{status}</p>
              )}
            </form>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;