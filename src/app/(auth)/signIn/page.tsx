'use client'
import { SignInCard } from "./component/card";


export default function SignUpPage(){
    return(
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 p-4">
            <SignInCard/>
            <div className="absolute top-10 left-10 w-20 h-20 bg-amber-300/20 rounded-full blur-xl"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-orange-300/20 rounded-full blur-xl"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-yellow-300/20 rounded-full blur-lg"></div>
        </div>
    )
}