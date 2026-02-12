import { useState } from "react";
import { Gamepad2, Award, Users, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Gamepad2,
    title: "Play",
    description:
      "PiggyPath gamifies your learning and saving with levels and challenges. Build healthy money habits while having fun and unlock achievements along the way.",
    variant: "mint",
  },
  {
    icon: Award,
    title: "Learn",
    description:
      "Master key financial concepts through interactive lessons. From budgeting to investing, learn at your own pace while building real-world skills.",
    variant: "lavender",
  },
  {
    icon: Users,
    title: "Apply",
    description:
      "PiggyPath works well with your existing financial accounts, cards, and banks. Track spending with ease, set goals, and watch your progress grow.",
    variant: "mint",
  },
  {
    icon: TrendingUp,
    title: "Build",
    description:
      "Build lasting financial confidence. Start with the basics, level up to advanced strategies, and create a solid foundation for your future.",
    variant: "lavender",
  },
];

const WhyPiggyPath = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="why" className="py-24 bg-muted overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Why PiggyPath?
        </h2>

        <div className="flex gap-6 transition-all duration-500">
          {features.map((feature, index) => {
            const isHovered = hoveredIndex === index;
            const isLeft = hoveredIndex !== null && index < hoveredIndex;
            const isRight = hoveredIndex !== null && index > hoveredIndex;

            return (
              <div
                key={feature.title}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`
                  relative flex-1 cursor-pointer p-6 rounded-2xl
                  transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                  ${
                    isHovered
                      ? "scale-110 z-20"
                      : hoveredIndex !== null
                      ? "scale-90 opacity-80"
                      : ""
                  }
                  ${isLeft ? "-translate-x-6" : ""}
                  ${isRight ? "translate-x-6" : ""}
                `}
                style={{
                  backgroundColor: feature.variant === "mint"
                    ? "rgba(1, 239, 142, 0.25)"
                    : "rgba(128, 107, 255, 0.25)"
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: feature.variant === "mint" 
                      ? "rgba(1, 239, 142, 0.3)" 
                      : "rgba(128, 107, 255, 0.3)"
                  }}
                >
                  <feature.icon
                    className="w-6 h-6"
                    style={{
                      color: feature.variant === "mint" 
                        ? "#01EF8E" 
                        : "#806BFF"
                    }}
                  />
                </div>

                <h3 className="text-xl font-semibold mb-3">
                  {feature.title}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyPiggyPath;