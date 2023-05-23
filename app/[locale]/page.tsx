"use client";

import Animation from "@/layout/animation";
import Image from "next/image";
import home from "@/public/images/home.jpg";
export default function Home() {
  return (
    <div className="w-full h-full overflow-y-auto">
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
    </div>
  );
}
