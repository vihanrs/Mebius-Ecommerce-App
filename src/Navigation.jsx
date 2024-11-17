import { ShoppingCart } from "lucide-react";

function Navigation(props) {
  return (
    <nav className="flex items-center justify-between p-8 mx-16">
      <div className="flex gap-x-16">
        <a className="font-semibold text-3xl" href="/">
          ViksWare
        </a>
        <div className="flex items-center gap-4">
          <a href="/">Home</a>
          <a href="/shop">Shop</a>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div>
          <a href="/cart" className="flex items-center gap-4 relative">
            <p className="text-lg">{props.cartCount}</p>
            <ShoppingCart />
            <div className="flex items-center gap-2">Cart</div>
          </a>
        </div>
        <p>Hi, {props.name}</p>
      </div>
    </nav>
  );
}

export default Navigation;
