import { useState } from "react";
import { CategoryTable } from "@/pages/admin/components/category/CategoryTable";
import CategoryDialog from "@/pages/admin/components/category/CategoryDialog";
import {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useUpdateCategoryStatusMutation,
} from "@/lib/api";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@radix-ui/react-scroll-area";

const CategoryManagement = () => {
  const { data: categories = [], refetch, isLoading } = useGetCategoriesQuery();

  const [open, setOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [updateCategoryStatus] = useUpdateCategoryStatusMutation();

  const toTitleCase = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleAddCategory = async (category) => {
    try {
      const formatedCategory = {
        ...category,
        name: toTitleCase(category.name.trim()),
      };
      await createCategory(formatedCategory).unwrap();
      toast.success("Category created successfully");
      refetch(); // re-fetch categories after mutation
    } catch (error) {
      const message = error?.data?.message || "Failed to create category.";
      toast.error(message);
    }
  };

  const handleUpdateCategory = async (category) => {
    try {
      const formatedCategory = {
        ...category,
        name: toTitleCase(category.name.trim()),
      };
      await updateCategory(formatedCategory).unwrap();
      refetch();
      toast.success("Category updated successfully!");
    } catch (error) {
      const message = error?.data?.message || "Failed to update category.";
      toast.error(message);
    }
  };

  const handleInactivateCategory = async (id) => {
    try {
      await updateCategoryStatus({ id, isActive: false }).unwrap();
      refetch();
      toast.success("Category deactivated.");
    } catch (error) {
      const message = error?.data?.message || "Failed to deactivate category.";
      toast.error(message);
    }
  };

  const handleReactivateCategory = async (id) => {
    try {
      await updateCategoryStatus({ id, isActive: true }).unwrap();
      refetch();
      toast.success("Category reactivated.");
    } catch (error) {
      const message = error?.data?.message || "Failed to reactivate category.";
      toast.error(message);
    }
  };

  const openAddDialog = () => {
    setEditingCategory(null);
    setOpen(true);
  };

  const openEditDialog = (category) => {
    setEditingCategory(category);
    setOpen(true);
  };

  return (
    <div className="space-y-4 container mx-auto px-10">
      <div className="text-center m-4">
        <h2 className="text-2xl font-semibold mb-2">Manage Categories</h2>
        <p className="text-sm text-muted-foreground mb-2">
          View, edit, and organize product categories to keep your store
          structured and easy to navigate.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-4 md:mx-16 mx-auto">
          {/* Input & Button skeletons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
            <Skeleton className="h-10 w-full sm:w-1/3" />
            <Skeleton className="h-10 w-40" />
          </div>

          {/* Table skeleton rows */}
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
          <CategoryTable
            categories={categories}
            onAdd={openAddDialog}
            onEdit={openEditDialog}
            onInactive={handleInactivateCategory}
            onReactive={handleReactivateCategory}
          />
        </ScrollArea>
      )}

      <CategoryDialog
        open={open}
        setOpen={setOpen}
        onSave={editingCategory ? handleUpdateCategory : handleAddCategory}
        existingCategory={editingCategory}
      />
    </div>
  );
};

export default CategoryManagement;
