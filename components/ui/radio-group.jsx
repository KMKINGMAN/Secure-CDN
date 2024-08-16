"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef(({ className, ...props }, ref) => {
  return (<RadioGroupPrimitive.Root className={cn("tw-grid tw-gap-2", className)} {...props} ref={ref} />);
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef(({ className, ...props }, ref) => {
  return (
    (<RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-zinc-200 tw-border-zinc-900 tw-text-zinc-900 tw-ring-offset-white focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-zinc-950 focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 dark:tw-border-zinc-800 dark:tw-border-zinc-50 dark:tw-text-zinc-50 dark:tw-ring-offset-zinc-950 dark:focus-visible:tw-ring-zinc-300",
        className
      )}
      {...props}>
      <RadioGroupPrimitive.Indicator className="tw-flex tw-items-center tw-justify-center">
        <Circle className="tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>)
  );
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
