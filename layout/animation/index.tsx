"use client";

import React from "react";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { motion as m } from "framer-motion";

interface Animation {
  children: React.ReactNode;
}
const Animation: React.FC<Animation> = ({ children }) => {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      <m.main
        key={pathname}
        className="w-full h-full overflow-y-auto bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        exit={{ opacity: 1 }}
      >
        {children}
      </m.main>
    </AnimatePresence>
  );
};

export default Animation;