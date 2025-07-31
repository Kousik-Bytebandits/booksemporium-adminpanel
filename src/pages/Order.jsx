import { useState, useEffect ,useRef} from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import { FaCalendarAlt, FaSync } from "react-icons/fa";

export default function CustomersOrders() {
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date("2025-01-01"),
      endDate: new Date("2025-01-12"),
      key: "selection",
    },
  ]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [orders, setOrders] = useState([]);
  const [currentDate, setCurrentDate] = useState("");

  // Format date as MM-DD-YYYY
  const formattedFrom = format(dateRange[0].startDate, "MM-dd-yyyy");
  const formattedTo = format(dateRange[0].endDate, "MM-dd-yyyy");

  const fetchOrders = async () => {
    try {
      const res = await fetch(
        `https://booksemporium.in/Microservices/Prod/03_admin_Panel/transactions/orders?from=${formattedFrom}&to=${formattedTo}`
      );
      const data = await res.json();

      const normalized = data.map((item) => ({
        order_id: item.Order_id,
        type: item.Type,
        customer_name: item.Customer_Name,
        customer_email: item.Customer_Email,
        city: item.City,
        state: item.State,
        postal_code: item.Postal_Code,
      }));

      setOrders(normalized);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
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
  return (
    <div className="w-full p-6 overflow-y-auto font-sans bg-[#f4e8dc] min-h-screen">
      {/* Header */}
      <section className="mb-4 text-white">
        <div className="rounded w-full min-h-[80px] bg-topbar flex flex-col md:flex-row md:items-center px-6 py-4 gap-4">
          <h2 className="text-[24px] md:text-[30px] font-archivo font-bold uppercase flex-1">
            customer & orders
          </h2>
          <div className="flex items-center gap-3">
            <p className="hidden md:inline text-[18px]">Data Refresh</p>
            <FaSync
              className="hidden md:inline cursor-pointer text-lg"
              title="Sync"
              onClick={fetchOrders}
            />
            <span className="text-sm md:text-base text-[#102B01] border border-[#375683] px-3 py-1 rounded-md bg-white font-bold">
              {currentDate}
            </span>
          </div>
        </div>
      </section>

      {/* Filter */}
      <div className="bg-white shadow-md mt-4 p-4 rounded relative">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center gap-4">
            <label className="font-semibold">Order Date From</label>
            <div
              className="border rounded-md px-2 py-1 bg-white cursor-pointer flex items-center gap-2"
              onClick={() => setShowCalendar(!showCalendar)}
            >
              {`${format(dateRange[0].startDate, "MM-dd-yyyy")} - ${format(
                dateRange[0].endDate,
                "MM-dd-yyyy"
              )}`}
              <FaCalendarAlt />
            </div>
          </div>
         <button
  className="bg-[#FFAC7B] text-black font-semibold px-4 py-2 rounded shadow hover:bg-orange-600"
  onClick={() =>
    downloadExcelFile(
      "https://booksemporium.in/Microservices/Prod/03_admin_Panel/transactions/export-orders",
      "orders.xlsx"
    )
  }
>
  Download All
</button>

        </div>
        {showCalendar && (
          <div
           ref={calendarRef}
            className="absolute z-50 mt-4 bg-white shadow-md border"
            onClick={(e) => e.stopPropagation()}
          >
            <DateRange
              editableDateInputs={true}
              onChange={(item) => setDateRange([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={dateRange}
              months={2}
              direction="horizontal"
            />
          </div>
        )}
      </div>

      {/* Orders Table */}
      <div className="bg-white shadow mt-4 rounded overflow-x-auto">
        <table className="min-w-full text-left border border-gray-300">
          <thead className="bg-gray-200 text-gray-800 font-semibold">
            <tr>
              <th className="px-4 py-2 border border-gray-300">Order_id</th>
              <th className="px-4 py-2 border border-gray-300">Type</th>
              <th className="px-4 py-2 border border-gray-300">Customer_Name</th>
              <th className="px-4 py-2 border border-gray-300">Customer_Email</th>
              <th className="px-4 py-2 border border-gray-300">City</th>
              <th className="px-4 py-2 border border-gray-300">State</th>
              <th className="px-4 py-2 border border-gray-300">Postal_Code</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr key={order.order_id || i} className="bg-white hover:bg-gray-50">
                <td className="px-4 py-2 border border-gray-300">{order.order_id}</td>
                <td className="px-4 py-2 border border-gray-300">
                  <span
                    className={`px-3 py-1 text-sm font-bold rounded-full text-white ${
                      order.type?.toLowerCase() === "crate"
                        ? "bg-orange-500"
                        : order.type?.toLowerCase() === "cart"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  >
                    {order.type?.charAt(0).toUpperCase() + order.type?.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-2 border border-gray-300">{order.customer_name}</td>
                <td className="px-4 py-2 border border-gray-300">{order.customer_email}</td>
                <td className="px-4 py-2 border border-gray-300">{order.city || "-"}</td>
                <td className="px-4 py-2 border border-gray-300">{order.state || "-"}</td>
                <td className="px-4 py-2 border border-gray-300">{order.postal_code || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
