import ContactPage from "@/components/contact";
import Animation from "@/layout/animation";
import React from "react";
import { useTranslations } from "next-intl";

const About = () => {
    const t = useTranslations("contact");
    const translateObj = {
        intro:t("intro"),
        name:t("name"),
        email:t("email"),
        subject:t("subject"),
        message:t("message"),
        submit:t("submit")
    }
  return (
    <Animation>
      <ContactPage translateObj={translateObj}/>
    </Animation>
  );
};

export default About;
