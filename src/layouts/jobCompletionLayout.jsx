import { IoArrowBackOutline } from "react-icons/io5";

export default function JobCompletionLayout({children, onClose}){

    return (
        <div className="w-[100vw] h-[100vh] absolute inset-0 bg-black/40">
            <div className="max-w-3/5 mx-auto">
                <div className="relative w-full bg-[#124096] px-4 py-3 text-white">
                    <button className="absolute left-6 top-1/2 transform -translate-y-1/2"
                        onClick={onClose}
                    >
                        <IoArrowBackOutline className="cursor-pointer h-4 w-4" />
                    </button>

                    <div className="flex justify-center items-center">
                        <h3 className="text-base font-bold">Job Completion Form</h3>
                    </div>
                </div>

                <div className="w-full bg-white p-6 space-y-4">
                    {children}
                </div>
            </div>
        </div>
    )
}