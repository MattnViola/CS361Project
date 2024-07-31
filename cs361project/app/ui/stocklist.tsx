import Link from "next/link";
import { Stock } from "@/app/lib/definitions";

interface StockListProps {
  stocks: Stock[];
}

const StockList: React.FC<StockListProps> = ({ stocks }) => {
  return (
    <div className="w-full  mx-auto">
      <table className="min-w-full border border-gray-400 bg-[#F0F0F0]">
        <thead className="bg-gray-300">
          <tr>
            <th className="border border-gray-400 p-2 text-left">Ticker</th>
            <th className="border border-gray-400 p-2 text-left">Name</th>
            <th className="border border-gray-400 p-2 text-left">%/d</th>
            <th className="border border-gray-400 p-2 text-left">Quantity</th>
            <th className="border border-gray-400 p-2"></th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock, index) => (
            <tr key={index}>
              <td className="border border-gray-400 p-2">{stock.ticker}</td>
              <td className="border border-gray-400 p-2">{stock.name}</td>
              <td className="border border-gray-400 p-2">
                {stock.changePercentage}
              </td>
              <td className="border border-gray-400 p-2">{stock.quantity}</td>
              <td className="border border-gray-400 p-2">
                <Link
                  href={`/portfolio/lookup?symbol=${stock.ticker}`}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockList;
