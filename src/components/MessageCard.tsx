"use client";

import type { MessageWithPropertyName } from "@/models/MessageWithPropertyName";
import * as actions from "@/actions";
import { toast } from "react-toastify";

interface MessageCardProps {
  message: MessageWithPropertyName;
}

const MessageCard = ({ message }: Readonly<MessageCardProps>) => {
  const handleMarkAsReadClick = async () => {
    const response = await actions.toggleMessageReadStatus(message.id);

    if (response.status) {
      toast.success(`Message id: ${message.id} marked as READ`);
    } else if (!response.status) {
      toast.success(`Message id: ${message.id} marked as NEW`);
    } else {
      throw new Error("Something went wrong");
    }
  };

  const handleDeleteClick = async () => {
    const response = await actions.deleteMessageById(message.id);

    if (response.status) {
      toast.success("Message deleted succesfully");
    }
  };

  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
      <p className="text-sm text-gray-500">Message id: {message.id}</p>
      {!message.read && <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md">New</div>}
      <h2 className="text-xl mb-4">
        <span className="font-bold">Property Inquiry:</span> {message.property.name}
      </h2>

      <p className="text-gray-700">{message.message}</p>

      <ul className="mt-4">
        <li>
          <strong>Reply Email:</strong>{" "}
          <a href={`mailto:${message.email}`} className="text-blue-500">
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone:</strong>{" "}
          <a href={`tel:${message.phone}`} className="text-blue-500">
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received:</strong> {new Date(message.createdAt).toLocaleString("en-US")}
        </li>
      </ul>
      <button className="mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md" onClick={handleMarkAsReadClick}>
        {message.read ? "Mark As New" : "Mark As Read"}
      </button>
      <button className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md" onClick={handleDeleteClick}>
        Delete
      </button>
    </div>
  );
};

export default MessageCard;
