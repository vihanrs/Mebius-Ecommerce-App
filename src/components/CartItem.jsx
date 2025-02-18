import { Card } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { useDispatch } from "react-redux";
import { removeFromCart } from "@/lib/features/cartSlice";

function CartItem({ item, update = false }) {
  const dispatch = useDispatch();

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId)); // Dispatch action with product ID
  };

  return (
    <Card className="p-4">
      <div className="flex items-center space-x-4">
        <img
          src={item.product.image || "/placeholder.svg"}
          alt={item.product.name}
          className="w-16 h-16 object-cover rounded"
        />
        <div className="flex-1">
          <p className="font-medium">{item.product.name}</p>
          <p className="text-muted-foreground">${item.product.price}</p>
          <p className="text-sm">Quantity: {item.quantity}</p>
        </div>
        {update ? (
          <Button
            className="bg-transparent text-red-400 hover:bg-red-200"
            onClick={() => handleRemove(item.product._id)}
          >
            <Trash />
          </Button>
        ) : null}
      </div>
    </Card>
  );
}

export default CartItem;
