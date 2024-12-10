import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export const Contact = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-xl mx-auto bg-gradient-to-br from-white/20 to-accent/20 backdrop-blur-md p-8 rounded-lg border border-white/20">
        <h2 className="text-3xl font-light text-center mb-8">
          <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Get in Touch
          </span>
        </h2>
        <form className="space-y-6">
          <div className="space-y-2">
            <Input placeholder="Your Name" className="bg-white/50 border-white/20" />
          </div>
          <div className="space-y-2">
            <Input type="email" placeholder="Email" className="bg-white/50 border-white/20" />
          </div>
          <div className="space-y-2">
            <Textarea placeholder="Message" className="bg-white/50 border-white/20 min-h-[120px]" />
          </div>
          <Button className="w-full bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 transition-opacity text-primary-foreground">
            Send Message
          </Button>
        </form>
      </div>
    </section>
  );
};