import axios from "axios"
import { BACKEND_URL } from "../../config"
import { useState } from "react"

export const AddBlog = ()=>{
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    return (
        <div className="h-full grid grid-cols-6 pt-14 px-8">
            <div className="col-span-1 items-end">
                <button onClick={()=>{
                    axios.post(`${BACKEND_URL}/api/v1/blog`,{
                        title,
                        content
                    },{
                        headers : {
                            Authorization : localStorage.getItem('token')
                        }
                    });
                }} className="py-1 px-3 bg-green-700 rounded text-white font-medium">
                    Create
                </button>
            </div>
            <div className="col-span-5 mr-5">
                <div>                    
                    <input
                        type="text"
                        placeholder="Title"
                        className="text-4xl mb-3 font-bold focus:outline-none placeholder-gray-300 w-full"
                        onChange={(e)=>{
                            setTitle(e.target.value);
                        }}
                    />
                </div>
                <textarea
                    placeholder="Tell your story..."
                    className="w-full h-64 text-xl focus:outline-none placeholder-gray-300 resize-none"
                    onChange={(e)=>{
                        setContent(e.target.value);
                    }}
                />
            </div>
        </div>
    )
}