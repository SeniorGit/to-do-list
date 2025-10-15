'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { FormSignUp } from "./form";
import { useState } from "react";

export function SignUpCard() {
    const router = useRouter();
    const [isSuccess, setIsSuccess] = useState(false);

    const handleBackToLanding = () => {
        router.push('/');
    };

    const handleSuccess = () => {
        setIsSuccess(true);
        setTimeout(() => {
            router.push('/signIn');
        }, 5000);
    };

    // Success State 
    if (isSuccess) {
        return (
            <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm text-center">
                <CardContent className="pt-8 pb-8">
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                            <CheckCircle className="w-10 h-10 text-white" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Account Created Successfully! 🎉</h2>
                    <p className="text-gray-600 mb-6">
                        Welcome to TodoApp! Redirecting you to sign in...
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full animate-pulse"></div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm relative p-0 pb-8"> 
            {/* Header */}
            <CardHeader className="space-y-1 pb-6 pt-5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-t-lg relative"> 
                <Button
                    variant="ghost"
                    onClick={handleBackToLanding}
                    className="absolute top-4 left-4 text-white hover:text-amber-100 hover:bg-white/20 transition-colors z-10"
                    size="sm"
                >
                    <ArrowLeft className="w-4 h-4" />
                </Button>
                <CardTitle className="text-2xl font-bold text-center">
                    Join TodoApp!
                </CardTitle>
                <CardDescription className="text-center text-amber-100">
                    Start your productivity journey today
                </CardDescription>
            </CardHeader>

            {/* Formulir main content */}
            <CardContent className="space-y-6 pt-8">
                <FormSignUp onSuccess={handleSuccess}/>
                
                {/* Footer */}
                <div className="text-center pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link 
                            href="/signIn" 
                            className="font-semibold text-amber-600 hover:text-amber-700 transition-colors underline underline-offset-4"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}