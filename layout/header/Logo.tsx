import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link aria-label="tran-food-logo" href="/" id="logo">
      <Image
        alt="Tran Food Photography Logo"
        src="/images/logo.png"
        height={60}
        width={120}
        priority
        className="h-64 md:h-72 lg:h-80 xl:h-96 w-auto max-w-[unset]"
      />
    </Link>
  );
};

export default Logo;
