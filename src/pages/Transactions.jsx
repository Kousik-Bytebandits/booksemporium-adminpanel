import { useState, useEffect, useRef } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { FaCalendarAlt } from "react-icons/fa";

export default function Transactions() {
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date("2025-01-01"),
      endDate: new Date("2025-01-02"),
      key: "selection",
    },
  ]);
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const transactions = Array.from({ length: 10 }, (_, i) => ({
    id: `pay_Qyv3ZsDTBMKFg${i}`,
    createdOn: "Tue, Jul 29, 2025 8:09 PM",
    phone: "+919999999999",
    email: "your-email@example.com",
    status: i % 3 === 0 ? "FAILED" : "PAID",
    amount: 1999.99,
  }));

  return (
    <div className="p-6 font-sans w-full bg-[#f4e8dc] min-h-screen">
      {/* Top Header */}
      <div className="bg-[#3d2514] text-white rounded-md px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold">TRANSACTIONS</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm">Data Refresh 🔄</span>
          <div className="bg-white text-black px-3 py-1 rounded text-sm font-semibold">
            July 03, 2025 <span className="ml-2 text-green-700">12:15 PM</span>
          </div>
        </div>
      </div>

      {/* Filter Row */}
      <div className="bg-white shadow-md mt-4 p-4 rounded relative">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-4">
            <label className="font-semibold">Transaction Date</label>
            <div
              className="relative border rounded-md px-10 py-2 bg-white cursor-pointer w-fit"
              onClick={() => setShowCalendar(!showCalendar)}
            >
              <span>
                {dateRange[0].startDate.toLocaleDateString()} - {dateRange[0].endDate.toLocaleDateString()}
              </span>
              <FaCalendarAlt className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600" />
            </div>
          </div>
          <button className="bg-orange-500 text-white font-semibold px-4 py-2 rounded shadow hover:bg-orange-600">
            Download All
          </button>
        </div>
        {showCalendar && (
          <div ref={calendarRef} className="absolute z-50 mt-4">
            <DateRange
              editableDateInputs={true}
              onChange={(item) => setDateRange([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={dateRange}
              months={2}
              direction="horizontal"
              className="shadow-md"
            />
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-white  shadow mt-4 rounded overflow-x-auto">
        <table className="min-w-full text-left border border-gray-300">
          <thead className="bg-gray-200 text-gray-800 font-semibold">
            <tr>
              <th className="px-4 py-2 border border-gray-300">Payment_id</th>
              <th className="px-4 py-2 border border-gray-300">Created_on</th>
              <th className="px-4 py-2 border border-gray-300">Customer_Phone</th>
              <th className="px-4 py-2 border border-gray-300">Customer_Email</th>
              <th className="px-4 py-2 border border-gray-300">Status</th>
              <th className="px-4 py-2 border border-gray-300">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className="bg-white hover:bg-gray-50">
                <td className="px-4 py-2 border border-gray-300">{tx.id}</td>
                <td className="px-4 py-2 border border-gray-300">{tx.createdOn}</td>
                <td className="px-4 py-2 border border-gray-300">{tx.phone}</td>
                <td className="px-4 py-2 border border-gray-300">{tx.email}</td>
                <td className="px-4 py-2 border border-gray-300">
                  <span
                    className={`px-3 py-1 text-sm font-bold rounded-full ${
                      tx.status === "PAID"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {tx.status}
                  </span>
                </td>
                <td className="px-4 py-2 border border-gray-300">{tx.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
