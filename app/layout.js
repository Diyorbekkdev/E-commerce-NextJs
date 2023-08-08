import { Inter } from "next/font/google";
import BgAnimation from "@/components/bg-animation";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "antd/dist/reset.css";

import "../globals.scss";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "E-commerce",
  description: "E-commerce site for shops",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head></head>
        <body className={inter.className}>
          <BgAnimation />
          {children}
        </body>
      {/* </Provider> */}
    </html>
  );
}
