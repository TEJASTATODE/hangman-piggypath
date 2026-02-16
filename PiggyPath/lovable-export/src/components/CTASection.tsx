import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground text-center md:text-left">
            Join With Us
          </h2>

          {/* White email box */}
          <div className="bg-white rounded-lg shadow-md px-4 py-2 flex items-center gap-3">
            <span className="text-gray-700 font-medium">
              piggypath.org@gmail.com
            </span>

            <Button
              onClick={() =>
                window.open("mailto:piggypath.org@gmail.com", "_blank")
              }
              className="ml-2"
            >
              Email Us
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CTASection;
