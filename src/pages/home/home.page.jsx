import Hero from "@/pages/home/components/Hero";
import Products from "@/pages/home/components/Products";
import PromoBanner from "./components/PromoBanner";

const HomePage = () => {
  return (
    <main>
      <PromoBanner />
      <Hero />
      <Products>Featured Products</Products>
    </main>
  );
};

export default HomePage;
