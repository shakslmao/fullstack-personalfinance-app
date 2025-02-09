"use client";

import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Button, buttonVariants } from "components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import {
    ActivationTokenSchema,
    ResetTokenEmailValidationSchema,
    TActivationTokenSchema,
    TResetTokenEmailValidationSchema,
} from "schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormMessagingError } from "components/formError";
import { FormMessagingSuccess } from "components/formSuccess";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "components/ui/form";
import { Input } from "components/ui/input";

export const AccountActivationForm = () => {
    const router = useRouter();
    const [isSubmitting, startTransition] = useTransition();
    const [validationError, setValidationError] = useState<string | undefined>("");
    const [validationSuccess, setValidationSucceess] = useState<string | undefined>("");
    const [showEmailForm, setShowEmailForm] = useState(false);
    const handlePreviousOnClick = () => router.back();

    const activationForm = useForm<TActivationTokenSchema>({
        resolver: zodResolver(ActivationTokenSchema),
        defaultValues: { token: "" },
    });

    const emailForm = useForm<TResetTokenEmailValidationSchema>({
        resolver: zodResolver(ResetTokenEmailValidationSchema),
        defaultValues: { email: "" },
    });

    const onSubmit = (data: TActivationTokenSchema) => {
        setValidationError("");
        setValidationSucceess("");

        startTransition(async () => {
            try {
                const response = await fetch(`/api/auth/activate?token=${data.token}`, {
                    method: "GET",
                });

                const result = await response.json();
                if (!response.ok) throw new Error(result.error);
                setValidationSucceess(result.message);
                setTimeout(() => router.push("/api/auth/login"), 2000);
            } catch (error) {
                setValidationError("Invalid Token");
            }
        });
    };

    const onSubmitTokenReset = (data: TResetTokenEmailValidationSchema) => {
        setValidationError("");
        setValidationSucceess("");

        startTransition(async () => {
            try {
                const response = await fetch("/api/auth/request-new-token", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                });

                const result = await response.json();
                if (!response.ok) throw new Error(result.error);
                setValidationSucceess("A new activation token has been sent to your email");
                setShowEmailForm(false);
            } catch (error) {
                setValidationError("Failed to send a new activation token.");
            }
        });
    };

    const handleOnClick = () => {
        const token = activationForm.getValues("token");
        if (!token || token.length !== 6) {
            setValidationError("Please Enter 6 Digit Activation Code");
            return;
        }
        onSubmit({ token });
    };

    return (
        <div className="flex items-center justify-center min-h-screen px-4">
            <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[350px] px-6 py-8">
                <div className="flex flex-col items-center space-y-6 text-center">
                    <h1 className="text-6xl font-bold text-center">Enter Authentication Code</h1>

                    <div className="flex items-center justify-center mt-2">
                        <InputOTP
                            value={activationForm.watch("token")}
                            onChange={(newValue) => activationForm.setValue("token", newValue)}
                            maxLength={6}
                            pattern={REGEXP_ONLY_DIGITS}
                            disabled={isSubmitting}>
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                        <FormMessagingError errorMessage={validationError} />
                        <FormMessagingSuccess successMessage={validationSuccess} />
                    </div>

                    <p className="text-sm text-center text-white mt-4">
                        Haven't received an authentication code? <br /> Request a new one here.
                    </p>
                    {!showEmailForm ? (
                        <Button
                            onClick={() => setShowEmailForm(true)}
                            className={buttonVariants({
                                variant: "ghost",
                                className: "w-full py-3 text-black rounded-lg",
                                size: "sm",
                            })}>
                            Request New Activation Token
                        </Button>
                    ) : (
                        <div className="grid gap-6 w-full">
                            <Form {...emailForm}>
                                <form
                                    className="space-y-6"
                                    onSubmit={emailForm.handleSubmit(onSubmitTokenReset)}>
                                    <div className="flex flex-col space-y-4">
                                        <FormField
                                            control={emailForm.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="block text-medium text-white"></FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            disabled={isSubmitting}
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
                                            {" "}
                                            <Button
                                                className={buttonVariants({
                                                    variant: "default",
                                                    className:
                                                        "w-full py-4 bg-white rounded-lg text-black font-semibold",
                                                    size: "sm",
                                                })}
                                                disabled={isSubmitting}
                                                type="submit">
                                                Send New Code
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </Form>
                        </div>
                    )}

                    <FormMessagingError errorMessage={validationError} />
                    <FormMessagingSuccess successMessage={validationSuccess} />
                </div>

                <div className="flex justify-between w-full gap-4">
                    <Button
                        onClick={() => handlePreviousOnClick()}
                        className={buttonVariants({
                            variant: "ghost",
                            className: "w-full py-3 bg-white rounded-lg font-semibold",
                            size: "sm",
                        })}>
                        Previous
                    </Button>
                    <Button
                        onClick={() => handleOnClick()}
                        className={buttonVariants({
                            variant: "ghost",
                            className: "w-full py-3 bg-white rounded-lg font-semibold",
                            size: "sm",
                        })}>
                        Continue
                    </Button>
                </div>
            </div>
        </div>
    );
};
