import { Link } from "react-router-dom"

export const HeaderAuth = ({route} : {route:"signup" | "signin"})=>{
    return (
        <div className="flex flex-col items-center px-10">
            <div className="text-3xl font-extrabold my-2">
                {route === "signup" ? "Create an account" : "Login to your account" }
            </div>
            <div className="text-md text-gray-500">
                {route === "signup" ? "Already have an account?" : "Don't have an account?" } 
                <Link to={route === "signup" ? "/signin" : "/signup"} className="underline pl-1">
                    {route == "signup" ? "Login" : "Sign Up"}
                </Link>
            </div>
        </div>    
    )
}