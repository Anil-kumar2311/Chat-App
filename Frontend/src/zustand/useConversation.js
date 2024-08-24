// import { create } from "zustand";

// const useConversation = create((set) => ({
// 	selectedConversation: null,
// 	setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
// 	messages: [],
// 	setMessages: (messages) => set({ messages }),
// }));

// export default useConversation;
import { create } from "zustand";

const useConversation = create((set) => ({
  selectedConversation: null,
  messages: [],
  conversations: [],
  searchResults: [], // Add searchResults to state
  setMessages: (messages) => set({ messages }),
  setSelectedConversation: (conversation) => set({ selectedConversation: conversation }),
  setSearchResults: (results) => set({ searchResults: results }), // Add setSearchResults action
  clearSearchResults: () => set({ searchResults: [] }) // Add clearSearchResults action
}));

export default useConversation;


// import { create } from "zustand";

// const useConversation = create((set) => ({
//   selectedConversation: null,
//   searchResults: [],
//   setSelectedConversation: (conversation) =>
//     set({ selectedConversation: conversation }),
//   setSearchResults: (results) => set({ searchResults: results }),
// }));

// export default useConversation;
