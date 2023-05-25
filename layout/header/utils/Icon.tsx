import { MediaIcon } from "@/type/type";
import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";

const Icon: React.FC<MediaIcon> = ({ slug, icon: Icon }) => {
  return (
    <Link aria-label={slug} href={slug} target="_blank" rel="noopener">
      {Icon && <Icon className="color-white" />}
    </Link>
  );
};

export default Icon;
