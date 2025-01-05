import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { addToCart } from "./lib/features/cartSlice";
import { useDispatch } from "react-redux";

function ProductCard({ _id, image, name, description, price }) {
  const dispatch = useDispatch();
  const handleClick = () => {
    // handleAddToCart({
    //   _id: _id,
    //   name: name,
    //   price: price,
    //   image: image,
    //   description: description,
    // });

    dispatch(
      addToCart({
        _id: _id,
        name: name,
        price: price,
        image: image,
        description: description,
      })
    );
  };

  return (
    <Card>
      <div className="h-[22rem] bg-card rounded-lg  p-4 relative">
        <img src={image} className="block" />
      </div>
      <div className="flex px-4 mt-4  items-center justify-between">
        <h2 className="text-2xl  font-semibold">{name}</h2>
        <span className="block text-lg font-medium">${price}</span>
      </div>
      <div className="px-4 mt-2">
        <p className="text-sm">{description}</p>
      </div>
      <div className="mt-1 p-4">
        <Button className="w-full" onClick={handleClick}>
          Add To Cart
        </Button>
      </div>
    </Card>
  );
}

export default ProductCard;
