import { googleOAuth } from "@/auth";
import { lucia } from "@/lib/auth";
import db from "@/lib/db";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  

try {
  const code = req.nextUrl.searchParams.get("code")??"";
  const state = req.nextUrl.searchParams.get("state")??"";

  if (!code || !state) {
    console.error("no code or state");
    return new Response("Invalid Request", { status: 400 });
  }
  const stateVerifier = cookies().get("state")?.value;
  const codeVerifier = cookies().get("codeVerifier")?.value;

  if (!codeVerifier || !stateVerifier) {
    console.error("no code or state");
    return new Response("Invalid Request", { status: 400 });
  }
  if (state !== stateVerifier) {
    console.error("state mismatch found");
    return new Response("Invalid Request", { status: 400 });
  }


  const {accessToken} = await googleOAuth.validateAuthorizationCode(code,codeVerifier);

  const googleConsentResponse =await fetch("https://www.googleapis.com/oauth2/v1/userinfo",{
    headers:{
      Authorization: `Bearer ${accessToken}`
    }
  }) 

  const googleUserData = await googleConsentResponse.json() as GoogleUserInfoResponse;

  const exsistingUser = await db.user.findUnique({
    where:{
      email:googleUserData.email
    }
  })
  let userId = ""
  if(exsistingUser){
    userId = exsistingUser.id
  }else{
    const newUser = await db.user.create({
      data:{
        id:googleUserData.id,
        email:googleUserData.email,
        username:googleUserData.name,
        image:googleUserData.picture
      }
    })
    userId = newUser.id;
  }

  //create a session 
  const session = await lucia.createSession(userId,{});
  const sessionCookie = lucia.createSessionCookie(session.id);
  
  cookies().set(sessionCookie.name,sessionCookie.value,sessionCookie.attributes)


  return new Response("Redirecting...", {status:302,headers:{
    Location: "/designer"
  }})
}
catch (error) {
  console.error(error);
  return new Response("Internal Server Error", { status: 500 });

}
}


interface GoogleUserInfoResponse {
id:string,
email:string,
name:string,
picture:string
}