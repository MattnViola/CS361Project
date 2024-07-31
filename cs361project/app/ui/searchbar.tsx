import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleButtonClick = () => {
    router.push(`/portfolio/lookup?symbol=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div className="w-full max-w-5xl flex justify-left mb-4 space-x-4">
      <input
        type="text"
        placeholder="Search stocks..."
        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button
        onClick={handleButtonClick}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Go
      </button>
    </div>
  );
};

export default SearchBar;
