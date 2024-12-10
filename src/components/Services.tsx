import { Sparkles, Home, Building2, Calendar } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Regular Cleaning",
    description: "Weekly or bi-weekly cleaning services tailored to your needs",
  },
  {
    icon: Sparkles,
    title: "Deep Cleaning",
    description: "Thorough cleaning of every corner and surface",
  },
  {
    icon: Building2,
    title: "Move In/Out",
    description: "Comprehensive cleaning for property transitions",
  },
  {
    icon: Calendar,
    title: "One-time Clean",
    description: "Perfect for special occasions or spring cleaning",
  },
];

export const Services = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white/50 to-accent/20 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-light text-center mb-16">
          <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Our Services
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div 
              key={service.title} 
              className="p-6 rounded-lg bg-white/30 backdrop-blur-sm animate-fade-up hover:shadow-lg transition-shadow duration-300 border border-white/20"
            >
              <service.icon className="w-10 h-10 mb-4 text-purple-600" />
              <h3 className="text-xl font-medium mb-2 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                {service.title}
              </h3>
              <p className="text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};