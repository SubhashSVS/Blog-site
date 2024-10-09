import { Avatar } from "./Avatar"

export const AppBar = ()=>{
    return (
        <div className="flex justify-between w-full border-b-2 border-slate-100 py-5 px-12">
            <div className="font-bold text-2xl">
                Blog-Site
            </div>
            <div>
                <Avatar author='Subhash' size={9} />
            </div>
        </div>
    )
}