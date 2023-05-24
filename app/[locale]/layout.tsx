import { useLocale } from "next-intl";
import { notFound } from "next/navigation";
import Header from "@/layout/header";
import "../../styles/globals.css";

export const metadata = {
  title: "Tran Food Photography",
  description: "Generated by create next app",
  alternates: {
    canonical: "/",
    languages: {
      en: "en",
      vie: "vie",
    },
  },
};

interface Layout {
  children: React.ReactNode;
  params: { locale: string };
}

const LocaleLayout: React.FC<Layout> = ({ children, params }) => {
  const locale = useLocale();

  // Show a 404 error if the user requests an unknown locale
  if (params.locale !== locale) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className="bg-white p-16 md:p-24 lg:p-32 xl:p-40 flex flex-col xl:flex-row xl:items-stretch xl:h-[100vh] min-h-[100vh] overflow-x-hidden overflow-y-auto">
        <Header />
        {children}
      </body>
    </html>
  );
};

export default LocaleLayout;
