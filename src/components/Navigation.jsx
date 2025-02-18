import { useState } from "react";
import { Heart, ShoppingCart, Menu, X } from "lucide-react";
import { Link } from "react-router";
import { SignedOut, SignedIn, UserButton } from "@clerk/clerk-react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

function Navigation() {
  const cart = useSelector((state) => state.cart.value);
  const savedItems = useSelector((state) => state.savedItems.value);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getCartQuantity = () => {
    let count = 0;
    cart.forEach((item) => {
      count += item.quantity;
    });
    return count;
  };

  const MobileMenu = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 sm:w-80">
        <div className="flex flex-col h-full py-6">
          <div className="px-3 mb-6">
            <Link
              to="/"
              className="font-semibold text-2xl inline-block mb-8"
              onClick={() => setIsMenuOpen(false)}
            >
              ZapTech <span className="text-sm font-normal">Store</span>
            </Link>
          </div>
          <div className="flex flex-col space-y-3 px-3">
            <Link
              to="/"
              className="py-2 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="py-2 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </Link>
            <div className="h-px bg-border my-4"></div>
            <Link
              to="/shop/saved"
              className="flex items-center gap-3 py-2 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              <Heart className="h-5 w-5" />
              <span>Saved</span>
              <span className="ml-auto font-medium">{savedItems.length}</span>
            </Link>
            <Link
              to="/shop/cart"
              className="flex items-center gap-3 py-2 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Cart</span>
              <span className="ml-auto font-medium">{getCartQuantity()}</span>
            </Link>
            <div className="h-px bg-border my-4"></div>
            <SignedOut>
              <div className="flex flex-col gap-2">
                <Link
                  to="/sign-in"
                  className="font-medium hover:text-primary py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/sign-up"
                  className="font-medium hover:text-primary py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </SignedOut>
            <SignedIn>
              <div className="flex items-center gap-3 py-2">
                <UserButton />
                <Link
                  to="/account"
                  className="hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Account
                </Link>
              </div>
            </SignedIn>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <nav className="relative border-b">
      <div className="flex items-center justify-between p-4 md:mx-16">
        {/* Left section */}
        <div className="flex items-center gap-2 md:gap-8">
          <MobileMenu />
          <Link
            to="/"
            className="font-semibold text-xl md:text-2xl lg:text-3xl hidden md:block"
          >
            ZapTech <span className="text-sm font-normal">Store</span>
          </Link>
          <Link to="/" className="font-semibold text-xl md:hidden">
            Zap<span className="text-sm font-normal">Store</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="hover:text-primary font-medium">
              Home
            </Link>
            <Link to="/shop" className="hover:text-primary font-medium">
              Shop
            </Link>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4 md:gap-6">
          <Link
            to="/shop/saved"
            className="flex items-center gap-2 relative hover:text-primary"
          >
            <span className="absolute -top-2 -right-2 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs bg-rose-400">
              {savedItems.length}
            </span>
            <Heart className="h-5 w-5" />
            <span className="hidden md:inline">Saved</span>
          </Link>

          <Link
            to="/shop/cart"
            className="flex items-center gap-2 relative hover:text-primary"
          >
            <span className="absolute -top-2 -right-2 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs bg-neutral-600">
              {getCartQuantity()}
            </span>
            <ShoppingCart className="h-5 w-5" />
            <span className="hidden md:inline">Cart</span>
          </Link>

          <div className="hidden md:block">
            <SignedOut>
              <div className="flex items-center gap-4">
                <Link to="/sign-in" className="font-medium text-primary">
                  Sign In
                </Link>
                <Link to="/sign-up" className="font-medium text-primary">
                  Sign Up
                </Link>
              </div>
            </SignedOut>
            <SignedIn>
              <div className="flex items-center gap-3">
                <UserButton />
                <Link to="/account" className="font-medium hover:text-primary">
                  Account
                </Link>
              </div>
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
