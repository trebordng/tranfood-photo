import { Timestamp } from "firebase/firestore";
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

export interface ImageObject {
  id?: string;
  title: string;
  url: string;
  timestamp?: Timestamp;
  blurDataURL: string;
}

export interface SnapShotImage {
  title: string;
  url: string;
  timestamp: Timestamp;
  blurDataURL: string;
}
