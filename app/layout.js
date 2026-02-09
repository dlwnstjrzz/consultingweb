import "./globals.css";
import MainLayout from "@/components/layout/MainLayout";

export const metadata = {
  title: "MEGAINFO Consulting",
  description: "Professional Consulting Services",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}
