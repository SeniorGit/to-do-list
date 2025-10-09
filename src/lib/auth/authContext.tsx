'use client'

import { AuthResponse, AuthContextType } from "@/types/typeAuth";
import {createContext, ReactNode, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

interface AuthProviderProps {
    children: ReactNode
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        checkAuthStatus();
    }, []);
    
    // check if user login
    const checkAuthStatus = async (): Promise<void> => {
        try{
            // get and check token
            const token = localStorage.getItem('token');
            if(!token){
                setLoading(false);
                return;
            }

            // Sending token
            const response = await fetch('http://localhost:3000/api/auth/me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            // If Ok, data will serve
            if(response.ok){
                const data = await response.json();
                setUser(data.data.user);
            }else{
                localStorage.removeItem('token');
            }

        }catch(error){
            console.error('Auth check failed:', error);
            localStorage.removeItem('token');
        }finally {
            setLoading(false);
        }
    };

    // auth for login
    const login = async (email:string, password:string): Promise<AuthResponse> => {
        try{
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
            });
            const data = await response.json();

            if(data.success){
                localStorage.setItem('token', data.data.token);
                setUser(data.data.user);
                toast.success(data.message)
                return {
                    success: true, 
                    user:data.data.user,
                };
            }else{
                toast.error(data.message );
                return { success:false, message: data.message }
            }

        }catch(error){
            toast.error("Network error. Please try again.");
            return {success: false}
        }
    };


    // auth for register
    const register = async (email:string, password:string, username:string): Promise<AuthResponse> => {
        try{
            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password, username})
            })

            const data = await response.json();
            if (data.success){
                localStorage.setItem('token', data.data.token);
                setUser(data.data.user);
                toast.success(data.message)
                return {success: true, user:data.data.user};
            }else{
                toast.error(data.message)
                return{success:false, message: data.message}
            }
        }catch(error){
            toast.error("Network error. Please try again.");
            return {success: false}
        }
    };

    // auth for logout 
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);

        fetch('http://localhost:3000/api/auth/logout', {
            method: 'POST'
        }).catch(error => {
            console.error('Logout API error:', error);
        });

    };
    
    const value = {
        user, 
        loading, 
        login,
        register, 
        logout, 
        checkAuthStatus
    };
    return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context;
};

export default AuthContext;

