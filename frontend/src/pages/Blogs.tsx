import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks"

export const Blogs = ()=>{
    const {loading,blogs} = useBlogs();

    if(loading){
        return <div>
            loading ...
        </div>
    }

    return (
        <div>
            <AppBar />
            <div className="flex justify-center">
                <div className="max-w-[60%]">
                    {blogs.map(blog => 
                        <BlogCard 
                            id={blog.id}
                            author={blog.author.name}
                            title={blog.title}
                            content={blog.content} 
                            publishedDate="Oct 9, 2024"
                        />
                    )}                    
                </div>
            </div>
        </div>
    )
}