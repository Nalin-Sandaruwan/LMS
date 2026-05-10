import type { Metadata } from "next";
import { Geist, Geist_Mono, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { Toaster } from "@/components/ui/sonner";
import { Navigation } from "@/components/base compo/navigation";
import { Footer } from "@/components/base compo/footer";

const geistHeading = Geist({ subsets: ['latin'], variable: '--font-geist-heading' });

const nunitoSans = Nunito_Sans({ subsets: ['latin'], variable: '--font-nunito-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Idensphere | The Future of AI-Driven Learning",
    template: "%s | Idensphere"
  },
  description: "Idensphere is pioneering the future of learning with advanced AI and Blockchain. Creators can transform their legacy into interactive AI avatars to share knowledge forever, while users earn value as subscriptions are reinvested into their accounts.",
  keywords: ["LMS", "AI Learning", "Blockchain Education", "Interactive Avatars", "Idensphere", "E-learning", "Skill Development"],
  authors: [{ name: "Idensphere Team" }],
  creator: "Idensphere",
  metadataBase: new URL("https://idensphere.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://idensphere.com",
    title: "Idensphere | The Future of AI-Driven Learning",
    description: "Pioneering the future of learning with advanced AI and Blockchain technology.",
    siteName: "Idensphere",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Idensphere Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Idensphere | The Future of AI-Driven Learning",
    description: "Pioneering the future of learning with advanced AI and Blockchain technology.",
    images: ["/og-image.jpg"],
    creator: "@idensphere",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", nunitoSans.variable, geistHeading.variable)}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="relative flex flex-col min-h-screen">
              <Navigation />
              <main className="grow">
                {children}
              </main>
              <Footer />
            </div>
            <Toaster position="bottom-right" richColors />
            {/* Structured Data for SEO */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "Organization",
                  "name": "Idensphere",
                  "url": "https://idensphere.com",
                  "logo": "https://idensphere.com/logo.png",
                  "sameAs": [
                    "https://twitter.com/idensphere",
                    "https://linkedin.com/company/idensphere"
                  ],
                  "description": "The future of AI-driven learning and knowledge sharing."
                })
              }}
            />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
