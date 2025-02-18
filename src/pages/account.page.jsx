import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@clerk/clerk-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { LayoutDashboard, Package } from "lucide-react";
import { Link, Navigate } from "react-router";

const AccountPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const isAdmin = user.publicMetadata.role === "admin";

  if (!isLoaded) {
    return (
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <Skeleton className="h-16 w-16 rounded-full mr-4" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-60" />
            </div>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
      </main>
    );
  }

  if (!isSignedIn) {
    return <Navigate to={"/sign-in"} />;
  }

  return (
    <main className="p-8 md:mx-16">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="flex flex-row items-center space-y-0 pb-8">
          <Avatar className="h-16 w-16 mr-4">
            <AvatarImage src={user.imageUrl} alt={user.fullName || ""} />
            <AvatarFallback>{user.fullName?.[0] || "U"}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{user.fullName}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {user.emailAddresses[0].emailAddress}
            </p>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4">
          {isAdmin ? (
            <>
              {/* <Button asChild className="w-full justify-start">
                <Link to="/admin/dashboard">
                  <LayoutDashboard className="mr-2 h-4 w-4" /> Admin Dashboard
                </Link>
              </Button> */}

              <Button asChild className="w-full justify-start">
                <Link to="/admin/products/new">
                  <LayoutDashboard className="mr-2 h-4 w-4" /> Create Product
                </Link>
              </Button>
            </>
          ) : (
            <Button asChild className="w-full justify-start">
              <Link to="/my-orders">
                <Package className="mr-2 h-4 w-4" /> My Orders
              </Link>
            </Button>
          )}
        </CardContent>
      </Card>
    </main>
  );
};

export default AccountPage;
