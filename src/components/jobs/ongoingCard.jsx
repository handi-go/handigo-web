import { Star } from "lucide-react";
import ProfileImage from '../../assets/profile.png'
import { RiMapPinRangeFill } from "react-icons/ri";

export default function OngoingCard(){
    return (
        <div className="space-y-2 md:space-y-6 bg-white rounded-xl p-2 md:p-4">
            <div className="flex justify-between gap-2 md:gap-4">
                <div className="flex gap-2 md:gap-4">
                    <div className="w-8 h-8 md:w-12 md:h-12 rounded-full border-2 border-[#124096CC]">
                        <img src={ProfileImage} alt="User profile" className="w-full h-full rounded-full" />
                    </div>

                    <div className="">
                        <div className="text-[10px] md:text-lg text-nowrap text-[#1C1C1C] font-medium">
                            Jack Peterson
                        </div>
                        {/* <div className="flex items-center gap-1">
                            <Star className="fill-[#FDD835] w-2 h-2 md:w-4 md:h-4" stroke="0" />
                            <Star className="fill-[#FDD835] w-2 h-2 md:w-4 md:h-4" stroke="0" />
                            <Star className="fill-[#FDD835] w-2 h-2 md:w-4 md:h-4" stroke="0" />
                            <Star className="fill-[#FDD835] w-2 h-2 md:w-4 md:h-4" stroke="0" />
                            <Star className="fill-[#FDD835] w-2 h-2 md:w-4 md:h-4" stroke="0" />
                            <Star className="fill-[#FDD835] w-2 h-2 md:w-4 md:h-4" stroke="0" />
                        </div> */}
                    </div>
                </div>

                <div className="w-fit h-fit text-[4px] text-nowrap md:text-[9px] text-[#FFA4A4] bg-[#2D2D2D] font-medium rounded-full px-2 py-1">
                    Incoming Project
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="">
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

            <div className="">
                <div className="text-[8px] md:text-sm font-medium text-[#1C1C1C] mb-1">Job description</div>
                <p className="text-[8px] md:text-sm text-[#1C1C1C] font-light">I’m looking for a skilled carpenter to build a custom wooden wardrobe for my bedroom.</p>
            </div>

            <div className="flex items-start gap-x-2">
                <RiMapPinRangeFill className="w-10 h-10"/>
                <p className="text-[8px] md:text-sm text-[#1C1C1C] font-light">Creative Web Solutions, 123 Pixel Avenue, Suite 4B, Tech City, Innovate State 56789, USA</p>
            </div>

            <div className="flex justify-between items-center gap-4">
                <button className="w-full h-8 md:h-11 flex justify-center items-center text-[10px] md:text-base font-medium text-white bg-[#124096] rounded-lg hover:bg-[#124096]/90 transition-all ease-in-out">
                    Mark as Completed
                </button>
            </div>
        </div>
    )
}