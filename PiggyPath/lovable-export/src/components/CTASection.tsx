import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground text-center md:text-left">
            Wanna Join with Us
          </h2>
          <Button 
            variant="secondary" 
            className="bg-background hover:bg-background/90 text-foreground rounded-full px-8 py-6 text-lg"
          >
            piggypath.org.in
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
