import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { FormSignIn } from "./form"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function SignInCard() {
    const router = useRouter();
    
    const handleBackToLanding = () => {
        router.push('/');
    };
    
    return (
        <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm relative p-0 pb-8"> 
            
            <CardHeader className="space-y-1 pb-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-t-lg relative"> 
                {/* Back Button  */}
                <Button
                    variant="ghost"
                    onClick={handleBackToLanding}
                    className="absolute top-4 left-4 text-white hover:text-amber-100 hover:bg-white/20 transition-colors z-10"
                    size="sm"
                >
                    <ArrowLeft className="w-4 h-4" />
                </Button>
                
                <CardTitle className="text-2xl font-bold text-center mt-2"> 
                    Welcome Back!
                </CardTitle>
                <CardDescription className="text-center text-amber-100">
                    Sign in to continue your productivity journey
                </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
                {/* Sign Form */}
                <FormSignIn/>
                                    
                {/* Footer */}
                <div className="text-center pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                        Don t have an account?{" "}
                        <Link 
                            href="/signUp" 
                            className="font-semibold text-amber-600 hover:text-amber-700 transition-colors underline underline-offset-4"
                        >
                            Create account
                        </Link>
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}