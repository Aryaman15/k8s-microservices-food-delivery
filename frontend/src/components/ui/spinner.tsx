// src/components/ui/spinner.tsx
import { Loader2 } from "lucide-react";

export function Spinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };
  return <Loader2 className={`animate-spin ${sizes[size]}`} />;
}
