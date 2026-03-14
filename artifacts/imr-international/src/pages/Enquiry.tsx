import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TopBar } from "@/components/TopBar";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useSubmitEnquiry } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { Loader2, GraduationCap, MapPin, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";

const enquirySchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Valid phone number is required"),
  program: z.string().min(1, "Please select a program"),
  message: z.string().optional(),
});

type EnquiryForm = z.infer<typeof enquirySchema>;

export default function Enquiry() {
  const { toast } = useToast();
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<EnquiryForm>({
    resolver: zodResolver(enquirySchema)
  });

  const { mutate: submitForm, isPending } = useSubmitEnquiry({
    mutation: {
      onSuccess: () => {
        toast({ 
          title: "Enquiry Submitted", 
          description: "Our admission counselor will contact you shortly." 
        });
        reset();
      },
      onError: () => {
        toast({ 
          title: "Submission Failed", 
          description: "Please try again later.", 
          variant: "destructive" 
        });
      }
    }
  });

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <TopBar />
      <Navigation />
      
      <main className="flex-grow bg-muted/30">
        {/* Header */}
        <div className="bg-primary text-white py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <GraduationCap className="w-16 h-16 mx-auto mb-6 text-accent" />
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Admission Enquiry</h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">Take the first step towards a brilliant career. Fill out the form below and our counseling team will get back to you with all the details.</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Form */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-xl border border-border"
            >
              <h2 className="text-2xl font-bold text-foreground mb-6">Enquiry Form</h2>
              <form onSubmit={handleSubmit((data) => submitForm({ data }))} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Full Name *</label>
                    <input 
                      {...register("name")}
                      className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder="Enter your name"
                    />
                    {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Email Address *</label>
                    <input 
                      {...register("email")}
                      type="email"
                      className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder="Enter your email"
                    />
                    {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Phone Number *</label>
                    <input 
                      {...register("phone")}
                      className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder="+91"
                    />
                    {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Program of Interest *</label>
                    <select 
                      {...register("program")}
                      className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground"
                    >
                      <option value="">Select a program</option>
                      <optgroup label="Degree Programs">
                        <option value="BBA">BBA</option>
                        <option value="BCA">BCA</option>
                        <option value="BSc Data Science">BSc Data Science</option>
                      </optgroup>
                      <optgroup label="Digital Certifications">
                        <option value="AI & Machine Learning">AI & Machine Learning</option>
                        <option value="Data Science">Data Science</option>
                        <option value="Digital Marketing">Digital Marketing</option>
                        <option value="Ethical Hacking">Ethical Hacking</option>
                      </optgroup>
                    </select>
                    {errors.program && <p className="text-xs text-destructive">{errors.program.message}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Message / Query (Optional)</label>
                  <textarea 
                    {...register("message")}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                    placeholder="Tell us about your educational background or any specific questions..."
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isPending}
                  className="w-full md:w-auto px-8 py-3.5 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit Enquiry"}
                </button>
              </form>
            </motion.div>

            {/* Contact Info Sidebar */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-primary text-primary-foreground rounded-3xl p-8 shadow-xl"
            >
              <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
              <div className="space-y-8">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Campus Address</h4>
                    <p className="text-primary-foreground/80 leading-relaxed">
                      07 District Centre, CS Pur,<br/>
                      Bhubaneswar, Odisha<br/>
                      India
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Phone</h4>
                    <p className="text-primary-foreground/80">+91-9938080165</p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Email</h4>
                    <p className="text-primary-foreground/80 break-all">imrinternational11@gmail.com</p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
