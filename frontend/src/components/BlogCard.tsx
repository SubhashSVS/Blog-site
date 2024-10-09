import { Link } from "react-router-dom"
import { Avatar } from "./Avatar"

interface cardInputs{
    id : string,
    author : string,
    title : string,
    content : string,
    publishedDate : string
}

export const BlogCard = ( {author,title,content,publishedDate,id} : cardInputs )=>{
    return (
        <Link to={`/blog/${id}`}>
            <div className="flex flex-col py-10 border-b-2 mt-5 cursor-pointer">
                <div className="flex text-sm">
                    <Avatar author = {author} size={7}/>
                    <div className="ml-2 pt-1 text-gray-600">
                        <span className="text-black">{author}</span> · {publishedDate}
                    </div>
                </div>
                <div className="py-3 font-bold text-2xl">
                    {title}
                </div>
                <div>
                    { content.slice(0, 150) + "..." }
                </div>
                <div className="mt-8 text-gray-600 text-sm">
                    { `${Math.ceil(content.length / 100)} min read` }
                </div>
            </div>
        </Link>
    )
}

