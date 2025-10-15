import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { auth, signOut } from "../api/auth/[...nextauth]/route";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TBITalk.com",
  description: "Community for traumatic brain injury survivors, caregivers, clinicians, and researchers to share healing tips.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  metadataBase: new URL("https://tbitalk.com"),
  openGraph: {
    title: "TBITalk.com",
    description:
      "Community for traumatic brain injury survivors, caregivers, clinicians, and researchers to share healing tips.",
    url: "https://tbitalk.com",
    siteName: "TBITalk",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TBITalk.com",
    description:
      "Community for traumatic brain injury survivors, caregivers, clinicians, and researchers to share healing tips.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white text-gray-900`}>
        <header className="border-b border-gray-200">
          <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold tracking-tight" style={{ color: "#1e66ff" }}>TBITalk.com</span>
            </a>
            <nav className="flex items-center gap-6 text-sm">
              <a className="hover:text-gray-600" href="/tips">Tips</a>
              <a className="hover:text-gray-600" href="/about">About</a>
              <a className="hover:text-gray-600" href="/contact">Contact</a>
              {session?.user ? (
                <form action={async () => { "use server"; await signOut({ redirectTo: "/" }); }}>
                  <button className="hover:text-gray-600" type="submit">Sign out</button>
                </form>
              ) : (
                <a className="hover:text-gray-600" href="/signin">Sign in</a>
              )}
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-10">
          {children}
        </main>
        <footer className="mt-16 border-t border-gray-200">
          <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-gray-500 flex items-center justify-between">
            <span>© {new Date().getFullYear()} TBITalk</span>
            <span>Healing together through shared tips</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
