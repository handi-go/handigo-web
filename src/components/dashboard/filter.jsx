import { BsSliders } from "react-icons/bs";

export default function Filter(){
    return (
        <button className="border border-[#B2B7C1] rounded-[10px] bg-white p-3 group">
            <BsSliders className="h-6 w-6 text-[#B2B7C1] group-hover:text-gray-700 transition ease-in-out" />
        </button>
    )
}