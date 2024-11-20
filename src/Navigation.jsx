import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
      <div className="flex items-center gap-4">
        <div>
          <a href="/cart" className="flex items-center gap-4 relative">
            <p className="text-lg">{props.cartCount}</p>
            <ShoppingCart />
            <div className="flex items-center gap-2">Cart</div>
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
            <Button variant="ghost" className="w-fit">
              <a href="/signin">Sign In</a>
            </Button>
            <Button variant="ghost" className="w-fit">
              <a href="/signup">Sign Up</a>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
