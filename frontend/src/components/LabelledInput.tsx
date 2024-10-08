import { ChangeEvent } from "react"

interface LabelledInputType {
    label : string,
    placeholder : string,
    onChange : (e : ChangeEvent<HTMLInputElement>) => void,
    type? : string
}

export const LabelledInput = ( {label,placeholder,onChange,type} : LabelledInputType )=>{
    return (
        <div className="mt-4">
            <div className="font-bold text-lg">
                {label}
            </div>
            <div>
                <input type={type || "text"} onChange={onChange} placeholder={placeholder} className="w-full border my-1 py-2 px-3 rounded-md text-gray-900" />
            </div>
        </div>
    )
}