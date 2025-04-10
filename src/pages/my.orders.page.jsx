import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useGetOrdersByUserQuery } from "@/lib/api";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router";

function MyOrdersPage() {
  const { data: orders, isLoading, isError } = useGetOrdersByUserQuery();
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-500",
      confirmed: "bg-blue-500",
      shipped: "bg-purple-500",
      delivered: "bg-green-500",
      cancelled: "bg-red-500",
    };
    return colors[status.toLowerCase()] || "bg-gray-500";
  };

  const operOrder = (orderId) => {
    navigate(`/shop/order-details?orderId=${orderId}`, {
      state: { fromMyOrders: true },
    });
  };

  if (isLoading) {
    return (
      <div className="p-8 md:mx-16">
        <h1 className="text-4xl font-bold mb-8">My Orders</h1>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 md:mx-16">
        <h1 className="text-4xl font-bold mb-8">My Orders</h1>
        <p className="text-red-500">Failed to load orders</p>
      </div>
    );
  }

  return (
    <main className="p-8 md:mx-16">
      <h1 className="text-4xl font-bold mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">You haven't placed any orders yet.</p>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow
                  key={order._id}
                  onClick={() => operOrder(order._id)}
                  className="cursor-pointer hover:bg-sky-100"
                >
                  <TableCell className="font-medium">
                    {order._id.slice(-8)}
                  </TableCell>
                  <TableCell>
                    {format(new Date(order.orderDate), "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {order.items.map((item) => (
                        <div key={item._id} className="text-sm">
                          {item.product.name} ({item.quantity})
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>${order.grandTotal.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge
                      className={`${getStatusColor(
                        order.orderStatus
                      )} text-white`}
                    >
                      {order.orderStatus}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </main>
  );
}

export default MyOrdersPage;
