import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { Switch } from "@/components/ui/switch";

const formSchema = z.object({
  code: z
    .string()
    .min(3, { message: "Code must be at least 3 characters." })
    .max(20, { message: "Code must not exceed 20 characters." }),

  discountPercentage: z
    .number({ invalid_type_error: "Must be a number" })
    .min(1, { message: "Discount must be at least 1%." })
    .max(100, { message: "Discount cannot exceed 100%." }),

  firstOrderOnly: z.boolean(),
  expiresAt: z.string().min(1, { message: "Expiration date is required." }),
});

const PromocodeDialog = ({ open, setOpen, onSave, existingPromocode }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
      discountPercentage: 10,
      firstOrderOnly: false,
      expiresAt: "",
    },
  });

  useEffect(() => {
    if (existingPromocode) {
      form.reset({
        code: existingPromocode.code,
        discountPercentage: existingPromocode.discountPercentage,
        firstOrderOnly: existingPromocode.firstOrderOnly,
        expiresAt: existingPromocode.expiresAt?.slice(0, 10), // trim to yyyy-mm-dd
      });
    } else {
      form.reset({
        code: "",
        discountPercentage: 10,
        firstOrderOnly: false,
        expiresAt: "",
      });
    }
  }, [existingPromocode, form]);

  const onSubmit = (values) => {
    const formattedValues = {
      ...values,
      discountPercentage: Number(values.discountPercentage),
    };

    if (existingPromocode) {
      onSave({ ...formattedValues, id: existingPromocode._id });
    } else {
      onSave(formattedValues);
    }
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {existingPromocode ? "Edit Promocode" : "Add Promocode"}
          </DialogTitle>
          <DialogDescription>
            {existingPromocode
              ? "Update promocode details below."
              : "Fill in the details to create a new promocode."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="NEWCODE25"
                      {...field}
                      disabled={!!existingPromocode} // code should not be editable
                    />
                  </FormControl>
                  <FormDescription>
                    The unique promocode users will enter.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discountPercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount (%)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter discount (e.g., 25)"
                      {...field}
                      onChange={(e) => field.onChange(+e.target.value)}
                    />
                  </FormControl>
                  <FormDescription>
                    The percentage discount applied with this code.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstOrderOnly"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel>First Order Only</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expiresAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expires At</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormDescription>
                    The date this promocode will expire.
                  </FormDescription>
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

export default PromocodeDialog;
