"use client";

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                    FinFlow <br />
                    <span className="font-light text-3xl">
                        Your personal finance management system
                    </span>
                </h1>
                <p className="mt-6 text-lg max-w-prose text-muted-foreground text-gray-900">
                    Take control of your finances with ease. Track transactions, plan budgets,
                    manage payments, grow investments, handle loans, and achieve your savings
                    goals—all in one seamless platform designed to empower your financial journey.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 mt-8">
                    <Link
                        href="/user/register"
                        className={buttonVariants()}>
                        Get Started Now
                    </Link>
                </div>
            </div>
        </div>
    );
}
//
