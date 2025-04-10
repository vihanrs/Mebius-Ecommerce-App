import Hero from "@/pages/home/components/Hero";
import FeaturedProducts from "@/pages/home/components/FeaturedProducts";
import PromoBanner from "./components/PromoBanner";

const HomePage = () => {
  return (
    <main>
      <PromoBanner />
      <Hero />
      <FeaturedProducts>Featured Products</FeaturedProducts>
    </main>
  );
};

export default HomePage;
