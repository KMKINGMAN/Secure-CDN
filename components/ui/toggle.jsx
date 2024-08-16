"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-white tw-transition-colors hover:tw-bg-zinc-100 hover:tw-text-zinc-500 focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-zinc-950 focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=on]:tw-bg-zinc-100 data-[state=on]:tw-text-zinc-900 dark:tw-ring-offset-zinc-950 dark:hover:tw-bg-zinc-800 dark:hover:tw-text-zinc-400 dark:focus-visible:tw-ring-zinc-300 dark:data-[state=on]:tw-bg-zinc-800 dark:data-[state=on]:tw-text-zinc-50",
  {
    variants: {
      variant: {
        default: "tw-bg-transparent",
        outline:
          "tw-border tw-border-zinc-200 tw-bg-transparent hover:tw-bg-zinc-100 hover:tw-text-zinc-900 dark:tw-border-zinc-800 dark:hover:tw-bg-zinc-800 dark:hover:tw-text-zinc-50",
      },
      size: {
        default: "tw-h-10 tw-px-3",
        sm: "tw-h-9 tw-px-2.5",
        lg: "tw-h-11 tw-px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Toggle = React.forwardRef(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props} />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }
