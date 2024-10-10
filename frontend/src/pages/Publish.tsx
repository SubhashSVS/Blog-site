import { AddBlog } from "../components/AddBlog"
import { AppBar } from "../components/AppBar"

export const Publish = ()=>{
    return (
        <div className="h-screen">
            <AppBar />
            <AddBlog />
        </div>
    )
}