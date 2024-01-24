function Search() {
  return (
    <div
      className="flex bg-white rounded-lg flex-grow min-[800px]:mx-8 mx-2 "
      x-data="{ search: '' }"
    >
      <input
        type="search"
        className="px-4 text-gray-800 rounded-full focus:outline-none w-full"
        placeholder="search"
        x-model="search"
      />
      <button
        type="submit"
        className={`flex items-center bg-yellow-500  justify-center w-16 min-[800px]:h-11 h-auto text-white rounded-r-lg cursor-pointer`}
        disabled="search.length == 0"
      >
        <svg
          className="w-5 h-5 "
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </button>
    </div>
  );
}

export default Search;
