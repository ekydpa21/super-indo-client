import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Providers from "./Provider";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>
          <Header />
          {children}
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
