import * as React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";
import { PAYSTACK_PUBLIC_KEY, CURRENCY } from "@/config/payments";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import { formatCurrency } from "@/lib/currency";
 export type Training = {
  id: string;
  title: string;
  description: string;
  date: string;
  duration: string;
  price: number; // 0 for free
  features: string[];
};

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name is required" }),
  email: z.string().email({ message: "Enter a valid email" }),
  phone: z.string().min(7, { message: "Phone is required" }),
  trainingId: z.string().min(1, { message: "Select a training" }),
  payment: z.enum(["card", "invoice"]).default("card"),
});

interface RegistrationFormProps {
  trainings: Training[];
  defaultTrainingId?: string;
  trigger?: React.ReactNode;
  priceOverride?: number;
  couponCode?: string;
}

const RegistrationForm = ({ trainings, defaultTrainingId, trigger, priceOverride, couponCode }: RegistrationFormProps) => {
  const [open, setOpen] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      trainingId: defaultTrainingId ?? "",
      payment: "card",
    },
  });

  const loadPaystack = () => new Promise<void>((resolve, reject) => {
    if ((window as any).PaystackPop) return resolve();
    const s = document.createElement('script');
    s.src = 'https://js.paystack.co/v1/inline.js';
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject();
    document.body.appendChild(s);
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const training = trainings.find((t) => t.id === values.trainingId);
    if (!training) return;

    const price = typeof priceOverride === 'number' ? priceOverride : training.price;
    setSubmitting(true);
    try {
      await loadPaystack();
      const handler = (window as any).PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: values.email,
        amount: Math.round(price * 100),
        currency: CURRENCY,
        ref: `NOISY-${Date.now()}`,
        metadata: {
          custom_fields: [
            { display_name: 'Full Name', variable_name: 'full_name', value: values.fullName },
            { display_name: 'Phone', variable_name: 'phone', value: values.phone },
            { display_name: 'Training', variable_name: 'training', value: training.title },
            { display_name: 'Coupon', variable_name: 'coupon', value: couponCode ?? '' },
          ]
        },
        callback: (response: any) => {
          toast({ title: 'Payment successful', description: `Ref: ${response.reference}` });
          setOpen(false);
          form.reset();
          navigate('/payment-success');
        },
        onClose: () => {
          toast({ title: 'Payment window closed', description: 'You can try again anytime.' });
        }
      });
      handler.openIframe();
    } catch (e) {
      toast({ title: 'Payment error', description: 'Could not initialize Paystack.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button aria-label="Open registration form" className="shadow-button">Register</Button>
        )}
      </DialogTrigger>
      <DialogContent aria-describedby="registration-description">
        <DialogHeader>
          <DialogTitle>Almost done! Secure payment ahead.</DialogTitle>
          <DialogDescription id="registration-description">
            Enter your details to pay and join instantly.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input placeholder="Jane Doe" aria-label="Full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="jane@company.com" aria-label="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="+1 555 000 0000" aria-label="Phone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="trainingId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select training</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger aria-label="Select a training">
                        <SelectValue placeholder="Choose a training" />
                      </SelectTrigger>
                      <SelectContent>
                        {trainings.map((t) => (
                          <SelectItem key={t.id} value={t.id}>
                            {t.title} ${t.price.toFixed(2)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="payment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment method</FormLabel>
                  <FormDescription>We’ll confirm your spot once payment is processed.</FormDescription>
                  <FormControl>
                    <RadioGroup className="grid grid-cols-2 gap-3" onValueChange={field.onChange} defaultValue={field.value}>
                      <div className="flex items-center gap-2 rounded-md border p-3">
                        <RadioGroupItem id="pay-card" value="card" />
                        <label htmlFor="pay-card" className="cursor-pointer">Card</label>
                      </div>
                      <div className="flex items-center gap-2 rounded-md border p-3">
                        <RadioGroupItem id="pay-invoice" value="invoice" />
                        <label htmlFor="pay-invoice" className="cursor-pointer">Invoice</label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground flex items-center gap-1"><Lock className="h-3.5 w-3.5" /> Securely powered by Paystack</p>
              <Button type="submit" disabled={submitting} className="shadow-button" variant="cta">
                {submitting ? "Processing..." : "Pay Now"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationForm;
