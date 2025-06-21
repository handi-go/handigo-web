import { TbCardsFilled } from "react-icons/tb";
import { FaStar } from "react-icons/fa6";
import { IoToggle } from "react-icons/io5";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { FaCheck } from "react-icons/fa6";
import { GiCancel } from "react-icons/gi";

function Dashboard() {
  return (
    <div className="bg-[#f5f5f5] w-full">
    <div className="mt-5">
      <div className="display grid grid-cols-2 md:flex md:justify-around gap-2 md:gap-7">
        <div className="bg-white display flex items-center gap-6 rounded-lg px-2 py-3 md:py-5 md:px-4">
          <span className="bg-[#d3e0fe]  rounded-full p-2">
            <TbCardsFilled size={30} color="#5e88ea" />
          </span>

          <div>
            <p className="text-[12px] md:text-base text-[#A3AED0]">Active Jobs</p>
            <h1 className="text-xl md:text-3xl font-semibold">20</h1>
          </div>
        </div>
        <div className="bg-white display flex items-center gap-6 rounded-lg px-2 py-3 md:py-5 md:px-4">
          <span className="bg-[#d3e0fe]  rounded-full p-2">
            <TbCardsFilled size={30} color="#5e88ea" />
          </span>

          <div>
            <p className="text-[12px] md:text-base text-[#A3AED0]">Total Jobs</p>
            <h1 className="text-xl md:text-3xl font-semibold">350</h1>
          </div>
        </div>
        <div className="bg-white display flex items-center gap-6 rounded-lg px-2 py-3 md:py-5 md:px-4">
          <span className="bg-[#d3e0fe]  rounded-full p-2">
            <TbCardsFilled size={30} color="#5e88ea" />
          </span>

          <div>
            <p className="text-[12px] md:text-base text-[#A3AED0]">Total earnings</p>
            <h1 className="text-xl md:text-3xl font-semibold">350</h1>
          </div>
        </div>
        <div className="pl-3  bg-white display flex items-center gap-6 rounded-lg px-2 py-3 md:py-5 md:px-4">
          <div>
            <p className="text-[12px] md:text-base text-[#A3AED0]">Ratings</p>
            <div className="display flex items-center gap-1">
              <h1 className="text-xl md:text-3xl font-semibold">4.8</h1>
              <span className="display flex">
                <FaStar color="gold" />
                <FaStar color="gold" />
                <FaStar color="gold" />
                <FaStar className="hidden md:block" color="gold" />
                <FaStar className="hidden md:block" color="gold" />
              </span>
              <p className="text-xs md:text-sm ml-3">(30 reviews)</p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-2 bg-white mt-5 display flex items-center rounded-lg justify-between">
        <div>
          <h1 className="text-sm md:text-base text-[#124096] ml-3">Availability Status</h1>
          <p className="text-[10px] md:text-sm opacity-50 ml-3">
            Set your current working and availability status
          </p>
        </div>

        <button>
          <IoToggle size={40} color="green" />
        </button>
      </div>

      <div className="w-full h-[360px] md:h-fit overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 grid-x-2 gap-2 md:gap-4 grid-flow-row-dense mt-5">
          <div className="bg-white row-span-0 order-2 md:order-1 md:row-span-4 rounded-xl md:col-span-2">
            <div className="space-y-2 md:space-y-4 px-5 py-3">
              <div className="dislay flex justify-between text-xl">
                <h2 className="text-base md:text-lg text-[#1C1C1C]">Job Request</h2>
                <button className="text-sm md:text-lg text-[#1C1C1C99]">See All</button>
              </div>

              <div className="w-full flex items-center justify-between gap-2 bg-[#f4f6f6] px-2 py-2 md:px-6 md:py-3.5">
                <div className="flex items-center gap-1 md:gap-3">
                  <div>
                    <img
                      className="w-10 rounded-full"
                      src="src\assets\Images\Picture 1.jpg"
                      alt=""
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-0.5">
                      <h2 className="text-xs md:text-xl">Jane Cooper</h2>
                      <span>
                        <RiVerifiedBadgeFill color="green" />
                      </span>
                    </div>

                    <p className="text-[8px] md:text-[10px] text-[#1C1C1C] ">Ikeja, Lagos</p>
                  </div>
                </div>

                <div className="display flex gap-1 md:gap-3">
                  <button className="text-green-600 flex flex-col items-center gap-0.5 md:gap-1">
                    <FaCheck className="w-5 h-5 md:w-6 md:h-6" />
                    <h6 className="text-[10px] md:text-xs">Accept</h6>
                  </button>
                  <button className="text-red-600 flex flex-col items-center gap-0.5 md:gap-1">
                    <GiCancel className="w-5 h-5 md:w-6 md:h-6" />
                    <h6 className="text-[10px] md:text-xs">Decline</h6>
                  </button>
                </div>
              </div>

              <div className="w-full flex items-center justify-between gap-2 bg-[#f4f6f6] px-2 py-2 md:px-6 md:py-3.5">
                <div className="flex items-center gap-1 md:gap-3">
                  <div>
                    <img
                      className="w-10 rounded-full"
                      src="src\assets\Images\Picture 1.jpg"
                      alt=""
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-0.5">
                      <h2 className="text-xs md:text-xl">Jane Cooper</h2>
                      <span>
                        <RiVerifiedBadgeFill color="green" />
                      </span>
                    </div>

                    <p className="text-[8px] md:text-[10px] text-[#1C1C1C] ">Ikeja, Lagos</p>
                  </div>
                </div>

                <div className="display flex gap-1 md:gap-3">
                  <button className="text-green-600 flex flex-col items-center gap-0.5 md:gap-1">
                    <FaCheck className="w-5 h-5 md:w-6 md:h-6" />
                    <h6 className="text-[10px] md:text-xs">Accept</h6>
                  </button>
                  <button className="text-red-600 flex flex-col items-center gap-0.5 md:gap-1">
                    <GiCancel className="w-5 h-5 md:w-6 md:h-6" />
                    <h6 className="text-[10px] md:text-xs">Decline</h6>
                  </button>
                </div>
              </div>

              <div className="w-full flex items-center justify-between gap-2 bg-[#f4f6f6] px-2 py-2 md:px-6 md:py-3.5">
                <div className="flex items-center gap-1 md:gap-3">
                  <div>
                    <img
                      className="w-10 rounded-full"
                      src="src\assets\Images\Picture 1.jpg"
                      alt=""
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-0.5">
                      <h2 className="text-xs md:text-xl">Jane Cooper</h2>
                      <span>
                        <RiVerifiedBadgeFill color="green" />
                      </span>
                    </div>

                    <p className="text-[8px] md:text-[10px] text-[#1C1C1C] ">Ikeja, Lagos</p>
                  </div>
                </div>

                <div className="display flex gap-1 md:gap-3">
                  <button className="text-green-600 flex flex-col items-center gap-0.5 md:gap-1">
                    <FaCheck className="w-5 h-5 md:w-6 md:h-6" />
                    <h6 className="text-[10px] md:text-xs">Accept</h6>
                  </button>
                  <button className="text-red-600 flex flex-col items-center gap-0.5 md:gap-1">
                    <GiCancel className="w-5 h-5 md:w-6 md:h-6" />
                    <h6 className="text-[10px] md:text-xs">Decline</h6>
                  </button>
                </div>
              </div>

              <div className="w-full flex items-center justify-between gap-2 bg-[#f4f6f6] px-2 py-2 md:px-6 md:py-3.5">
                <div className="flex items-center gap-1 md:gap-3">
                  <div>
                    <img
                      className="w-10 rounded-full"
                      src="src\assets\Images\Picture 1.jpg"
                      alt=""
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-0.5">
                      <h2 className="text-xs md:text-xl">Jane Cooper</h2>
                      <span>
                        <RiVerifiedBadgeFill color="green" />
                      </span>
                    </div>

                    <p className="text-[8px] md:text-[10px] text-[#1C1C1C] ">Ikeja, Lagos</p>
                  </div>
                </div>

                <div className="display flex gap-1 md:gap-3">
                  <button className="text-green-600 flex flex-col items-center gap-0.5 md:gap-1">
                    <FaCheck className="w-5 h-5 md:w-6 md:h-6" />
                    <h6 className="text-[10px] md:text-xs">Accept</h6>
                  </button>
                  <button className="text-red-600 flex flex-col items-center gap-0.5 md:gap-1">
                    <GiCancel className="w-5 h-5 md:w-6 md:h-6" />
                    <h6 className="text-[10px] md:text-xs">Decline</h6>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white row-span-0 order-1 md:order-2 md:row-span-2 rounded-xl md:col-span-1">
            <div className="px-5 py-3">
              <div className="font-bold text-base md:text-xl text-[#A3AED0]">
                Profile Overview
              </div>

              <div className="display flex gap-4 items-center">
                <img
                  className="w-20 rounded-full mt-5"
                  src="src\assets\Images\Picture 1.jpg"
                  alt=""
                />

                <div className="mt-5">
                  <h1 className="text-sm md:text-2xl font-semibold">
                    Ajayi Jesutofunmi
                  </h1>
                  <p className="text-xs md:text-base text-[#1B2559]">Plumber</p>
                  <p className="text-xs md:text-base text-[#1B2559]">Lagos, Nigeria</p>
                  <p className="text-xs md:text-base text-[#1B2559]">Jesutofunmi@gmail.com</p>
                </div>
              </div>

              <button className="bg-[#124096] hover:bg-[#284d92] text-xs md:text-base text-white w-25 py-2 px-4 mt-3 rounded-lg">
                View Profile
              </button>
            </div>
          </div>

          <div className="bg-white row-span-0 order-3 md:row-span-2 cmd:ol-span-1 rounded-xl">
            <div className="space-y-2 md:space-y-3 px-5 py-3 ">
              <div className="display flex justify-between text-base md:text-lg">
                <h2 className="text-[#1C1C1C]">Past Bookings</h2>
                <button className="text-[#1C1C1C99]">See All</button>
              </div>

              <div className="w-full flex justify-between items-center md:gap-2 bg-[#f4f6f6] px-4 py-3">
               <div className="flex items-center gap-2">
                  <div>
                    <img
                      className="w-8 h-8 rounded-full"
                      src="src\assets\Images\Picture 1.jpg"
                      alt=""
                    />
                  </div>

                  <div>
                    <div className="display flex items-center gap-1">
                      <h2 className="text-xs md:text-sm">Ajayi Tofunmi</h2>
                      <span>
                        <RiVerifiedBadgeFill color="green" />
                      </span>
                    </div>
                    <p className="text-[10px] md:text-xs">Ikorodu</p>
                  </div>
               </div>

                <button className="flex flex-col items-center justify-center gap-0.5">
                  <h6 className="text-[11px] text-sm text-black">Status</h6>
                  <h6 className="text-[9px] md:text-xs text-red-600">Decline</h6>
                </button>
              </div>

              <div className="w-full flex justify-between items-center md:gap-2 bg-[#f4f6f6] px-4 py-3">
               <div className="flex items-center gap-2">
                  <div>
                    <img
                      className="w-8 h-8 rounded-full"
                      src="src\assets\Images\Picture 1.jpg"
                      alt=""
                    />
                  </div>

                  <div>
                    <div className="display flex items-center gap-1">
                      <h2 className="text-xs md:text-sm">Ajayi Tofunmi</h2>
                      <span>
                        <RiVerifiedBadgeFill color="green" />
                      </span>
                    </div>
                    <p className="text-[10px] md:text-xs">Ikorodu</p>
                  </div>
               </div>

                <button className="flex flex-col items-center justify-center gap-0.5">
                  <h6 className="text-[11px] text-sm text-black">Status</h6>
                  <h6 className="text-[9px] md:text-xs text-red-600">Decline</h6>
                </button>
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