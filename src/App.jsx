import "./App.css";
import Hero from "./Hero";
import Navigation from "./Navigation";

function App() {
  const name = null;
  const cartCount = 2;
  return (
    <div>
      <Navigation name={name} cartCount={cartCount} />
      <Hero />
    </div>
  );
}

export default App;
