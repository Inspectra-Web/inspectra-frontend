import { CiSearch } from "react-icons/ci";
import Button from "./Button";
import { useState } from "react";
import { SlClose } from "react-icons/sl";

export default function ListingsSearch({
  onSearch,
  searchInput,
  onCloseSearch,
}) {
  const [filters, setFilters] = useState({
    type: "",
    listingStatus: "",
    category: "",
    location: "",
  });

  const handleChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSearch = () => onSearch(filters);

  return (
    <div className="from-sky-500 to-blue-500 bg-gradient-to-tr p-10 rounded-3xl flex max-w-full flex-wrap justify-center items-center gap-10 mx-auto relative">
      <button
        onClick={() => onCloseSearch(false)}
        className="text-white absolute top-10 right-10"
      >
        <SlClose size={24} />
      </button>
      {searchInput}
      <select
        id="type"
        value={filters.type}
        onChange={handleChange}
        className="italic border-2 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-transparent transition-all duration-300 rounded-full h-20 px-10 text-slate-700 placeholder:text-slate-500 capitalize"
      >
        <option disabled>Search property type</option>
        <option value="">All type</option>
        {[
          "office",
          "flat",
          "warehouse",
          "mansion",
          "land",
          "apartment",
          "condominium",
          "duplex",
          "townhouse",
          "villa",
          "bungalow",
          "self-contained",
          "single-family-home",
          "multi-family-home",
          "studio",
          "penthouse",
          "hotel",
          "resort",
          "restaurant",
          "serviced-apartment",
          "hospital",
          "school",
          "farm",
          "campground",
          "other",
        ].map((type) => (
          <option value={type} key={type}>
            {type}
          </option>
        ))}
      </select>
      <select
        id="listingStatus"
        value={filters.listingStatus}
        onChange={handleChange}
        className="italic border-2 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-transparent transition-all duration-300 rounded-full h-20 px-10 placeholder:text-slate-500 text-slate-700 capitalize"
      >
        <option disabled>Search property status</option>
        <option value="">All Status</option>
        <option value="lease">For Lease</option>
        <option value="rent">For Rent</option>
        <option value="sale">For Sale</option>
        <option value="shortlet">Shortlet</option>
      </select>
      <select
        value={filters.category}
        onChange={handleChange}
        id="category"
        className="italic border-2 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-transparent transition-all duration-300 rounded-full h-20 px-10 text-slate-700 placeholder:text-slate-500 capitalize"
      >
        <option disabled>Search property category</option>
        <option value="">All Category</option>
        {[
          "commercial",
          "residential",
          "industrial",
          "land",
          "agricultural",
          "hospitality",
          "mixed-use",
          "institutional",
          "recreational",
          "other",
        ].map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <select
        value={filters.location}
        onChange={handleChange}
        id="location"
        className="italic border-2 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-transparent transition-all duration-300 rounded-full h-20 px-10 placeholder:text-slate-500 text-slate-700 capitalize"
      >
        <option disabled>Search property location</option>
        <option value="">All Locations</option>
        {[
          "Isolo",
          "Victoria Island",
          "Ikeja",
          "Ikoyi",
          "Lekki",
          "Banana Island",
          "Surulere",
          "Abuja",
          "Enugu",
          "Ajah",
          "Owerri",
        ].map((location) => (
          <option value={location} key={location}>
            {location}
          </option>
        ))}
      </select>
      <Button onClick={handleSearch}>
        <CiSearch size={24} />
        <span>Search</span>
      </Button>
    </div>
  );
}
