import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const formSchema = z.object({
  categoryId: z.string({ required_error: "Please select a category." }),
  name: z.string().min(2).max(100),
  price: z.coerce.number().min(0.01).max(1000000),
  description: z.string().min(10).max(1000),
  stockQuantity: z.coerce.number().int().min(0),
  tags: z
    .string()
    .transform((val) => (val ? val.split(",").map((t) => t.trim()) : [])),
  isActive: z.boolean().default(true),
  imageUrl: z.string().default("/placeholder.svg?height=200&width=200"),
});

const ProductDialog = ({
  open,
  setOpen,
  onSave,
  existingProduct,
  categories,
}) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    criteriaMode: "all",
    defaultValues: {
      categoryId: "",
      name: "",
      price: 0,
      description: "",
      stockQuantity: 0,
      tags: "",
      imageUrl: "/placeholder.svg?height=200&width=200",
    },
  });

  useEffect(() => {
    if (existingProduct) {
      form.reset({
        categoryId: existingProduct.categoryId,
        name: existingProduct.name,
        price: existingProduct.price,
        description: existingProduct.description,
        stockQuantity: existingProduct.stockQuantity,
        tags: existingProduct.tags.join(", "),
        imageUrl: existingProduct.imageUrl,
      });
    } else {
      form.reset();
    }
  }, [existingProduct, form]);

  const onSubmit = (values) => {
    const formatted = { ...values, tags: values.tags };
    if (existingProduct) {
      onSave({ ...formatted, id: existingProduct._id });
    } else {
      onSave(formatted);
    }
    setOpen(false);
    form.reset();
  };

  const handleImageUpload = () => {
    alert("This would open a file picker to upload an image.");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="sm:max-w-[600px]"
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>
            {existingProduct ? "Edit Product" : "Add Product"}
          </DialogTitle>
          <DialogDescription>
            {existingProduct
              ? "Update product details below."
              : "Fill in the details to create a new product."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* 2-column layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent
                          ref={(ref) => {
                            if (!ref) return;
                            ref.style.position = "relative";
                            ref.style.zIndex = "50";
                          }}
                        >
                          {categories
                            .filter((c) => c.isActive)
                            .map((c) => (
                              <SelectItem key={c._id} value={c._id}>
                                {c.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        The category this product belongs to.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Product name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="stockQuantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock Quantity</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Image</FormLabel>
                      <div className="flex flex-col items-center gap-4">
                        <img
                          src={field.value || "/placeholder.svg"}
                          alt="Product"
                          width={150}
                          height={150}
                          className="rounded-md border object-cover"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleImageUpload}
                        >
                          Upload Image
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <Input placeholder="tag1, tag2, tag3" {...field} />
                      </FormControl>
                      <FormDescription>
                        Comma-separated list of tags.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Description (full-width) */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Detailed description..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;
