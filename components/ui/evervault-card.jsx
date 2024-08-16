"use client";
import { useMotionValue } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useMotionTemplate, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const EvervaultCard = ({
  text,
  className
}) => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  const [randomString, setRandomString] = useState("");

  useEffect(() => {
    let str = generateRandomString(1500);
    setRandomString(str);
  }, []);

  function onMouseMove({
    currentTarget,
    clientX,
    clientY
  }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);

    const str = generateRandomString(1500);
    setRandomString(str);
  }

  return (
    (<div
      className={cn(
        "tw-p-0.5 tw- tw-bg-transparent tw-aspect-square tw- tw-flex tw-items-center tw-justify-center tw-w-full tw-h-full tw-relative",
        className
      )}>
      <div
        onMouseMove={onMouseMove}
        className="tw-group/card tw-rounded-3xl tw-w-full tw-relative tw-overflow-hidden tw-bg-transparent tw-flex tw-items-center tw-justify-center tw-h-full">
        <CardPattern mouseX={mouseX} mouseY={mouseY} randomString={randomString} />
        <div className="tw-relative tw-z-10 tw-flex tw-items-center tw-justify-center">
          <div
            className="tw-relative tw-h-44 tw-w-44 tw- tw-rounded-full tw-flex tw-items-center tw-justify-center tw-text-white tw-font-bold tw-text-4xl">
            <div
              className="tw-absolute tw-w-full tw-h-full tw-bg-white/[0.8] dark:tw-bg-black/[0.8] tw-blur-sm tw-rounded-full" />
            <span className="dark:tw-text-white tw-text-black tw-z-20">{text}</span>
          </div>
        </div>
      </div>
    </div>)
  );
};

export function CardPattern({
  mouseX,
  mouseY,
  randomString
}) {
  let maskImage = useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, white, transparent)`;
  let style = { maskImage, WebkitMaskImage: maskImage };

  return (
    (<div className="tw-pointer-events-none">
      <div
        className="tw-absolute tw-inset-0 tw-rounded-2xl tw- [mask-image:tw-linear-gradient(white,transparent)] tw-group-hover/card:opacity-50"></div>
      <motion.div
        className="tw-absolute tw-inset-0 tw-rounded-2xl tw-bg-gradient-to-r tw-from-green-500 tw-to-blue-700 tw-opacity-0 tw- tw-group-hover/card:opacity-100 tw-backdrop-blur-xl tw-transition tw-duration-500"
        style={style} />
      <motion.div
        className="tw-absolute tw-inset-0 tw-rounded-2xl tw-opacity-0 tw-mix-blend-overlay tw- tw-group-hover/card:opacity-100"
        style={style}>
        <p
          className="tw-absolute tw-inset-x-0 tw-text-xs tw-h-full tw-break-words tw-whitespace-pre-wrap tw-text-white tw-font-mono tw-font-bold tw-transition tw-duration-500">
          {randomString}
        </p>
      </motion.div>
    </div>)
  );
}

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
export const generateRandomString = (length) => {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const Icon = ({
  className,
  ...rest
}) => {
  return (
    (<svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>)
  );
};
