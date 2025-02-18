import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router";
import { Card } from "@/components/ui/card";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { toggleSavedItem } from "@/lib/features/savedItemSlice";
import { addToCart } from "@/lib/features/cartSlice";

function SavedItemsPage() {
  const savedItems = useSelector((state) => state.savedItems?.value) || [];
  const dispatch = useDispatch();

  const handleRemoveFromSaved = (item) => {
    dispatch(toggleSavedItem(item.product));
  };

  const handleAddToCart = (item) => {
    dispatch(addToCart(item.product));
  };

  return (
    <main className="p-8 md:mx-16">
      <h1 className="text-3xl font-bold mb-8">Saved Items</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Saved Products</h2>
          {savedItems.length > 0 ? (
            <ul className="space-y-6">
              {savedItems.map((item) => (
                <li
                  key={item.product._id}
                  className="flex flex-col sm:flex-row gap-4 items-center"
                >
                  <div className="w-24 h-24 relative flex-shrink-0">
                    <img
                      src={item.product.image || "/placeholder.svg"}
                      alt={item.product.name}
                      className="rounded-md"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      ${item.product.price.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {item.product.description}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddToCart(item)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveFromSaved(item)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-8">
              <Heart className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                Your saved items list is empty
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Start saving items you like for later!
              </p>
              <div className="mt-6">
                <Button asChild>
                  <Link to="/shop">Continue Shopping</Link>
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </main>
  );
}

export default SavedItemsPage;
