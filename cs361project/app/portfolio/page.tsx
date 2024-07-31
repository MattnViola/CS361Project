"use client";

import React, { useState, useEffect } from "react";
import StockList from "@/app/ui/stocklist";
import { Stock } from "@/app/lib/definitions";
import SearchBar from "../ui/searchbar";

const stocks: Stock[] = [
  {
    ticker: "AAPL",
    name: "Apple Inc.",
    changePercentage: "+1.25%",
    quantity: 50,
  },
  {
    ticker: "GOOGL",
    name: "Alphabet Inc.",
    changePercentage: "-0.75%",
    quantity: 30,
  },
];

export default function Page() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Check if the modal has been shown before
    const modalShown = localStorage.getItem("modalShown");
    console.log("Modal shown status:", modalShown); // Debug statement
    if (!modalShown) {
      setShowModal(true);
      localStorage.setItem("modalShown", "true");
      console.log("Setting modalShown to true"); // Debug statement
    }
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div>
        <div className="text-black text-7xl text-center font-normal font-['Lancelot'] leading-[86.40px] mb-10">
          Your Portfolio
        </div>
        <SearchBar />
        <StockList stocks={stocks} />
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Welcome!</h2>
            <p className="mb-4">
              To get started, try searching for a new stock. You can search for
              a stock by using its ticker symbol, or the full name of the stock.
            </p>
            <div className="flex justify-end">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
