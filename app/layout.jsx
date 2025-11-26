import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  metadataBase: new URL("https://dreamy-nasturtium-5197f1.netlify.app"), // ganti kalau nanti pakai custom domain
  title: "KoperKoffer",
  description: "Layanan titip barang Jerman – Indonesia & Indonesia – Jerman.",
  icons: {
    icon: "/icon.png",
  },
  openGraph: {
    title: "KoperKoffer",
    description: "Layanan titip barang lintas Jerman dan Indonesia.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-kk-navy text-kk-cream">
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <div className="max-w-5xl mx-auto px-4">
              {children}
            </div>
          </main>
          <div className="h-10" /> {/* small bottom spacing */}
        </div>
      </body>
    </html>
  );
}
