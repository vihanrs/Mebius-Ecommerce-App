import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetOrderQuery } from "@/lib/api";
import { Separator } from "@radix-ui/react-select";
import { format } from "date-fns";
import { AlertCircle, Home, MapPin, Phone, ShoppingBag } from "lucide-react";
import { Link, useSearchParams } from "react-router";
import { useLocation } from "react-router-dom";

function OrderDetails() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const { data: order, isLoading } = useGetOrderQuery(orderId);
  const location = useLocation();
  const fromMyOrdersPage = location.state?.fromMyOrders || false;

  if (isLoading) {
    return (
      <main className="p-8 mx-16">
        <Card className="w-full max-w-3xl ">
          <CardHeader>
            <Skeleton className="h-8 w-3/4" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Skeleton className="h-10 w-1/3" />
            <Skeleton className="h-10 w-1/3" />
          </CardFooter>
        </Card>
      </main>
    );
  }

  if (!order) {
    return (
      <Card className="w-full max-w-md mx-auto text-center mt-8">
        <CardHeader>
          <CardTitle className="flex items-center justify-center space-x-2">
            <AlertCircle className="h-6 w-6 text-destructive" />
            <span>Order Not Found</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            We couldn't find the order you're looking for. It may have been
            removed or you may have invalid order ID.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          <Button asChild variant="outline">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Home
            </Link>
          </Button>
          <Button asChild>
            <Link to="/shop">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Continue Shopping
            </Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }
  return (
    <main className="p-8 md:mx-16">
      <h2 className="text-4xl font-bold">
        {fromMyOrdersPage ? "Order Details" : "Order Successful"}
      </h2>
      <Card className="w-full max-w-3xl mt-8">
        <CardHeader>
          <CardTitle>Order #{order._id}</CardTitle>
          <Badge
            className={"w-fit"}
            variant={order.paymentStatus === "PENDING" ? "outline" : "default"}
          >
            {order.paymentStatus}
          </Badge>
          <p>{format(new Date(order.orderDate), "dd/MM/yyyy HH:mm a")}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
            <div className="space-y-2">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span>
                    {item.product.name} x {item.quantity}
                  </span>
                  <span>
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between items-center font-semibold my-2">
              <span>Total</span>
              <span>${order.subTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center font-semibold my-2">
              <span>Discount</span>
              <span>${order.discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center font-semibold my-2">
              <span>Grand Total</span>
              <span>${order.grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <MapPin className="mr-2" size={18} /> Shipping Address
            </h3>
            <p>{order.addressId.line_1}</p>
            <p>{order.addressId.line_2}</p>
            <p>
              {order.addressId.city}, {order.addressId.state}{" "}
              {order.addressId.zip_code}
            </p>
            <p className="flex items-center mt-2">
              <Phone className="mr-2" size={18} />
              {order.addressId.phone}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
      <Button asChild variant="outline" className="mt-8 w-full max-w-3xl">
        <Link to="/shop">
          <ShoppingBag className="mr-2 h-4 w-4" /> Continue Shopping
        </Link>
      </Button>
    </main>
  );
}

export default OrderDetails;
