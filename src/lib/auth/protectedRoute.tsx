'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/authContext";

interface ProtectedRoute {
    children: React.ReactNode;
}

// Protected from Unauthorized 
export default function ProtectedRoute({children}: ProtectedRoute){
    const {user, loading} = useAuth();
    const router = useRouter();

    useEffect(()=>{
        if(!loading && !user){
            router.push('/signIn');
        }
    }, [user, loading, router]);

    if(loading){
        return(
            <div className="loading-container">
                <div className="loading-spinner">Loading...</div>
            </div>
        );
    }

    if(!user){
        return null;
    }

    return <>{children}</>
}