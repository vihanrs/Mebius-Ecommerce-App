import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router";

function Hero() {
  return (
    <section className="p-4 md:p-8 mx-4 md:mx-16">
      <div className="grid grid-cols-1 md:grid-cols-2 rounded-lg min-h-[60vh] bg-[##e6e2df]">
        <div className="flex flex-col justify-center p-6 md:p-16 gap-4 order-2 md:order-1">
          <Badge variant="outline" className="w-fit bg-yellow-400 py-1 text-xs">
            SEASONAL DISCOUNT
          </Badge>
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-semibold">
            Explore Next-Gen Tech
          </h1>
          <p className="text-sm md:text-base">
            Discover the latest in premium gadgets, from cutting-edge
            smartphones to immersive VR gear. Designed for innovators, made for
            everyone.
          </p>
          <Button className="w-fit" asChild>
            <Link to="/shop">Shop Now</Link>
          </Button>
        </div>
        <div className="relative order-1 md:order-2">
          <img
            src="/assets/hero-img.webp"
            alt="hero image"
            className="w-full h-full object-cover rounded-t-lg md:rounded-t-none md:rounded-r-lg"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
