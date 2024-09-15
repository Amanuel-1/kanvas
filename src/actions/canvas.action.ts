'use server'

import db from "@/lib/db";
import { connect } from "http2";

export async function AddToAsset(url:string,name:string,userId:string){
  try {
    const asset = await db.asset.create({
      data:{
        url,
        name,
        users:{
          connect:{
            id:userId
          }
        }
      }
    });
    return {success:true,error:""}
  } catch (e) {
    return {success:false,error:"something went wrong"}
  }
}

export const resizeImageUrl = (url: string, width: number, height: number) => {
    return `https://res.cloudinary.com/demo/image/fetch/w_${width},h_${height},c_fill/${url}`;
  };