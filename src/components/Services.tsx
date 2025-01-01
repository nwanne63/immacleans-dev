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
    <section className="py-20 px-4 bg-white/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-medium text-center mb-16 text-primary">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div key={service.title} className="p-6 rounded-lg bg-white/90 backdrop-blur-sm shadow-lg animate-fade-up">
              <service.icon className="w-10 h-10 mb-4 text-primary" />
              <h3 className="text-xl font-medium mb-2 text-primary">{service.title}</h3>
              <p className="text-primary/80 font-medium">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};