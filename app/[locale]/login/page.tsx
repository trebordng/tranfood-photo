"use client";

import { User, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../utils/firebase";
import { useRouter } from "next/navigation";
import Animation from "@/layout/animation";
import { useEffect, useState } from "react";
import FormInput from "@/components/input/FormInput";

const Login = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const emailLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        router.push("/uploadImage");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser: User | null) => {
      if (authUser) {
        setLoading(false);
        router.push("/uploadImage");
      } else {
        setLoading(true);
      }
    });
    return unsubscribe;
  }, [user]);

  return (
    loading && (
      <Animation>
        <section className="flex items-center justify-center rounded-lg flex-auto">
          <form
            className="p-16 md:p-24 lg:p-32 xl:p-40 max-w-[calc(100%-16px)] shadow-xl rounded-lg bg-white"
            onSubmit={emailLogin}
          >
            <FormInput
              name="Username"
              value={username}
              placeholder="Username"
              type="text"
              setValue={setUsername}
            />
            <FormInput
              name="Password"
              value={password}
              placeholder="Password"
              type="password"
              setValue={setPassword}
            />
            <button
              type="submit"
              className="relative top-0 hover:-top-8 mt-16 bg-purple-1 text-white font-semibold outline-none py-8 px-24 rounded-md w-full transition-all duration-200"
            >
              Sign In
            </button>
          </form>
        </section>
      </Animation>
    )
  );
};

export default Login;
