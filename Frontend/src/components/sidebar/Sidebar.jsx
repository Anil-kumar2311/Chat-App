import Conversations from "./Conversations";
import SearchInput from "./SearchInput";
import SearchFilter from "./SearchFilter";


const Sidebar = () => {
  return (
    <div className='border-r border-slate-500 p-4 flex flex-col h-full'>
      <SearchInput />
      <div className='mt-4'>
        <SearchFilter />
      </div>
      <div className='divider my-4 border-gray-300'></div>
      <div className='flex flex-col flex-grow overflow-auto'>
        <Conversations />
      </div>
    </div>
  );
};

export default Sidebar;
