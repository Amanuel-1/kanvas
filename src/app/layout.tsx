import type { Metadata } from "next";
import { Inter, Pacifico,Fira_Sans } from "next/font/google";
import "./globals.css";
import SessionProvider, { SessionContext } from "./layouts/sessionProvider";
import { validateSession } from "@/lib/auth";
import { EdgeStoreProvider } from "./layouts/edgestoreProvider";

const sans = Fira_Sans({ weight: "400", subsets: ["latin"] });

export async function generateMetadata(
): Promise<Metadata> {
  // read route params

 
  // fetch data
  const title =  "Zeamani-GuestBook";
 

  const website  = "https://kanvas-psi.vercel.app"
  // optionally access and extend (rather than replace) parent metadata

  return {
    title: "Kanvas 🎨",
    description: "Welcome to Kanvas, a lightweight and fully customizable canvas app built with cutting-edge technologies! 🚀 Whether you're a designer, developer, or someone passionate about creative web apps, Kanvas is here to help you design beautiful and interactive div-based canvases.",
    authors: [{ 
      name: "Amanuel Garomsa", 
      url: "https://i.ibb.co/jkd71L1/opengraph.png" 
    }],
    creator: "Amanuel Garomsa",
    keywords: ["Kanvas", "Canvas App", "Next.js", "TailwindCSS", "Zustand", "Supabase", "Web Design"],
    openGraph: {
      images: ["https://i.ibb.co/jkd71L1/opengraph.png" ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Kanvas 🎨",
      creator: "Amanuel Garomsa",
      description: "Welcome to Kanvas! Lightweight, customizable, and built with modern tech like Next.js, TailwindCSS, and Zustand. Design stunning interactive canvases. 🚀",
      images: ["<Insert image URL for Kanvas here>"],
    }
  }
  
}





export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await validateSession();

  return (
    <html lang="en">
      <SessionProvider value={session as SessionContext}>
        <EdgeStoreProvider>
          <body className={sans.className}>{children}</body>
        </EdgeStoreProvider>
      </SessionProvider>
    </html>
  );
}
