import { FaChevronDown } from "react-icons/fa";
import { PiBell } from "react-icons/pi";

export default function DashboardProfile(){
    return (
        <div className="flex items-center gap-6">
            <button className="relative scale-100 hover:scale-110 transition ease-in-out">
                <PiBell className="h-6 w-6" />
                <div className="absolute -top-1 -right-1 flex justify-center items-center text-[10px] text-white/90 font-semibold w-4 h-4 rounded-full bg-[#FF2423] p-1">
                    3
                </div>
            </button>

            <button className="scale-100 hover:scale-110 transition ease-in-out">
                <FaChevronDown className="h-5 w-5" strokeWidth={1} />
            </button>
        </div>
    )
}