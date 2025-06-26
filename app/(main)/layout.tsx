import HeaderOne from "@/components/headers/HeaderOne";
import Footer from "@/components/footers/Footer";
import ScrollToTop from "@/components/others/ScrollToTop";
import { Toaster } from "sonner";


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <HeaderOne />
      {children}
      <Footer />
      <ScrollToTop />
      <Toaster richColors position="top-center" duration={1500}/>
    </div>
  );
}
