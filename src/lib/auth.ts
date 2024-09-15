import { Lucia } from "lucia";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import db from "./db";
import { cookies } from "next/headers";
import { cache } from "react";
import { redirect } from "next/navigation";



const adapter = new PrismaAdapter(db.session, db.user);


export const lucia = new Lucia(adapter, {
	sessionCookie: {
        name:"luciaSession",
		// this sets cookies with super long expiration
		// since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
		expires: false,
		attributes: {
			// set to `true` when using HTTPS
			secure: process.env.NODE_ENV === "production"
		},
        
	},
    getUserAttributes: (attributes) => {
		return {
			id:attributes.id,
			username: attributes.username,
            email:attributes.email,
            image:attributes.image,
			email_verified: attributes.email_verified
		};
	}
});

// IMPORTANT!
declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
		// DatabaseSessionAttributes:DatabaseSessionAttributes
	}
}

interface DatabaseUserAttributes {
	id:string
	username: string;
    email:string;
    image:string;
	email_verified: boolean;
}
// interface DatabaseSessionAttributes {
// 	// username: string;
//     // email:string;
//     // image:string;
	
// }


export const getUser = async () => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value || null
    if (!sessionId) {
        return null
    }
    const { session, user } = await lucia.validateSession(sessionId)
    try {
        if (session && session.fresh) {
            // refreshing their session cookie
            const sessionCookie = await lucia.createSessionCookie(session.id)
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
        }
        if (!session) {
            const sessionCookie = await lucia.createBlankSessionCookie()
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
        }

    } catch (error) {

    }
    const dbUser = await db.user.findUnique({
        where: {
            id: user?.id
        },
        select: {
			id:true,
            username: true,
            email: true,
            image: true
        }
    })
    return dbUser
}

export const validateSession =cache(async ()=>{
    console.log("🎷 🎷 🎷 🎷 🎷  running session validation 🎷 🎷 🎷 🎷 ")
    const sessionId = cookies().get(lucia.sessionCookieName)?.value || null
    if (!sessionId) {
        return null
    }
    const session =await lucia.validateSession(sessionId)
    if(!session){
        redirect("/signin")
        return 
    }
    return session
})


import { Google } from 'arctic'

export const googleOAuth = new Google(
    process.env.GOOGLE_CLIENT_ID!,
    process.env.GOOGLE_CLIENT_SECRET!,
    process.env.NEXT_PUBLIC_URL + '/api/auth/google/callback'
)