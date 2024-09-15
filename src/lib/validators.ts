import { z } from "zod";

export const signUpSchema = z.object({
    userName: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    })
  })


  export const signInSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  });