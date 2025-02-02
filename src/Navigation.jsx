import { Heart, ShoppingCart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router";

function Navigation(props) {
  return (
    <nav className="flex items-center justify-between p-8 mx-16">
      <div className="flex gap-x-16">
        <a className="font-semibold text-3xl" href="/">
          Mebius
        </a>
        <div className="flex items-center gap-4">
          <a href="/">Home</a>
          <a href="/shop">Shop</a>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <div>
          <a href="/cart" className="flex items-center gap-3 relative">
            <p className="text-lg">{props.savedItemsCount}</p>
            <Heart />
            <div>Saved</div>
          </a>
        </div>
        <div>
          <a href="/cart" className="flex items-center gap-3 relative">
            <p className="text-lg">{props.cartCount}</p>
            <ShoppingCart />
            <div>Cart</div>
          </a>
        </div>
        {props.name ? (
          <>
            <p>Hi, {props.name}</p>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </>
        ) : (
          <>
            <Link to="/sign-in" className="font-medium text-primary">
              Sign In
            </Link>
            <Link to="/sign-up" className="font-medium text-primary">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
