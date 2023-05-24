import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link aria-label="Tran food Photo" href="/">
      <Image
        alt="Tran Food Photography Logo"
        src="/images/logo.png"
        height={60}
        width={120}
        priority
        className="h-64 md:h-72 lg:h-80 xl:h-96 w-auto"
      />
    </Link>
  );
};

export default Logo;
