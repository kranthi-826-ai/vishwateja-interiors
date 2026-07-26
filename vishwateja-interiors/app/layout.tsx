import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import AdaptiveCanvasBackground from "@/components/ui/AdaptiveCanvasBackground";

export const metadata = {
  title: "VISHWATEJA INTERIORS | Machine-Crafted Precision. Timeless Interior Excellence.",
  description:
    "Premium modular kitchens, wardrobes, TV units, false ceiling & complete home interiors in Hyderabad.",
  icons: {
    icon: "/logo/vishwateja-logo.png",
    apple: "/logo/vishwateja-logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/logo/vishwateja-logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo/vishwateja-logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased relative bg-warmwhite text-navy selection:bg-gold/20 selection:text-navy">
        <AdaptiveCanvasBackground />
        <Navbar />
        <main className="relative z-10">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}