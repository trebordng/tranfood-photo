import AlbumPage from "@/components/album/AlbumPage";
import React from "react";
import drink from "@/public/images/drink.jpg";

const Drink = () => {
  return (
    <React.Fragment>
      <AlbumPage
        list="Drink"
        color="bg-blue"
        quote="There is no love sincerer than the love of food"
        author="-George Bernand Shaw"
        image={drink}
      />
    </React.Fragment>
  );
};

export default Drink;
