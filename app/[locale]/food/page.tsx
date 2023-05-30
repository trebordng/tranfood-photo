import AlbumPage from "@/components/album/AlbumPage";
import React from "react";
import food from "@/public/images/food.jpg";

const Food = () => {
  return (
    <React.Fragment>
      <AlbumPage list="Food" color="bg-yellow" quote="There is no love sincerer than the love of food" author="-George Bernand Shaw" image={food} />
    </React.Fragment>
  );
};

export default Food;
