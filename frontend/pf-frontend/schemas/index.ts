import * as z from "zod";

export const RegistrationValidationSchema = z.object({
    firstname: z.string().min(1, { message: "First name is Required " }),
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

export type TRegistrationValidationSchmea = z.infer<typeof RegistrationValidationSchema>;
