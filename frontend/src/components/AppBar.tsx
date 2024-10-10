import { Link } from "react-router-dom"
import { Avatar } from "./Avatar"

export const AppBar = ()=>{
    const name = localStorage.getItem('name') || 'Anonymous';
    return (
        <div className="flex justify-between w-full border-b-2 border-slate-100 py-5 px-12">
            <Link to='/blogs'>
                <div className="font-extrabold text-2xl">
                    Blog-Site
                </div>
            </Link>
            <div className="flex">
                <Link to='/publish' >
                    <button className="bg-green-700 rounded-full mr-6 mt-0.5 py-1 px-4 text-white font-medium">
                        Publish
                    </button>
                </Link>

                <Avatar author={name} size={9} />
            </div>
        </div>
    )
}