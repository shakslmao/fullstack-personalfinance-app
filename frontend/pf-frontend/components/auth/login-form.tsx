"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { string } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from "components/ui/form";
import { Input } from "../ui/input";
import { FormMessagingError } from "../formError";
import { FormMessagingSuccess } from "../formSuccess";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { ArrowRight } from "lucide-react";
import {
    LoginValidationSchema,
    ResetTokenEmailValidationSchema,
    TLoginValidationSchema,
    TResetTokenEmailValidationSchema,
} from "schemas";
import { useRouter } from "next/navigation";
import { LOGIN_REDIRECT } from "routes";
import { AuthenticationResponse } from "types/auth";

// For Non Auth Attempting To Login, Make them Reqeust a new Token on Account Login Page. & disbale login button

export const LoginForm = () => {
    const router = useRouter();
    const [isSubmitting, startTransition] = useTransition();
    const [isSubmittingTokenReset, startTransitionTokenReset] = useTransition();
    const [validationError, setValidationError] = useState<string | undefined>("");
    const [validationSuccess, setValidationSucceess] = useState<string | undefined>("");
    const [showActivationForm, setShowActivationForm] = useState(false);

    const form = useForm<TLoginValidationSchema>({
        resolver: zodResolver(LoginValidationSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const emailForm = useForm<TResetTokenEmailValidationSchema>({
        resolver: zodResolver(ResetTokenEmailValidationSchema),
        defaultValues: { email: "" },
    });

    const onSubmit = (data: TLoginValidationSchema) => {
        setValidationError("");
        setValidationSucceess("");
        setShowActivationForm(false);

        startTransition(async () => {
            try {
                const response = await fetch("/api/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                    credentials: "include",
                });

                const result: AuthenticationResponse | { error: string } = await response.json();
                if (!response.ok || "error" in result) {
                    if (response.status === 400) {
                        setValidationError("Incorrect Email or Password");
                    } else if (response.status === 401) {
                        setValidationError("You need to authenticate your account.");
                        setShowActivationForm(true);
                    } else if (response.status === 403) {
                        setValidationError("Your account is not authorised to proceed.");
                    } else {
                        setValidationError("An unknown error occurred. Please try again.");
                    }
                    throw new Error("Login Error");
                }

                router.push(LOGIN_REDIRECT);
            } catch (error) {
                console.error("Login Error:", error);
            }
        });
    };

    const onSubmitAuthenticate = (data: TResetTokenEmailValidationSchema) => {
        setValidationError("");
        setValidationSucceess("");

        console.log("Submitting Reset Token Request with email:", data.email);

        startTransitionTokenReset(async () => {
            try {
                if (!data.email) {
                    setValidationError("Email is required to request new activation code");
                    return;
                }

                const response = await fetch("/api/auth/request-new-token", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: data.email }),
                });

                const result = await response.json();
                if (!response.ok) throw new Error(result.error);

                setValidationSucceess("A new activation token has been sent to your email.");
                setShowActivationForm(false);

                setTimeout(() => router.push("/auth/activate"), 2000);
            } catch (error) {
                setValidationError("Failed to send a new activation token.");
            }
        });
    };

    return (
        <>
            <div className="flex items-center justify-center min-h-screen mx-auto">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col items-center space-y-2 text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                            Hello Again!
                            <br />
                            <span className="text-white">Sign In</span>.
                        </h1>
                    </div>
                    <div className="grid gap-6">
                        <Form {...form}>
                            <form
                                className="space-y-4"
                                onSubmit={form.handleSubmit(onSubmit)}>
                                <div className="space-y-2">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="block text-medium text-white">
                                                    Email
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        disabled={isSubmitting}
                                                        placeholder="Enter your Email"
                                                        type="email"
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-center" />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="block text-medium text-white">
                                                    Password
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        disabled={isSubmitting}
                                                        placeholder="Enter your Password"
                                                        type="password"
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-center" />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormMessagingError errorMessage={validationError} />
                                <FormMessagingSuccess successMessage={validationSuccess} />

                                {!showActivationForm ? (
                                    <Button
                                        disabled={isSubmittingTokenReset}
                                        className="mt-auto py-4 m-auto w-full text-center"
                                        type="submit">
                                        Login
                                    </Button>
                                ) : null}
                            </form>
                        </Form>
                        {showActivationForm && (
                            <Form {...emailForm}>
                                <form
                                    className="space-y-6"
                                    onSubmit={emailForm.handleSubmit(onSubmitAuthenticate)}>
                                    <div className="flex flex-col space-y-4">
                                        <FormField
                                            control={emailForm.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="block text-medium text-white">
                                                        Email
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            disabled={isSubmittingTokenReset}
                                                            placeholder="Enter your email"
                                                            type="email"
                                                            className="text-center px-4 py-3 border border-gray-300 rounded-md"
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-center" />
                                                </FormItem>
                                            )}
                                        />
                                        <div className="mt-4">
                                            <Button
                                                className={buttonVariants({
                                                    variant: "default",
                                                    className:
                                                        "w-full py-4 bg-white rounded-lg text-black font-semibold",
                                                    size: "sm",
                                                })}
                                                disabled={isSubmittingTokenReset}
                                                type="submit">
                                                Send New Code
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </Form>
                        )}
                        <p className="text-sm max-w-prose text-center text-muted-foreground text-white">
                            <Link
                                href="/auth/reset"
                                className="hover:underline">
                                Forgot your Password ?
                            </Link>
                        </p>

                        <Separator />
                    </div>

                    <Link
                        href="/auth/register"
                        className={buttonVariants({
                            variant: "link",
                            className: "text-white gap-1.5",
                        })}>
                        Dont Have an Account? Sign Up <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </>
    );
};
