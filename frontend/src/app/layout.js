import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { GoogleOAuthProvider } from "@react-oauth/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Voz F17",
  description: "Voz F17",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID}>
            <Header />
          <main className="pt-16">{children}</main>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
