import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JobHunter AI - Find Your Perfect Job",
  description: "AI-powered job search platform to accelerate your career",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
        >
          <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                {/* Logo Section */}
                <Link href="/" className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">JH</span>
                  </div>
                  <span className="text-xl font-bold text-gray-900">
                    JobHunter AI
                  </span>
                </Link>

                {/* Navigation - Hidden on mobile */}
                <nav className="hidden md:flex items-center space-x-8">
                  <a
                    href="#features"
                    className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
                  >
                    Features
                  </a>
                  <a
                    href="#pricing"
                    className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
                  >
                    Pricing
                  </a>
                  <a
                    href="#testimonials"
                    className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
                  >
                    Reviews
                  </a>
                </nav>

                {/* Auth Section */}
                <div className="flex items-center space-x-3">
                  <SignedOut>
                    <div className="flex items-center space-x-3">
                      <SignInButton>
                        <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full font-medium text-sm px-6 py-2 hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer">
                          Sign In
                        </button>
                      </SignInButton>
                    </div>
                  </SignedOut>
                  <SignedIn>
                    <UserButton
                      appearance={{
                        elements: {
                          avatarBox: "w-8 h-8",
                        },
                      }}
                    />
                  </SignedIn>
                </div>
              </div>
            </div>
          </header>

          <main className="min-h-screen">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
