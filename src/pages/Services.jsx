import { MdVerified } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { LuMoveRight } from "react-icons/lu";
import profileImage from "../assets/profile.png";

function Services() {
  return (
    <div className="px-4">
      <div className="display flex">

        <div className="w-full">
          <div className="space-y-4">
            <div className="flex flex-row-reverse justify-between md:flex-col md:justify-start mt-6 md:mt-0">
              <div className="flex items-center justify-between w-full">
                <div className="hidden md:flex gap-2 items-center">
                  <h2 className="text-[32px] font-semibold">Ajayi Jesutofunmi</h2>
                  <MdVerified className="w-7 h-7" color="green" />
                </div>

                <button className="flex justify-between items-center text-nowrap bg-[#124096] hover:bg-[#284d92] text-white rounded-md md:rounded-lg text-[10px] md:text-[13px] gap-1 px-4 md:px-4 py-3 md:py-3">
                  Create Job Request
                  <span>
                    <FaPlus className="w-3 h-3 md:w-4 md:h-4" />
                  </span>
                </button>
              </div>

              <div className="text-[10px] md:text-lg text-[#1C1C1CCC] font-normal">
                Here's what Ajayi Jesutofunmi has been up to on Handigo
              </div>
            </div>

            <div className="grid grid-cols-2 md:flex gap-2 md:gap-5">
              <div className="bg-white flex-1 px-4 py-4 border border-[#1C1C1C26] rounded-lg">
                <h4 className="text-2xl md:text-3xl font-semibold mb-2 text-[#3D63AA]">
                  38
                </h4>
                <div className="text-xs md:text-base text-nowrap display flex justify-between items-center gap-1 font-light">
                  Ongoing Orders
                  <span>
                    <LuMoveRight className="w-4 h-4 md:w-6 md:h-6" color="#3D63AA" />
                  </span>
                </div>
              </div>

              <div className="bg-white flex-1 px-3 md:px-4 py-3 md:py-4 border border-[#1C1C1C26] rounded-lg">
                <h4 className="text-2xl md:text-3xl font-semibold mb-2 text-[#FFBC01]">
                  10
                </h4>
                <div className="text-xs md:text-base text-nowrap display flex justify-between items-center gap-1 font-light">
                  Pending Orders
                  <span>
                    <LuMoveRight className="w-4 h-4 md:w-6 md:h-6" color="#FFBC01" />
                  </span>
                </div>
              </div>

              <div className="bg-white flex-1 px-4 py-4 border border-[#1C1C1C26] rounded-lg">
                <h4 className="text-2xl md:text-3xl font-semibold mb-2 text-[#4CAF50]">
                  248
                </h4>
                <div className="text-xs md:text-base text-nowrap display flex justify-between items-center gap-1 font-light">
                  Completed Orders
                  <span>
                    <LuMoveRight className="w-4 h-4 md:w-6 md:h-6" color="#4CAF50" />
                  </span>
                </div>
              </div>

              <div className="bg-white flex-1 px-4 py-4 border border-[#1C1C1C26] rounded-lg">
                <h4 className="text-2xl md:text-3xl font-semibold mb-2 text-[#1C1C1C]">
                  296
                </h4>
                <div className="text-xs md:text-base text-nowrap display flex justify-between items-center gap-1 font-light">
                  Total Orders
                  <span>
                    <LuMoveRight className="w-4 h-4 md:w-6 md:h-6" color="#1C1C1C" />
                  </span>
                </div>
              </div>
            </div>

            <div className="display flex justify-between w-full mt-8">
              <div className="display flex gap-4 md:gap-10">
                <button className="text-[12px] md:text-base text-[#3D63AA] font-semibold">Current Jobs</button>
                <button className="text-[12px] md:text-base text-[#858585]">Past Bookings</button>
              </div>
              <button className="text-[12px] md:text-base text-[#1C1C1C99]">See All</button>
            </div>

            <hr className="w-32 h-1 mt-3 border-0 rounded-sm dark:bg-[#3D63AA]" />

            <div className="space-y-2">
              <div className="w-full h-16 flex justify-between items-center bg-white rounded-md px-4 md:px-6 py-3 md:py-3.5">
                <div className="display flex items-center gap-3">
                  <img
                    className="w-8 h-8 rounded-full"
                    src={profileImage}
                    alt=""
                  />
                  <div>
                    <h4 className="text-[12px] md:text-sm display flex gap-2 items-center">
                      Ajayi Jesutofunmi
                      <span>
                        <MdVerified className="w-3.5 h-3.5" color="green" />
                      </span>
                    </h4>
                    <h5 className="text-[10px] mt-1">Ikeja, Lagos</h5>
                  </div>
                </div>

                <button className="text-[10px] md:text-[13px] bg-[#124096] hover:bg-[#284d92] text-white rounded-lg px-6 py-3">
                  Review Job
                </button>
              </div>

              <div className="w-full h-16 flex justify-between items-center bg-white rounded-md px-4 md:px-6 py-3 md:py-3.5">
                <div className="display flex items-center gap-3">
                  <img
                    className="w-8 h-8 rounded-full"
                    src={profileImage}
                    alt=""
                  />
                  <div>
                    <h4 className="text-[12px] md:text-sm display flex gap-2 items-center">
                      Ajayi Jesutofunmi
                      <span>
                        <MdVerified className="w-3.5 h-3.5" color="green" />
                      </span>
                    </h4>
                    <h5 className="text-[10px] mt-1">Ikeja, Lagos</h5>
                  </div>
                </div>

                <button className="text-[10px] md:text-[13px] bg-[#124096] hover:bg-[#284d92] text-white rounded-lg px-6 py-3">
                  Review Job
                </button>
              </div>

              <div className="w-full h-16 flex justify-between items-center bg-white rounded-md px-4 md:px-6 py-3 md:py-3.5">
                <div className="display flex items-center gap-3">
                  <img
                    className="w-8 h-8 rounded-full"
                    src={profileImage}
                    alt=""
                  />
                  <div>
                    <h4 className="text-[12px] md:text-sm display flex gap-2 items-center">
                      Ajayi Jesutofunmi
                      <span>
                        <MdVerified className="w-3.5 h-3.5" color="green" />
                      </span>
                    </h4>
                    <h5 className="text-[10px] mt-1">Ikeja, Lagos</h5>
                  </div>
                </div>

                <button className="text-[10px] md:text-[13px] bg-[#124096] hover:bg-[#284d92] text-white rounded-lg px-6 py-3">
                  Review Job
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
