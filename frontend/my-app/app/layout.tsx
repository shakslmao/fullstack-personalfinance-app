import type { Metadata } from "next";
import { Figtree } from "@next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

const figtree = Figtree({ subsets: ["latin"], adjustFontFallback: false });

export const metadata: Metadata = {
    title: "Personal Finance",
    description: "Your Personal Finance Application",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={cn("relative h-full font-sans antialiased", figtree.className)}>
                <main className="relative flex flex-col min-h-screen">{children}</main>
            </body>
        </html>
    );
}
