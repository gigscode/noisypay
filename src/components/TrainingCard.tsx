import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, Code2, ShieldCheck, Bug, GraduationCap, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import RegistrationForm, { Training } from "./RegistrationForm";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/currency";

interface TrainingCardProps {
  training: Training;
  trainingsCatalog: Training[];
}

const TrainingCard = ({ training, trainingsCatalog }: TrainingCardProps) => {
  const [coupon, setCoupon] = useState("");
  const [appliedCode, setAppliedCode] = useState<string | null>(null);

  const colorClasses = ["border-primary", "border-destructive", "border-accent", "border-success", "border-warning"];
  const iconColors = ["text-primary", "text-destructive", "text-accent", "text-success", "text-warning"];
  const icons: LucideIcon[] = [Code2, ShieldCheck, Bug, GraduationCap, Wallet];
  const idx = useMemo(() => {
    const sum = Array.from(training.id).reduce((a, c) => a + c.charCodeAt(0), 0);
    return sum % colorClasses.length;
  }, [training.id]);
  const AccentIcon = icons[idx] ?? Wallet;

  const getDiscount = (price: number, code?: string) => {
    if (!code) return { final: price, valid: false };
    const c = code.trim().toUpperCase();
    let final = price;
    let valid = true;
    if (c === "NOISY10") final = price * 0.9;
    else if (c === "NOISY20") final = price * 0.8;
    else if (c === "LAUNCH50") final = Math.max(1, price - 50);
    else if (c === "ZENITH") final = price * 0.85;
    else valid = false;
    return { final: Number(final.toFixed(2)), valid };
  };

  const discounted = useMemo(() => getDiscount(training.price, appliedCode ?? undefined), [training.price, appliedCode]);

  return (
    <Card className={`h-full shadow-card hover:shadow-card-hover transition-shadow hover-scale border-t-4 ${colorClasses[idx]}`}>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="text-xl">{training.title}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div className="mt-2 flex items-center gap-2">
          <Input placeholder="Coupon code" value={coupon} onChange={(e) => setCoupon(e.target.value)} aria-label="Coupon code" />
          <Button variant="secondary" onClick={() => setAppliedCode(coupon.trim() || null)}>Apply</Button>
        </div>
        {appliedCode && (
          <p className="text-xs text-muted-foreground mt-1">{discounted.valid ? "Coupon applied" : "Invalid coupon"}</p>
        )}
        <p className="text-xs text-muted-foreground flex items-center gap-1"><Lock className="h-3.5 w-3.5" /> Securely powered by Paystack</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="text-lg font-semibold">
          {discounted.valid ? (
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground line-through">${training.price.toFixed(2)}</span>
              <span className="text-success">${discounted.final.toFixed(2)}</span>
            </div>
          ) : (
            <span>${training.price.toFixed(2)}</span>
          )}
        </div>
        <RegistrationForm
          trainings={trainingsCatalog}
          defaultTrainingId={training.id}
          priceOverride={discounted.valid ? discounted.final : training.price}
          couponCode={appliedCode ?? undefined}
          trigger={<Button variant="cta" className="shadow-button hover-scale">Pay & Join</Button>}
        />
      </CardFooter>
    </Card>
  );
};

export default TrainingCard;
