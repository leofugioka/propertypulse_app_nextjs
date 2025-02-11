"use client";

import { createContext, Dispatch, SetStateAction, useContext, useMemo, useState } from "react";

type UnreadMessagesContextType = {
  unreadCount: number;
  setUnreadCount: Dispatch<SetStateAction<number>>;
};

const defaultContextValues: UnreadMessagesContextType = { unreadCount: 0, setUnreadCount: () => {} };

const UnreadMessagesContext = createContext<UnreadMessagesContextType>(defaultContextValues);

interface UnreadMessagesContextProviderProps {
  children: React.ReactNode;
}

function UnreadMessagesContextProvider({ children }: Readonly<UnreadMessagesContextProviderProps>) {
  const [unreadCount, setUnreadCount] = useState(0);

  const valuesToShare = useMemo(
    () => ({
      unreadCount,
      setUnreadCount,
    }),
    [unreadCount]
  );

  return <UnreadMessagesContext.Provider value={valuesToShare}>{children}</UnreadMessagesContext.Provider>;
}

function useUnreadMessagesContext() {
  return useContext(UnreadMessagesContext);
}

export { UnreadMessagesContextProvider, useUnreadMessagesContext };
export default UnreadMessagesContext;
