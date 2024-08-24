import useGetConversations from "../../hooks/useGetConversations";
import useConversation from "../../zustand/useConversation";

const SearchFilter = () => {
  const { loading,conversations } = useGetConversations();
  const { clearSearchResults,searchResults } = useConversation();

  const handleRestoreAll = () => {
    clearSearchResults();
  };
  const totalConversations = conversations.length; // Total number of conversations
  const searchResultsCount = searchResults.length;

  // const isSearchActive = searchResultsCount > 0;


  return (
    <div className='mt-auto flex'>
      <div>
      {!loading ? (
         <button onClick={handleRestoreAll} className='btn btn-sm text-white'>
         All
       </button>
      ) : (
        <span className='loading loading-spinner'></span>
      )}
      </div>
      <div className="ml-auto">
        <p className="text-xs">{searchResultsCount ? `${searchResultsCount}(${totalConversations})` : `${totalConversations}`}</p>
      </div>
    </div>
  );
};

export default SearchFilter;
