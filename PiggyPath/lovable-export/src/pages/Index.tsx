import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MeetFixy from "@/components/MeetFixy";
import WhyPiggyPath from "@/components/WhyPiggyPath";
import MeetTeam from "@/components/MeetTeam";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <MeetFixy />
        <WhyPiggyPath />
        <MeetTeam />
        <ProblemSection />
        <SolutionSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
