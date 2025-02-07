import type { Metadata } from "next";
import { Inter, Figtree } from "next/font/google";
import "./globals.css";
import { cn } from "../lib/utils";

import { ThemeProvider } from "components/theme-provider";

//const inter = Inter({ subsets: ["latin"] });
const figtree = Figtree({ subsets: ["latin"], adjustFontFallback: false });

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
                <main className="relative flex flex-col min-h-screen">
                    <div className="flex-grow flex-1">
                        <ThemeProvider
                            attribute="class"
                            defaultTheme="dark"
                            enableSystem
                            disableTransitionOnChange>
                            {children}
                        </ThemeProvider>
                    </div>
                </main>
            </body>
        </html>
    );
}
