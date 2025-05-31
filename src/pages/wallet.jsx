import { FiSearch } from "react-icons/fi";
import { BsSliders } from "react-icons/bs";
import { IoEyeOutline } from "react-icons/io5";
import { RiSendPlaneFill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";

function Wallet() {
  return (
    <div className="display flex">
        <div className="w-full">
          <div className="mt-5">
            <div className="mt-5 text-lg font-semibold">
              <h2>Wallet</h2>
            </div>

            <div className="mt-5 full px-4 py-4 bg-white rounded-lg">
              <h1 className="opacity-55">Available Balance</h1>
              <h2 className="display flex items-center gap-3 font-bold text-4xl">
                N250,000.00
                <span>
                  <IoEyeOutline size={28} />
                </span>
              </h2>

              <div className="pt-7 display flex gap-3">
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

            <div className="mt-6 display flex items-center justify-between w-full">
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

            <div className="display flex items-center justify-between w-full mt-8">
              <div>
                <h3 className="font-semibold mb-2">Wallet Top Up</h3>
                <p className="text-xs opacity-40">
                  Wednesday, 26th February. 03:45 PM
                </p>
              </div>

              <p className="text-green-500 font-semibold">+N50,000</p>
            </div>
            <hr className="w-10/12 h-1 mt-5 border-0 rounded-sm dark:bg-gray-900" />

            <div className="display flex items-center justify-between w-full mt-3">
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

            <div className="display flex items-center justify-between w-full mt-3">
              <div>
                <h3 className="font-semibold mb-2">Wallet Top Up</h3>
                <p className="text-xs opacity-40">
                  Wednesday, 26th February. 03:45 PM
                </p>
              </div>

              <p className="text-green-500 font-semibold">+N50,000</p>
            </div>
            <hr className="w-10/12 h-1 mt-5 border-0 rounded-sm dark:bg-gray-200" />

            <div className="display flex items-center justify-between w-full mt-3">
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
  );
}

export default Wallet;