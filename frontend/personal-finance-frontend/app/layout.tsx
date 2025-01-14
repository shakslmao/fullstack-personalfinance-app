import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";


const figtree = Figtree({ subsets: ["latin"], adjustFontFallback: false });

export const metadata: Metadata = {
    title: "Personal Finance",
    description: "Your Personal Finance Application",
};
// root layer
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
