import { Slot } from "@radix-ui/react-slot";
import { type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../lib";
import { buttonVariants } from "./button-variants";
import { RotateCcw } from "lucide-react";
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

type PendingButtonProps = Omit<ButtonProps, "asChild"> & {
  isPending?: boolean;
};

const PendingButton = React.forwardRef<HTMLButtonElement, PendingButtonProps>(
  ({ isPending, disabled, children, ...props }, ref) => {
    return (
      <Button {...props} disabled={disabled || isPending} ref={ref}>
        {isPending && <RotateCcw className="mr-2 size-4 animate-spin" />}
        {children}
      </Button>
    );
  },
);

export { Button, PendingButton };
