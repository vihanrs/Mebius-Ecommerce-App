import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function Hero() {
  return (
    <section className="p-8 mx-16">
      <div className="grid grid-cols-2 rounded-lg min-h-[60vh] bg-[#f4f8f9]">
        <div className="flex flex-col justify-center p-16 gap-4">
          <Badge variant="outline" className="w-fit bg-yellow-400 py-1 text-xs">
            WEEKLY DISCOUNT
          </Badge>
          <h1 className="text-6xl font-semibold">
            Premium Product Online Shop
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius quos
            suscipit est autem quia? Voluptatem?
          </p>
          <Button className="w-fit" asChild>
            <a href="/shop">Shop Now</a>
          </Button>
        </div>
        <div className="relative">
          <img
            src="https://fee-storefront.vercel.app/assets/hero/hero.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
