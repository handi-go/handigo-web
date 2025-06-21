import ProfileCardImage from "../../assets/profile.png"
import { RiMapPinRangeFill } from "react-icons/ri";
import { Star } from "lucide-react";


export default function CustomerCard(){
    return (
      <div className="space-y-4 rounded-xl md:rounded-3xl border-[2px] border-[#1C1C1C08] p-[4px] md:p-4 w-full md:w-[280px] flex-shrink-0 h-fit bg-white">
        <div className="w-full h-[105px] md:h-[200px]">
          <img
            className="w-full h-full rounded-xl object-cover"
            src={ProfileCardImage}
            alt="Artisan"
          />
        </div>

        <div className="space-y-2">
          <div className="text-[13px] md:text-xl font-medium md:font-semibold text-[#1C1C1C]">
            Ajayi Jesutofunmi
          </div>
          <div className="text-[8px] md:text-sm text-[#1C1C1C80]">
            A highly skilled and experienced carpenter artisan renowned for his...
          </div>
          <div className="flex justify-between text-sm text-[#1C1C1C]">
            <div className="flex items-center gap-1">
              <RiMapPinRangeFill className="w-[14px] h-[14px] md:w-5 md:h-5" />
              <span className="text-[8px] md:text-xs">Lagos</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-[14px] h-[14px] md:w-5 md:h-5 text-[#FDD835] fill-amber-300" />
              <span className="text-[8px] md:text-xs text-[#1C1C1CCC]">5.0</span>
              <span className="text-[8px] md:text-xs text-[#1C1C1CCC]">(345)</span>
            </div>
          </div>
          <div className="flex justify-between gap-2 md:gap-3 mt-3">
            <button className="w-1/2 py-2 text-[8px] md:text-sm text-[#124096] border border-[#124096] bg-[#12409633] rounded-md">
              Message
            </button>
            <button className="w-1/2 py-2 text-[8px] md:text-sm text-white bg-[#124096] rounded-md">
              Book Ajayi
            </button>
          </div>
        </div>
      </div>
    );
  }
