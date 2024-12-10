import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export const Contact = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-xl mx-auto bg-white/20 backdrop-blur-md p-8 rounded-lg">
        <h2 className="text-3xl font-light text-center mb-8">Get in Touch</h2>
        <form className="space-y-6">
          <div className="space-y-2">
            <Input placeholder="Your Name" className="bg-white/50" />
          </div>
          <div className="space-y-2">
            <Input type="email" placeholder="Email" className="bg-white/50" />
          </div>
          <div className="space-y-2">
            <Textarea placeholder="Message" className="bg-white/50 min-h-[120px]" />
          </div>
          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            Send Message
          </Button>
        </form>
      </div>
    </section>
  );
};