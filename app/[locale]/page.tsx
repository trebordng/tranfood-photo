'use client';

import Animation from "@/layout/animation";
import Image from "next/image";
import home from "@/public/images/home.jpg"
export default function Home() {
  return (
    <Animation>
      <Image
        src={home.src}
        placeholder="blur"
        loading="eager"
        blurDataURL={home.blurDataURL}
        sizes="auto"
        width={100}
        height={100}
        alt="Cabbage with Sesame Seeds"
        className="h-full w-full object-cover"
      />
      <h1 className="absolute top-[50%] left-[50%] text-2xl text-white">Test</h1>
    </Animation>
  );
}
