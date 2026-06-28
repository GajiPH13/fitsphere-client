
// import { Inter, Plus_Jakarta_Sans } from "next/font/google";
// import "./globals.css";
// import NavBar from "@/components/NavBar";
// import Footer from "@/components/Footer";

// const inter = Inter({
//   variable: "--font-inter",
//   subsets: ["latin"],
// });

// const plusJakarta = Plus_Jakarta_Sans({
//   variable: "--font-plus-jakarta",
//   subsets: ["latin"],
// });

// export const metadata = {
//   title: "FitSphere",
//   description: "Fitness classes, trainers, subscriptions, and community forum.",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html
//       lang="en"
//       className={`${inter.variable} ${plusJakarta.variable} h-full antialiased`}
//     >
//       <body className="min-h-full font-sans flex flex-col font-[var(--font-inter)]">
//         <NavBar />
//         {children}
//         <Footer />
//       </body>
//     </html>
//   );
// }
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/providers/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "FitSphere",
  description: "Fitness classes, trainers, subscriptions, and community forum.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans">
        <ThemeProvider>
          <div className="flex min-h-screen flex-col bg-[#EDF3E7] text-[#2F3A2F] transition-colors duration-300 dark:bg-[#101510] dark:text-[#EDF3E7]">
            <NavBar />

            <main className="flex-1">
              {children}
            </main>

            <Footer />
          </div>

          <Toaster position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}