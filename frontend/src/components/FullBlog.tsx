import { Avatar } from "./Avatar"

interface Blog{
    id : string,
    title : string,
    content : string,
    author : {
        name : string
    }
}

export const FullBlog = ({blog}:{blog : Blog})=>{
    return(
        <div className="grid grid-cols-4 pt-20">
            <div className="col-span-3 px-8 md:px-8 lg:px-32">
                <div className="font-extrabold text-5xl">
                    {blog.title}
                </div>
                <div className="text-gray-500 text-sm mt-4">
                    Posted on October 10, 2024
                </div>
                <div className="mt-4">
                    {blog.content}                
                </div>
            </div>
            <div className="col-span-1">
                <div className="font-medium">Author</div>
                <div className="flex mt-2">
                    <Avatar author={blog.author.name} size={7}/>
                    <div className="font-semibold text-2xl ml-3">{blog.author.name}</div>
                </div>
            </div>
        </div>
    )
}