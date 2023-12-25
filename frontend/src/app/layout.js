import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Provider from "@/components/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Voz F17",
  description: "Voz F17",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GoogleOAuthProvider clientId="588585800172-82mkcvu279odgi65elmmljg2uemh7ehb.apps.googleusercontent.com">
          <Provider>
            <Header />
          </Provider>
          <main className="pt-16">{children}</main>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
