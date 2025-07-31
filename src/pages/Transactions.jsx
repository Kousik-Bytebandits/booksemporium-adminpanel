import { useState, useEffect, useRef } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { FaCalendarAlt, FaSync } from "react-icons/fa";

export default function Transactions() {
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date("2025-01-01"),
      endDate: new Date("2025-01-12"),
      key: "selection",
    },
  ]);
  const [transactions, setTransactions] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef();
  const [currentDate, setCurrentDate] = useState("");

  // Format date to MM-DD-YYYY
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };
const downloadExcelFile = async (url, filename) => {
  try {
    const response = await fetch(url, {
      method: 'GET'
    });

    if (!response.ok) {
      throw new Error('Failed to download file');
    }

    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(downloadUrl);
  } catch (err) {
    alert('Download failed: ' + err.message);
  }
};

  const fetchTransactions = async () => {
    const from = formatDate(dateRange[0].startDate);
    const to = formatDate(dateRange[0].endDate);

    try {
      const response = await fetch(
        `https://booksemporium.in/Microservices/Prod/03_admin_Panel/transactions/table?from=${from}&to=${to}`
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        setTransactions(data);
        console.log("date",data);
      } else {
        console.error("Unexpected response format", data);
        setTransactions([]);
      }
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [dateRange]);

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const formattedDate = now.toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      });
      const formattedTime = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setCurrentDate(`${formattedDate} ${formattedTime}`);
    };
    updateDate();
    const interval = setInterval(updateDate, 600);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="p-6 font-sans overflow-y-auto w-full bg-[#f4e8dc] min-h-screen">
      {/* Top Header */}
      <section className="mb-4 text-white">
        <div className="rounded w-full min-h-[80px] bg-topbar flex flex-col md:flex-row md:items-center px-6 py-4 gap-4">
          <h2 className="text-[24px] md:text-[30px] font-archivo font-bold uppercase flex-1">
            Transactions
          </h2>
          <div className="flex items-center gap-3">
            <p className="hidden md:inline text-[18px]">Data Refresh</p>
            <FaSync
              className="hidden md:inline cursor-pointer text-lg"
              title="Sync"
              onClick={fetchTransactions}
            />
            <span className="text-sm md:text-base text-[#102B01] border border-[#375683] px-3 py-1 rounded-md bg-white font-bold">
              {currentDate}
            </span>
          </div>
        </div>
      </section>

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
                {dateRange[0].startDate.toLocaleDateString()} -{" "}
                {dateRange[0].endDate.toLocaleDateString()}
              </span>
              <FaCalendarAlt className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600" />
            </div>
          </div>
          <button
  className="bg-[#FFAC7B] text-black font-semibold px-4 py-2 rounded shadow hover:bg-orange-600"
  onClick={() =>
    downloadExcelFile(
      "https://booksemporium.in/Microservices/Prod/03_admin_Panel/transactions/export-orders",
      "transactions.xlsx"
    )
  }
>
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
      <div className="bg-white shadow mt-4 rounded overflow-x-auto">
        <table className="min-w-full text-left border border-gray-300">
          <thead className="bg-gray-200 text-gray-800 font-semibold">
            <tr>
              <th className="px-4 py-2 border border-gray-300">Payment ID</th>
              <th className="px-4 py-2 border border-gray-300">Created On</th>
              <th className="px-4 py-2 border border-gray-300">Customer Phone</th>
              <th className="px-4 py-2 border border-gray-300">Customer Email</th>
              <th className="px-4 py-2 border border-gray-300">Status</th>
              <th className="px-4 py-2 border border-gray-300">Amount</th>
            </tr>
          </thead>
       <tbody>
  {transactions.length > 0 ? (
    transactions.map((tx, index) => (
      <tr key={tx.Payment_id || index} className="bg-white hover:bg-gray-50">
        <td className="px-4 py-2 border border-gray-300">{tx.Payment_id}</td>
        <td className="px-4 py-2 border border-gray-300">{tx.Created_on}</td>
        <td className="px-4 py-2 border border-gray-300">{tx.Customer_Phone}</td>
        <td className="px-4 py-2 border border-gray-300">{tx.Customer_Email}</td>
        <td className="px-4 py-2 border border-gray-300">
          <span
            className={`px-3 py-1 text-sm font-bold rounded-full ${
              tx.payment_status.toLowerCase() === "paid"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {tx.payment_status}
          </span>
        </td>
        <td className="px-4 py-2 border border-gray-300">₹{tx.Amount}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="6" className="text-center py-6 text-gray-500">
        No transactions found for the selected date range.
      </td>
    </tr>
  )}
</tbody>


        </table>
      </div>
    </div>
  );
}
