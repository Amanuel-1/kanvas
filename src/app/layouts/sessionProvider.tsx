"use client";

import { createContext } from "react";

export interface SessionContext {
  user: {
    id: string;
    username: string;
    email: string;
    image?: string;
  };
  session: any;
}
export const sessionContext = createContext<SessionContext | null>(null);

export default function SessionProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: SessionContext;
}) {
  return (
    <sessionContext.Provider value={value}>{children}</sessionContext.Provider>
  );
}
