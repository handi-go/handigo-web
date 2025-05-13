import { IoIosCheckmark } from 'react-icons/io'
import ProfileImage from '../../assets/profile.png'

export default function PendingCard({ onClick }){
    return (
        <div className="bg-white flex justify-between px-6 py-3.5 cursor-pointer"
            onClick={onClick}
        >
            <div className='flex gap-4'>
                <div className="w-12 h-12 rounded-full border-2 border-[#124096CC]">
                    <img src={ProfileImage} alt="User profile" className="w-full h-full rounded-full" />
                </div>

                <div className="space-y-2">
                    <div className="flex gap-2">
                        <span className="text-sm font-normal text-[#1C1C1C]">Ajayi Jesutofunmi</span> <span className="w-3.5 h-3.5 flex justify-between items-center border border-dashed border-white bg-[#4CAF50] rounded-full"><IoIosCheckmark className="w-6 h-6 text-white" /></span>
                    </div>
                    <div className="text-[10px] font-normal text-[#1C1C1CB2]">
                        Ikeja, Lagos
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <div className="text-sm font-normal text-[#1C1C1C]">
                    Status
                </div>

                <div className="text-[10px] font-normal text-[#1C1C1CB2]">
                    Awaiting Completion
                </div>
            </div>
        </div>
    )
}