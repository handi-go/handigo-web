import ProfileCardImage from "../../assets/profile.png"
import { RiMapPinRangeFill } from "react-icons/ri";
import { Star } from "lucide-react";


export default function CustomerCard(){
    return (
      <div className="space-y-4 rounded-3xl p-4 w-[280px] flex-shrink-0 h-fit bg-white">
        <div className="w-full h-[200px]">
          <img
            className="w-full h-full rounded-xl object-cover"
            src={ProfileCardImage}
            alt="Artisan"
          />
        </div>

        <div className="space-y-2">
          <div className="text-xl font-semibold text-[#1C1C1C]">
            Ajayi Jesutofunmi
          </div>
          <div className="text-sm text-[#1C1C1C80]">
            A highly skilled and experienced carpenter artisan renowned for his...
          </div>
          <div className="flex justify-between text-sm text-[#1C1C1C]">
            <div className="flex items-center gap-1">
              <RiMapPinRangeFill className="w-5 h-5" />
              <span>Lagos</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-[#FDD835] fill-amber-300" />
              <span>5.0</span>
              <span className="text-xs text-[#1C1C1CCC]">(345)</span>
            </div>
          </div>
          <div className="flex justify-between gap-3 mt-3">
            <button className="w-1/2 py-2 text-sm text-[#124096] border border-[#124096] bg-[#12409633] rounded-md">
              View Profile
            </button>
            <button className="w-1/2 py-2 text-sm text-white bg-[#124096] rounded-md">
              Book Ajayi
            </button>
          </div>
        </div>
      </div>
    );
  }
