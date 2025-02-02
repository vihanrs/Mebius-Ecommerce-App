import { Separator } from "@/components/ui/separator";
import Tab from "./Tab";
import ProductCards from "./ProductCards";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { getProducts, useGetCategoriesQuery } from "./lib/api";

function Products() {
  // USE RTK QUERIES
  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
    error: categoryError,
  } = useGetCategoriesQuery();

  // MANAGE ASYNC STATE MANUALLY WITHOUT RTK QUERIES
  const [products, setProducts] = useState([]);
  const [isProductLoading, setIsLoading] = useState(true);
  const [productError, setProductError] = useState({
    isError: false,
    message: "",
  });

  const [selectedCategoryId, setSelectedCategoryId] = useState("ALL");

  const [sortOrder, setSortOrder] = useState(null);

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        setProductError({ isError: true, message: error.message });
      })
      .finally(() => setIsLoading(false));
  }, []);

  // get filtered and sorted products by using filter and sort methods
  const sortedAndFilteredProducts = products
    .filter((product) => {
      if (selectedCategoryId === "ALL") return product;
      return product.categoryId === selectedCategoryId;
    })
    .sort((a, b) => {
      if (sortOrder === "ascending") return Number(a.price) - Number(b.price);
      if (sortOrder === "descending") return Number(b.price) - Number(a.price);
      return 0; // No sorting if no order is specified
    });

  // set selected category by using React Lifting State Up
  const handleTabClick = (_id) => {
    setSelectedCategoryId(_id);
  };

  const handleSortSelector = (e) => {
    setSortOrder(e);
  };

  return (
    <section className="p-8 mx-16">
      <h2 className="text-4xl font-bold">Our Top Products</h2>
      <Separator className="mt-2" />
      <div className="flex justify-between mt-4">
        <div className="flex items-center gap-4">
          {isCategoriesLoading ? (
            <div className="flex gap-3">
              <Skeleton className="h-4 w-[90px]" />
              <Skeleton className="h-4 w-[90px]" />
              <Skeleton className="h-4 w-[90px]" />
              <Skeleton className="h-4 w-[90px]" />
              <Skeleton className="h-4 w-[90px]" />
            </div>
          ) : isCategoriesError ? (
            <div className="mt-4">
              <p className="text-red-500">{categoryError.message}</p>
            </div>
          ) : (
            [{ _id: "ALL", name: "All" }, ...categories].map((category) => (
              <Tab
                key={category._id}
                _id={category._id}
                selectedCategoryId={selectedCategoryId}
                name={category.name}
                onTabClick={handleTabClick}
              />
            ))
          )}
        </div>
        <div>
          <Select onValueChange={handleSortSelector}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Sort by Price :" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ascending">Ascending</SelectItem>
              <SelectItem value="descending">Descending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isProductLoading ? (
        <div className="grid grid-cols-4 gap-4 mt-4">
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-60 rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4" />
              <Skeleton className="h-4 w-[250px]" />
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-60 rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4" />
              <Skeleton className="h-4 w-[250px]" />
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-60 rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4" />
              <Skeleton className="h-4 w-[250px]" />
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-60 rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4" />
              <Skeleton className="h-4 w-[250px]" />
            </div>
          </div>
        </div>
      ) : productError.isError ? (
        <div className="mt-4">
          <p className="text-red-500">{productError.message}</p>
        </div>
      ) : (
        <ProductCards products={sortedAndFilteredProducts} />
      )}
    </section>
  );
}

export default Products;
