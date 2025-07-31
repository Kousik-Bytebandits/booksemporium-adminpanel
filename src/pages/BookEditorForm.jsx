import { useState, useEffect } from "react";
import { FaSync } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BookEditor() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [currentDate, setCurrentDate] = useState("");

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
    const fetchBook = async () => {
      try {
        const res = await fetch(
          `https://booksemporium.in/Microservices/Prod/03_admin_Panel/add-book/product/id/${id}`
        );
        const data = await res.json();
        setBook({
          ean: data.ean || "",
          title: data.title || "",
          author: data.author || "",
          publisher: data.publisher || "",
          publishedDate: data.published_date
            ? new Date(data.published_date.split("-").reverse().join("-"))
                .toISOString()
                .split("T")[0]
            : "",
          pages: data.pages || "",
          language: data.language || "",
          price: data.price || "",
          oldPrice: data.oldprice || "",
          discount: data.discount || "",
          crateType: data.crate_type || "Medium Crate",
          quantity: data.stock_quantity || 0,
          categories: data.categories || "",
          description: data.description || "",
          trending: !!data.is_trending,
          bestSeller: !!data.is_bestsellers,
          internationalBestSeller: !!data.is_international_bestsellers,
          newArrivals: !!data.is_newarrivals,
          image_url: data.image_url || "",
        });
        console.log("data",data);
      } catch (error) {
        toast.error("Failed to fetch book details");
        console.error("Fetch error:", error);
      }
    };

    fetchBook();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const res = await fetch(
        `https://booksemporium.in/Microservices/Prod/03_admin_Panel/add-book/product/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({
  ean: book.ean,
  title: book.title,
  author: book.author,
  publisher: book.publisher,
  published_date: book.publishedDate
    ? book.publishedDate.split("-").reverse().join("-")
    : "",
  pages: book.pages,
  language: book.language,
  image_url: book.image_url,
  price: book.price,
  oldprice: book.oldPrice,
  discount: book.discount,
  stock_quantity: book.quantity,
  crate_type: book.crateType,
  categories: book.categories.split(",").map((c) => c.trim()),
  is_trending: book.trending ? 1 : 0,
  is_bestsellers: book.bestSeller ? 1 : 0,
  is_newarrivals: book.newArrivals ? 1 : 0,
  is_international_bestsellers: book.internationalBestSeller ? 1 : 0,
}),

        }
      );

      if (res.ok) {
        toast.success("Book updated successfully.");
        const result = await res.json();
console.log("Update result:", result);

      } else {
        toast.error("Failed to update book.");
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Error updating book.");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `https://booksemporium.in/Microservices/Prod/03_admin_Panel/add-book/product/${id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        toast.success("Book deleted successfully.");
        setBook(null);
      } else {
        toast.error("Failed to delete book.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Error deleting book.");
    }
  };

  if (!book) {
    return <div className="p-6 text-lg text-center">Loading book details...</div>;
  }

  return (
    <div className="p-6 bg-background min-h-screen text-[#3f2b1d] font-sans">
      <ToastContainer />
      <div className="max-w-full mx-auto">
        <section className="mb-4 text-white">
          <div className="rounded w-full min-h-[80px] bg-topbar flex flex-col md:flex-row md:items-center px-6 py-4 gap-4">
            <h2 className="text-[24px] md:text-[30px] font-bold uppercase flex-1">Product Editor</h2>
            <div className="flex items-center gap-3">
              <p className="hidden md:inline text-[18px]">Data Refresh</p>
              <FaSync className="hidden md:inline cursor-pointer text-lg" title="Sync" />
              <span className="text-sm md:text-base text-[#102B01] border border-[#375683] px-3 py-1 rounded-md bg-white font-bold">
                {currentDate}
              </span>
            </div>
          </div>
        </section>

        <div className="grid md:grid-cols-12 gap-4 p-6">
          <div className="md:col-span-2 bg-white flex justify-center items-center border-2 border-dashed border-gray-400 rounded-lg w-[213px] h-96">
            <img src={book.image_url || "/images/upload.png"} alt="upload" className="h-20 w-20 object-contain" />
          </div>

          <div className="md:col-span-9 text-[16px] grid grid-cols-1 lg:grid-cols-7 gap-4 w-full">
            {/* Row 1 */}
            <div className="flex flex-col col-span-2">
              <label className="font-semibold mb-1">EAN</label>
              <input className="p-2 border border-gray-400 rounded" value={book.ean} readOnly />
            </div>
            <div className="flex flex-col col-span-4">
              <label className="font-semibold mb-1">Title</label>
              <input
                className="p-2 border border-gray-400 rounded"
                value={book.title}
                onChange={(e) => setBook({ ...book, title: e.target.value })}
              />
            </div>
            <div className="flex flex-col col-span-1">
              <label className="font-semibold mb-1">Pages</label>
              <input
                className="p-2 border border-gray-400 rounded"
                value={book.pages}
                onChange={(e) => setBook({ ...book, pages: e.target.value })}
              />
            </div>

            {/* Row 2 */}
            <div className="flex flex-col col-span-2">
              <label className="font-semibold mb-1">Author</label>
              <input
                className="p-2 border border-gray-400 rounded"
                value={book.author}
                onChange={(e) => setBook({ ...book, author: e.target.value })}
              />
            </div>
            <div className="flex flex-col col-span-2">
              <label className="font-semibold mb-1">Publisher</label>
              <input
                className="p-2 border border-gray-400 rounded"
                value={book.publisher}
                onChange={(e) => setBook({ ...book, publisher: e.target.value })}
              />
            </div>
            <div className="flex flex-col col-span-2">
              <label className="font-semibold mb-1">Published Date</label>
              <input
                type="date"
                className="p-2 border border-gray-400 rounded"
                value={book.publishedDate}
                onChange={(e) => setBook({ ...book, publishedDate: e.target.value })}
              />
            </div>
            <div className="flex flex-col col-span-1">
              <label className="font-semibold mb-1">Language</label>
              <input
                className="p-2 border border-gray-400 rounded"
                value={book.language}
                onChange={(e) => setBook({ ...book, language: e.target.value })}
              />
            </div>

            {/* Row 3 */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Price</label>
              <input
                className="p-2 border border-gray-400 rounded"
                value={book.price}
                onChange={(e) => setBook({ ...book, price: e.target.value })}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Old Price</label>
              <input
                className="p-2 border border-gray-400 rounded"
                value={book.oldPrice}
                onChange={(e) => setBook({ ...book, oldPrice: e.target.value })}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Discount</label>
              <input
                className="p-2 border border-gray-400 rounded"
                value={book.discount}
                onChange={(e) => setBook({ ...book, discount: e.target.value })}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Crate Type</label>
              <select
                className="p-2 border border-gray-400 rounded"
                value={book.crateType}
                onChange={(e) => setBook({ ...book, crateType: e.target.value })}
              >
                <option value="small crate">Small Crate</option>
  <option value="medium crate">Medium Crate</option>
  <option value="large crate">Large Crate</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Quantity</label>
              <input
                className="p-2 border border-gray-400 rounded"
                value={book.quantity}
                onChange={(e) => setBook({ ...book, quantity: e.target.value })}
              />
            </div>
            <div className="flex flex-col col-span-2">
              <label className="font-semibold mb-1">Categories</label>
              <input
                className="p-2 border border-gray-400 rounded"
                value={book.categories}
                onChange={(e) => setBook({ ...book, categories: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="px-6 grid md:grid-cols-12 gap-4">
          <div className="md:col-span-9">
            <label className="font-semibold mb-1 block">Description</label>
            <textarea
              rows={6}
              className="w-full p-4 rounded border border-gray-300"
              value={book.description}
              onChange={(e) => setBook({ ...book, description: e.target.value })}
            />
          </div>
          <div className="md:col-span-3 flex flex-col gap-4 justify-start mt-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={book.trending}
                onChange={(e) => setBook({ ...book, trending: e.target.checked })}
              />{" "}
              Trending
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={book.bestSeller}
                onChange={(e) => setBook({ ...book, bestSeller: e.target.checked })}
              />{" "}
              Best Seller
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={book.internationalBestSeller}
                onChange={(e) =>
                  setBook({ ...book, internationalBestSeller: e.target.checked })
                }
              />{" "}
              International Best Seller
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={book.newArrivals}
                onChange={(e) => setBook({ ...book, newArrivals: e.target.checked })}
              />{" "}
              New Arrivals
            </label>
          </div>
        </div>

        <div className="flex justify-center gap-4 px-6 pb-6 pt-6">
          <button
            onClick={handleDelete}
            className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded flex items-center gap-2"
          >
            <img src="/images/bin.png" alt="delete" className="w-5 h-5" />
            Remove Book
          </button>

          <button
            onClick={handleUpdate}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded flex items-center gap-2"
          >
            <img src="/images/save.png" alt="update" className="w-5 h-5" />
            Update Book
          </button>
        </div>
      </div>
    </div>
  );
}
