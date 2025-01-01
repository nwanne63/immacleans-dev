import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const showcaseItems = [
  {
    image: "/cleaning-bg.jpg",
    title: "Deep Kitchen Cleaning",
    description: "Complete transformation of a kitchen space",
  },
  {
    image: "/cleaning-bg.jpg",
    title: "Living Room Refresh",
    description: "Thorough cleaning of carpets and furniture",
  },
  {
    image: "/cleaning-bg.jpg",
    title: "Bathroom Sanitization",
    description: "Professional bathroom deep cleaning",
  },
  {
    image: "/cleaning-bg.jpg",
    title: "Move-out Cleaning",
    description: "End of tenancy cleaning service",
  },
];

export const ShowcaseCarousel = () => {
  return (
    <section className="py-20 px-4 bg-white/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-medium text-center mb-16 text-primary">
          Our Work
        </h2>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {showcaseItems.map((item, index) => (
              <CarouselItem
                key={index}
                className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <Card className="border-none">
                  <CardContent className="p-0">
                    <div className="relative group overflow-hidden rounded-lg">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <h3 className="text-white font-medium text-lg mb-1">
                          {item.title}
                        </h3>
                        <p className="text-white/90 text-sm">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
};