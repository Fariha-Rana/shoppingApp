function Search() {
  return (
    <div className='flex items-center justify-center'>
    <div className="flex items-center bg-white rounded-lg w-full " x-data="{ search: '' }">
            <input type="search" className="min-[1024px]:w-[50rem] px-4 text-gray-800 rounded-full focus:outline-none"
                placeholder="search" x-model="search" />
            <button type="submit" className={`flex items-center bg-blue-500 justify-center w-10 h-10 text-white rounded-r-lg cursor-pointer`}
                disabled="search.length == 0">
                <svg className="w-5 h-5 " fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
            </button>
        </div>
    </div>
  )
}

export default Search