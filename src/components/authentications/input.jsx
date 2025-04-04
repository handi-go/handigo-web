// input.jsx

function Input({ label, inputType, name, placeholder, required }){
    return (
        <div className="flex flex-col gap-[0.5rem] md:gap-2 mb-6">
            <label className="text-base md:text-xl text-[#212121]" htmlFor={name}>{label} <span className="text-[#C80D0D]">{required ? "*" : ""}</span></label>
            <input type={inputType} placeholder={placeholder} required={required} className="text-base font-semibold text-[#C8BCCE] border rounded-[0.625rem] border-gray-100 px-[0.625rem] py-4 md:py-5"/>
        </div>
    )
}

export default Input