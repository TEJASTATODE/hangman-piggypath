import questionMark from "@/assets/question_mark.png";
import fixyMascot from "@/assets/fixy-mascot.jpg";
const MeetFixy = () => {
  return <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative flex justify-center">
            {/* 3D shadow layers */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 md:w-80 md:h-80 bg-secondary/30 rounded-full blur-3xl animate-pulse" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-56 h-56 md:w-72 md:h-72 bg-primary/20 rounded-full blur-2xl animate-pulse" style={{
              animationDelay: "0.5s"
            }} />
            </div>
            
            {/* Mascot container with 3D effects */}
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/40 via-secondary/40 to-primq
              ary/40 rounded-full blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              
              {/* Main mascot image with 3D transform */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden bg-gradient-to-br from-mint-light to-lavender-light p-1 shadow-2xl transform-gpu transition-all duration-500 hover:scale-105" style={{
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 60px -15px hsl(142 72% 55% / 0.3)'
            }}>
                <div className="w-full h-full rounded-full overflow-hidden bg-background flex items-center justify-center">
                  {/* <img src={fixyMascot} alt="Fixy - Your Financial Guide" className="w-full h-full object-cover animate-float drop-shadow-2xl" style={{
                  filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.15))'
                }} /> */}
                <img
                  src={questionMark}
                  alt="Question Mark"
                  className="
                    w-8/9 h-8/9
                    object-contain
                    mx-auto my-auto
                    
                  "
                />

                </div>
              </div>

              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full" style={{
              
            }} />
              <div className="absolute -bottom-2 -left-6 w-6 h-6 bg-secondary rounded-full " style={{
              
            }} />
              <div className="absolute top-1/2 -right-8 w-4 h-4 bg-mint rounded-full " style={{
              
            }} />
            </div>

            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-card rounded-2xl shadow-card px-6 py-3 border border-border animate-fade-in-up z-10">
              <span className="text-sm font-medium text-foreground">Can you guess?</span>
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-card border-l border-t border-border rotate-45" />
            </div>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Meet Your Financial Guide
            </h2>
            <div className="space-y-4 text-muted-foreground">
<<<<<<< HEAD
              <p>You’re Not Doing This Alone. <br />
              Something’s watching your progress. <br />
              Not in a creepy way. In a got-your-back way.</p>
              <p>
                As you explore Piggypath, there’s a quiet presence helping you make sense of money nudging you, challenging you and keeping things real when finance gets overwhelming.
              </p>
              <p>No face reveal. <br /> No name drop. <br /> Not yet.</p>
              <p>Just know this:
                it’s built to learn how you think, move at your pace and keep you on the right financial path.</p>
=======
              <p>Even the best players need a sidekick. As you explore PiggyPath, you might sense you aren't playing alone. That’s because we’re building the ultimate guide to watch your back.<br />
             Think of it as a financial guru with zero judgment and infinite patience. It’s here to nudge you toward the wins and keep it real when the spending gets wild. <br />
             </p>
              <p>
                Who is it? We’re keeping the identity under wraps for now. But get ready—your adventure is about to get a lot more personal.
              </p>
              <p>Just know this
                it’s built to learn how you think, move at your pace, and keep you on the right financial path.</p>
>>>>>>> 01df8e02cb88685f37b5934a2a88874c4e0e7cbc
              <p>Coming soon.</p>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default MeetFixy;