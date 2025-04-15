import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import { Link } from "react-router";

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Button variant="primary">Create Product</Button>
      <Button variant="secondary">View Orders</Button>
      <Button variant="tertiary">
        <Link to="/admin/categories">
          <Package className="mr-2 h-4 w-4" /> Create Category
        </Link>
      </Button>
    </div>
  );
};

export default Dashboard;
