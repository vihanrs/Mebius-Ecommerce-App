import Hero from "@/Hero";
import Products from "@/Products";
import Navigation from "@/Navigation";
import { useSelector } from "react-redux";

const HomePage = () => {
  const name = null;
  // const [cart, setCart] = useState([]);

  // const handleAddToCart = (product) => {
  //   const foundItem = cart.find((item) => item.product._id === product._id);
  //   if (foundItem) {
  //     setCart(
  //       cart.map((cartItem) =>
  //         cartItem === foundItem
  //           ? { ...cartItem, quantity: cartItem.quantity + 1 }
  //           : cartItem
  //       )
  //     );
  //     return;
  //   }
  //   setCart([...cart, { product: product, quantity: 1 }]); //use spread operator
  // };

  const cart = useSelector((state) => state.cart.value);

  const getCartQuantity = () => {
    let count = 0;
    cart.forEach((item) => {
      count += item.quantity;
    });
    return count;
  };

  return (
    <div>
      <Navigation name={name} cartCount={getCartQuantity()} />
      <Hero />
      <Products />
      {/* handleAddToCart={handleAddToCart} */}
    </div>
  );
};

export default HomePage;
