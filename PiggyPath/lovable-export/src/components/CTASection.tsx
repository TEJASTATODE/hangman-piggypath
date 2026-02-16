import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground text-center md:text-left">
            Join Us
          </h2>
          <Button
            onClick={() =>
              window.open("https://piggypath.org.in", "_blank")
            }
          >
            piggypath.org.in
          </Button>

        </div>
      </div>
    </section>
  );
};

export default CTASection;
