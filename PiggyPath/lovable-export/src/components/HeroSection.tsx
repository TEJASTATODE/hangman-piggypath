import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

const HeroSection = () => {
  // Game links
  const gameLinks = {
    hangman: "https://hangman-piggypath-roky.vercel.app", // Replace with your actual game route
    quiz: "https://hangman-piggypath-j1b2.vercel.app",       // Replace with your actual game route
    blocks: "https://hangman-piggypath-kr7q.vercel.app"    // Replace with your actual game route
  };

  const handleGameClick = (gameUrl) => {
    window.location.href = gameUrl;
  };

  return (
    <section className="relative min-h-screen bg-hero-gradient pt-24 overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-mint-light rounded-full blur-3xl opacity-60" />
      <div className="absolute top-40 right-20 w-48 h-48 bg-lavender-light rounded-full blur-3xl opacity-60" />
      <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-secondary/20 rounded-full blur-2xl" />

      <div className="container mx-auto px-4 pt-16 pb-24">
        {/* Text content */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 animate-fade-in-up">
            Stop Guessing.
          </h1>
          <h1
            className="text-4xl md:text-6xl font-bold text-gradient mb-6 animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            Start Playing
          </h1>
          <p
            className="text-lg text-muted-foreground max-w-xl mx-auto mb-8 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            PiggyPath turns budgeting, saving and investing into a fun game. Level
            up your financial life and build real wealth — Score a win and start
            your adventure!
          </p>
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            {/* <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-lg gap-2">
              Join Waitlist <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              className="rounded-full px-8 py-6 text-lg gap-2 border-border hover:bg-muted"
            >
              <Play className="w-5 h-5" /> Watch Demo
            </Button> */}
          </div>
        </div>

        {/* Phone mockups */}
        <div className="relative max-w-4xl mx-auto overflow-visible">
          <div className="flex justify-center items-end gap-16">

            {/* Left phone - Hangman Game */}
            <div className="relative z-25 animate-float" style={{ animationDelay: "0s" }}>
              <div className="absolute -inset-6 bg-mint/30 blur-3xl rounded-full -z-10" />
              <div className="isolate w-80 h-96 bg-white rounded-3xl border border-border shadow-xl overflow-hidden">
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-20"
                  style={{ backgroundImage: "url('/path-to-your-hangman-bg.jpg')" }}
                />
                
                {/* Content */}
                <div className="relative h-full flex flex-col items-center justify-between p-4">
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <div className="w-24 h-24 bg-mint/20 rounded-2xl flex items-center justify-center mb-3">
                      <span className="text-6xl">🎯</span>
                    </div>
                    <h3 className="font-bold text-2xl mb-1">BreakEven</h3>
                    <p className="text-md text-muted-foreground text-center">
                      Guess the word
                    </p>
                    {/* Simple Hangman Visual */}
                    <div className="mt-4 space-y-2">
                      <div className="flex gap-1">
                        <div className="w-8 h-8 border-2 border-mint rounded flex items-center justify-center text-xs">S</div>
                        <div className="w-8 h-8 border-2 border-mint rounded flex items-center justify-center text-xs">A</div>
                        <div className="w-8 h-8 border-2 border-muted rounded"></div>
                        <div className="w-8 h-8 border-2 border-muted rounded"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Play Button */}
                  <Button 
                    size="sm" 
                    className="bg-mint hover:bg-mint/90 text-white rounded-full w-full gap-2 text-xl"
                    onClick={() => handleGameClick(gameLinks.hangman)}
                  >
                    <Play className="w-4 h-4 " /> Play
                  </Button>
                </div>
              </div>
            </div>

            {/* Middle phone - Quiz Game */}
            <div className="relative animate-float" style={{ animationDelay: "0.2s" }}>
              <div className="absolute -inset-8 bg-lavender/50 blur-3xl rounded-full -z-10" />
              <div className="isolate w-96 h-[420px] bg-white rounded-3xl border border-border shadow-2xl overflow-hidden">
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-20"
                  style={{ backgroundImage: "url('/path-to-your-quiz-bg.jpg')" }}
                />
                
                {/* Content */}
                <div className="relative h-full flex flex-col items-center justify-between p-5">
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <div className="w-24 h-24 bg-secondary/20 rounded-2xl flex items-center justify-center mb-4">
                      <span className="text-6xl">❓</span>
                    </div>
                    <h3 className="font-bold text-base mb-2 text-xl">Quiz Challenge</h3>
                    <p className="text-md text-muted-foreground text-center mb-4">
                      Test your knowledge
                    </p>
                    {/* Quiz Options */}
                    <div className="w-full space-y-2">
                      <div className="bg-lavender/10 border border-lavender/30 rounded-lg p-2 text-md">
                        Option A
                      </div>
                      <div className="bg-lavender/10 border border-lavender/30 rounded-lg p-2 text-md">
                        Option B
                      </div>
                      <div className="bg-lavender/10 border border-lavender/30 rounded-lg p-2 text-md">
                        Option C
                      </div>
                    </div>
                  </div>
                  
                  {/* Play Button */}
                  <Button 
                    size="sm" 
                    className="bg-secondary hover:bg-secondary/90 text-white rounded-full w-full gap-2 text-xl"
                    onClick={() => handleGameClick(gameLinks.quiz)}
                  >
                    <Play className="w-4 h-4" /> Play
                  </Button>
                </div>
              </div>
            </div>

            {/* Right phone - Block Game */}
            <div className="relative z-25 animate-float" style={{ animationDelay: "0.4s" }}>
              <div className="absolute -inset-6 bg-mint/30 blur-3xl rounded-full -z-10" />
              <div className="isolate w-80 h-96 bg-white rounded-3xl border border-border shadow-xl overflow-hidden">
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-20"
                  style={{ backgroundImage: "url('/path-to-your-block-bg.jpg')" }}
                />
                
                {/* Content */}
                <div className="relative h-full flex flex-col items-center justify-between p-4">
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <div className="w-24 h-24 bg-mint/20 rounded-2xl flex items-center justify-center mb-3">
                      <span className="text-6xl">🧱</span>
                    </div>
                    <h3 className="font-bold text-2xl mb-1">Debt Defier</h3>
                    <p className="text-md text-muted-foreground text-center">
                      Match & clear
                    </p>
                    {/* Block Grid Visual */}
                    <div className="mt-4 grid grid-cols-4 gap-1">
                      <div className="w-6 h-6 bg-mint/40 rounded"></div>
                      <div className="w-6 h-6 bg-mint/40 rounded"></div>
                      <div className="w-6 h-6 bg-transparent rounded border border-muted"></div>
                      <div className="w-6 h-6 bg-transparent rounded border border-muted"></div>
                      <div className="w-6 h-6 bg-mint/60 rounded"></div>
                      <div className="w-6 h-6 bg-transparent rounded border border-muted"></div>
                      <div className="w-6 h-6 bg-mint/60 rounded"></div>
                      <div className="w-6 h-6 bg-transparent rounded border border-muted"></div>
                    </div>
                  </div>
                  
                  {/* Play Button */}
                  <Button 
                    size="sm" 
                    className="bg-mint hover:bg-mint/90 text-white rounded-full w-full gap-2 text-xl"
                    onClick={() => handleGameClick(gameLinks.blocks)}
                  >
                    <Play className="w-4 h-4" /> Play
                  </Button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;