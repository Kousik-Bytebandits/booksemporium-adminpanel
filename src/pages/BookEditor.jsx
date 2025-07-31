import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { FaSync } from "react-icons/fa";
import { RiArrowLeftSLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
const BookEditor = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentDate, setCurrentDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  // Clock updater
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

  // Fetch books on page change
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(
          `https://booksemporium.in/Microservices/Prod/03_admin_Panel/add-book/products/category/Fiction?page=${currentPage}&limit=5`
        );
        const result = await res.json();
        const bookList = result.data || [];
         
        const detailedBooks = await Promise.all(
          bookList.map(async (book) => {
            const detailRes = await fetch(
              `https://booksemporium.in/Microservices/Prod/03_admin_Panel/add-book/product/id/${book.book_id}`
            );
            const detail = await detailRes.json();

            return {
              book_id: book.book_id,
              title: detail.title || "Untitled",
              author: detail.author || "Unknown",
              image: detail.image_url || "//images/book.png",
            };
          })
        );

        setBooks(detailedBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, [currentPage]);

  return (
    <div className="w-full p-6 overflow-y-auto bg-background">
      {/* Header */}
      <section className="mb-4 text-white">
        <div className="rounded w-full min-h-[80px] bg-topbar flex flex-col md:flex-row md:items-center px-6 py-4 gap-4">
          <h2 className="text-[24px] md:text-[30px] font-bold uppercase flex-1">
            books Editor
          </h2>
          <div className="flex items-center gap-3">
            <p className="hidden md:inline text-[18px]">Data Refresh</p>
            <FaSync className="hidden md:inline cursor-pointer text-lg" title="Sync" />
            <span className="text-sm md:text-base text-[#102B01] border border-[#375683] px-3 py-1 rounded-md bg-white font-bold">
              {currentDate}
            </span>
          </div>
        </div>
      </section>

      {/* Top Row */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg xxxl:text-[20px] text-topbar">
          Showing Books - Page {currentPage}
        </p>
        <div className="relative w-[60%] max-w-[500px]">
          <input
            type="text"
            placeholder="Search For Books..."
            className="w-full border border-topbar text-black rounded-md pl-4 pr-10 py-2 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FiSearch className="absolute right-3 top-2.5 text-black" />
        </div>
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-2 hd:grid-cols-6 laptop:grid-cols-4 xxxl:grid-cols-6 gap-4">
        {books
          .filter((book) =>
            book.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((book, index) => (
            <div
            key={index}
  onClick={() => navigate(`/editor/${book.book_id}`) }
  
              className="bg-white rounded-lg w-[164px] h-[275px] shadow-md p-2 hover:shadow-lg cursor-pointer transition duration-200"
            >
              <img
                src={book.image}
                alt={book.title}
                className="rounded-md mb-2 w-[138px] h-[198px] mx-auto object-cover"
              />
              <p className="text-[15px] line-clamp-2 h-[40px] leading-tight font-semibold">
                {book.title}
              </p>
              <p className="text-[12px] text-gray-500">By: {book.author}</p>
            </div>
          ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-end  items-center gap-2 mt-6">
        <button
          className="px-2 py-2 border rounded-md bg-white shadow-sm"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          <RiArrowLeftSLine/>
        </button>
        {[currentPage, currentPage + 1, currentPage + 2].map((num) => (
          <button
            key={num}
            className={`px-3 py-1 border rounded-md shadow-sm ${
              currentPage === num ? "bg-[#3C1E0D] text-white" : "bg-white"
            }`}
            onClick={() => setCurrentPage(num)}
          >
            {num}
          </button>
        ))}
        <span className="px-3 py-1">...</span>
        <button
          className="px-3 py-1 border rounded-md bg-white shadow-sm"
          onClick={() => setCurrentPage(32)}
        >
          32
        </button>
      </div>
    </div>
  );
};

export default BookEditor;
