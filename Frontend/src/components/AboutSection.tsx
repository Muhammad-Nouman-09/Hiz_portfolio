import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Users, Award } from "lucide-react";

const AboutSection = () => {
  const stats = [
    { icon: Star, label: "Client Satisfaction", value: "100%" },
    { icon: Clock, label: "Years Experience", value: "1+" },
    { icon: Users, label: "Projects Completed", value: "25+" },
    { icon: Award, label: "Skills Mastered", value: "4" },
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-background to-secondary/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">About Me</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-8 rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm a versatile freelancer with <strong>1 year of professional office experience</strong> 
                in social media management, creative design, and web development. My journey has taken me 
                through diverse projects where I've honed my skills in creating engaging digital experiences.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                What sets me apart is my <strong>client-focused approach</strong> and commitment to delivering 
                high-quality work on time. Whether it's building a React.js application, crafting social media 
                strategies, or designing compelling visuals, I bring creativity and technical expertise to every project.
              </p>

              <div className="flex flex-wrap gap-2 pt-4">
                <Badge variant="secondary" className="px-3 py-1">Professional</Badge>
                <Badge variant="secondary" className="px-3 py-1">Reliable</Badge>
                <Badge variant="secondary" className="px-3 py-1">Creative</Badge>
                <Badge variant="secondary" className="px-3 py-1">Detail-Oriented</Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 animate-scale-in" style={{ animationDelay: "0.4s" }}>
              {stats.map((stat, index) => (
                <Card 
                  key={index} 
                  className="p-6 text-center card-gradient shadow-elegant hover:shadow-hover transition-all duration-300 hover:scale-105"
                >
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <div className="text-2xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;