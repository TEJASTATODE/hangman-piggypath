import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground text-center md:text-left">
            Join With Us
          </h2>
          <Button
            onClick={() =>
              window.open("mailto:piggypath.org@gmail.com", "_blank")
            }
          >
            piggypath.org@gmail.com
          </Button>

        </div>
      </div>
    </section>
  );
};

export default CTASection;
