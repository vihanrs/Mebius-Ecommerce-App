import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const PromoBanner = () => {
  return (
    <div className="overflow-hidden w-full">
      <div className="animate-marquee flex whitespace-nowrap">
        {[...Array(5)].map((_, i) => (
          <Alert
            key={i}
            variant="default"
            className="border-x-0 inline-flex min-w-max px-8"
          >
            <AlertCircle className="h-4 w-4 mr-2" />
            <AlertDescription className="font-medium">
              Use promo code <strong className="text-rose-600">SUMMER10</strong>{" "}
              for 10% off your first order!
            </AlertDescription>
          </Alert>
        ))}
      </div>
    </div>
  );
};

// Add animation to Tailwind CSS
const style = document.createElement("style");
style.textContent = `
  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  
  .animate-marquee {
    animation: marquee 20s linear infinite;
  }
`;
document.head.appendChild(style);

export default PromoBanner;
