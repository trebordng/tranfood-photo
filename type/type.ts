import { StaticImageData } from "next/image";
import { IconType } from "react-icons";

export interface Album {
  name: string;
  image: StaticImageData;
  slug: string;
}

export interface PageLink {
  slug: string;
  name: string;
  sub: boolean;
}

export interface MediaIcon {
  slug: string;
  icon?: IconType;
}
