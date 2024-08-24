import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
	const { loading, logout } = useLogout();

	return (
		<div className='mt-auto'>
			{!loading ? (
				<div className="flex items-center px-4 py-2 text-red-600 cursor-pointer hover:bg-red-100" onClick={logout}>
				<BiLogOut className="mr-1" />
				<span>Logout</span>
			</div>

) : (
  <span className="loading loading-spinner"></span>
)}

		</div>
	);
};
export default LogoutButton;