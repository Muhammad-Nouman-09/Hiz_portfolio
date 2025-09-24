import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Eye } from "lucide-react";
import projectWeb from "@/assets/project-web.jpg";
import projectDesign from "@/assets/project-design.jpg";
import projectSocial from "@/assets/project-social.jpg";

const PortfolioSection = () => {
  const projects = [
    {
      id: 1,
      title: "E-Commerce React App",
      description: "Modern e-commerce platform built with React.js, featuring responsive design, shopping cart functionality, and payment integration.",
      image: projectWeb,
      category: "Web Development",
      technologies: ["React.js", "TypeScript", "Tailwind CSS", "Node.js"],
      liveUrl: "https://www.akbaat.com/",
      githubUrl: "https://github.com/Akbaat/akbaat-mart-hub-00"
    },
    {
      id: 2,
      title: "Brand Identity Package",
      description: "Complete brand identity design including logo, color palette, typography, and marketing materials for a tech startup.",
      image: projectDesign,
      category: "Graphic Design",
      technologies: ["Adobe Illustrator", "Photoshop", "Figma", "Brand Strategy"],
      liveUrl: "https://drive.google.com/drive/folders/1QwYJUE5MVq_LD-0C6FqUtLQTL3NKjkvn?usp=sharing",
      GoogleDriveUrl: "https://drive.google.com/drive/folders/1QwYJUE5MVq_LD-0C6FqUtLQTL3NKjkvn?usp=sharing"
    },
    {
      id: 3,
      title: "Social Media Campaign",
      description: "360-degree social media strategy and content creation that increased engagement by 300% and followers by 150%.",
      image: projectSocial,
      category: "Social Media",
      technologies: ["Content Strategy", "Analytics", "Canva", "Hootsuite"],
      // liveUrl: "#",
      // githubUrl: "#"
    }
  ];

  return (
    <section id="portfolio" className="py-20 bg-gradient-to-br from-secondary/30 to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">Featured Projects</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-8 rounded-full" />
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work across different disciplines
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={project.id}
              className="group overflow-hidden card-gradient shadow-elegant hover:shadow-hover transition-all duration-500 hover:scale-105 animate-scale-in border-0"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Overlay Actions */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex gap-2">
                    <Button size="sm" variant="secondary" className="bg-white/90 text-primary hover:bg-white">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="secondary" className="bg-white/90 text-primary hover:bg-white">
                      <Github className="h-4 w-4 mr-1" />
                      Code
                    </Button>
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                    {project.category}
                  </Badge>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                </div>

                <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>

                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge 
                      key={techIndex} 
                      variant="outline" 
                      className="text-xs bg-accent/10 text-accent border-accent/20"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => window.open(project.liveUrl, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Live Demo
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(project.githubUrl, '_blank')}
                  >
                    <Github className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
          <Button variant="outline" size="lg" className="hover:bg-primary hover:text-primary-foreground">
            View All Projects
            <ExternalLink className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;