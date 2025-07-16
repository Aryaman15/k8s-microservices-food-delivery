// src/components/ui/CartCounter.tsx
import { Button } from "./Button";

interface CartCounterProps {
  count: number;
  onIncrement(): void;
  onDecrement(): void;
}

export function CartCounter({
  count,
  onIncrement,
  onDecrement,
}: CartCounterProps) {
  return (
    <div className="flex items-center space-x-2">
      <Button
        size="sm"
        variant="outline"
        onClick={onDecrement}
        className="w-8 h-8 p-0"
      >
        –
      </Button>
      <span className="w-6 text-center">{count}</span>
      <Button
        size="sm"
        variant="default"
        onClick={onIncrement}
        className="w-8 h-8 p-0"
      >
        +
      </Button>
    </div>
  );
}
