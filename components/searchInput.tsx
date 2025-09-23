export default function SearchInput() {
  return (
    <div className="flex justify-end flex-1 gap-2">
      <input
        type="search"
        className="p-2 border-gray-400 rounded-md border-1 md:min-w-60 lg:min-w-80"
        placeholder="بحث عن مقالة..."
      />
      <button className="p-2 border-gray-400 rounded-md cursor-pointer border-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </button>
    </div>
  );
}
