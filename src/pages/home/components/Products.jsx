import { Separator } from "@/components/ui/separator";
import Tab from "./Tab";
import ProductCards from "./ProductCards";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCategoriesQuery, useGetProductsQuery } from "../../../lib/api";

function Products({ children }) {
  // USE RTK QUERIES
  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useGetCategoriesQuery();

  const {
    data: products,
    isLoading: isProductLoading,
    isError: isProductError,
  } = useGetProductsQuery();

  const [selectedCategoryId, setSelectedCategoryId] = useState("ALL");
  const [sortOrder, setSortOrder] = useState(null);

  const sortedAndFilteredProducts = products
    ? products
        .filter((product) => {
          if (selectedCategoryId === "ALL") return product;
          return product.categoryId._id === selectedCategoryId;
        })
        .sort((a, b) => {
          if (sortOrder === "ascending")
            return Number(a.price) - Number(b.price);
          if (sortOrder === "descending")
            return Number(b.price) - Number(a.price);
          return 0; // No sorting if no order is specified
        })
    : [];

  // set selected category by using React Lifting State Up
  const handleTabClick = (_id) => {
    setSelectedCategoryId(_id);
  };

  const handleSortSelector = (e) => {
    setSortOrder(e);
  };

  if (isCategoriesError || isProductError) {
    return (
      <section className="p-4 md:p-8 mx-4 md:mx-16">
        <div className="mt-4">
          <p className="text-red-500">Error fetching products or categories</p>
        </div>
      </section>
    );
  }

  return (
    <section className="p-4 md:p-8 mx-4 md:mx-16">
      <h2 className="text-2xl md:text-4xl font-bold">{children}</h2>
      <Separator className="mt-2" />
      <div className="flex flex-col md:flex-row justify-between mt-4 gap-4">
        <div className="flex flex-wrap items-center gap-2 md:gap-4">
          {isCategoriesLoading ? (
            <div className="flex flex-wrap gap-2 md:gap-3">
              <Skeleton className="h-4 w-[70px] md:w-[90px]" />
              <Skeleton className="h-4 w-[70px] md:w-[90px]" />
              <Skeleton className="h-4 w-[70px] md:w-[90px]" />
              <Skeleton className="h-4 w-[70px] md:w-[90px]" />
              <Skeleton className="h-4 w-[70px] md:w-[90px]" />
            </div>
          ) : (
            [
              { _id: "ALL", name: "All" },
              ...categories
                .slice() // avoid mutating original array
                .sort(
                  (a, b) =>
                    new Date(a.createdAt).getTime() -
                    new Date(b.createdAt).getTime()
                ),
            ].map((category) => (
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
            <SelectTrigger className="w-full md:w-[160px]">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex flex-col space-y-3">
              <Skeleton className="h-40 md:h-60 rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4" />
                <Skeleton className="h-4 w-[200px] md:w-[250px]" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <ProductCards products={sortedAndFilteredProducts} />
      )}
    </section>
  );
}

export default Products;
