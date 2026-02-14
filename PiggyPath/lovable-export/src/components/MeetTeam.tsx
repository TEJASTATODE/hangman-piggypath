const teamMembers = [
  { name: "Devanand Siddhardha", role: "Founder", image: "/team/Siddhardha 2.png" },
  { name: "Sarahana Pande", role: "Co Founder", image: "/team/Sarahana.png" },
  { name: "Aditya Aggarwal", role: "Course & Content Head", image: "/team/Aditya.png" },
  { name: "Aramaan Dhaka", role: "Creative Associate", image: "/team/armaan.jpeg" },
  { name: "Parth Shringi", role: "Creative Associate", image: "/team/Parth.jpeg" },
  { name: "Vansh Wadha", role: "Content Creation Associate", image: "/team/vansh.jpeg" },
  { name: "Vanshika Ahlawat", role: "Content Creation Associate", image: "/team/Vanshika.jpeg" },
  { name: "Tanishkka", role: "Tech Associate", image: "/team/Tanishkka.jpeg" },
  { name: "Tejas Tatode", role: "Tech Associate", image: "/team/tejas.jpeg" },
];

const MeetTeam = () => {
  const loopMembers = [...teamMembers, ...teamMembers];

  return (
    <section id="team" className="bg-background overflow-hidden py-16">

      <style>{`
        @keyframes waveScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .wave-track {
          display: flex;
          gap: 40px;
          width: max-content;
          animation: waveScroll 60s linear infinite;
          will-change: transform;
        }

        .team-card-image {
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }

        .team-card:hover .team-card-image {
          transform: translateY(-10px) scale(1.03);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.18);
        }
      `}</style>

      <div className="container mx-auto px-4">

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Meet Our Team
        </h2>

        <p className="text-center text-muted-foreground max-w-xl mx-auto mb-12">
          A passionate team working behind the scenes to create powerful,
          intuitive, and engaging financial experiences.
        </p>

        {/* Scrolling Section */}
        <div className="overflow-hidden relative">
          <div className="wave-track">

            {loopMembers.map((member, index) => (
              <div
                key={index}
                className="text-center flex-shrink-0 team-card"
              >
                {/* Image Card */}
                <div
                  className="
                    team-card-image
                    relative
                    bg-gradient-to-br from-green-100 via-white to-purple-100
                    rounded-3xl
                    overflow-hidden
                    border-4 border-white
                    shadow-xl
                    w-56 h-72
                    sm:w-56 sm:h-80
                    md:w-64 md:h-88
                    lg:w-72 lg:h-96
                  "
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="
                      w-full
                      h-full
                      object-cover
                      object-top
                      scale-110
                      transition-transform duration-500
                    "
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg";
                    }}
                  />

                  {/* Professional Bottom Fade */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Name */}
                <h3 className="mt-5 font-semibold text-foreground text-lg">
                  {member.name}
                </h3>

                {/* Role */}
                <p className="text-sm text-muted-foreground mt-1 tracking-wide">
                  {member.role}
                </p>
              </div>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
};

export default MeetTeam;
