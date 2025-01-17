"use client";

import { LoginValidationSchema, TLoginValidationSchema } from "@/schemas";
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
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { FormMessagingError } from "../formError";
import { FormMessagingSuccess } from "../formSuccess";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { ArrowRight } from "lucide-react";

export const LoginForm = () => {
    const [isSubmitting, startTransition] = useTransition();
    const [validationError, setValidationError] = useState<string | undefined>("");
    const [validationSuccess, setValidationSucceess] = useState<string | undefined>("");

    const form = useForm<TLoginValidationSchema>({
        resolver: zodResolver(LoginValidationSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (data: TLoginValidationSchema) => {
        setValidationError("");
        setValidationSucceess("");

        startTransition(() => {});
    };

    return (
        <>
            <div className="flex items-center justify-center min-h-screen mx-auto">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col items-center space-y-2 text-center">
                        {/* <!-- Logo -->  className="h-20 w-20"*/}
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
                                {/* Username input field */}
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
                                                        disabled={isSubmitting} // Disable input while submitting
                                                        placeholder="Enter your Email"
                                                        type="email"
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-center" />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                {/* Password input field */}
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
                                                        disabled={isSubmitting} // Disable input while submitting
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
                                {/* Submission  field */}
                                <Button
                                    disabled={isSubmitting} // Disable button while submitting
                                    className="mt-auto py-4 m-auto w-full text-center"
                                    type="submit">
                                    Login
                                </Button>
                            </form>
                        </Form>
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
