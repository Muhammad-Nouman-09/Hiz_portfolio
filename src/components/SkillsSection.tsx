import { Card } from "@/components/ui/card";
import { 
  Share2, 
  FileSpreadsheet, 
  Code, 
  Palette, 
  TrendingUp,
  Database,
  Smartphone,
  PenTool 
} from "lucide-react";

const SkillsSection = () => {
  const skills = [
   
    {
      icon: FileSpreadsheet,
      title: "MS Office Expert",
      description: "Advanced Excel formulas, PowerPoint presentations, Word documents, and data analysis",
      color: "from-blue-500 to-indigo-500"
    },
     {
      icon: FileSpreadsheet,
      title: "MS Excel Expert",
      description: "As an MS Excel Expert, I work with advanced formulas, pivot tables, data analysis, and dashboards to organize data and track business performance.",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: Code,
      title: "Web Development(React.js & Next.js)",
      description: "React.js & Next.js, modern JavaScript, responsive design, and progressive web applications",
      color: "from-green-500 to-emerald-500"
    },
     {
      icon: Smartphone,
      title: "Python",
      description: "As a Python Developer, I build scripts and tools that automate tasks, process data, and improve workflow efficiency.",
      color: "from-teal-500 to-green-500"
    },
    {
      icon: Palette,
      title: "Graphic Design",
      description: "Brand identity, social media graphics, logos, banners, and visual storytelling",
      color: "from-purple-500 to-violet-500"
    },
    {
      icon: Database,
      title: "Data Management",
      description: "Database organization, reporting, and business intelligence solutions",
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: Smartphone,
      title: "Mobile-First Design",
      description: "Responsive interfaces optimized for all devices and screen sizes",
      color: "from-teal-500 to-green-500"
    },
     {
      icon: Share2,
      title: "Social Media Management",
      description: "Content strategy, scheduling, community engagement, and analytics across all major platforms",
      color: "from-pink-500 to-rose-500"
    },
    // {
    //   icon: PenTool,
    //   title: "Creative Tools",
    //   description: "trello, Figma, Canva, and modern design workflows",
    //   color: "from-yellow-500 to-orange-500"
    // }
  ];

  return (
    <section id="skills" className="py-20 bg-background">
      <div className="container ">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 ">My Skills</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-8 rounded-full" />
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit for modern digital solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <Card 
              key={index}
              className="group p-6 h-full card-gradient shadow-elegant hover:shadow-hover transition-all duration-500 hover:scale-105 hover:-translate-y-2 animate-scale-in border-0"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${skill.color} p-4 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <skill.icon className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                {skill.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {skill.description}
              </p>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;