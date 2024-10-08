import { Quote } from "../components/Quote"
import { Auth } from "../components/Auth"

export const Signup = ()=>{
    return ( <>
        <div>
            <div className="grid lg:grid-cols-2">
                <div>
                    <Auth route="signup"/>
                </div>
                <div className="hidden lg:block">
                    <Quote />
                </div>
            </div>
        </div>
    </> )
}