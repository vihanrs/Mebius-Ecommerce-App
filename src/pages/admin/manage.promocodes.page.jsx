import { useState } from "react";
import { PromocodeTable } from "@/pages/admin/components/promocode/PromocodeTable";
import PromocodeDialog from "@/pages/admin/components/promocode/PromocodeDialog";

import {
  useGetPromoCodesQuery,
  useCreatePromocodeMutation,
  useUpdatePromocodeMutation,
  useUpdatePromocodeStatusMutation,
} from "@/lib/api";

import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@radix-ui/react-scroll-area";

const PromocodeManagement = () => {
  const { data: promocodes = [], refetch, isLoading } = useGetPromoCodesQuery();

  const [open, setOpen] = useState(false);
  const [editingPromocode, setEditingPromocode] = useState(null);

  const [createPromocode] = useCreatePromocodeMutation();
  const [updatePromocode] = useUpdatePromocodeMutation();
  const [updatePromocodeStatus] = useUpdatePromocodeStatusMutation();

  const handleAddPromocode = async (promocode) => {
    try {
      await createPromocode(promocode).unwrap();
      toast.success("Promocode created successfully!");
      refetch();
    } catch (error) {
      const message = error?.data?.message || "Failed to create promocode.";
      toast.error(message);
    }
  };

  const handleUpdatePromocode = async (promocode) => {
    try {
      await updatePromocode(promocode).unwrap();
      toast.success("Promocode updated successfully!");
      refetch();
    } catch (error) {
      const message = error?.data?.message || "Failed to update promocode.";
      toast.error(message);
    }
  };

  const handleInactivatePromocode = async (id) => {
    try {
      await updatePromocodeStatus({ id, isActive: false }).unwrap();
      toast.success("Promocode deactivated.");
      refetch();
    } catch (error) {
      const message = error?.data?.message || "Failed to deactivate promocode.";
      toast.error(message);
    }
  };

  const handleReactivatePromocode = async (id) => {
    try {
      await updatePromocodeStatus({ id, isActive: true }).unwrap();
      toast.success("Promocode reactivated.");
      refetch();
    } catch (error) {
      const message = error?.data?.message || "Failed to reactivate promocode.";
      toast.error(message);
    }
  };

  const openAddDialog = () => {
    setEditingPromocode(null);
    setOpen(true);
  };

  const openEditDialog = (promocode) => {
    setEditingPromocode(promocode);
    setOpen(true);
  };

  return (
    <div className="space-y-4 container mx-auto px-10">
      <div className="text-center m-4">
        <h2 className="text-2xl font-semibold mb-2">Manage Promocodes</h2>
        <p className="text-sm text-muted-foreground mb-2">
          Create, edit, and manage discount codes to boost your sales.
        </p>
      </div>

      {isLoading ? (
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
          <PromocodeTable
            promocodes={promocodes}
            onAdd={openAddDialog}
            onEdit={openEditDialog}
            onInactive={handleInactivatePromocode}
            onReactive={handleReactivatePromocode}
          />
        </ScrollArea>
      )}

      <PromocodeDialog
        open={open}
        setOpen={setOpen}
        onSave={editingPromocode ? handleUpdatePromocode : handleAddPromocode}
        existingPromocode={editingPromocode}
      />
    </div>
  );
};

export default PromocodeManagement;
