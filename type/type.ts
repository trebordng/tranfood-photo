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
  onClick?: () => void;
}

export interface MediaIcon {
  slug: string;
  icon?: IconType;
}

export interface ImageObject {
  pageId: number;
  id?: string;
  title: string;
  url: string;
  timestamp?: Timestamp;
  blurDataURL: string;
  width?: number;
  height?: number;
}

export interface SnapShotImage {
  title: string;
  url: string;
  timestamp: Timestamp;
  blurDataURL: string;
}

export interface Post {
  title: string;
  image1: any;
  description1: string;
  [key: string]: any;
}

export interface PostData {
  id:string;
  post: Post;
  timestamp: string;
}
