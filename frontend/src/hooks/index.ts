import { useEffect, useState } from "react"
import axios from 'axios'
import { DATABASE_URL } from "../../config";

interface Blog{
    id: string,
    title: string,
    content: string,
    author: {
        name: string
    }
}

export const useBlogs = ()=>{
    const [loading,setLoading] = useState(true);
    const [blogs,setBlogs] = useState<Blog[]>([]);

    useEffect(()=>{
        axios.get(`${DATABASE_URL}/api/v1/blog/bulk`,{
            headers : {
                Authorization : localStorage.getItem('token')
            }
        })
        .then(response => {
            setBlogs(response.data.blogs);
            setLoading(false);
        })
    },[]);

    return ({
        loading,
        blogs
    })
}