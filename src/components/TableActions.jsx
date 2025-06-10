import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

export function BtnAction({ title, clr, hoverClr, icon }) {
  return (
    <div
      title={title}
      className={`w-16 h-12 bg-gradient-to-tr ${clr} rounded-md flex justify-center items-center cursor-pointer ${hoverClr}`}
    >
      {icon}
    </div>
  );
}

export function SearchAndSort({
  search,
  onSearchChange,
  onSearchSubmit,
  sort,
  onSortChange,
  sortOptions,
}) {
  return (
    <div className="flex gap-5">
      <div className="bg-white shadow-sm focus-within:ring-2 h-16 w-[25rem] rounded-full flex items-center gap-3 px-6 py-2">
        <select
          value={sort}
          onChange={onSortChange}
          className="w-full border-none outline-none capitalize text-slate-500"
        >
          <option value="">Sort by ...</option>
          {sortOptions.map((option, idx) => (
            <option key={idx} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <form
        onSubmit={onSearchSubmit}
        className="bg-white shadow-sm h-16 rounded-full w-[50rem] flex items-center gap-3 px-6 py-2"
      >
        <input
          type="text"
          className="bg-transparent h-full outline-none flex-1"
          placeholder="Search..."
          value={search}
          onChange={onSearchChange}
        />
        <button>
          <HiOutlineMagnifyingGlass className="text-lg text-slate-500 cursor-pointer" />
        </button>
      </form>
    </div>
  );
}

export function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex items-center gap-10 place-content-center my-10 text-slate-500">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        className="w-16 h-16 rounded-md flex  items-center justify-center bg-gradient-to-tr from-blue-400 to-blue-600 text-white focus:ring-blue-500 focus:ring-2 ring-offset-1 transition-all duration-300"
      >
        <HiOutlineChevronLeft size={24} />
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`text-2xl w-14 h-14 ${
            currentPage === index + 1 ? "bg-sky-500 text-white" : "bg-slate-300"
          } rounded-md`}
        >
          {index + 1}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        className="w-16 h-16 rounded-md flex  items-center justify-center bg-gradient-to-tr from-blue-400 to-blue-600 text-white focus:ring-blue-500 focus:ring-2 ring-offset-1 transition-all duration-300"
      >
        <HiOutlineChevronRight size={24} />
      </button>
    </div>
  );
}
