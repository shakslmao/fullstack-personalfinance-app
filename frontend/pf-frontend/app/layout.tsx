import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "../lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { KeycloakProvider } from "@/context/keycloak-provider";

const inter = Inter({ subsets: ["latin"] });

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
        <KeycloakProvider>
            <html
                lang="en"
                suppressHydrationWarning>
                <body className={cn("relative h-full font-sans antialiased", inter.className)}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        enableSystem
                        disableTransitionOnChange>
                        <main className="relative flex flex-col min-h-screen">{children}</main>
                    </ThemeProvider>
                </body>
            </html>
        </KeycloakProvider>
    );
}
