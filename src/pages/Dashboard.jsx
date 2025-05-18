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
import { TbCardsFilled } from "react-icons/tb";
import { FaStar } from "react-icons/fa6";
import { IoToggle } from "react-icons/io5";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { FaCheck } from "react-icons/fa6";
import { GiCancel } from "react-icons/gi";

function Dashboard() {
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
            <div className="display flex gap-2 items-center justify-between mr-52">
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

            <div className="mt-5 display flex gap-7">
              <div className="w-64 h-24  bg-white display flex items-center gap-6 rounded-lg">
                <span className="bg-[#d3e0fe]  rounded-full p-2 ml-3">
                  <TbCardsFilled size={30} color="#5e88ea" />
                </span>

                <div>
                  <p className="text-[#A3AED0]">Active Jobs</p>
                  <h1 className="text-3xl font-semibold">20</h1>
                </div>
              </div>
              <div className="w-64 h-24  bg-white display flex items-center gap-6 rounded-lg">
                <span className="bg-[#d3e0fe]  rounded-full p-2 ml-3">
                  <TbCardsFilled size={30} color="#5e88ea" />
                </span>

                <div>
                  <p className="text-[#A3AED0]">Total Jobs</p>
                  <h1 className="text-3xl font-semibold">350</h1>
                </div>
              </div>
              <div className="w-64 h-24  bg-white display flex items-center gap-6 rounded-lg">
                <span className="bg-[#d3e0fe]  rounded-full p-2 ml-3">
                  <TbCardsFilled size={30} color="#5e88ea" />
                </span>

                <div>
                  <p className="text-[#A3AED0]">Total earnings</p>
                  <h1 className="text-3xl font-semibold">350</h1>
                </div>
              </div>
              <div className="w-64 h-24 pl-3  bg-white display flex items-center gap-6 rounded-lg">
                <div>
                  <p className="text-[#A3AED0]">Ratings</p>
                  <div className="display flex items-center gap-1">
                    <h1 className="text-3xl font-semibold">4.8</h1>
                    <span className="display flex">
                      <FaStar color="gold" />
                      <FaStar color="gold" />
                      <FaStar color="gold" />
                      <FaStar color="gold" />
                      <FaStar color="gold" />
                    </span>
                    <p className="text-sm ml-3">(30 reviews)</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-2 bg-white mt-5 w-5/6 display flex items-center rounded-lg justify-between">
              <div>
                <h1 className="text-[#124096] ml-3">Availability Status</h1>
                <p className="opacity-50 ml-3">
                  Set your current working and availability status
                </p>
              </div>

              <button>
                <IoToggle size={40} color="green" />
              </button>
            </div>

            <div className="w-10/12 ">
              <div className="grid grid-cols-3 grid-x-2 gap-4 grid-flow-row-dense h-[27rem] mt-5">
                <div className="bg-white min-h-[50px] row-span-4 rounded-xl col-span-2">
                  <div className="mt-3 mx-5">
                    <div className="dislay flex justify-between text-xl">
                      <h2 className="">Job Request</h2>
                      <h3 className="opacity-50">See All</h3>
                    </div>

                    <div className="w-full display flex h-20 mt-3 items-center pl-3 gap-3 bg-[#f4f6f6]">
                      <img
                        className="w-10 rounded-full"
                        src="src\assets\Images\Picture 1.jpg"
                        alt=""
                      />

                      <div>
                        <div className="display flex items-center  gap-1">
                          <h2 className="text-xl">Jane Cooper</h2>
                          <span>
                            <RiVerifiedBadgeFill color="green" />
                          </span>
                        </div>

                        <p className="opacity-50 ">Ikeja, Lagos</p>
                      </div>

                      <div className="display flex gap-3 ml-[370px]">
                        <button className="text-green-600">
                          <FaCheck size={20} className="ml-3" />
                          <h6 className="text-xs">Accept</h6>
                        </button>
                        <button className="text-red-600">
                          <GiCancel size={20} className="ml-3" />
                          <h6 className="text-xs">Decline</h6>
                        </button>
                      </div>
                    </div>

                    <div className="w-full display flex h-20 mt-3 items-center pl-3 gap-3 bg-[#f4f6f6]">
                      <img
                        className="w-10 rounded-full"
                        src="src\assets\Images\Picture 1.jpg"
                        alt=""
                      />

                      <div>
                        <div className="display flex items-center gap-1">
                          <h2 className="text-xl">Jane Cooper</h2>
                          <span>
                            <RiVerifiedBadgeFill color="green" />
                          </span>
                        </div>

                        <p className="opacity-50 ">Ikeja, Lagos</p>
                      </div>

                      <div className="display flex gap-3 ml-[370px]">
                        <button className="text-green-600">
                          <FaCheck size={20} className="ml-3" />
                          <h6 className="text-xs">Accept</h6>
                        </button>
                        <button className="text-red-600">
                          <GiCancel size={20} className="ml-3" />
                          <h6 className="text-xs">Decline</h6>
                        </button>
                      </div>
                    </div>

                    <div className="w-full display flex h-20 mt-3 items-center pl-3 gap-3 bg-[#f4f6f6]">
                      <img
                        className="w-10 rounded-full"
                        src="src\assets\Images\Picture 1.jpg"
                        alt=""
                      />

                      <div>
                        <div className="display flex items-center gap-1">
                          <h2 className="text-xl">Jane Cooper</h2>
                          <span>
                            <RiVerifiedBadgeFill color="green" />
                          </span>
                        </div>

                        <p className="opacity-50 ">Ikeja, Lagos</p>
                      </div>

                      <div className="display flex gap-3 ml-[370px]">
                        <button className="text-green-600">
                          <FaCheck size={20} className="ml-3" />
                          <h6 className="text-xs">Accept</h6>
                        </button>
                        <button className="text-red-600">
                          <GiCancel size={20} className="ml-3" />
                          <h6 className="text-xs">Decline</h6>
                        </button>
                      </div>
                    </div>

                    <div className="w-full display flex h-20 mt-3 items-center pl-3 gap-3 bg-[#f4f6f6]">
                      <img
                        className="w-10 rounded-full"
                        src="src\assets\Images\Picture 1.jpg"
                        alt=""
                      />

                      <div>
                        <div className="display flex items-center gap-1">
                          <h2 className="text-xl">Jane Cooper</h2>
                          <span>
                            <RiVerifiedBadgeFill color="green" />
                          </span>
                        </div>

                        <p className="opacity-50 ">Ikeja, Lagos</p>
                      </div>

                      <div className="display flex gap-3 ml-[370px]">
                        <button className="text-green-600">
                          <FaCheck size={20} className="ml-3" />
                          <h6 className="text-xs">Accept</h6>
                        </button>
                        <button className="text-red-600">
                          <GiCancel size={20} className="ml-3" />
                          <h6 className="text-xs">Decline</h6>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white min-h-[50px] row-span-2 rounded-xl col-span-1">
                  <div className="mt-5 ml-5">
                    <div className="font-bold text-xl opacity-30">
                      Profile Overview
                    </div>

                    <div className="display flex gap-4 items-center">
                      <img
                        className="w-20 rounded-full mt-5"
                        src="src\assets\Images\Picture 1.jpg"
                        alt=""
                      />

                      <div className="mt-5">
                        <h1 className="text-2xl font-semibold">
                          Ajayi Jesutofunmi
                        </h1>
                        <p className="opacity-50">Plumber</p>
                        <p className="opacity-50">Lagos, Nigeria</p>
                        <p className="opacity-50">Jesutofunmi@gmail.com</p>
                      </div>
                    </div>

                    <button className="bg-[#124096] hover:bg-[#284d92] text-white w-25 py-2 px-4 mt-3 rounded-lg">
                      View Profile
                    </button>
                  </div>
                </div>

                <div className="bg-white  min-h-[50px] row-span-2 col-span-1 rounded-xl">
                  <div className="mt-3 mx-5 ">
                    <div className="display flex justify-between text-lg">
                      <h2>Past Bookings</h2>
                      <h3>See All</h3>
                    </div>

                    <div className="w-full h-16 display flex items-center gap-3 pl-3 bg-[#f4f6f6] mb-2">
                      <img
                        className="w-8 h-8 rounded-full"
                        src="src\assets\Images\Picture 1.jpg"
                        alt=""
                      />
                      <div>
                        <div className="display flex items-center gap-1">
                          <h2 className="text-sm">Ajayi Tofunmi</h2>
                          <span>
                            <RiVerifiedBadgeFill color="green" />
                          </span>
                        </div>
                        <p className="text-xs">Ikorodu</p>
                      </div>
                      <button className=" ml-24">
                        <h6 className="text-sm text-black">Status</h6>
                        <h6 className="text-xs text-red-600">Decline</h6>
                      </button>
                    </div>

                    <div className="w-full h-16 display flex items-center gap-3 pl-3 bg-[#f4f6f6]">
                      <img
                        className="w-8 h-8 rounded-full"
                        src="src\assets\Images\Picture 1.jpg"
                        alt=""
                      />
                      <div>
                        <div className="display flex items-center gap-1">
                          <h2 className="text-sm">Ajayi Tofunmi</h2>
                          <span>
                            <RiVerifiedBadgeFill color="green" />
                          </span>
                        </div>
                        <p className="text-xs">Ikorodu</p>
                      </div>
                      <button className=" ml-24">
                        <h6 className="text-sm text-black">Status</h6>
                        <h6 className="text-xs text-red-600">Decline</h6>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
