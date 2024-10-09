import { useState } from "react"
import { HeaderAuth } from "./HeaderAuth"
import { LabelledInput } from "./LabelledInput"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { DATABASE_URL } from "../../config"
import { SigninInput } from "@subhash_svs/blog-common"

export const SigninAuth = ()=>{
    const [userInputs,setUserInpputs] = useState<SigninInput>({
        email : '',
        password : ''
    })

    const navigate = useNavigate();
    async function sendRequest(){
        try{
            const response = await axios.post(`${DATABASE_URL}/api/v1/user/signin`,userInputs);
            const token = response.data.token;
            localStorage.setItem('token','Bearer '+token);
            navigate('/blogs');
        }catch(e){
            console.log(e);
        }
    }
    return (
        <div className="h-screen flex justify-center items-center flex-col pb-12">
            <div className="flex flex-col">
                <HeaderAuth route={"signin"} />
                <LabelledInput label="Email" placeholder="xyz@email.com" onChange={(e)=>{
                    setUserInpputs({
                        ...userInputs,
                        email : e.target.value
                    })
                }} />
                <LabelledInput type="password" label="Password" placeholder="********" onChange={(e)=>{
                    setUserInpputs({
                        ...userInputs,
                        password : e.target.value
                    })
                }} />
                <div className="mt-4">
                    <button onClick={sendRequest} className="text-white bg-black font-bold w-full py-2 rounded ">Signin</button>
                </div>
            </div>
        </div>
    )
}