import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { SignupInput } from "@subhash_svs/blog-common" 
import { DATABASE_URL } from "../../config"
import axios from "axios"

export const Auth = ({route} : {route:"signup" | "signin"})=>{
    const [userInputs, setUserInputs] = useState<SignupInput>({
        name : '',
        email : '',
        password : ''
    })

    const navigate = useNavigate();
    async function sendRequest() {
        try{
            const response = await axios.post(`${DATABASE_URL}/api/v1/user/${route === "signup" ? "signup" : "signin"}`,
                userInputs
            );
            const jwt = response.data;
            localStorage.setItem('token',jwt);
            navigate('/blogs');

        }catch(e){
            console.log("request error");
        }
    }

    return (
        <div className="h-screen flex justify-center items-center flex-col">
            <div className="flex flex-col">
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
                <LabelledInput label="Username" placeholder="Enter your username" onChange={(e)=>{
                    setUserInputs({
                        ...userInputs,
                        name : e.target.value
                    })
                }} />
                <LabelledInput label="Email" placeholder="xyz@email.com" onChange={(e)=>{
                    setUserInputs({
                        ...userInputs,
                        email : e.target.value
                    })
                }} />
                <LabelledInput type="password" label="Password" placeholder="********" onChange={(e)=>{
                    setUserInputs({
                        ...userInputs,
                        password : e.target.value
                    })
                }} />
                <div className="mt-4">
                    <button onClick={sendRequest} className="text-white bg-black font-bold w-full py-2 rounded ">{route === 'signup'? "Sign Up":"Sign In"}</button>
                </div>
            </div>
        </div>
    )
}

interface LabelledInputType {
    label : string,
    placeholder : string,
    onChange : (e : ChangeEvent<HTMLInputElement>) => void,
    type? : string
}

const LabelledInput = ( {label,placeholder,onChange,type} : LabelledInputType )=>{
    return (
        <div className="mt-4">
            <div className="font-bold text-lg">
                {label}
            </div>
            <div>
                <input type={type || "text"} onChange={onChange} placeholder={placeholder} className="w-full border my-1 py-2 px-3 rounded-md text-gray-900" />
            </div>
        </div>
    )
}