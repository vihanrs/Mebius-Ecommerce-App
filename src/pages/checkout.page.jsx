import ShippingAddressForm from "@/components/ShippingAddressForm";
import { useSelector } from "react-redux";
import CartItem from "@/components/CartItem";
import { Navigate } from "react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { useValidatePromoCodeMutation } from "@/lib/api";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

function CheckoutPage() {
  const cart = useSelector((state) => state.cart.value);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [validatePromo, { isLoading: isValidating }] =
    useValidatePromoCodeMutation();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Calculate discount
  const discount = appliedPromo
    ? (appliedPromo.discountPercentage / 100) * subtotal
    : 0;

  // Calculate final total
  const total = subtotal - discount;

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) {
      toast.error("Please enter a promo code");
      return;
    }

    try {
      const result = await validatePromo(promoCode).unwrap();
      setAppliedPromo(result);
      toast.success("Promo code applied successfully!");
    } catch (error) {
      toast.error(error.data?.message || "Invalid promo code");
      setAppliedPromo(null);
    }
  };

  if (cart.length === 0) {
    return <Navigate to="/" />;
  }

  return (
    <main className="p-8 md:mx-16">
      <h2 className="text-4xl font-bold mb-4">Checkout Page</h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
        <Card className="p-6 md:col-span-3">
          <ShippingAddressForm cart={cart} promoCode={appliedPromo?.code} />
        </Card>
        <Card className="p-6 md:col-span-2 lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Order Details</h2>
          <dl className="space-y-2">
            <div className="flex justify-between">
              <dt>Items</dt>
              <dd>{totalItems}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd>${subtotal.toFixed(2)}</dd>
            </div>
            <div className="space-y-2">
              <dt>Promo Code</dt>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  disabled={!!appliedPromo}
                />
                <Button
                  size="sm"
                  onClick={handleApplyPromo}
                  disabled={isValidating || !!appliedPromo}
                >
                  {isValidating ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Apply"
                  )}
                </Button>
              </div>
              {appliedPromo && (
                <div className="text-sm text-green-600 flex justify-between py-2">
                  <span>"{appliedPromo.code}" applied</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setAppliedPromo(null)}
                    className="h-5 p-0 text-red-500"
                  >
                    Remove
                  </Button>
                </div>
              )}
            </div>
            <div className="flex justify-between">
              <dt>Discount</dt>
              <dd>${discount.toFixed(2)}</dd>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-semibold">
                <dt>Total</dt>
                <dd>${total.toFixed(2)}</dd>
              </div>
            </div>
          </dl>
          {cart.length > 0 && (
            <Button
              className="w-full mt-5"
              onClick={() =>
                document.getElementById("shipping-form").requestSubmit()
              }
            >
              Proceed to Payment
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </Card>
      </div>
      <div className="mt-4">
        <Card className="p-6">
          <h3 className="text-xl font-semibold">Review Your Items</h3>
          <div className="mt-2 grid grid-cols-4 gap-x-4">
            {cart.map((item, index) => (
              <CartItem key={index} item={item} />
            ))}
          </div>
        </Card>
      </div>
    </main>
  );
}

export default CheckoutPage;
