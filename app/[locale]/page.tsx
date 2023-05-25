import food from "@/public/images/food.jpg";
import drink from "@/public/images/drink.jpg";
import action from "@/public/images/action.jpg";
import lifestyle from "@/public/images/lifestyle.jpg";
import Animation from "@/layout/animation";
import { Album } from "@/type/type";
import AlbumLink from "@/components/album/AlbumLink";

export default function Album() {
  const albums: Album[] = [
    { name: "food", image: food, slug: "/food" },
    { name: "drink", image: drink, slug: "/drink" },
    { name: "action", image: action, slug: "/action" },
    { name: "lifestyle", image: lifestyle, slug: "/lifestyle" },
  ];

  return (
    <Animation>
      <section className="flex flex-col lg:flex-wrap lg:flex-row gap-16 md:gap-24 lg:gap-32 xl:gap-40 h-full overflow-x-hidden">
        {albums.map((album: Album) => (
          <AlbumLink slug={album.slug} image={album.image} name={album.name} />
        ))}
      </section>
    </Animation>
  );
}
