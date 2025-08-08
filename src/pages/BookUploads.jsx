import { useState, useEffect } from "react";
import { FaSync } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const BookUploads = () => {
  const [currentDate, setCurrentDate] = useState("");

  const [ean, setEan] = useState("9781471133039");
  const [price, setPrice] = useState(199.99);
  const [discount, setDiscount] = useState(20);
  const [stockQuantity, setStockQuantity] = useState(25);
  const [isTrending, setIsTrending] = useState(true);
  const [isBestsellers, setIsBestsellers] = useState(true);
  const [isNewArrivals, setIsNewArrivals] = useState(true);
  const [isInternationalBestsellers, setIsInternationalBestsellers] = useState(true);
  const [bookCondition, setBookCondition] = useState("");
 
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [isCrate, setIsCrate] = useState(true);
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

  const inputStyle =
    "w-full border border-[#AEAEAE] p-2 rounded-md xxxl:text-[20px] laptop:text-[14px] hd:text-[16px]";
  const labelStyle =
    "xxxl:text-[20px] laptop:text-[14px] hd:text-[16px] text-topbar font-medium mb-1 block";

  
  const handleUpload = async () => {
    setIsSubmitting(true);
if (!bookCondition.trim()) {
  toast.error("Please select a book condition");
  setIsSubmitting(false);
  return;
}

const payload = {
  ean,
  price: parseFloat(price),
  discount: parseFloat(discount),
  stock_quantity: parseInt(stockQuantity),
  is_trending: isTrending,
  is_bestsellers: isBestsellers,
  is_newarrivals: isNewArrivals,
  is_international_bestsellers: isInternationalBestsellers,
  is_crate: isCrate,
  books_condition: bookCondition
};



    try {
    const response = await fetch("https://booksemporium.in/Microservices/Prod/03_admin_Panel/add-book", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(payload),
  
});
console.log("Sending payload:", payload);
  const data = await response.json();
      console.log("Response data:", data);
 if (response.ok) {
        toast.success("Book uploaded successfully!");
      } else {
        toast.error(data.message || "Upload failed");
      }
    } catch (error) {
      console.error("API Error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full font-archivo bg-background">
      {/* Topbar */}
      <section className="mb-4 text-white p-6">
        <div className="rounded w-full min-h-[80px] bg-topbar flex flex-col md:flex-row md:items-center px-6 py-4 gap-4">
          <h2 className="text-[24px] md:text-[30px] font-bold uppercase flex-1 font-archivo">books upload</h2>
          <div className="flex items-center gap-4">
            <p className="hidden md:inline text-[18px]">Data Refresh</p>
            <FaSync className="hidden md:inline cursor-pointer text-lg" title="Sync" />
            <span className="text-sm md:text-base text-[#102B01] border border-[#375683] px-3 py-1 rounded-md bg-white font-bold">
              {currentDate}
            </span>
          </div>
        </div>
      </section>

      {/* Form Layout */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Basic Details */}
        <div className="w-[90%] mx-auto h-[65vh] scrollbar-hide bg-white p-6 rounded-md shadow-around-soft overflow-y-auto">
          <h3 className="font-semibold xxxl:text-[24px] laptop:text-[18px] hd:text-[20px] text-topbar mb-4">
            Basic Details:
          </h3>
          <div className="space-y-3 ">
            <div>
              <label className={labelStyle}>EAN</label>
              <input className={inputStyle} value={ean} onChange={(e) => setEan(e.target.value)} />
            </div>
            <div>
              <label className={labelStyle}>₹ Price</label>
              <input className={inputStyle} value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div>
              <label className={labelStyle}>% Discount</label>
              <input className={inputStyle} value={discount} onChange={(e) => setDiscount(e.target.value)} />
            </div>
            <div>
              <label className={labelStyle}>Stock Quantity</label>
              <input
                className={inputStyle}
                value={stockQuantity}
                onChange={(e) => setStockQuantity(e.target.value)}
              />
            </div>
           <div className="relative">
  <label className={labelStyle}>Add to Books Crate</label>
  <div className="relative">
    <select
      className="appearance-none w-full px-4 py-2 border rounded-md border-[#AEAEAE] text-topbar xxxl:text-[20px] laptop:text-[14px] hd:text-[16px]"
      value={isCrate}
      onChange={(e) => setIsCrate(e.target.value === "true")}
    >
      <option value="true">True</option>
      <option value="false">False</option>
    </select>
    <MdArrowDropDown className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-xl text-gray-600" />
  </div>
</div>
          </div>
        </div>

        {/* Home Page Settings */}
        <div className="w-[90%] mx-auto scrollbar-hide h-[65vh] bg-white p-6 rounded-md shadow-around-soft overflow-y-auto">
          <h3 className="font-semibold text-topbar mb-4 xxxl:text-[24px] laptop:text-[18px] hd:text-[20px]">
            Home Page
          </h3>
       <div className="space-y-3">
  {[
    { label: "Trending", state: isTrending, setState: setIsTrending, type: "boolean" },
    { label: "Best Seller", state: isBestsellers, setState: setIsBestsellers, type: "boolean" },
    { label: "International Best Seller", state: isInternationalBestsellers, setState: setIsInternationalBestsellers, type: "boolean" },
    { label: "New Arrival", state: isNewArrivals, setState: setIsNewArrivals, type: "boolean" },
    { label: "Book Condition", state: bookCondition, setState: setBookCondition, type: "single" },
  ].map(({ label, state, setState, type }, index) => (
    <div className="relative" key={index}>
      <label className={labelStyle}>{label}</label>

      {type === "boolean" ? (
        <select
          className={`${inputStyle} appearance-none pr-8`}
          value={state ? "true" : "false"}
          onChange={(e) => setState(e.target.value === "true")}
        >
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      ) : (
       <select
  className={`${inputStyle} appearance-none pr-8`}
  value={bookCondition}
  onChange={(e) => setBookCondition(e.target.value)}
>
  <option value="">Select condition</option>
  <option value="new_book">New</option>
  <option value="used_good">Used Good</option>
  <option value="used_old">Used Old</option>
</select>


      )}

      {/* Dropdown arrow */}
      <MdArrowDropDown className="absolute right-3 top-[38px] text-xl pointer-events-none text-gray-600" />
    </div>
  ))}
</div>




        </div>
      </div>

      {/* Upload Button */}
      <div className="flex items-center justify-end mt-6 px-10">
        <button
          onClick={handleUpload}
          disabled={isSubmitting}
          className="bg-[#FF9000] font-archivo font-bold xxxl:text-[34px] laptop:text-[24px] hd:text-[28px] hover:bg-orange-600 text-white px-10 py-2 rounded-md shadow-md flex items-center gap-2"
        >
          <img className="mr-6 w-[41px]" src="/images/save.png" />
          {isSubmitting ? "Uploading..." : "Upload"}
        </button>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default BookUploads;
