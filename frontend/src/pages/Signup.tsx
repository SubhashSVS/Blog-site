import { Quote } from "../components/Quote"
import { SignupAuth } from "../components/SignupAuth"

export const Signup = ()=>{
    return ( <>
        <div>
            <div className="grid lg:grid-cols-2">
                <div>
                    <SignupAuth />
                </div>
                <div className="hidden lg:block">
                    <Quote />
                </div>
            </div>
        </div>
    </> )
}