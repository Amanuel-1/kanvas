"use client"
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { signUp } from "@/actions/auth.action";
import GoogleOAuthButton from "../(studio)/_components/googleAuthButton";
import { signUpSchema } from "@/lib/validators";



export default function SignUpPage() {
  const router = useRouter();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      userName: "",
      email: "zeamani@gmail.com",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    const res = await signUp(data);
    if (res.success) {
      // alert("signup successful")
      router.push("/")
    } else {
      alert(res.error);
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] bg-card">
      <div className="flex flex-col items-center justify-center py-12">
        <Form {...form}>
          <form
            className="mx-auto grid w-[350px] gap-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Name</FormLabel>
                  <Input type="text" placeholder="Username" {...field} />
                  <FormMessage>
                    {form.formState.errors.userName?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" placeholder="Email" {...field} />
                  <FormMessage>
                    {form.formState.errors.email?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="grid gap-4">
                  <FormLabel>Password</FormLabel>
                  <Input type="password" placeholder="Password" {...field} />
                  <FormMessage>
                    {form.formState.errors.password?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="grid gap-4">
                  <FormLabel>Confirm Password</FormLabel>
                  <Input type="password" placeholder="Confirm Password" {...field} />
                  <FormMessage>
                    {form.formState.errors.confirmPassword?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full mt-4">
              Submit
            </Button>
            <div className='relative my-2'>
            <div className='absolute inset-0 flex items-center'>
              <span className='w-full border-t' />
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='bg-background px-2 text-muted-foreground'>
                Or continue with
              </span>
            </div>
          </div>
          </form>
        </Form>
        <div className="mt-4 text-center">
          <GoogleOAuthButton/>
        </div>

        
      </div>

      <div className="hidden bg-muted lg:block">
        <Image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
