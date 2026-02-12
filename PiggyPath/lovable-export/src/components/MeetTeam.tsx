const teamMembers = [
  { name: "Devanand Siddhardha", role: "Founder", image: "/team/Siddhardha 2.png" },
  { name: "Sarahana Pande", role: "Co Founder", image: "/team/Sarahana.png" },
  { name: "Aditya Aggarwal", role: "Course & Content Head", image: "/team/Aditya.png" },
  { name: "Aramaan Dhaka", role: "Creative Associate", image: "/placeholder.svg" },
  { name: "Parth Shringi", role: "Creative Associate", image: "/placeholder.svg" },
  { name: "Vansh Wadha", role: "Content Creation Associate", image: "/team/vansh.jpg" },
  { name: "Vanshika Ahlawat", role: "Content Creation Associate", image: "/team/Vanshika.jpeg" },
  { name: "Tanishkka", role: "Tech Associate", image: "/team/Tanishkka.jpeg" },
  { name: "Tejas Tatode", role: "Tech Associate", image: "/team/tejas.jpeg" },
];


const MeetTeam = () => {
  const loopMembers = [...teamMembers, ...teamMembers];

  return (
    <section id="team" className="bg-background overflow-hidden py-12">

      <style>{`
        @keyframes waveScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .wave-track {
          display: flex;
          gap: 24px;
          width: max-content;
          animation: waveScroll 70s linear infinite;
          will-change: transform;
        }
      `}</style>

      {/* SVG clip paths */}
      <svg width="0" height="0">
        <defs>
          <clipPath id="waveInOut" clipPathUnits="objectBoundingBox">
            <path d="
              M0,0.08
              C0.25,0 0.75,0 1,0.08
              L1,1
              C0.75,0.82 0.25,0.82 0,1
              Z
            " />
          </clipPath>

          <clipPath id="waveOutIn" clipPathUnits="objectBoundingBox">
            <path d="
              M0,0.08
              C0.25,0 0.75,0 1,0.08
              L1,1
              C0.75,0.82 0.25,0.82 0,1
              Z
            " />
          </clipPath>
        </defs>
      </svg>

      <div className="container mx-auto px-4">

        <h2 className="text-4xl md:text-5xl font-bold text-center mb-3">
          Meet Our Team
        </h2>

        <p className="text-center text-muted-foreground max-w-xl mx-auto mb-8">
          A team that works hard behind the scenes to bring you a fun finance
          experience, building tools that make money management feel effortless.
        </p>

        <div className="overflow-hidden">
          <div className="wave-track">

            {loopMembers.map((member, index) => {
              const isOdd = index % 2 === 0;

              return (
                <div key={index} className="text-center flex-shrink-0">

                  <div
                    className="
                      bg-mint-light shadow-soft overflow-hidden
                      w-52 h-72
                      sm:w-56 sm:h-80
                      md:w-64 md:h-88
                      lg:w-72 lg:h-96
                    "
                    style={{
                      clipPath: isOdd
                        ? "url(#waveInOut)"
                        : "url(#waveOutIn)",
                    }}
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg";
                      }}
                    />

                  </div>

                  <h3 className="mt-3 font-semibold text-foreground">
                    {member.name}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    {member.role}
                  </p>

                </div>
              );
            })}

          </div>
        </div>

      </div>
    </section>
  );
};

export default MeetTeam;
