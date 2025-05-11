import { Star } from "lucide-react";
import ProfileImage from '../../assets/profile.png'
import { RiMapPinRangeFill } from "react-icons/ri";

export default function RequestCard(){
    return (
        <div className="space-y-6 bg-white rounded-xl p-4">
            <div className="flex justify-between gap-4">
                <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full border-2 border-[#124096CC]">
                        <img src={ProfileImage} alt="User profile" className="w-full h-full rounded-full" />
                    </div>

                    <div className="">
                        <div className="text-lg text-[#1C1C1C] font-medium">
                            Jack Peterson
                        </div>
                        <div className="flex items-center gap-1">
                            <Star className="fill-[#FDD835] w-4 h-4" stroke="0" />
                            <Star className="fill-[#FDD835] w-4 h-4" stroke="0" />
                            <Star className="fill-[#FDD835] w-4 h-4" stroke="0" />
                            <Star className="fill-[#FDD835] w-4 h-4" stroke="0" />
                            <Star className="fill-[#FDD835] w-4 h-4" stroke="0" />
                            <Star className="fill-[#FDD835] w-4 h-4" stroke="0" />
                        </div>
                    </div>
                </div>

                <div className="w-fit h-fit text-[9px] text-[#FFA4A4] bg-[#2D2D2D] font-medium rounded-full px-2 py-1">
                    Incoming Project
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="">
                    <div className="text-sm font-light text-[#1C1C1C] mb-2">Service</div>
                    <div className="text-base font-semibold text-[#1C1C1C]">Carpenter</div>
                </div>

                <div>
                    <div className="text-sm font-light text-[#1C1C1C] mb-2">Negotiated Amount</div>
                    <div className="text-base font-semibold text-[#1C1C1C]">₦250,000.00</div>
                </div>
            </div>

            <div>
                <hr className="border-[0.5px] border-[#1C1C1C1A]"/>
            </div>

            <div className="flex items-start gap-x-2">
                <RiMapPinRangeFill className="w-10 h-10"/>
                <p className="text-sm text-[#1C1C1C] font-light">Creative Web Solutions, 123 Pixel Avenue, Suite 4B, Tech City, Innovate State 56789, USA</p>
            </div>

            <div className="flex justify-between items-center gap-4">
                <button className="w-38 h-11 flex justify-center items-center text-base font-medium text-white bg-[#46B54A] rounded-lg hover:bg-[#46B54A]/90 transition-all ease-in-out">
                    Accept
                </button>
                <button className="w-38 h-11 flex justify-center items-center text-base font-medium text-[#A52626] border border-[#FF0000] rounded-lg hover:bg-gray-50 transition-all ease-in-out">
                    Reject
                </button>
            </div>
        </div>
    )
}