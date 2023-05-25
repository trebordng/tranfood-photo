"use client";

import React, { useEffect, useState } from "react";
import { auth } from "../../../utils/firebase";
import { useRouter } from "next/navigation";
import { User } from "firebase/auth";
import Animation from "@/layout/animation";

const UploadImage = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser: User | null) => {
      if (authUser?.email === "tranfoodphoto.vn@gmail.com" ) {
        setUser(authUser);
      } else {
        setUser(null);
        router.push("/");
      }
    });
    return unsubscribe;
  }, []);

  return user && <Animation>page</Animation>;
};

export default UploadImage;
