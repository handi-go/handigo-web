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
      <div className="p-2 bg-white mt-5 display flex items-center rounded-lg justify-between">
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

      <div className="w-full ">
        <div className="grid grid-cols-3 grid-x-2 gap-4 grid-flow-row-dense h-[27rem] mt-5">
          <div className="bg-white min-h-[50px] row-span-4 rounded-xl col-span-2">
            <div className="mt-3 mx-5">
              <div className="dislay flex justify-between text-xl">
                <h2 className="">Job Request</h2>
                <h3 className="opacity-50">See All</h3>
              </div>

              <div className="w-full display flex h-20 mt-3 items-center gap-3 bg-[#f4f6f6]">
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

              <div className="w-full display flex h-20 mt-3 items-center gap-3 bg-[#f4f6f6]">
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

              <div className="w-full display flex h-20 mt-3 items-center gap-3 bg-[#f4f6f6]">
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

              <div className="w-full display flex h-20 mt-3 items-center gap-3 bg-[#f4f6f6]">
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
  );
}

export default Dashboard;