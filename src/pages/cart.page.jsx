import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import CartItem from "@/components/CartItem";
import { Card } from "@/components/ui/card";
import { ArrowRight, ShoppingBag } from "lucide-react";

function CartPage() {
  const cart = useSelector((state) => state.cart?.value) || [];

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <main className="p-8 md:mx-16">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Cart Items</h2>
          {cart.length > 0 ? (
            <ul className="space-y-4">
              {cart.map((item, index) => (
                <li key={index}>
                  <CartItem key={index} item={item} update={true} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-8">
              <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                Your cart is empty
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Start adding some items to your cart!
              </p>
              <div className="mt-6">
                <Button asChild>
                  <Link to="/shop">Continue Shopping</Link>
                </Button>
              </div>
            </div>
          )}
        </Card>

        <Card className="p-6 md:col-span-2 lg:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <dl className="space-y-2">
            <div className="flex justify-between">
              <dt>Items</dt>
              <dd>{totalItems}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd>${subtotal.toFixed(2)}</dd>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-semibold">
                <dt>Total</dt>
                <dd>${subtotal.toFixed(2)}</dd>
              </div>
            </div>
          </dl>
          {cart.length > 0 && (
            <Button className="w-full mt-6" asChild>
              <Link to="/shop/checkout">
                Proceed to Checkout
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </Card>
      </div>
    </main>
  );
}

export default CartPage;
