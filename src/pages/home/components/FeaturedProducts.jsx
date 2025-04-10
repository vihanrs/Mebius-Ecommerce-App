import { useGetFeaturedProductsQuery } from "../../../lib/api";
import ProductCards from "./ProductCards";
import { Skeleton } from "@/components/ui/skeleton";

function FeaturedProducts({ children }) {
  const { data: products, isLoading, isError } = useGetFeaturedProductsQuery();

  if (isError) {
    return (
      <section className="p-4 md:p-8 mx-4 md:mx-16">
        <div className="mt-4">
          <p className="text-red-500">Error fetching featured products</p>
        </div>
      </section>
    );
  }

  return (
    <section className="p-4 md:p-8 mx-4 md:mx-16">
      <h2 className="text-2xl text-center md:text-4xl font-bold">{children}</h2>
      <p className="text-center pb-5 pt-3">
        Discover our latest tech innovations designed to enhance your everyday
        life.
      </p>
      <div className="mt-4">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
          <ProductCards products={products} />
        )}
      </div>
    </section>
  );
}

export default FeaturedProducts;
