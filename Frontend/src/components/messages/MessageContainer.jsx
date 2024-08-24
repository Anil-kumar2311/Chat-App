import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import {TiMessages} from "react-icons/ti"
import { useAuthContext } from "../../context/AuthContext";
import { useSocketContext } from "../../context/SocketContext";
import { RiRadioButtonLine } from "react-icons/ri";

const MessageContainer = () => {

	const {selectedConversation, setSelectedConversation} = useConversation();
	console.log(selectedConversation)
	const {onlineUsers} = useSocketContext();
	const isOnline =  onlineUsers.includes(selectedConversation?._id)
	// const isOnline ="true"
	useEffect(() =>{
		return () => setSelectedConversation(null)
	},[setSelectedConversation])
   
	return (
		<div className='md:w-[800px] flex flex-col'>
			{!selectedConversation?(<NoChatSelected/>):(<><div className='bg-slate-500 px-4 py-2 mb-2'>
				<div className="flex items-center space-x-2">
					
					<RiRadioButtonLine className={`h-4 w-4 rounded-full ${isOnline ? 'text-green-500' : 'text-red-600'}`}/>
					<span className="text-gray-900 font-bold">{selectedConversation.username}</span>
					{/* <div className={`h-2 w-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-600'}`}></div> */}
					</div>

					<div className='px-6 text-xs text-gray-900'>{selectedConversation.fullName}</div> 

					<div className="flex items-center space-x-2">
					
					</div>
				</div>
				<Messages />
				<MessageInput />
				</>)}
				
		</div>
	);
};


const NoChatSelected = () => {
	const { authUser } = useAuthContext();
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋 {authUser.fullName} ❄</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};
export default MessageContainer;