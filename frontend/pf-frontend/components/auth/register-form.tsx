"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";
import { RegistrationValidationSchema, TRegistrationValidationSchmea } from "@/schemas";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormMessagingError } from "../formError";
import { FormMessagingSuccess } from "../formSuccess";

export const RegisterForm = () => {
    const router = useRouter();
    const [isSubmitting, startTransition] = useTransition();
    const [validationError, setValidationError] = useState<string | undefined>("");
    const [validationSuccess, setValidationSuccess] = useState<string | undefined>("");
    const [date, setDate] = useState<Date>();
    const form = useForm<TRegistrationValidationSchmea>({
        resolver: zodResolver(RegistrationValidationSchema),
        defaultValues: {
            firstname: "",
            email: "",
            password: "",
            dateOfBirth: "",
        },
    });

    const onSubmit = (data: TRegistrationValidationSchmea) => {
        setValidationError("");
        setValidationSuccess("");
        startTransition(() => {
            // hook to user registration api.
        });
    };

    return (
        <>
            <div className="flex items-center justify-center min-h-screen mt-10">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col items-center space-y-2 text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                            Lets Register You an Account
                        </h1>
                    </div>
                    <div className="grid gap-6">
                        <Form {...form}>
                            <form
                                className="space-y-2"
                                onSubmit={form.handleSubmit(onSubmit)}>
                                <div className="space-y-2">
                                    <FormField
                                        control={form.control}
                                        name="firstname"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="block text-medium text-white">
                                                    First Name
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        disabled={isSubmitting}
                                                        placeholder="Enter your First Name"
                                                        type="firstname"
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
                                        name="email"
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
                                                        type="email"
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-center" />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="mt-8 flex items-center w-full justify-center">
                                    {!validationError && !validationSuccess && isSubmitting && (
                                        <FormLoadingState loadingMessage="Calculating your Details..." />
                                    )}
                                </div>
                                <FormMessagingError errorMessage={validationError} />
                                <FormMessagingSuccess successMessage={validationSuccess} />
                                <Button
                                    disabled={isSubmitting}
                                    className="mt-auto py-4 m-auto w-full text-center"
                                    type="submit">
                                    Complete Registration
                                </Button>
                            </form>
                        </Form>
                        {/* Add Socials Here */}
                    </div>
                    <Separator />
                    <Link
                        href="/auth/login"
                        className={buttonVariants({
                            variant: "link",
                            className: "text-white gap-1.5",
                        })}>
                        Already Registered? Sign In Here
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </>
    );
};
