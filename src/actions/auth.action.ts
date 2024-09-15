"use server";

import { z } from "zod";
import { Argon2id, Bcrypt } from "oslo/password";
import { cookies } from "next/headers";
import db from "@/lib/db";
import { googleOAuth, lucia } from "@/lib/auth";
import { Value } from "@radix-ui/react-select";
import { generateCodeVerifier, generateState } from "arctic";
import { redirect } from "next/navigation";
import { signInSchema, signUpSchema } from "@/lib/validators";
export const signUp = async (values: z.infer<typeof signUpSchema>) => {
  // try {
  // // if user already exists, throw an error
  // const existingUser = await db.user.findFirst({
  //     where: {
  //         email: values.email
  //     }
  // })
  // if (existingUser) {
  //     return { error: 'User already exists', success: false }
  // }

  // const hashedPassword = await new Argon2id().hash(values.password)
  //     console.log("🛬 🛬 🛬 🛬 🛬 🛬  email is ",values.email)
  //     const user = await db.user.create({

  //         data: {
  //             email: values.email as string,
  //             name: values.userName,
  //             hashedPassword
  //         }
  //     })
  // const session = await lucia.createSession(user.id, {})
  // const sessionCookie =  lucia.createSessionCookie(session.id)
  // cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
  //     return { success: true }
  // } catch (e) {
  //     console.error(e, 'and here is the form data',values)
  //     return { error: 'Something went wrong'+e, success: false }
  // }

  try {
    // if user already exists, throw an error
    const existingUser = await db.user.findUnique({
      where: {
        email: values.email,
      },
    });
    if (existingUser) {
      return { error: "User already exists", success: false };
    }
    const hashedPassword = await new Argon2id().hash(values.password);

    // Generate a random avatar using Dicebear
    const style = 'micah'; // Choose a style (e.g., 'avataaars', 'identicon', 'bottts', etc.)
    const seed = Math.random().toString(36).substring(7); // Generate a random seed
    const avatarUrl = `https://api.dicebear.com/9.x/${style}/svg?seed=${seed}`;


    const user = await db.user.create({
      data: {
        email: values.email,
        hashedPassword: hashedPassword,
        username: values.userName,
        image: avatarUrl,
      },
    });

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return { success: true, error: "" };
  } catch (e) {
    console.log(e);
    return { success: false, error: "somethign went wrong " };
  }
};

export const signIn = async (values: z.infer<typeof signInSchema>) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email: values.email,
      },
    });
    if (!user) {
      return { success: false, error: "user not found" };
    }
    const passwordMatch = await new Argon2id().verify(
      user.hashedPassword as string,
      values.password
    );
    if (!passwordMatch) {
      return { success: false, error: "passwords do not match" };
    }
    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return { success: true, error: "" };
  } catch (e) {
    console.log(e);
    return { success: false, error: "somethign went wrong " };
  }
};

export const logOut = async () => {
  const sessionCookie = await lucia.createBlankSessionCookie();
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  redirect('/signin');
}



export const generateGoogleConsentUrl = async () => {
  try {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();

    cookies().set('state',state,{
      httpOnly:true,
      secure:process.env.NODE_ENV == "production"
    })
    cookies().set('codeVerifier',codeVerifier,{
      httpOnly:true,
      secure:process.env.NODE_ENV == "production"
    })

    const consentUrl =await googleOAuth.createAuthorizationURL(state,codeVerifier,{
      scopes:['email','profile']
    })
    
    return {url:consentUrl}
  } catch (e) {
    console.error("something went wrong, unable to generate the consent url")
  }
};


