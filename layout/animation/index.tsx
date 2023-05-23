"use client";

import React from "react";
import { AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import { usePathname } from "next/navigation";
import { motion as m } from "framer-motion";

interface Animation {
  children: React.ReactNode;
}
const Animation: React.FC<Animation> = ({ children }) => {
  const pathname = usePathname();

  return (
    <LazyMotion features={domAnimation}>
      <m.main
        key={pathname}
        className="w-full h-full overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          type: "spring",
          duration: 1,
          damping: 20,
        }}
        exit={{ opacity: 1 }}
      >
        {children}
      </m.main>
    </LazyMotion>
  );
};

export default Animation;
