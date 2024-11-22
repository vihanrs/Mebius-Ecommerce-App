import "./App.css";
import Hero from "./Hero";
import Navigation from "./Navigation";
import Products from "./Products";

function App() {
  const name = "Vihan";
  const cartCount = 2;
  return (
    <div>
      <Navigation name={name} cartCount={cartCount} />
      <Hero />
      <Products />
    </div>
  );
}

export default App;
