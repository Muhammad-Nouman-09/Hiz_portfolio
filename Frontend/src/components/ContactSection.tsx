import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  Mail, 
  MessageCircle, 
  Linkedin, 
  Send, 
  MapPin, 
  Phone,
  Clock
} from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/contact`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (response.ok) {
      toast({
        title: "Message Sent!",
        description: result.message,
      });
      setFormData({ name: "", email: "", message: "" });
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to send message.",
        variant: "destructive",
      });
    }
  } catch (error) {
    toast({
      title: "Error",
      description: "Something went wrong. Please try again.",
      variant: "destructive",
    });
  } finally {
    setIsSubmitting(false);
  }
};


  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "mr.hizz009@gmail.com",
      link: "mailto:mr.hizz009@gmail.com"
    },
    {
      icon: MessageCircle,
      label: "Discord",
      value: "Mr.Hiz",
      link: "https://discord.com/channels/@me/1406568866942812211"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Mr.Hiz",
      link: "https://www.linkedin.com/in/mrhiz09/"
    },
    {
      icon: Phone,
      label: "Available",
      value: "Mon - Fri, 9AM - 6PM",
      link: null
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-secondary/30 to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">Let's Work Together</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-8 rounded-full" />
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to bring your ideas to life? Get in touch and let's discuss your project.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-12">
          {/* Contact Form */}
          <Card className="lg:col-span-3 p-8 card-gradient shadow-elegant border-0 animate-scale-in">
            <h3 className="text-2xl font-semibold mb-6 text-foreground">Send Me a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    required
                    className="bg-background/50 border-muted focus:border-primary transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    required
                    className="bg-background/50 border-muted focus:border-primary transition-colors"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Project Details</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell me about your project, goals, timeline, and budget..."
                  rows={6}
                  required
                  className="bg-background/50 border-muted focus:border-primary transition-colors resize-none"
                />
              </div>

              <Button 
                type="submit" 
                variant="hero" 
                size="lg" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>
          </Card>

          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <Card className="p-6 card-gradient shadow-elegant border-0">
              <h3 className="text-xl font-semibold mb-4 text-foreground">Get In Touch</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                I'm always excited to work on new projects and help businesses achieve their goals. 
                Feel free to reach out through any of these channels.
              </p>
              
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center gap-4 group">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <info.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-muted-foreground">{info.label}</div>
                      {info.link ? (
                        <a 
                          href={info.link}
                          className="text-foreground hover:text-primary transition-colors font-medium"
                          target={info.link.startsWith('http') ? '_blank' : undefined}
                          rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                        >
                          {info.value}
                        </a>
                      ) : (
                        <div className="text-foreground font-medium">{info.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Response Time Card */}
            <Card className="p-6 card-gradient shadow-elegant border-0 bg-gradient-to-br from-primary/5 to-accent/5">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="h-6 w-6 text-primary" />
                <h4 className="text-lg font-semibold text-foreground">Quick Response</h4>
              </div>
              <p className="text-muted-foreground">
                I typically respond to all inquiries within <strong>24 hours</strong>. 
                For urgent projects, feel free to mention it in your message.
              </p>
            </Card>

            {/* Availability Card */}
            <Card className="p-6 card-gradient shadow-elegant border-0 bg-gradient-to-br from-accent/5 to-primary/5">
              <div className="flex items-center gap-3 mb-3">
                <MapPin className="h-6 w-6 text-accent" />
                <h4 className="text-lg font-semibold text-foreground">Available Worldwide</h4>
              </div>
              <p className="text-muted-foreground">
                Working remotely with clients globally. All time zones welcome for 
                virtual meetings and project collaboration.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;