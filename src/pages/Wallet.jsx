import { AiFillHome } from "react-icons/ai";
import { FaPeopleGroup } from "react-icons/fa6";
import { BiSolidMessageRounded } from "react-icons/bi";
import { IoIosWallet } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import { FaUserEdit } from "react-icons/fa";
import { FaQuestion } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { BsSliders } from "react-icons/bs";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { RiSendPlaneFill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";

function Wallet() {
  return (
    <div>
      <div className="display flex">
        <div className="bg-[#124096] h-screen w-56">
          <div>
            <img
              className="w-24 mt-8 ml-3"
              src="src\assets\Images\HANDIGO LOGO.png"
              alt=""
            />
            <div className="mt-2 ml-4 text-lg text-white font-light">
              <button>
                <a
                  href="Dashboard"
                  id="Dashboard"
                  className="display flex items-center gap-3 border-[#124096] mb-3 pl-2 py-1 border solid rounded-lg w-44 hover:bg-white hover:text-[#124096]">
                  <AiFillHome /> Dashboard
                </a>
              </button>
              <br />
              <button>
                <a className="display flex items-center gap-3 pl-2 mb-3 border solid rounded-lg w-44 py-1 border-[#124096] hover:bg-white hover:text-[#124096]">
                  <FaPeopleGroup />
                  Jobs
                </a>
              </button>
              <br />
              <button>
                <a className="display flex items-center gap-3 pl-2 mb-3 w-44 rounded-lg py-1 border-[#124096] hover:bg-white hover:text-[#124096]">
                  <BiSolidMessageRounded />
                  Messages
                </a>
              </button>
              <br />
              <button>
                <a
                  href="Wallet"
                  id="Wallet"
                  className="display flex items-center gap-3 pl-2 mb-3 w-44 rounded-lg py-1 border-[#124096] hover:bg-white hover:text-[#124096]">
                  <IoIosWallet />
                  Wallet
                </a>
              </button>
              <br />
              <button>
                <a className="display flex items-center gap-3 pl-2 mb-3 w-44 rounded-lg py-1 border-[#124096] hover:bg-white hover:text-[#124096]">
                  <IoSettingsSharp />
                  Settings
                </a>
              </button>
              <br />
              <div className="mt-72">
                <button>
                  <a className="display flex items-center gap-3 pl-2 mb-3 w-44 rounded-lg py-1 border-[#124096] hover:bg-white hover:text-[#124096]">
                    <FaQuestion />
                    FAQ's
                  </a>
                </button>
                <br />
                <button>
                  <a className="display flex items-center gap-3 pl-2 mb-3 w-44 rounded-lg py-1 border-[#124096] hover:bg-white hover:text-[#124096]">
                    <FaUserEdit />
                    Support
                  </a>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#f5f5f5] w-full">
          <div className="mt-5 ml-5">
            <div className="display flex">
              <div className="display flex w-full items-center justify-between mr-52">
                <div className="display flex gap-2 items-center">
                  <div class="relative">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3.5">
                      <FiSearch color="black" />
                    </div>
                    <input
                      type="text"
                      id="email-address-icon"
                      class="ps-10 p-2.5 w-96 rounded-lg border border-[#124096] outline-[#124096] text-sm"
                      placeholder="search for artisans and services"
                    />
                  </div>

                  <div className=" h-full p-3 rounded-lg bg-[#e4e5e5] hover:bg-[#d5d7d7]">
                    <BsSliders size={20} color="gray" />
                  </div>
                </div>

                <div className="gap-3 display flex">
                  <button>
                    <IoNotificationsOutline size={25} />
                  </button>

                  <button>
                    <FaAngleDown size={25} />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-5 text-lg font-semibold">
              <h2>Wallet</h2>
            </div>

            <div className="mt-5 w-10/12 h-44 bg-white rounded-lg">
              <h1 className="pt-5 pl-5 opacity-55">Available Balance</h1>
              <h2 className="display flex items-center gap-3 font-bold text-4xl pl-5 pt-2">
                N250,000.00
                <span>
                  <IoEyeOutline size={28} />
                </span>
              </h2>

              <div className="pl-5 pt-7 display flex gap-3">
                <button className="bg-[#f5f5f5] hover:bg-[#d5d7d7] text-xs rounded-md w-[8rem] justify-center h-12 display flex items-center gap-1 ">
                  <span>
                    <RiSendPlaneFill />
                  </span>
                  Withdraw
                </button>

                <button className="bg-[#124096] hover:bg-[#284d92] text-white rounded-md text-xs w-[8rem] justify-center h-12 display flex items-center gap-1 ">
                  <span>
                    <FaPlus />
                  </span>
                  Fund Wallet
                </button>
              </div>
            </div>

            <div className="mt-6 display flex items-center justify-between w-10/12">
              <div className="text-xl">Past Transactions</div>
              <div className="display flex gap-2">
                <div class="relative">
                  <div class="absolute inset-y-0 start-0 flex items-center ps-3.5">
                    <FiSearch color="black" />
                  </div>
                  <input
                    type="text"
                    id="email-address-icon"
                    class="ps-10 p-2.5 w-80 rounded-lg border border-[#124096] outline-[#124096] text-sm"
                    placeholder="search"
                  />
                </div>
                <div className=" h-full p-3 rounded-lg bg-[#e4e5e5] hover:bg-[#d5d7d7]">
                  <BsSliders size={20} color="gray" />
                </div>
              </div>
            </div>

            <div className="display flex items-center justify-between w-10/12 mt-8">
              <div>
                <h3 className="font-semibold mb-2">Wallet Top Up</h3>
                <p className="text-xs opacity-40">
                  Wednesday, 26th February. 03:45 PM
                </p>
              </div>

              <p className="text-green-500 font-semibold">+N50,000</p>
            </div>
            <hr className="w-10/12 h-1 mt-5 border-0 rounded-sm dark:bg-gray-200" />

            <div className="display flex items-center justify-between w-10/12 mt-3">
              <div>
                <h3 className="font-semibold mb-2">
                  Transfer to Jesutofunmi Ajayi for custom wooden shelving
                </h3>
                <p className="text-xs opacity-40">
                  Wednesday, 22nd February. 12:30 AM
                </p>
              </div>

              <p className="text-red-500 font-semibold">-24,000</p>
            </div>
            <hr className="w-10/12 h-1 mt-5 border-0 rounded-sm dark:bg-gray-200" />

            <div className="display flex items-center justify-between w-10/12 mt-3">
              <div>
                <h3 className="font-semibold mb-2">Wallet Top Up</h3>
                <p className="text-xs opacity-40">
                  Wednesday, 26th February. 03:45 PM
                </p>
              </div>

              <p className="text-green-500 font-semibold">+N50,000</p>
            </div>
            <hr className="w-10/12 h-1 mt-5 border-0 rounded-sm dark:bg-gray-200" />

            <div className="display flex items-center justify-between w-10/12 mt-3">
              <div>
                <h3 className="font-semibold mb-2">
                  Transfer to Jesutofunmi Ajayi for custom wooden shelving
                </h3>
                <p className="text-xs opacity-40">
                  Wednesday, 22nd February. 12:30 AM
                </p>
              </div>

              <p className="text-red-500 font-semibold">-24,000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wallet;
