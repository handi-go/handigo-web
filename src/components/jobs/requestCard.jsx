import { Star } from "lucide-react";
import ProfileImage from '../../assets/profile.png'
import { RiMapPinRangeFill } from "react-icons/ri";

export default function RequestCard(){
    return (
        <div className="space-y-2 md:space-y-6 bg-white rounded-lg md:rounded-xl px-2 py-2 md:px-4 md:py-4">
            <div className="flex justify-between md:gap-2">
                <div className="flex gap-2 md:gap-4">
                    <div className="w-8 h-8 md:w-12 md:h-12 rounded-full border-2 border-[#124096CC]">
                        <img src={ProfileImage} alt="User profile" className="w-full h-full rounded-full" />
                    </div>

                    <div className="">
                        <div className="text-[10px] md:text-lg text-nowrap text-[#1C1C1C] font-medium">
                            Jack Peterson
                        </div>
                        <div className="flex items-center gap-1">
                            <Star className="fill-[#FDD835] w-2 h-2 md:w-4 md:h-4" stroke="0" />
                            <Star className="fill-[#FDD835] w-2 h-2 md:w-4 md:h-4" stroke="0" />
                            <Star className="fill-[#FDD835] w-2 h-2 md:w-4 md:h-4" stroke="0" />
                            <Star className="fill-[#FDD835] w-2 h-2 md:w-4 md:h-4" stroke="0" />
                            <Star className="fill-[#FDD835] w-2 h-2 md:w-4 md:h-4" stroke="0" />
                            <Star className="fill-[#FDD835] w-2 h-2 md:w-4 md:h-4" stroke="0" />
                        </div>
                    </div>
                </div>

                <div className="w-fit h-fit text-[4px] text-nowrap md:text-[9px] text-[#FFA4A4] bg-[#2D2D2D] font-medium rounded-full px-1 md:px-2 py-1">
                    Incoming Project
                </div>
            </div>

            <div className="w-full flex justify-between items-center">
                <div>
                    <div className="text-[8px] md:text-sm font-light text-[#1C1C1C] mb-2">Service</div>
                    <div className="text-[9px] md:text-base font-semibold text-[#1C1C1C]">Carpenter</div>
                </div>

                <div>
                    <div className="text-[8px] md:text-sm  font-light text-[#1C1C1C] mb-2">Negotiated Amount</div>
                    <div className="text-[9px] md:text-base font-semibold text-[#1C1C1C]">₦250,000.00</div>
                </div>
            </div>

            <div>
                <hr className="border-[0.5px] border-[#1C1C1C1A]"/>
            </div>

            <div className="flex items-start gap-x-2">
                <RiMapPinRangeFill className="w-6 h-6 md:w-10 md:h-10"/>
                <p className="text-[8px] md:text-sm text-[#1C1C1C] font-light">Creative Web Solutions, 123 Pixel Avenue, Suite 4B, Tech City, Innovate State 56789, USA</p>
            </div>

            <div className="flex justify-between items-center gap-4">
                <button className="w-30 md:w-38 h-8 md:h-11 flex justify-center items-center text-[10px] md:text-base font-medium text-[#A52626] border border-[#FF0000] rounded-lg hover:bg-gray-50 transition-all ease-in-out">
                    Decline
                </button>
                <button className="w-30 md:w-38 h-8 md:h-11 flex justify-center items-center text-[10px] md:text-base font-medium text-white bg-[#46B54A] rounded-lg hover:bg-[#46B54A]/90 transition-all ease-in-out">
                    Accept
                </button>
            </div>
        </div>
    )
}