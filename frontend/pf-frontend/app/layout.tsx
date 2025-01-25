import type { Metadata } from "next";
import { Figtree, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "../lib/utils";

import { ThemeProvider } from "components/theme-provider";

const inter = Inter({ subsets: ["latin"] });
const figtree = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "FinFlow",
    description: "Your Personal Finance System",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning>
            <body className={cn("relative h-full font-sans antialiased", figtree.className)}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange>
                    <main className="relative flex flex-col min-h-screen">{children}</main>
                </ThemeProvider>
            </body>
        </html>
    );
}
