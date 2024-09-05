import { z } from "zod";

export const createUserSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(20, { message: "Username must be no more than 20 characters long" })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers, and underscores",
    }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(100, { message: "Password must be no more than 100 characters long" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,\-])[A-Za-z\d@$!%*?&.,\-]{8,}$/,
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }
    ),
  email: z.string().email({ message: "Invalid email address" }),
  full_name: z
    .string()
    .min(1, { message: "Full name is required" })
    .max(100, { message: "Full name must be no more than 100 characters long" })
    .regex(/^(?!\s)(?!.*\s{2})([a-zA-Z]+\s?)+$/, {
      message: "Full name can only contain letters and spaces",
    }),
});

export const loginSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(20, { message: "Username must be no more than 20 characters long" })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers, and underscores",
    }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(100, { message: "Password must be no more than 100 characters long" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,\-])[A-Za-z\d@$!%*?&.,\-]{8,}$/,
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }
    ),
});

export const paramsSchema = z.object({
  id: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val), {
      message: "Invalid id",
    }),
});

export const updateUserSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(20, { message: "Username must be no more than 20 characters long" })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers, and underscores",
    })
    .optional(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(100, { message: "Password must be no more than 100 characters long" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,\-])[A-Za-z\d@$!%*?&.,\-]{8,}$/,
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }
    )
    .optional(),
  email: z.string().email({ message: "Invalid email address" }).optional(),
  full_name: z
    .string()
    .min(1, { message: "Full name is required" })
    .max(100, { message: "Full name must be no more than 100 characters long" })
    .regex(/^(?!\s)(?!.*\s{2})([a-zA-Z]+\s?)+$/, {
      message: "Full name can only contain letters and spaces",
    })
    .optional(),
  currentPassword: z
    .string()
    .min(8, { message: "Current Password must be at least 8 characters long" })
    .max(100, {
      message: "Current Password must be no more than 100 characters long",
    })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,\-])[A-Za-z\d@$!%*?&.,\-]{8,}$/,
      {
        message:
          "Current Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }
    ),
});

export const deleteUserSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(100, { message: "Password must be no more than 100 characters long" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,\-])[A-Za-z\d@$!%*?&.,\-]{8,}$/,
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }
    ),
});
