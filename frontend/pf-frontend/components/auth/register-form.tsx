"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from "components/ui/form";
import { Calendar } from "components/ui/calendar";
import { FaGoogle } from "react-icons/fa";
import { format, getMonth, getYear, setMonth, setYear } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "lib/utils";
import Link from "next/link";
import { Separator } from "components/ui/separator";
import { ArrowRight } from "lucide-react";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormMessagingError } from "../formError";
import { FormMessagingSuccess } from "../formSuccess";
import { Input } from "../ui/input";
import { FormLoadingState } from "../formLoading";
import { Button, buttonVariants } from "../ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "components/ui/select";
import { RegistrationValidationSchema, TRegistrationValidationSchema } from "schemas";
import { REGISTER_REDIRECT } from "routes";
import { RegistrationResponse } from "types/auth";

interface DatePickerProps {
    startYear?: number;
    endYear?: number;
}

export const RegisterForm = ({
    startYear = getYear(new Date()) - 100,
    endYear = getYear(new Date()) + 100,
}: DatePickerProps) => {
    const router = useRouter();
    const [isSubmitting, startTransition] = useTransition();
    const [validationError, setValidationError] = useState<string | undefined>("");
    const [validationSuccess, setValidationSuccess] = useState<string | undefined>("");
    const [date, setDate] = useState<Date>(new Date());
    const form = useForm<TRegistrationValidationSchema>({
        resolver: zodResolver(RegistrationValidationSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            dateOfBirth: undefined,
        },
    });

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);

    const handleMonthChange = (month: string) => {
        const newDate = setMonth(date, months.indexOf(month));
        setDate(newDate);
        form.setValue("dateOfBirth", newDate.toISOString());
    };

    const handleYearChange = (year: string) => {
        const newDate = setYear(date, parseInt(year));
        setDate(newDate);
        form.setValue("dateOfBirth", newDate.toISOString());
    };

    const handleSelect = (selectedDate: Date | undefined) => {
        if (selectedDate) {
            setDate(selectedDate);
            form.setValue("dateOfBirth", selectedDate.toISOString());
        }
    };

    const onSubmit = (data: TRegistrationValidationSchema) => {
        setValidationError("");
        setValidationSuccess("");
        startTransition(async () => {
            try {
                const response = await fetch("/api/auth/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });
                const result: RegistrationResponse | { error: string } = await response.json();
                if (!response.ok || "error" in result) {
                    console.log(Error);
                    throw new Error("Registration Error");
                }
                router.push(REGISTER_REDIRECT);
            } catch (error) {
                setValidationError("Invalid Credentials");
            }
        });
    };

    // social logings, google, git etc.
    const onClick = () => {};

    return (
        <>
            <div className="flex items-center justify-center min-h-screen mt-10">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col items-center space-y-2 text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
                            Create Your Account
                        </h1>
                    </div>
                    <div className="grid gap-6">
                        <Form {...form}>
                            <form
                                className="space-y-6"
                                onSubmit={form.handleSubmit(onSubmit)}>
                                <div>
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
                                                        type="text"
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-center" />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="lastname"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="block text-medium text-white">
                                                    Last Name
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        disabled={isSubmitting}
                                                        placeholder="Enter your Last Name"
                                                        type="text"
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-center" />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div>
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
                                <div>
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
                                <div className="items-center">
                                    <FormField
                                        control={form.control}
                                        name="dateOfBirth"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel className="block text-medium text-white">
                                                    Date of Birth
                                                </FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant={"secondary"}
                                                                className={cn(
                                                                    "w-[350px] pl-3 text-left font-normal",
                                                                    !field.value &&
                                                                        "text-muted-foreground"
                                                                )}>
                                                                {field.value ? (
                                                                    format(field.value, "PPP")
                                                                ) : (
                                                                    <span>Pick a date</span>
                                                                )}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent
                                                        className="w-auto p-0"
                                                        align="start">
                                                        <div className="flex justify-between p-2">
                                                            <Select
                                                                onValueChange={handleMonthChange}
                                                                value={months[getMonth(date)]}>
                                                                <SelectTrigger className="w-[110px]">
                                                                    <SelectValue placeholder="Month" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    {months.map((month) => (
                                                                        <SelectItem
                                                                            key={month}
                                                                            value={month}>
                                                                            {month}
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                            <Select
                                                                onValueChange={handleYearChange}
                                                                value={getYear(date).toString()}>
                                                                <SelectTrigger className="w-[110px]">
                                                                    <SelectValue placeholder="Year" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    {years.map((year) => (
                                                                        <SelectItem
                                                                            key={year}
                                                                            value={year.toString()}>
                                                                            {year}
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                        <Calendar
                                                            // @ts-ignore
                                                            mode="single"
                                                            selected={date}
                                                            onSelect={handleSelect}
                                                            month={date}
                                                            onMonthChange={(newMonth: any) =>
                                                                setDate(newMonth)
                                                            }
                                                            disabled={(date: any) =>
                                                                date > new Date() ||
                                                                date < new Date("1900-01-01")
                                                            }
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormDescription className="text-center">
                                                    Your date of birth is used to calculate your
                                                    age.
                                                </FormDescription>
                                                <FormMessage />
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
                    </div>

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
