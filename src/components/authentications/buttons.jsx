import { FcGoogle } from "react-icons/fc";


export function ButtonPrimary({name}){
    return (
        <button
        className="text-base font-medium md:font-semibold text-white bg-[#124096]
         rounded-lg w-full px-2.5 py-4 md:py-6 cursor-pointer" >
            {name}
        </button>
    )
}

export function GoogleButton({name}){
    return (
        <button
        className="flex justify-center items-center gap-6 text-base
        font-medium md:font-semibold text-[#124096] bg-white border border-[#E0DEE0]
        rounded-lg w-full px-2.5 py-4 md:py-[1.125rem] cursor-pointer">
            <FcGoogle size={32} />
            {name}
        </button>
    )
}

export function SubmitDefault(){
    return (
        <button
        className="flex gap-6 text-base font-medium md:font-semibold text-[#124096]
        bg-white border border-[#E0DEE0] rounded-lg w-full px-2.5 py-4 md:py-6 cursor-pointer" >
            <FcGoogle size={24} />
            props.name
        </button>
    )
}