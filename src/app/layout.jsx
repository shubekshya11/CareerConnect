const inter = Inter({ subsets: ['latin'] });
import 'bootstrap/dist/css/bootstrap.min.css';
import 'material-icons/iconfont/material-icons.css';
import "./scss/main.scss";
import { GoogleAnalytics } from '@next/third-parties/google';
import { Inter } from 'next/font/google';

export const metadata = {
  title: "Sakchha - Global BPO Service Provider",
  description: "We are an outsourcing service provider based in Nepal, offering expert business solutions tailored to your needs.",
  keywords: "Outsourcing Solutions, Business Process Outsourcing, BPO Outsourcing, Back Office Support, Fincial Operations, Outsource, Customer Service, Data Entry, Virtual Assistant",
  authors: [{ name: "Sakchha Technology Pvt. Ltd., Nepal" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Sakchha - Global BPO Service Provider",
    description: "We are an outsourcing service provider based in Nepal, offering expert business solutions tailored to your needs.",
    type: "website",
    url: "https://sakchha.com",
    images: ["/images/og_sakchha.jpg"],
  },
  verification: {
    google: "KHcnM3atZOIJAmyBYQkOQ_Xfk1cATZs4A1jic9c1nRk",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          as="image"
          href="/images/hero-bg-1400w.webp"
          imageSrcSet="/images/hero-bg-400w.webp 450w, /images/hero-bg-850w.webp 800w, /images/hero-bg-1400w.webp 1400w"
          imageSizes="100vw"
        />
      </head>
      <body>
        {children}
        {/* Bootstrap JS Bundle (Includes Popper.js) */}
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
          defer
        ></script>
      </body>
      <GoogleAnalytics gaId="G-XB6E9LJD81" />
    </html>
  );
}
