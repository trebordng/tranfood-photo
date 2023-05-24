"use client";

import Animation from "@/layout/animation";
import Image, { StaticImageData } from "next/image";
import food from "@/public/images/food.jpg";
import drink from "@/public/images/drink.jpg";
import action from "@/public/images/action.jpg";
import lifestyle from "@/public/images/lifestyle.jpg";

import Link from "next/link";
interface Album {
  name: string;
  image: StaticImageData;
  slug: string;
}

export default function Album() {
  const albums: Album[] = [
    { name: "Food", image: food, slug: "/food" },
    { name: "Drink", image: drink, slug: "/drink" },
    { name: "Action", image: action, slug: "/action" },
    { name: "Lifestyle", image: lifestyle, slug: "/lifestyle" },
  ];

  return (
    <Animation>
      <section className="flex flex-col lg:flex-wrap lg:flex-row gap-16 md:gap-24 lg:gap-32 xl:gap-40 h-full overflow-x-hidden">
        {albums.map((album: Album) => (
          <Link
            href={album.slug}
            key={album.slug}
            className="lg:w-[calc(50%-20px)] lg:h-[calc(50%-20px)] lg:max-h-[50vh] rounded-lg overflow-hidden relative bg-black hover:bg-none"
          >
            <Image
              src={album.image.src}
              placeholder="blur"
              loading="lazy"
              blurDataURL={album.image.blurDataURL}
              sizes="auto"
              width={100}
              height={100}
              alt="Cabbage with Sesame Seeds"
              className="h-full w-full object-cover hover:blur-sm transition opacity-80 hover:opacity-1"
            />
            <h2 className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl uppercase font-bold">
              {album.name}
            </h2>
          </Link>
        ))}
      </section>
    </Animation>
  );
}
