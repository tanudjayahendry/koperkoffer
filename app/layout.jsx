import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "KoperKoffer",
  description: "Jastip Jerman – Indonesia & Indonesia – Jerman",
  icons: {
    icon: "/icon.png",
  },
  openGraph: {
    title: "KoperKoffer",
    description: "Jastip Jerman – Indonesia",
    images: ["/maskot-koperkoffer.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-800">
        <Navbar />
        <div className="px-4">{children}</div>
      </body>
    </html>
  );
}
