import AlbumPage from "@/components/album/AlbumPage";
import React from "react";
import drink from "@/public/images/drink.jpg";

export const metadata = {
  title: "Drink | Tran Food Photography",
  description: "Generated by create next app",
  alternates: {
    canonical: "https://tranfood-photo.vercel.app/drink",
    languages: {
      en: "https://tranfood-photo.vercel.app/en",
      vi: "https://tranfood-photo.vercel.app/vi",
    },
  },
};

const Drink = () => {
  return (
    <React.Fragment>
      <AlbumPage
        list="Drink"
        color="bg-gray-500"
        quote="There is no love sincerer than the love of food"
        author="-George Bernand Shaw"
        image={drink}
      />
    </React.Fragment>
  );
};

export default Drink;
