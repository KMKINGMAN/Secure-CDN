"use client";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export function MagicHero() {
  const words = [
    {
      text: "Upload Your Files Securely using .",
    },
    {
      text: "\"KMCoders Secure CDN\"",
      className: "tw-text-blue-500 dark:tw-text-blue-500"
      
    },
  ];
  return (
    <div className="tw-text-blue-500 dark:tw-text-blue-500 tw-flex tw-flex-col tw-items-center tw-justify-center tw-h-[40rem]">
      <TypewriterEffectSmooth words={words} />
      <div className='tw-flex tw-flex-col md:tw-flex-row tw-space-y-4 md:tw-space-y-0 tw-space-x-0 md:tw-space-x-4'>
        <Link href='/dashboard' className={buttonVariants()}>
          Get Start
        </Link>
      </div>
    </div>
  );
}