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
                Starting a blog was one of the most rewarding things I’ve done in my career. As someone who loves writing and connecting with readers, having an outlet to share my thoughts while potentially helping others has been an incredible experience.

                When I first began blogging a few years ago, I really had no idea what I was doing. I would just sit down at my computer whenever inspiration struck and write whatever came to mind. Sometimes I would publish posts without even proofreading them because I was so eager to get my ideas out there.
                
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