import { IoChevronDown } from "react-icons/io5"
import Input from "../../components/authentications/input"
import { LuFileText } from "react-icons/lu"
import { PiCameraPlusLight, PiCameraPlusThin } from "react-icons/pi"
import { useState } from "react"

export default function AccountVerification(){
    const [openDropDow, setOpenDropDown] = useState(false)


    const personalInfoFields = [
        {
            label: "Bank Name",
            type: "text",
            name: "bankName",
            placeholder: "Input your bank",
            required: true
        },
        {
            label: "Bank Account Number",
            type: "text",
            name: "accountNumber",
            placeholder: "Input your bank account number",
            required: true
        },
        {
            label: "Bank Account Name",
            type: "text",
            name: "accountName",
            placeholder: "input your bank account name ",
            required: true
        }
    ]
    return (
        <div className="w-full space-y-4 md:w-5/6 m-auto my-10"> {/* max-w-md */}
            <div className="flex justify-between items-center gap-2 flex-wrap border-b-1 border-[#636262] py-4">
                <div className="px-8 md:p-0">
                    <h2 className="text-[2rem] sm:text-[1rem] md:text-[2.5rem] text-[#1C1C1C] font-bold">Account Verification</h2>
                </div>
            </div>

            <div className="px-5 md:px-0">
                <p className="text-lg font-light text-[#1C1C1C]">Kindly Complete your Verification and authenticate your identity</p>
            </div>


            <form className="space-y-6 mt-10"> {/* onSubmit={onSubmit} */}

                <div className="flex flex-wrap gap-x-6 px-8 md:p-0">
                    {personalInfoFields.map((field, index) => (
                        <div key={index} className="w-full flex-1/6">
                        <Input
                            label={field.label}
                            inputType={field.type}
                            name={field.name}
                            placeholder={field.placeholder}
                        />
                        </div>
                    ))}
                </div>

                <div className="space-y-4 px-8 md:p-0 mb-5">
                    <div>
                        <div className="text-base font-medium text-[#1C1C1C] mb-2">
                            Document type<span className="text-[#D21717]">*</span>
                        </div>
                        <button className="relative w-full flex items-center justify-between border rounded-lg text-base font-medium text-[#124096] px-4 py-1.5">
                            Select document type
                            <IoChevronDown />

                            <div className="w-full h-fit absolute left-0 top-10 items-start flex-col rounded-md bg-gray-200 gap-2 py-2 px-1 hidden">
                                <button className="w-full text-base text-[#124096] py-2 hover:bg-white">NIN</button>
                                <button className="w-full text-base text-[#124096] py-2 hover:bg-white">National Passport</button>
                                <button className="w-full text-base text-[#124096] py-2 hover:bg-white">BVN</button>
                            </div>
                        </button>

                    </div>

                    <div>
                        <button className="w-full space-y-2 flex flex-col items-center text-lg text-[#1C1C1C] border border-[#124096] rounded-xl border-dashed p-4">
                            <div>
                                <LuFileText className="h-12 md:h-18 w-12 md:w-18" strokeWidth={0.8}/>
                            </div>

                            <div className="font-medium">
                                Upload your document
                            </div>

                            <div className="font-light">
                                JPG, PNG and PDF Format
                            </div>
                        </button>
                    </div>
                </div>

                <div className="px-8 md:p-0">
                    <div className="text-base font-medium text-[#1C1C1C] mb-2">
                        Take a selfie
                    </div>
                    <div>
                        <button className="w-full space-y-2 flex flex-col items-center text-lg text-[#1C1C1C] bg-[#D7D7D7] border border-[#124096] rounded-xl p-4">
                            <div>
                                <PiCameraPlusThin className="h-12 md:h-18 w-12 md:w-18" strokeWidth={0}/>
                            </div>

                            <div className="font-medium">
                                Upload your Selfie
                            </div>
                        </button>
                    </div>
                </div>
            </form>

            <div className="flex justify-center gap-4 md:gap-10 mt-20">
                <button className="min-w-37 text-base font-medium text-[#124096CC] border border-[#124096CC] rounded-lg bg-[#12409633] p-4 cursor-pointer">Back</button>
                <button className="min-w-37 text-base font-medium text-white border border-[#124096CC] rounded-lg bg-[#124096] p-4 cursor-pointer">Submit</button>
            </div>
        </div>
    )
}