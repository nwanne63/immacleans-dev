import { Instagram } from "lucide-react";
import { Separator } from "./ui/separator";

export const Footer = () => {
  return (
    <footer className="bg-white/80 backdrop-blur-sm py-12 mt-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-medium mb-4 text-primary">Opening Hours</h3>
            <p className="text-primary/90 font-medium">Monday to Friday: 9 AM - 5 PM</p>
          </div>
          <div>
            <h3 className="text-xl font-medium mb-4 text-primary">Contact Information</h3>
            <p className="text-primary/90 font-medium mb-2">Phone: +44 7763 690004</p>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary/90 hover:text-primary transition-colors font-medium"
            >
              <Instagram className="w-5 h-5" />
              <span>Follow us on Instagram</span>
            </a>
          </div>
        </div>
        <Separator className="my-8" />
        <p className="text-sm text-center text-primary/90 font-medium">
          © 2024 by Immas Cleaning Services Limited | All Rights Reserved
        </p>
      </div>
    </footer>
  );
};