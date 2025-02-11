"use client";

import { SessionProvider } from "next-auth/react";
import { UnreadMessagesContextProvider } from "@/context/GlobalContext";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: Readonly<ProvidersProps>) => {
  return (
    <SessionProvider>
      <UnreadMessagesContextProvider>{children}</UnreadMessagesContextProvider>
    </SessionProvider>
  );
};

export default Providers;
