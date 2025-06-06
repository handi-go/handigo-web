import { AiFillHome } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { BiSolidMessageRounded } from "react-icons/bi";
import { IoIosWallet } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import { FaUserEdit } from "react-icons/fa";
import { FaQuestion } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { BsSliders } from "react-icons/bs";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { LuMoveRight } from "react-icons/lu";

function Services() {
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
                <a className="display flex items-center gap-3 border-[#124096] mb-3 pl-2 py-1 border solid rounded-lg w-44 hover:bg-white hover:text-[#124096]">
                  <AiFillHome /> Dashboard
                </a>
              </button>
              <br />
              <button>
                <a
                  href="Services"
                  id="Services"
                  className="display flex items-center gap-3 pl-2 mb-3 border solid rounded-lg w-44 py-1 border-[#124096] hover:bg-white hover:text-[#124096]">
                  <FaUsers />
                  Services
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
                  href="CWallet"
                  id="CWallet"
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
              <div className="display flex sm:w-8/12 md:w-9/12 lg:w-10/12 items-center justify-between ">
                <div className="display flex gap-2 items-center">
                  <div class="relative">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3.5">
                      <FiSearch color="black" />
                    </div>
                    <input
                      type="text"
                      id="email-address-icon"
                      class="ps-10 p-2.5 sm:w-52 md:w-80 lg:w-96 rounded-lg border border-[#124096] outline-[#124096] text-sm"
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

                  <img
                    className="w-7 h-7 rounded-full"
                    src="src\assets\Images\Picture 1.jpg"
                    alt=""
                  />

                  <button>
                    <FaAngleDown size={25} />
                  </button>
                </div>
              </div>
            </div>
            <div className="display flex items-center justify-between sm:w-8/12 md:w-9/12 lg:w-10/12">
              <div className="mt-5 sm:text-xl md:text-2xl lg:text-3xl font-semibold display flex gap-2 items-center">
                <h2>Ajayi Jesutofunmi</h2>
                <MdVerified color="green" />
              </div>

              <button className="mt-10 bg-[#124096] hover:bg-[#284d92] text-white w-44 rounded-md h-12 text-sm items-center justify-center gap-2 display flex">
                Create Job Request
                <span>
                  <FaPlus />
                </span>
              </button>
            </div>
            <h2 className="font-normal sm:text-sm md:text-md lg:text-lg">
              Here's what Ajayi Jesutofunmi has been up to on Handigo
            </h2>

            <div className="display flex gap-5 mt-6">
              <div className=" bg-white sm:w-24 md:w-28 lg:w-52 px-3 py-3 rounded-md">
                <h4 className="text-3xl font-semibold mb-2 text-[#3D63AA]">
                  38
                </h4>
                <h5 className="display flex items-center md:gap-5 lg:gap-12 font-light sm:text-xs md:text-sm lg:text-md">
                  Ongoing Orders
                  <span>
                    <LuMoveRight color="#3D63AA" />
                  </span>
                </h5>
              </div>
              <div className=" bg-white sm:w-24 md:w-28 lg:w-52 px-3 py-3 rounded-md">
                <h4 className="text-3xl font-semibold mb-2 text-[#FFBC01]">
                  10
                </h4>
                <h5 className="display flex items-center md:gap-8 lg:gap-14 font-light sm:text-xs md:text-sm lg:text-md">
                  Pending Orders
                  <span>
                    <LuMoveRight color="#FFBC01" />
                  </span>
                </h5>
              </div>
              <div className=" bg-white sm:w-24 md:w-28 lg:w-52 px-3 py-3 rounded-md">
                <h4 className="text-3xl font-semibold mb-2 text-[#4CAF50]">
                  248
                </h4>
                <h5 className="display flex items-center md:gap-1 lg:gap-8 font-light sm:text-xs md:text-sm lg:text-md">
                  Completed Orders
                  <span>
                    <LuMoveRight color="#4CAF50" />
                  </span>
                </h5>
              </div>
              <div className=" bg-white sm:w-24 md:w-28 lg:w-52 px-3 py-3 rounded-md">
                <h4 className="text-3xl font-semibold mb-2 text-[#1C1C1C]">
                  296
                </h4>
                <h5 className="display flex items-center md:gap-7 lg:gap-16 font-light sm:text-xs md:text-sm lg:text-md">
                  Total Orders
                  <span>
                    <LuMoveRight color="#1C1C1C" />
                  </span>
                </h5>
              </div>
            </div>

            <div className="display flex justify-between sm:w-8/12 md:w-9/12 lg:w-10/12 mt-8 pl-5">
              <div className="display flex gap-10">
                <h4 className="text-[#3D63AA] font-semibold">Current Jobs</h4>
                <h4 className="opacity-50">Past Bookings</h4>
              </div>
              <h4 className="opacity-50">See All</h4>
            </div>
            <hr className="w-32 h-1 mt-3 border-0 rounded-sm dark:bg-[#3D63AA]" />

            <div className="sm:w-8/12 md:w-9/12 lg:w-10/12 h-16 display flex justify-between bg-white rounded-md mt-6 ">
              <div className="display flex items-center gap-3 pl-5">
                <img
                  className="w-9 h-9 rounded-full"
                  src="src\assets\Images\Picture 1.jpg"
                  alt=""
                />
                <div>
                  <h4 className="display flex gap-2 items-center">
                    Ajayi Jesutofunmi
                    <span>
                      <MdVerified color="green" />
                    </span>
                  </h4>
                  <h5 className="text-xs mt-2">Ikeja, Lagos</h5>
                </div>
              </div>

              <button className="bg-[#124096] hover:bg-[#284d92] h-10 w-28 m-3 text-white rounded-lg">
                Review Job
              </button>
            </div>

            <div className="sm:w-8/12 md:w-9/12 lg:w-10/12 h-16 display flex justify-between bg-white rounded-md mt-3 ">
              <div className="display flex items-center gap-3 pl-5">
                <img
                  className="w-9 h-9 rounded-full"
                  src="src\assets\Images\Picture 1.jpg"
                  alt=""
                />
                <div>
                  <h4 className="display flex gap-2 items-center">
                    Ajayi Jesutofunmi
                    <span>
                      <MdVerified color="green" />
                    </span>
                  </h4>
                  <h5 className="text-xs mt-2">Ikeja, Lagos</h5>
                </div>
              </div>

              <button className="bg-[#124096] hover:bg-[#284d92] h-10 w-28 m-3 text-white rounded-lg">
                Review Job
              </button>
            </div>

            <div className="sm:w-8/12 md:w-9/12 lg:w-10/12 h-16 display flex justify-between bg-white rounded-md mt-3 ">
              <div className="display flex items-center gap-3 pl-5">
                <img
                  className="w-9 h-9 rounded-full"
                  src="src\assets\Images\Picture 1.jpg"
                  alt=""
                />
                <div>
                  <h4 className="display flex gap-2 items-center">
                    Ajayi Jesutofunmi
                    <span>
                      <MdVerified color="green" />
                    </span>
                  </h4>
                  <h5 className="text-xs mt-2">Ikeja, Lagos</h5>
                </div>
              </div>

              <button className="bg-[#124096] hover:bg-[#284d92] h-10 w-28 m-3 text-white rounded-lg">
                Review Job
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
