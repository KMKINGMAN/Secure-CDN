"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const MaskContainer = ({
  children,
  revealText,
  size = 10,
  revealSize = 600,
  className
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });
  const containerRef = useRef(null);
  const updateMousePosition = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  useEffect(() => {
    containerRef.current.addEventListener("mousemove", updateMousePosition);
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("mousemove", updateMousePosition);
      }
    };
  }, []);
  let maskSize = isHovered ? revealSize : size;

  return (
    (<motion.div
      ref={containerRef}
      className={cn("tw-h-screen tw-relative", className)}
      animate={{
        backgroundColor: isHovered ? "var(--slate-900)" : "var(--white)",
      }}>
      <motion.div
        className="tw-w-full tw-h-full tw-flex tw-items-center tw-justify-center tw-text-6xl tw-absolute tw-bg-black tw-bg-grid-white/[0.2] tw-text-white [mask-image:tw-url(/mask.svg)] [mask-size:tw-40px] [mask-repeat:tw-no-repeat]"
        animate={{
          WebkitMaskPosition: `${mousePosition.x - maskSize / 2}px ${
            mousePosition.y - maskSize / 2
          }px`,
          WebkitMaskSize: `${maskSize}px`,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.1 }}>
        <div
          className="tw-absolute tw-inset-0 tw-bg-black tw-h-full tw-w-full tw-z-0 tw-opacity-50" />
        <div
          onMouseEnter={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
          }}
          className="tw-max-w-4xl tw-mx-auto tw-text-center tw-text-white tw- tw-text-4xl tw-font-bold tw-relative tw-z-20">
          {children}
        </div>
      </motion.div>
      <div
        className="tw-w-full tw-h-full tw-flex tw-items-center tw-justify-center tw- tw-text-white">
        {revealText}
      </div>
    </motion.div>)
  );
};
