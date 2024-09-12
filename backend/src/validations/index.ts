import { z } from "zod";

export const idParamSchema = z.object({
  id: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val), {
      message: "Invalid ID",
    }),
});

export const title = z.string().min(1, { message: "Title is required" });

export const username = z
  .string()
  .min(3, { message: "Username must be at least 3 characters long" })
  .max(20, { message: "Username must be no more than 20 characters long" })
  .regex(/^[a-zA-Z0-9_]+$/, {
    message: "Username can only contain letters, numbers, and underscores",
  });

export const getPasswordValidation = (passwordName = "Password") => {
  return z
    .string()
    .min(8, { message: `${passwordName} must be at least 8 characters long` })
    .max(100, {
      message: `${passwordName} must be no more than 100 characters long`,
    })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,\-])[A-Za-z\d@$!%*?&.,\-]{8,}$/,
      {
        message: `${passwordName} must contain at least one uppercase letter, one lowercase letter, one number, and one special character`,
      }
    );
};

export const email = z.string().email({ message: "Invalid Email address" });

export const full_name = z
  .string()
  .min(1, { message: "Full Name is required" })
  .max(100, { message: "Full Name must be no more than 100 characters long" })
  .regex(/^(?!\s)(?!.*\s{2})([a-zA-Z]+\s?)+$/, {
    message: "Full Name can only contain letters and spaces",
  });
