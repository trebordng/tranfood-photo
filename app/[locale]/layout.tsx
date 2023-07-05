import { useLocale } from "next-intl";
import { notFound } from "next/navigation";
import Header from "@/layout/header";
import "../../styles/globals.css";

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
      <body className=" font-lato bg-white p-16 md:p-24 lg:p-32 xl:p-40 gap-16 md:gap-24 lg:gap-32 xl:gap-40 flex flex-col xl:flex-row min-h-screen overflow-y-auto overflow-x-hidden flex-wrap xl:flex-nowrap max-w-[100vw]">
        <Header />
        {children}
      </body>
    </html>
  );
};

export default LocaleLayout;
