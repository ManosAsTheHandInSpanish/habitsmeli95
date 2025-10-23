import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "../../lib/cn";

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, onCheckedChange, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          type="checkbox"
          className={cn(
            "peer h-5 w-5 shrink-0 rounded border-2 border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none cursor-pointer habit-checkbox",
            "checked:bg-primary checked:border-primary checked:habit-checkbox-checked",
            className
          )}
          ref={ref}
          onChange={(e) => {
            if (onCheckedChange) {
              onCheckedChange(e.target.checked);
            }
            props.onChange?.(e);
          }}
          {...props}
        />
        <Check
          className="absolute top-0 left-0 h-5 w-5 text-primary-foreground pointer-events-none opacity-0 peer-checked:opacity-100"
          strokeWidth={3}
        />
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
