import { Button } from "@/components/ui/button";
import { clearCart } from "@/lib/features/cartSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import CartItem from "@/components/CartItem";
import { Navigate, useSearchParams } from "react-router";
import { Card } from "@/components/ui/card";
import CheckoutForm from "@/components/CheckoutForm";

function PaymentPage() {
  const cart = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  console.log('Search Params:', Object.fromEntries(searchParams));
  console.log('OrderId:', orderId);

  if (cart.length === 0) {
    return <Navigate to="/" />;
  }

  return (
    <main className="p-8 mx-16">
      <h2 className="text-4xl font-bold">Order Summery</h2>
      <Card className="p-6 mt-8">
        <div className="mt-4 grid grid-cols-4 gap-x-4">
          {cart.map((item, index) => (
            <CartItem key={index} item={item} />
          ))}
        </div>

        {/* <div className="mt-4">
          <Button
            onClick={() => {
              dispatch(clearCart());
              toast.success("Order Placed Successfully");
            }}
          >
            Place Order
          </Button>
        </div> */}
      </Card>
      <div className="mt-4">
        <CheckoutForm orderId={orderId} />
      </div>
    </main>
  );
}

export default PaymentPage;
