import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MeetFixy from "@/components/MeetFixy";
import WhyPiggyPath from "@/components/WhyPiggyPath";
import MeetTeam from "@/components/MeetTeam";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const FEEDBACK_STORAGE_KEY = "piggypath_feedback_submitted";

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const showFeedback = searchParams.get("showFeedback");
    // Only redirect if explicitly asked AND user hasn't submitted feedback
    if (showFeedback === "1") {
      // Clear the parameter first
      setSearchParams({}, { replace: true });
      
      // Then check and redirect if needed
      try {
        if (localStorage.getItem(FEEDBACK_STORAGE_KEY) !== "true") {
          navigate("/feedback", { replace: true });
        }
      } catch (_) {
        // If localStorage fails, still redirect
        navigate("/feedback", { replace: true });
      }
    }
  }, [searchParams, setSearchParams, navigate]);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <MeetFixy />
        <section id="why">
          <WhyPiggyPath />
        </section>
        <section id="team">
          <MeetTeam />
        </section>
        <section id="about">
          <ProblemSection />
          <SolutionSection />
        </section>
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;