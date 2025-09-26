import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Share2, 
  FileSpreadsheet, 
  Code, 
  Palette,
  CheckCircle,
  ArrowRight,
  Clock,
  DollarSign
} from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: Share2,
      title: "Social Media Management",
      description: "Complete social media strategy and management to boost your online presence",
      features: [
        "Content planning & scheduling",
        "Community engagement",
        "Analytics & reporting",
        "Brand voice development",
        "Hashtag strategy"
      ],
      price: "It will be negotiateable ",
      duration: "Monthly packages",
      popular: true
    },
    {
      icon: Code,
      title: "Web Development",
      description: "Modern, responsive websites and web applications built with React.js",
      features: [
        "React.js development",
        "Responsive design",
        "Performance optimization",
        "SEO implementation",
        "Maintenance & support"
      ],
      price: "SIt will be negotiateable",
      duration: "Per project",
      popular: false
    },
    {
      icon: Palette,
      title: "Graphic Design",
      description: "Eye-catching designs that communicate your brand message effectively",
      features: [
        "Logo & brand identity",
        "Social media graphics",
        "Marketing materials",
        "Print design",
        "Brand guidelines"
      ],
      price: "It will be negotiateable",
      duration: "Per design package",
      popular: false
    },
    {
      icon: FileSpreadsheet,
      title: "MS Office & Admin Support",
      description: "Professional administrative support and document management",
      features: [
        "Advanced Excel solutions",
        "PowerPoint presentations",
        "Data analysis & reporting",
        "Document formatting",
        "Process automation"
      ],
      price: "It will be negotiateable",
      duration: "Hourly or project-based",
      popular: false
    }
  ];

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">Services</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-8 rounded-full" />
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive digital solutions tailored to your business needs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <Card 
              key={index}
              className={`group relative p-8 h-full card-gradient shadow-elegant hover:shadow-hover transition-all duration-500 hover:scale-105 animate-scale-in border-0 ${
                service.popular ? 'ring-2 ring-primary/20' : ''
              }`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Popular Badge */}
              {service.popular && (
                <Badge 
                  variant="default" 
                  className="absolute -top-3 left-6 bg-gradient-to-r from-primary to-accent text-white px-4 py-1"
                >
                  Most Popular
                </Badge>
              )}

              {/* Service Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className={`p-3 rounded-xl bg-gradient-to-br from-primary to-accent text-white group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Features List */}
              <div className="mb-6">
                <ul className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pricing Info */}
              <div className="mb-6 p-4 bg-secondary/50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <span className="text-xl font-semibold text-foreground">{service.price}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{service.duration}</span>
                </div>
              </div>

              {/* CTA Button */}
              <Button 
                variant={service.popular ? "hero" : "default"}
                size="lg"
                className="w-full group-hover:scale-105 transition-transform duration-300"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
          <p className="text-muted-foreground mb-4">Need a custom solution?</p>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Let's Discuss Your Project
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;