import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children
}) => {
  return (
    (<div
      className={cn(
        "tw-grid md:tw-auto-rows-[18rem] tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-4 tw-max-w-7xl tw-mx-auto tw-",
        className
      )}>
      {children}
    </div>)
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon
}) => {
  return (
    (<div
      className={cn(
        "tw-row-span-1 tw-rounded-xl tw-group/bento hover:tw-shadow-xl tw-transition tw-duration-200 tw-shadow-input dark:tw-shadow-none tw-p-4 dark:tw-bg-black dark:tw-border-white/[0.2] tw-bg-white tw-border tw-border-transparent tw-justify-between tw-flex tw-flex-col tw-space-y-4",
        className
      )}>
      {header}
      <div
        className="tw-group-hover/bento:translate-x-2 tw-transition tw-duration-200">
        {icon}
        <div
          className="tw-font-sans tw-font-bold tw-text-neutral-600 dark:tw-text-neutral-200 tw-mb-2 tw-mt-2">
          {title}
        </div>
        <div
          className="tw-font-sans tw-font-normal tw-text-neutral-600 tw-text-xs dark:tw-text-neutral-300">
          {description}
        </div>
      </div>
    </div>)
  );
};
