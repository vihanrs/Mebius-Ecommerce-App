import { useState } from "react";
import { toast } from "sonner";
import { ScrollArea } from "@radix-ui/react-scroll-area";

import { ProductTable } from "@/pages/admin/components/product/ProductTable";
import ProductDialog from "@/pages/admin/components/product/ProductDialog";

import {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUpdateProductStatusMutation,
  useGetActiveCategoriesQuery,
} from "@/lib/api";

import { Skeleton } from "@/components/ui/skeleton";

const ProductManagement = () => {
  const { data: products = [], refetch, isLoading } = useGetProductsQuery();
  const { data: categories = [], isLoading: isCategoriesLoading } =
    useGetActiveCategoriesQuery();

  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [updateProductStatus] = useUpdateProductStatusMutation();

  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleAddProduct = async (product) => {
    try {
      await createProduct(product).unwrap();
      toast.success("Product created successfully!");
      refetch();
    } catch (error) {
      const message = error?.data?.message || "Failed to create product.";
      toast.error(message);
    }
  };

  const handleUpdateProduct = async (product) => {
    try {
      await updateProduct(product).unwrap();
      toast.success("Product updated successfully!");
      refetch();
    } catch (error) {
      const message = error?.data?.message || "Failed to update product.";
      toast.error(message);
    }
  };

  const handleInactivateProduct = async (id) => {
    try {
      await updateProductStatus({ id, isActive: false }).unwrap();
      toast.success("Product deactivated.");
      refetch();
    } catch (error) {
      const message = error?.data?.message || "Failed to deactivate product.";
      toast.error(message);
    }
  };

  const handleReactivateProduct = async (id) => {
    try {
      await updateProductStatus({ id, isActive: true }).unwrap();
      toast.success("Product reactivated.");
      refetch();
    } catch (error) {
      const message = error?.data?.message || "Failed to reactivate product.";
      toast.error(message);
    }
  };

  const openAddDialog = () => {
    setEditingProduct(null);
    setOpen(true);
  };

  const openEditDialog = (product) => {
    setEditingProduct(product);
    setOpen(true);
  };

  return (
    <div className="space-y-4 container mx-auto px-10">
      <div className="text-center m-4">
        <h2 className="text-2xl font-semibold mb-2">Manage Products</h2>
        <p className="text-sm text-muted-foreground mb-2">
          Create, edit, and manage product listings for your store.
        </p>
      </div>

      {isLoading && isCategoriesLoading ? (
        <div className="space-y-4 md:mx-16 mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
            <Skeleton className="h-10 w-full sm:w-1/3" />
            <Skeleton className="h-10 w-40" />
          </div>

          <div className="rounded-md border p-4 space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between gap-4">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <ScrollArea>
          <ProductTable
            products={products}
            categories={categories}
            onAdd={openAddDialog}
            onEdit={openEditDialog}
            onInactive={handleInactivateProduct}
            onReactive={handleReactivateProduct}
          />
        </ScrollArea>
      )}

      <ProductDialog
        open={open}
        setOpen={setOpen}
        onSave={editingProduct ? handleUpdateProduct : handleAddProduct}
        product={editingProduct}
        categories={categories}
      />
    </div>
  );
};

export default ProductManagement;
