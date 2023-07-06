import React from "react";
import PhoneNav from "./PhoneNav";
import NavLinks from "./NavLinks";
import { useTranslations } from "next-intl";
import { PageLink } from "@/type/type";

const Navbar = () => {
  const t = useTranslations("navbar");
  const pages: PageLink[] = [
    { slug: "/", name: t("album"), sub: false },
    { slug: "/food", name: t("food"), sub: true },
    { slug: "/drink", name: t("drink"), sub: true },
    { slug: "/action", name: t("action"), sub: true },
    { slug: "/lifestyle", name: t("lifestyle"), sub: true },
    { slug: "http://tranphotographicart.com/", name: t("art"), sub: false },
    { slug: "/recipes", name: t("recipes"), sub: false },
    { slug: "/blogs", name: t("blogs"), sub: false },
    { slug: "/about", name: t("about"), sub: false },
    { slug: "/contact", name: t("contact"), sub: false },
  ];

  return (
    <React.Fragment>
      <ul className="hidden xl:inline-block font-antic-didone">
        {pages.map((page: PageLink) => (
          <NavLinks
            key={page.name}
            slug={page.slug}
            sub={page.sub}
            name={page.name}
          />
        ))}
      </ul>
      <PhoneNav pages={pages}/>
    </React.Fragment>
  );
};

export default Navbar;
