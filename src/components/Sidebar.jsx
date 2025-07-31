import { useState } from "react";
import { NavLink } from "react-router-dom";

import { MdArrowDropDown , MdArrowDropUp} from "react-icons/md";


const Sidebar = () => {
  const [openInventory, setOpenInventory] = useState(true);

  const menuItemStyle = "block  py-3  text-sm hover:text-[#2F1C0C]";

  return (
    <div className="bg-[#FBC38E] text-[#2F1C0C] h-full w-[25%] shadow-lg font-figtree">
  <div className="px-4">
    {/* Logo */}
    <div className="flex flex-col items-center mt-20 mb-6">
      <img src="/images/be-logo.png" alt="Logo" className="w-[60px] h-[60px] mb-2" />
      <h1 className="xxxl:text-[30px] hd:text-[25px] laptop:text-[22px] font-bold">Books Emporium</h1>
    </div>

    {/* Books Inventory Toggle Button */}
    <button
      onClick={() => setOpenInventory(!openInventory)}
      className={`flex items-center justify-center w-full px-4 py-2 mb-1 rounded-md ${
        openInventory ? "bg-[#F2E3D680] font-semibold border border-[#3A261A]" : "hover:bg-[#FFE1C0]"
      }`}
    >
      <img src="/images/library.png" alt="Inventory" className="xxxl:w-[47px] xxxl:h-[47px] hd:w-[35px] laptop:w-[25px]  mr-2" />
      <span className="flex-1 font-semibold  xxxl:text-[24px] hd:text-[18px] laptop:text-[15px]">Books Inventory</span>
      {openInventory ? <MdArrowDropUp size={40} /> : <MdArrowDropDown size={40} />}
    </button>
  </div>

  {/* Keep this outside the padded section so active links touch right screen edge */}
  {openInventory && (
    <ul className="ml-4 mt-2 space-y-2 ">
      <li>
        <NavLink
          to="/editor"
          className={({ isActive }) =>
            `${menuItemStyle} ${
              isActive ? "bg-[#FFE7D2] text-[#2F1C0C] font-medium rounded-l-full w-full" : ""
            }`
          }
        >
          <span className="flex xxxl:text-[23px] hd:text-[18px] laptop:text-[16px] items-center justify-center mx-auto">
            <span className="text-[40px] mr-3">•</span> Books Editor
          </span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${menuItemStyle} ${
              isActive ? "bg-[#FFE7D2] text-[#2F1C0C] font-medium rounded-l-full w-full" : ""
            }`
          }
        >
          <span className="xxxl:text-[24px] hd:text-[18px] laptop:text-[16px] flex items-center justify-center mx-auto ml-2">
            <span className="text-[40px] mr-3">•</span> Upload Books
          </span>
        </NavLink>
      </li>
    </ul>
  )}

  {/* Wrap rest of sidebar with p-4 again */}
  <div className="px-4">
    {/* Transactions */}
    <NavLink
      to="/transactions"
      className={({ isActive }) =>
        `flex items-center w-full px-4 py-2 mt-4  rounded-md ${
          isActive ? "bg-[#F2E3D680] border border-[#3A261A] font-semibold" : "hover:bg-[#FFE1C0]"
        }`
      }
    >
      <img src="/images/trans.png" alt="Transactions" className="xxxl:w-[47px] xxxl:h-[47px] hd:w-[35px] laptop:w-[28px]  mr-2" />
      <span className="xxxl:text-[24px] hd:text-[18px] laptop:text-[15px] laptop:ml-0 xxxl:ml-7 hd:ml-4 font-semibold">Transactions</span>
    </NavLink>

    {/* Orders */}
    <NavLink
      to="/orders"
      className={({ isActive }) =>
        `flex items-center  w-full px-4 py-2 mt-2 rounded-md ${
          isActive ? "bg-[#F2E3D680] border border-[#3A261A] font-semibold" : "hover:bg-[#FFE1C0]"
        }`
      }
    >
      <img src="/images/orders.png" alt="Orders" className="xxxl:w-[47px] xxxl:h-[47px] hd:w-[35px] laptop:w-[28px]  mr-2" />
      <span className="xxxl:text-[24px] hd:text-[18px] laptop:text-[15px] laptop:ml-0 font-semibold hd:ml-4 xxxl:ml-7">Orders</span>
    </NavLink>
  </div>
</div>

  );
};

export default Sidebar;
