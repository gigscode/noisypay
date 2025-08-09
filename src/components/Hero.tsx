import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

const Hero = () => {
  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-decoration-pink via-decoration-blue to-decoration-orange" />
      {/* Floating decorations */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-10 top-20 h-40 w-40 rounded-full bg-decoration-yellow opacity-30 blur-3xl animate-float" />
        <div className="absolute right-16 top-28 h-56 w-56 rounded-full bg-decoration-pink opacity-30 blur-3xl animate-float-slow" />
        <div className="absolute bottom-10 left-1/3 h-48 w-48 rounded-full bg-decoration-blue opacity-25 blur-3xl animate-float" />
      </div>

      <div className="container mx-auto flex min-h-[80vh] flex-col items-center justify-center text-center py-20">
        <p className="mb-3 text-sm tracking-wider text-primary-foreground/90">TRAINING PAYMENTS MADE SIMPLE</p>
        <h1 className="mb-4 max-w-3xl text-4xl font-extrabold leading-tight text-primary-foreground md:text-6xl">
          Noisy Pay — Pay & Join Your Next Training
        </h1>
        <p className="mb-8 max-w-2xl text-lg text-primary-foreground/90 md:text-xl">
          Fast, secure course payments. Join instantly via WhatsApp.
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <a
            href="#trainings"
            aria-label="Scroll to trainings section"
            className="inline-flex"
          >
            <Button
              variant="cta"
              className="shadow-button hover:shadow-card-hover transition-shadow"
            >
              Pay & Join
            </Button>
          </a>
          <a href="#trainings" className="text-primary-foreground/90 underline-offset-4 hover:underline">
            Explore trainings
          </a>
          <p className="mt-3 text-xs text-primary-foreground/80 flex items-center gap-1"><Lock className="h-3.5 w-3.5" /> Securely powered by Paystack</p>
        </div>
      </div>
    </header>
  );
};

export default Hero;
