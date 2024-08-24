import MessageContainer from "../../components/messages/MessageContainer";
import Profile from "../../components/profile/Profile";

import Sidebar from "../../components/sidebar/Sidebar";
import { useState } from "react";

const Home = () => {
	const [showTooltip, setShowTooltip] = useState(false);
	return (
	<div className="">
      <div className="absolute top-5 right-0 p-4">
	  	<div 
			className="relative flex items-center"
			onMouseEnter={() => setShowTooltip(true)}
			onMouseLeave={() => setShowTooltip(false)}
			// onClick={() => setShowTooltip(false)}
		>
			<Profile/>
			{showTooltip && (
			<div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2">
				Profile
			</div>
			)}
  		</div>
      </div>
		<div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
			<Sidebar />
			<MessageContainer />
		</div>
	</div>
	
	);
};
export default Home;