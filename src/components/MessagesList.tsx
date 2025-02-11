import MessageCard from "@/components/MessageCard";
import { MessageWithPropertyName } from "../models/MessageWithPropertyName";

interface MessagesListProps {
  messages: MessageWithPropertyName[];
}
const MessagesList = ({ messages }: Readonly<MessagesListProps>) => {
  const readMessages = messages.filter((message) => message.read);
  const unreadMessages = messages.filter((message) => !message.read);
  const reorderedMessages = [...unreadMessages, ...readMessages];

  const renderedMessages = reorderedMessages.map((message) => {
    return <MessageCard key={message.id} message={message} />;
  });

  return (
    <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
      <h1 className="text-3xl font-bold mb-4">Your Messages</h1>
      {messages.length === 0 ? <p>You have no messages</p> : renderedMessages}
    </div>
  );
};

export default MessagesList;
