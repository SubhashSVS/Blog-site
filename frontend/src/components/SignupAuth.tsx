import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { SignupInput } from "@subhash_svs/blog-common" 
import { DATABASE_URL } from "../../config"
import axios from "axios"
import { LabelledInput } from "./LabelledInput"
import { HeaderAuth } from "./HeaderAuth"

export const SignupAuth = ()=>{
    const [userInputs, setUserInputs] = useState<SignupInput>({
        name : '',
        email : '',
        password : ''
    })

    const navigate = useNavigate();

    async function sendRequest() {
        try{
            const response = await axios.post(`${DATABASE_URL}/api/v1/user/signup`,userInputs);
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
                <HeaderAuth route={"signup"} />            
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
                    <button onClick={sendRequest} className="text-white bg-black font-bold w-full py-2 rounded ">Signup</button>
                </div>
            </div>
        </div>
    )
}



