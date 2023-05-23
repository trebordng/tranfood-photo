import Animation from "@/layout/animation";
import Image from "next/image";
import home from "@/public/images/home.jpg";
export default function Home() {
  console.log(home.blurDataURL);
  return (
    <Image
      src={home.src}
      placeholder="blur"
      blurDataURL={home.blurDataURL}
      sizes="auto"
      width={100}
      height={100}
      alt="Cabbage with Sesame Seeds"
      className="h-full w-full object-cover"
    ></Image>
  );
}
