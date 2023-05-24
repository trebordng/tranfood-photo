import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";

interface Icon {
  slug: string;
  icon?: IconType;
}
const Icon: React.FC<Icon> = ({ slug, icon: Icon }) => {
  return (
    <Link aria-label={slug} href={slug} target="_blank" rel="noopener">
      {Icon && <Icon className="color-white" />}
    </Link>
  );
};

export default Icon;
