import Animation from "@/layout/animation";
import Image from "next/image";
import home from "@/public/images/home.jpg"
export default function Home() {
  return (
    <Animation>
      <Image
        src={home.src}
        placeholder="blur"
        blurDataURL={home.blurDataURL}
        sizes="auto"
        width={100}
        height={100}
        alt="Cabbage with Sesame Seeds"
        priority
        className="h-full w-full object-cover bg-black"
      ></Image>
    </Animation>
  );
}
