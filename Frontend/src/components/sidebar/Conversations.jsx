import { getRandomEmoji } from "../../utils/emoji.js";
import useGetConversations from "../../hooks/useGetConversations";
import Conversation from "./Conversation";
import useConversation from "../../zustand/useConversation";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  const { searchResults } = useConversation();

  const displayConversations = searchResults.length > 0 ? searchResults : conversations;

  return (
    <div className='flex-1 overflow-auto'>
      {displayConversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()} // Ensure getRandomEmoji is invoked
          lastIdx={idx === displayConversations.length - 1} // Check against displayConversations length
        />
      ))}
      {loading && <span className='loading loading-spinner'></span>}
    </div>
  );
};

export default Conversations;
