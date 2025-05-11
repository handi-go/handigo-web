import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function GlobalSearch(){
    const [searchQuery, setSearchQuery] = useState("")

    return (
        <div className="relative flex items-center w-full">
            <Search className="absolute left-3 w-5 h-5 text-gray-400" strokeWidth={1.5} />
            <input type="text" className="min-w-full text-[15px] text-[#1C1C1C] font-light border border-[#B2B7C1] rounded-xl bg-white focus:outline-[#124096CC] pl-10 py-3" placeholder="Search for artisans or services"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            <button className="absolute right-4 bg-[#124096CC] p-[2px] rounded-full transform scale-90 hover:scale-100
                     transition-transform duration-200 ease-in-out"
            onClick={() => setSearchQuery("")}
            >
                <X className="h-[14px] w-[14px] text-white/90"/>
                <span aria-readonly="Clear global search" />
            </button>
        </div>
    )
}