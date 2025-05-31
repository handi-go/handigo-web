import { MdCall } from 'react-icons/md'
import ProfileImage from '../assets/profile.png'
import { IoIosSend } from 'react-icons/io'
import { FaRegSmile } from 'react-icons/fa'

export default function Messages(){
    return (
        <div className="grid grid-cols-[30%_68%] gap-6 h-full min-h-0">
            <div className="space-y-4">
                <div className="text-xl text-[#222222] font-semibold">
                    Messages
                </div>

                <div className="space-y-2">
                    {[...Array(2)].map((_, i) => (
                        <div className='flex items-start gap-4 border-t border-[#DADADA] py-4 cursor-pointer'>
                            <div className="w-[50px] h-[50px] rounded-full border-2 border-[#0A224E] flex-none ">
                                <img src={ProfileImage} alt="User profile" className="w-full h-full rounded-full object-cover" />
                            </div>

                            <div className="space-y-2">
                                <div className="text-sm font-medium text-[#1C1C1C]">
                                    Jesutofunmi Ajayi
                                </div>
                                <p className="text-xs font-light text-[#1C1C1CB2]">Thank you for your kind words, Daniel! We use high-quality, full-grain leather that’s durable</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-col flex-1 min-h-0 bg-white">
                <div className="flex justify-between gap-2 border-b border-b-[#E7E7E7] px-6 py-4">
                    <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full border-2 border-[#124096CC]">
                        <img src={ProfileImage} alt="User profile" className="w-full h-full rounded-full" />
                    </div>
                    <div className="space-x-2">
                        <div className="text-base font-semibold text-[#1C1C1C]">Jesutofunmi Ajayi</div>
                        <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#5CAD5F]"></span>
                        <span className="text-[13px] font-medium text-[#5CAD5F]">Online</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <button className="text-[12px] rounded-[5px] text-white bg-[#4CAF50] px-4 py-2 hover:bg-[#45a049]">
                        Start Project
                    </button>
                    <a href="tel:09035103139" className="cursor-pointer">
                        <MdCall className="w-8 h-8" />
                    </a>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4">
                    <div className="w-fit mx-auto text-xs text-[#1C1C1CCC] bg-[#F4F4F4] px-3 py-2 rounded-sm">
                        Yesterday
                    </div>

                    <div className="flex flex-col gap-4 pb-24">
                    <div className="flex justify-start">
                        <div className="bg-[#fdfdfd] rounded-xl p-3 max-w-[70%] flex flex-col border border-[#DDDDDD33]">
                        <div className="text-[13px] font-light text-[#1C1C1C]">
                            I love your leather bags, but could you tell me more about the type of leather you use?
                        </div>
                        <div className="text-right text-[11px] font-light text-[#1C1C1CB2] mt-1">3:30 PM</div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <div className="bg-[#fdfdfd] rounded-xl p-3 max-w-[70%] flex flex-col border border-[#DDDDDD33]">
                        <div className="text-[13px] font-light text-[#1C1C1C]">
                            Thank you for your kind words, Daniel! We use high-quality, full-grain leather that’s durable and ages beautifully over time. Each bag is carefully crafted to ensure longevity and style. Let me know if you have more questions about materials or care!
                        </div>
                        <div className="text-right text-[11px] font-light text-[#1C1C1CB2] mt-1">3:46 PM</div>
                        </div>
                    </div>
                    </div>
                </div>

                <div className="w-full bg-white px-4 py-3 sticky bottom-0">
                    <div className="flex items-center gap-3 bg-[#F0F0F0] px-4 py-2 rounded">
                    <FaRegSmile className="w-6 h-6" />
                    <input
                        type="text"
                        className="w-full text-xs font-light text-[#1C1C1CB2] px-2 py-2 bg-transparent focus:outline-none"
                        placeholder="Type your Message"
                    />
                    <button>
                        <IoIosSend className="w-6 h-6 text-[#124096]" />
                    </button>
                    </div>
                </div>
            </div>
        </div>
    )
}