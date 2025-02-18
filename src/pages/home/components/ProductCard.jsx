import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/lib/features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Heart } from "lucide-react";
import { toggleSavedItem } from "@/lib/features/savedItemSlice";
import { Link } from "react-router";

function ProductCard({ _id, image, name, description, price }) {
  const dispatch = useDispatch();
  const savedItems = useSelector((state) => state.savedItems.value);
  const handleClick = () => {
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

  // Check if the item is already saved
  const isSaved = savedItems.some((item) => item.product._id === _id);

  const handleSavedClick = () => {
    dispatch(
      toggleSavedItem({
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
      <div className=" bg-card rounded-lg  p-4 relative">
        <div
          className="absolute top-2 right-2 p-2 cursor-pointer"
          onClick={handleSavedClick}
        >
          <Heart
            className={`text-2xl transition-colors duration-300 ${
              isSaved ? "fill-red-500 text-red-500" : "fill-none text-gray-500"
            }`}
          />
        </div>
      </div>
      <Link to={`/shop/${_id}`}>
        <img src={image} className="block" />
        <div className="flex px-4 mt-4  items-center justify-between">
          <h2 className="text-2xl  font-semibold">{name}</h2>
          <span className="block text-lg font-medium">${price}</span>
        </div>
        <div className="px-4 mt-2">
          <p className="text-sm">{description}</p>
        </div>
      </Link>
      <div className="mt-1 p-4">
        <Button className="w-full" onClick={handleClick}>
          Add To Cart
        </Button>
      </div>
    </Card>
  );
}

export default ProductCard;
