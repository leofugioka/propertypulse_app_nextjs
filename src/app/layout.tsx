import Navbar from "@/components/Navbar";
import "@/app/globals.css";
import Footer from "@/components/Footer";
import Providers from "@/app/providers";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import "photoswipe/photoswipe.css";

export const metadata = {
  title: "Property Pulse",
  keywords: "rental, property, real estate",
  description: "Find the perfect rental property",
};

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: Readonly<MainLayoutProps>) => {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          {children}
          <ToastContainer />
          <Footer />
        </Providers>
      </body>
    </html>
  );
};

export default MainLayout;
