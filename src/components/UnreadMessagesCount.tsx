"use client";

import { useUnreadMessagesContext } from "@/context/GlobalContext";
import { useSession } from "next-auth/react";
import * as queries from "@/queries";

const UnreadMessagesCount = () => {
  const { data: session } = useSession();
  const { unreadCount, setUnreadCount } = useUnreadMessagesContext();

  if (session && session.user) {
    queries.getUnreadMessagesCount().then((res) => {
      setUnreadCount(res);
    });
  }

  return unreadCount === 0 ? null : (
    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
      {unreadCount}
    </span>
  );
};

export default UnreadMessagesCount;
