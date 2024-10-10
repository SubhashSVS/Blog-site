import { useParams } from "react-router-dom";
import { FullBlog } from "../components/FullBlog";
import { useBlog } from "../hooks"
import { AppBar } from "../components/AppBar";
import { Spinner } from "../components/Spinner";

export const Blog = () => {
    const {id} = useParams();
    const {loading,blog} = useBlog({
        id : id || ""
    });

    if(loading || !blog){
        return (<div> 
                    <Spinner />
                </div>)
    }

    return ( 
        <div>
            <AppBar />
            <FullBlog blog={blog} />
        </div>
    )
}