import { MediaIcon } from "@/type/type";
import Link from "next/link";
import React from "react";

const Icon: React.FC<MediaIcon> = ({ slug, icon: Icon }) => {
  return (
    <Link aria-label={slug} href={slug} target="_blank" rel="noopener">
      {Icon && <Icon className="xl:text-gray xl:hover:text-black text-white/70" />}
    </Link>
  );
};

export default Icon;
