"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import SearchBar from "@/app/ui/searchbar";
import {
  getCurrentPrice,
  getPercentChangeToday,
  getPercentChangeThisMonth,
  getPercentChangeThisYear,
} from "../../utils/stockUtils";

const apiKey = "EF408253ZSWRBCPK";

const fetchIntradayData = async (symbol: string, apiKey: string) => {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching intraday data:", error);
    return null;
  }
};

const fetchDailyData = async (symbol: string, apiKey: string) => {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching daily data:", error);
    return null;
  }
};

const StockMetrics: React.FC = () => {
  const searchParams = useSearchParams();
  const symbol = searchParams.get("symbol") || "AAPL"; // Default to 'AAPL' if no symbol is provided
  const [intradayData, setIntradayData] = useState<any>(null);
  const [dailyData, setDailyData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [amountOwned, setAmountOwned] = useState(0);
  const [orderType, setOrderType] = useState("Buy");
  const [orderAmount, setOrderAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [intradayResult, dailyResult] = await Promise.all([
        fetchIntradayData(symbol, apiKey),
        fetchDailyData(symbol, apiKey),
      ]);
      setIntradayData(intradayResult);
      setDailyData(dailyResult);
      setLoading(false);
    };
    fetchData();
  }, [symbol]);

  if (loading) return <div>Loading...</div>;

  // TODO: Remove fixed numbers after turning to microservice.
  const currentPrice = 193.7; //getCurrentPrice(intradayData);
  const percentChangeToday = 0.32; //getPercentChangeToday(dailyData);
  const percentChangeThisMonth = 0.96; //getPercentChangeThisMonth(
  //   dailyData,
  //   new Date().toISOString().substring(0, 7)
  // );
  const percentChangeThisYear = 11.41; //getPercentChangeThisYear(
  //   dailyData,
  //   new Date().getFullYear().toString()
  // );
  const totalValue = amountOwned * currentPrice;
  const orderValue = orderAmount * currentPrice;

  const handlePlaceOrder = () => {
    setShowModal(true);
  };

  const handleConfirmOrder = () => {
    // Handle order confirmation logic here
    setShowModal(false);
  };

  const handleCancelOrder = () => {
    setShowModal(false);
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-4 text-center">Stock Metrics</h1>
      <SearchBar />
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-2">{symbol}</h2>
        <p>Current Price: ${currentPrice.toFixed(2)}</p>
        <p>Percent Change Today: {percentChangeToday.toFixed(2)}%</p>
        <p>Percent Change This Month: {percentChangeThisMonth.toFixed(2)}%</p>
        <p>Percent Change This Year: {percentChangeThisYear.toFixed(2)}%</p>
      </div>
      <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-2">Amount Owned</h3>
        <input
          type="number"
          value={amountOwned}
          onChange={(e) => setAmountOwned(Number(e.target.value))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <h3 className="text-xl font-semibold mb-2 mt-4">Total Value</h3>
        <input
          type="text"
          value={`$${totalValue.toFixed(2)}`}
          readOnly
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mt-4">
        <button
          onClick={handlePlaceOrder}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Place Order
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Order Confirmation</h2>
            <div className="mb-4">This order will be final.</div>
            <table className="w-full mb-4">
              <tbody>
                <tr className="h-12">
                  <td className="w-1/2">Order Type</td>
                  <td className="w-1/2">
                    <select
                      value={orderType}
                      onChange={(e) => setOrderType(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Buy">Buy</option>
                      <option value="Sell">Sell</option>
                    </select>
                  </td>
                </tr>
                <tr className="h-12">
                  <td className="w-1/2">Amount</td>
                  <td className="w-1/2">
                    <input
                      type="number"
                      value={orderAmount}
                      onChange={(e) => setOrderAmount(Number(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                </tr>
                <tr className="h-12">
                  <td className="w-1/2">Value</td>
                  <td className="w-1/2">
                    <input
                      type="text"
                      value={`$${orderValue.toFixed(2)}`}
                      readOnly
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="flex justify-between">
              <button
                onClick={handleCancelOrder}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmOrder}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StockMetrics;
