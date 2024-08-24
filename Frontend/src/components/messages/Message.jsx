
import { useAuthContext } from "../../context/AuthContext";
// import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";
import { format } from 'date-fns';


const Message = ({ message }) => {
	const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();
	const fromMe = message.senderId === authUser._id;
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
	const bubbleBgColor = fromMe ? "bg-blue-500" : "";

	// function formatDate(createdAt) {
	// 	const date = new Date(createdAt);
	  
	// 	// Using toLocaleString to format the date to DD/MM/YYYY HH:MM AM/PM
	// 	return date.toLocaleString('en-GB', {
	// 	  day: '2-digit',
	// 	  month: '2-digit',
	// 	  year: 'numeric',
	// 	  hour: '2-digit',
	// 	  minute: '2-digit',
	// 	  hour12: true
	// 	});
	//   }
	// const createdDate = format(new Date(message.createdAt), 'dd-MM-yyyy hh:mm a'); // To display in message
	const createdDate = format(new Date(message.createdAt), 'dd-MM-yyyy'); //For comparison to current date
	const createdTime = format(new Date(message.createdAt), 'hh:mm a')
	const today = new Date();
	const currentDate = format(today, 'dd-MM-yyyy'); 

	let formattedDate = "";
	if(createdDate === currentDate){
		formattedDate = "Today, "+createdTime
	}else{
		formattedDate = createdDate+", "+createdTime;
	}

	const shakeClass = message.shouldShake ? "shake" : "";

	return (
		<div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={profilePic} />
				</div>
			</div>
			
			<div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedDate}</div>
		</div>
	);
};
export default Message;
