export default function AccountVerification(){
    return (
        <div className="w-full md:w-5/6 m-auto my-10"> {/* max-w-md */}
            <div className="flex justify-between items-center gap-2 flex-wrap border-b-1 border-[#636262] py-4">
                <div className="px-8 md:p-0">
                    <h2 className="text-[2rem] md:text-[2.5rem] text-[#1C1C1C] font-bold">Account Verification</h2>
                </div>

                <div className="px-8 md:p-0">
                    <h2 className="text-2xl md:text-[2.5rem] text-[#1C1C1C] font-semibold md:font-bold">Step 2 of 2</h2>
                </div>
            </div>


            <form className="space-y-2 mt-10"> {/* onSubmit={onSubmit} */}

                <div className="flex flex-wrap gap-x-35 px-8 md:p-0">
                    {personalInfoFields.map((field, index) => (
                        <div key={index} className="w-full md:w-[calc(50%-70px)]">
                        <Input
                            label={field.label}
                            inputType={field.type}
                            name={field.name}
                            placeholder={field.placeholder}
                        />
                        </div>
                    ))}
                </div>
            </form>

            <div className="flex justify-center gap-4 md:gap-10 mt-20">
                <button className="min-w-37 text-base font-medium text-[#124096CC] border border-[#124096CC] rounded-lg bg-[#12409633] p-4 cursor-pointer">Back</button>
                <button className="min-w-37 text-base font-medium text-white border border-[#124096CC] rounded-lg bg-[#124096] p-4 cursor-pointer">Submit</button>
            </div>
        </div>
    )
}