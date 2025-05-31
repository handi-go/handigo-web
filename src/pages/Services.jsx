import { MdVerified } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { LuMoveRight } from "react-icons/lu";
import profileImage from "../assets/profile.png";

function Services() {
  return (
    <div>
      <div className="display flex">

        <div className="w-full">
          <div className="mt-5">
            <div className="display flex items-center justify-between w-full">
              <div className="mt-5 text-3xl font-semibold display flex gap-2 items-center">
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
            <h2 className="font-normal">
              Here's what Ajayi Jesutofunmi has been up to on Handigo
            </h2>
            <div className="flex gap-5 mt-6">
              <div className=" bg-white flex-1 px-3 py-3 rounded-md">
                <h4 className="text-3xl font-semibold mb-2 text-[#3D63AA]">
                  38
                </h4>
                <h5 className="display flex items-center gap-12 font-light">
                  Ongoing Orders
                  <span>
                    <LuMoveRight color="#3D63AA" />
                  </span>
                </h5>
              </div>
              <div className=" bg-white flex-1 px-3 py-3 rounded-md">
                <h4 className="text-3xl font-semibold mb-2 text-[#FFBC01]">
                  10
                </h4>
                <h5 className="display flex items-center gap-14 font-light">
                  Pending Orders
                  <span>
                    <LuMoveRight color="#FFBC01" />
                  </span>
                </h5>
              </div>
              <div className=" bg-white flex-1 px-3 py-3 rounded-md">
                <h4 className="text-3xl font-semibold mb-2 text-[#4CAF50]">
                  248
                </h4>
                <h5 className="display flex items-center gap-8 font-light">
                  Completed Orders
                  <span>
                    <LuMoveRight color="#4CAF50" />
                  </span>
                </h5>
              </div>
              <div className=" bg-white flex-1 px-3 py-3 rounded-md">
                <h4 className="text-3xl font-semibold mb-2 text-[#1C1C1C]">
                  296
                </h4>
                <h5 className="display flex items-center gap-16 font-light">
                  Total Orders
                  <span>
                    <LuMoveRight color="#1C1C1C" />
                  </span>
                </h5>
              </div>
            </div>

            <div className="display flex justify-between w-full mt-8">
              <div className="display flex gap-10">
                <h4 className="text-[#3D63AA] font-semibold">Current Jobs</h4>
                <h4 className="opacity-50">Past Bookings</h4>
              </div>
              <h4 className="opacity-50">See All</h4>
            </div>
            <hr className="w-32 h-1 mt-3 border-0 rounded-sm dark:bg-[#3D63AA]" />

            <div className="w-full h-16 display flex justify-between bg-white rounded-md mt-6 ">
              <div className="display flex items-center gap-3 pl-5">
                <img
                  className="w-9 h-9 rounded-full"
                  src={profileImage}
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

            <div className="w-full h-16 display flex justify-between bg-white rounded-md mt-3 ">
              <div className="display flex items-center gap-3 pl-5">
                <img
                  className="w-9 h-9 rounded-full"
                  src={profileImage}
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

            <div className="w-full h-16 display flex justify-between bg-white rounded-md mt-3 ">
              <div className="display flex items-center gap-3 pl-5">
                <img
                  className="w-9 h-9 rounded-full"
                  src={profileImage}
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
