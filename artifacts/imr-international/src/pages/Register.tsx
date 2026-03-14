import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useLocation } from "wouter";
import { TopBar } from "@/components/TopBar";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useRegister, getGetMeQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowRight } from "lucide-react";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function Register() {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema)
  });

  const { mutate: doRegister, isPending } = useRegister({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetMeQueryKey() });
        toast({ title: "Registration Successful", description: "Welcome to IMR International!" });
        setLocation("/");
      },
      onError: (error) => {
        toast({ 
          title: "Registration Failed", 
          description: error.error || "An error occurred", 
          variant: "destructive" 
        });
      }
    }
  });

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <TopBar />
      <Navigation />
      
      <main className="flex-grow flex items-center justify-center py-16 relative">
        <div className="absolute inset-0 z-0">
          <img 
            src={`${import.meta.env.BASE_URL}images/auth-bg.png`}
            alt="Background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" />
        </div>

        <div className="w-full max-w-md bg-card rounded-3xl p-8 sm:p-10 shadow-2xl shadow-primary/10 border border-border relative z-10 mx-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-display font-bold text-foreground">Create Account</h2>
            <p className="text-muted-foreground mt-2">Join our academic community today</p>
          </div>

          <form onSubmit={handleSubmit((data) => doRegister({ data }))} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Full Name</label>
              <input 
                {...register("name")}
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
              {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Email Address</label>
              <input 
                {...register("email")}
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Phone Number (Optional)</label>
              <input 
                {...register("phone")}
                type="tel"
                placeholder="+91 99999 99999"
                className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
              {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Password</label>
              <input 
                {...register("password")}
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
              {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
            </div>

            <button 
              type="submit" 
              disabled={isPending}
              className="w-full py-3.5 mt-4 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
            >
              {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign Up"}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="font-bold text-primary hover:text-secondary inline-flex items-center gap-1 transition-colors">
                Sign in <ArrowRight className="w-3 h-3" />
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
