import { useState, useEffect } from "react";
import { FaSync } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";

const BookUploads = () => {
  const [currentDate, setCurrentDate] = useState("");

  const [ean, setEan] = useState("9781471133039");
  const [price, setPrice] = useState(199.99);
  const [discount, setDiscount] = useState(20);
  const [stockQuantity, setStockQuantity] = useState(25);
  const [crateType, setCrateType] = useState("small crate");
  const [isTrending, setIsTrending] = useState(true);
  const [isBestsellers, setIsBestsellers] = useState(true);
  const [isNewArrivals, setIsNewArrivals] = useState(true);
  const [isInternationalBestsellers, setIsInternationalBestsellers] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

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
    "w-full border border-[#AEAEAE] p-2 rounded-md xxxl:text-[20px] laptop:text-[16px] hd:text-[18px]";
  const labelStyle =
    "xxxl:text-[20px] laptop:text-[16px] hd:text-[18px] text-topbar font-medium mb-1 block";

  // ✅ Submit handler
  const handleUpload = async () => {
    setIsSubmitting(true);
    setMessage("");

    const payload = {
      ean,
      price: parseFloat(price),
      discount: parseFloat(discount),
      stock_quantity: parseInt(stockQuantity),
      crate_type: crateType,
      is_trending: isTrending,
      is_bestsellers: isBestsellers,
      is_newarrivals: isNewArrivals,
      is_international_bestsellers: isInternationalBestsellers,
    };

    try {
      const response = await fetch(
        "https://booksemporium.in/Microservices/Prod/03_admin_Panel/add-book",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      console.log(data);
      setMessage("Book uploaded successfully!");
    } catch (err) {
      setMessage("Error uploading book.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full font-archivo bg-background">
      {/* Topbar */}
      <section className="mb-4 text-white p-6">
        <div className="rounded w-full min-h-[80px] bg-topbar flex flex-col md:flex-row md:items-center px-6 py-4 gap-4">
          <h2 className="text-[24px] md:text-[30px] font-bold uppercase flex-1">Product Editor</h2>
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
        <div className="w-[90%] mx-auto h-[60vh] scrollbar-hide bg-white p-6 rounded-md shadow-around-soft overflow-y-auto">
          <h3 className="font-semibold xxxl:text-[24px] laptop:text-[18px] hd:text-[20px] text-topbar mb-4">
            Basic Details:
          </h3>
          <div className="space-y-4">
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
              <label className={labelStyle}>Crate Size</label>
              <select
                className={`${inputStyle} appearance-none pr-8`}
                value={crateType}
                onChange={(e) => setCrateType(e.target.value)}
              >
                <option value="small crate">Small Crate</option>
                <option value="medium crate">Medium Crate</option>
                <option value="large crate">Large Crate</option>
              </select>
              <MdArrowDropDown className="absolute right-3 top-[38px] text-xl pointer-events-none text-gray-600" />
            </div>
          </div>
        </div>

        {/* Home Page Settings */}
        <div className="w-[90%] mx-auto scrollbar-hide h-[60vh] bg-white p-6 rounded-md shadow-around-soft overflow-y-auto">
          <h3 className="font-semibold text-topbar mb-4 xxxl:text-[24px] laptop:text-[18px] hd:text-[20px]">
            Home Page
          </h3>
          <div className="space-y-4">
            {[
              { label: "Trending", state: isTrending, setState: setIsTrending },
              { label: "Best Seller", state: isBestsellers, setState: setIsBestsellers },
              { label: "International Best Seller", state: isInternationalBestsellers, setState: setIsInternationalBestsellers },
              { label: "New Arrival", state: isNewArrivals, setState: setIsNewArrivals },
            ].map(({ label, state, setState }, index) => (
              <div className="relative" key={index}>
                <label className={labelStyle}>{label}</label>
                <select
                  className={`${inputStyle} appearance-none pr-8`}
                  value={state ? "true" : "false"}
                  onChange={(e) => setState(e.target.value === "true")}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
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

      {message && (
        <div className="text-center mt-4 text-sm text-green-600 font-semibold">{message}</div>
      )}
    </div>
  );
};

export default BookUploads;
