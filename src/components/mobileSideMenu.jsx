import { IoCloseOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import EmojiDefaultProfileImage from '../assets/messageprofile.png'

export default function MobileSideMenu({toggle, settoggle}){
    const handleToggle = () => settoggle(prev => !prev);

    return (
        <div className="flex justify-between items-center border border-gray-100 bg-white px-4 py-4">
            <div>
                {
                    toggle ? <IoCloseOutline onClick={handleToggle} className="w-8 h-8 text-[#124096] cursor-pointer" /> : <RxHamburgerMenu onClick={handleToggle} className="w-6 h-6 text-[#124096] cursor-pointer" />
                }
            </div>

            <div className="w-8 h-8 flex items-center justify-center rounded-full">
                <img src={EmojiDefaultProfileImage} alt="Default emoji image" className="w-full h-full rounded-full" />
            </div>
        </div>
    )
}