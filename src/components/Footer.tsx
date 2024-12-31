import { Instagram } from "lucide-react";
import { Separator } from "./ui/separator";

export const Footer = () => {
  return (
    <footer className="bg-white/50 backdrop-blur-sm py-12 mt-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-medium mb-4">Opening Hours</h3>
            <p className="text-muted-foreground">Monday to Friday: 9 AM - 5 PM</p>
          </div>
          <div>
            <h3 className="text-xl font-medium mb-4">Contact Information</h3>
            <p className="text-muted-foreground mb-2">Phone: +44 7763 690004</p>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Instagram className="w-5 h-5" />
              <span>Follow us on Instagram</span>
            </a>
          </div>
        </div>
        <Separator className="my-8" />
        <p className="text-sm text-center text-muted-foreground">
          © 2024 by Immas Cleaning Services Limited | All Rights Reserved
        </p>
      </div>
    </footer>
  );
};