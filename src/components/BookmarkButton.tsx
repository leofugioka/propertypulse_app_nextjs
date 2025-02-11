"use client";

import { FaBookmark } from "react-icons/fa";
import * as actions from "@/actions";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

interface BookmarkButtonProps {
  propertyId: string;
  isBookmarked: boolean;
}

const BookmarkButton = ({ propertyId, isBookmarked }: Readonly<BookmarkButtonProps>) => {
  const { data: session } = useSession();

  const handleBookmarkClick = async () => {
    if (!session?.user) {
      toast.error("You must be signed in");
    } else {
      const response = await actions.toggleBookmark(propertyId);

      if (!response) {
        toast.error("Could not add/remove property from bookmarked properties");
      } else {
        toast.success(response.message);
      }
    }
  };

  let renderedButton: React.ReactNode;
  if (!isBookmarked) {
    renderedButton = (
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center" onClick={handleBookmarkClick}>
        <FaBookmark className="mr-2" /> Bookmark Property
      </button>
    );
  } else {
    renderedButton = (
      <button className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center" onClick={handleBookmarkClick}>
        <FaBookmark className="mr-2" /> Remove Bookmark
      </button>
    );
  }

  return renderedButton;
};

export default BookmarkButton;
