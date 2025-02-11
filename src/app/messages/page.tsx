import MessagesList from "@/components/MessagesList";
import * as queries from "@/queries";
import type { MessageWithPropertyName } from "@/models/MessageWithPropertyName";

const MessagesPage = async () => {
  const messages: MessageWithPropertyName[] = await queries.getMessages();

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24 max-w-6xl">
        <MessagesList messages={messages} />
      </div>
    </section>
  );
};

export default MessagesPage;
