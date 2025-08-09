import TrainingCard from "./TrainingCard";
import { Button } from "@/components/ui/button";
import { courses } from "@/config/courses";
import { CONTACT_SUPPORT_URL } from "@/config/links";

const trainings = courses as any;

const TrainingSection = () => {
  return (
    <section id="trainings" aria-labelledby="trainings-heading" className="container mx-auto py-16">
      <header className="mb-8">
        <h2 id="trainings-heading" className="text-3xl font-bold tracking-tight md:text-4xl">Pay & Join a Course</h2>
        <p className="mt-2 text-muted-foreground">Select a course and checkout securely.</p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {trainings.map((t) => (
          <TrainingCard key={t.id} training={t} trainingsCatalog={trainings} />
        ))}
      </div>

      <div className="mt-10 flex items-center justify-center gap-3">
        <span className="text-muted-foreground">Need guidance?</span>
        <RegistrationForm trainings={trainings} trigger={<Button variant="outline">Talk to an advisor</Button>} />
      </div>
    </section>
  );
};

export default TrainingSection;
