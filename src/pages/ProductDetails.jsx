import { useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "@/lib/api.js";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/features/cartSlice.js";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";

function ProductDetails() {
  const { productId } = useParams();
  const {
    data: product,
    isLoading,
    isError,
  } = useGetSingleProductQuery(productId);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  if (isLoading) {
    return (
      <main className="p-8 mx-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="h-[400px] w-full" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="p-8 mx-16">
        <p className="text-red-500">Error loading product details</p>
      </main>
    );
  }

  return (
    <main className="p-8 mx-16">
      <Card className="overflow-hidden">
        <CardContent>
          <div className="grid gap-8 md:grid-cols-2 max-h-screen max-w-screen-lg py-8">
            <div className="aspect-square relative overflow-hidden rounded-lg">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="flex flex-col justify-between ms-5">
              <div>
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                <p className="text-gray-600 mb-4">{product.description}</p>
              </div>
              <div>
                <div className="flex items-baseline mb-4">
                  <span className="text-3xl font-bold">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.stockQuantity === 0 ? (
                    <Badge variant="destructive" className="ml-2">
                      Out of Stock
                    </Badge>
                  ) : product.stockQuantity <= 20 ? (
                    <Badge variant="destructive" className="ml-2">
                      only {product.stockQuantity} left
                    </Badge>
                  ) : null}
                </div>
                <Button className="w-full" onClick={handleAddToCart}>
                  <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

export default ProductDetails;
