import { Archivo, Zilla_Slab } from "next/font/google";
import "@/styles/globals.css";

const display = Zilla_Slab({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const body = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export default function MyApp({ Component, pageProps }) {
  // Pages supply their own chrome via `Page.getLayout` (see components/layout/SiteLayout).
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <div className={`${display.variable} ${body.variable}`}>
      {getLayout(<Component {...pageProps} />)}
    </div>
  );
}
