import * as z from "zod";

export const RegistrationValidationSchema = z.object({
    firstname: z.string().min(1, { message: "First name is Required " }),
    lastname: z.string().min(1, { message: "Last name is Required " }),
    email: z.string().email({ message: "Email is Invalid " }),
    password: z
        .string()
        .min(8, { message: "Password must be atleast 8 characters" })
        .regex(/[a-z]/, { message: "Password must contain at least on lowercase letter" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" })
        .regex(/[@$!%*#?&]/, {
            message: "Password must contain at least one special character",
        }),
    dateOfBirth: z.string().refine(
        (date) => {
            const parsedDate = new Date(date);
            return !isNaN(parsedDate.getTime()) && parsedDate < new Date();
        },
        { message: "Date of Birth must be in the past" }
    ),
});

export const LoginValidationSchema = z.object({
    email: z.string().email({ message: "Email is Required" }),
    password: z.string().min(1, { message: "Your Password is Required" }),
});

export const ResetPasswordValidationSchema = z.object({
    email: z.string().email({ message: "Email is Required" }),
});

export const ResetTokenEmailValidationSchema = z.object({
    email: z.string().email({ message: "Email is Required For Token Reset" }),
});

export const ActivationTokenSchema = z.object({
    token: z
        .string()
        .length(6)
        .regex(/^\d{6}$/, "Token must be a 6-digit number"),

    userId: z.string().optional(),
});

export type TRegistrationValidationSchema = z.infer<typeof RegistrationValidationSchema>;
export type TLoginValidationSchema = z.infer<typeof LoginValidationSchema>;
export type TResetPasswordValidationSchema = z.infer<typeof ResetPasswordValidationSchema>;
export type TActivationTokenSchema = z.infer<typeof ActivationTokenSchema>;
export type TResetTokenEmailValidationSchema = z.infer<typeof ResetTokenEmailValidationSchema>;
