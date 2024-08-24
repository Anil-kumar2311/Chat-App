import { useState, useRef, useEffect } from "react";
import { BsSend } from "react-icons/bs";
import { BsEmojiGrinFill } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import EmojiPicker from 'emoji-picker-react';

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { loading, sendMessage } = useSendMessage();
  const emojiPickerRef = useRef(null);
  const messageInputRef = useRef(null);

  // Handle emoji selection
  const handleEmojiSelect = (emojiObject) => {
    setMessage(prevMessage => prevMessage + emojiObject.emoji);
    // setShowEmojiPicker(false); // Close emoji picker after selection
  };

  // Handle click outside to close emoji picker
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target) ) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };

  return (
    <form className='px-4 my-3' onSubmit={handleSubmit}>
      <div className='w-full relative flex items-center'>
        {/* Emoji Button */}
        <button 
          type='button' 
          className='flex items-center pe-2'
          onClick={() => setShowEmojiPicker(prev => !prev)}
        >
          <BsEmojiGrinFill className='text-yellow-400 hover:text-yellow-500' />
        </button>
        {/* Input Field */}
        <input
          type='text'
          className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white'
          placeholder='Send a message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          ref={messageInputRef}
        />
        {/* Send Button */}
        <button 
          type='submit' 
          className='flex items-center bg-gray-600 text-white rounded-full px-4 py-2 hover:bg-gray-500 disabled:bg-green-400 transition-colors duration-300'
          disabled={loading}
        >
          {loading ? <div className='loading loading-spinner'></div> : <BsSend className='text-green-500' />}
        </button>
        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div 
            className='absolute bottom-12 start-0' 
            ref={emojiPickerRef}
          >
            <EmojiPicker onEmojiClick={handleEmojiSelect} />
          </div>
        )}
      </div>
    </form>
  );
};

export default MessageInput;
