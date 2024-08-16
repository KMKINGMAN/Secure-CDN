import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-white tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-zinc-950 focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 dark:tw-ring-offset-zinc-950 dark:focus-visible:tw-ring-zinc-300",
  {
    variants: {
      variant: {
        default: "tw-bg-zinc-900 tw-text-zinc-50 hover:tw-bg-zinc-900/90 dark:tw-bg-zinc-50 dark:tw-text-zinc-900 dark:hover:tw-bg-zinc-50/90",
        destructive:
          "tw-bg-red-500 tw-text-zinc-50 hover:tw-bg-red-500/90 dark:tw-bg-red-900 dark:tw-text-zinc-50 dark:hover:tw-bg-red-900/90",
        outline:
          "tw-border tw-border-zinc-200 tw-bg-white hover:tw-bg-zinc-100 hover:tw-text-zinc-900 dark:tw-border-zinc-800 dark:tw-bg-zinc-950 dark:hover:tw-bg-zinc-800 dark:hover:tw-text-zinc-50",
        secondary:
          "tw-bg-zinc-100 tw-text-zinc-900 hover:tw-bg-zinc-100/80 dark:tw-bg-zinc-800 dark:tw-text-zinc-50 dark:hover:tw-bg-zinc-800/80",
        ghost: "hover:tw-bg-zinc-100 hover:tw-text-zinc-900 dark:hover:tw-bg-zinc-800 dark:hover:tw-text-zinc-50",
        link: "tw-text-zinc-900 tw-underline-offset-4 hover:tw-underline dark:tw-text-zinc-50",
      },
      size: {
        default: "tw-h-10 tw-px-4 tw-py-2",
        sm: "tw-h-9 tw-rounded-md tw-px-3",
        lg: "tw-h-11 tw-rounded-md tw-px-8",
        icon: "tw-h-10 tw-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    (<Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />)
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
