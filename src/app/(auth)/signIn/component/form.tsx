'use client'

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import Link from "next/link";
import { useAuth } from "@/lib/auth/authContext";
import { toast } from "sonner"

export function FormSignIn() {
    // store current input
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState<{ [key: string]: string }>({})
    const { login } = useAuth();
    const router = useRouter();

    // to change realtime in input 
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    // validation
    const validateForm = (): boolean => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.password) newErrors.password = 'Password is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // handle for submiting
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        setErrors({});

        try {
            const result = await login(formData.email, formData.password);
            if (result.success) {
                router.push('/dashboard');
            } 
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <Card className="w-full max-w-md shadow-lg">

                {/* Header */}
                <CardHeader className="space-y-1 pb-6">
                    <div className="flex justify-center mb-4">
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-lg">T</span>
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold text-center text-gray-900">
                        Sign In
                    </CardTitle>
                    <CardDescription className="text-center text-gray-600">
                        Enter your email and password to access your account
                    </CardDescription>
                </CardHeader>
                
                {/* Formulir SignIn main content */}
                <CardContent className="space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-3">
                            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                Email Address
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                disabled={isLoading}
                                className={`h-11 ${errors.email ? "border-destructive focus:border-destructive" : ""}`}
                            />
                            {errors.email && (
                                <p className="text-sm text-destructive animate-in fade-in">{errors.email}</p>
                            )}
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                                    Password
                                </Label>
                                <Link 
                                    href="/forgot-password" 
                                    className="text-sm text-primary hover:text-primary/80 transition-colors"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                disabled={isLoading}
                                className={`h-11 ${errors.password ? "border-destructive focus:border-destructive" : ""}`}
                            />
                            {errors.password && (
                                <p className="text-sm text-destructive animate-in fade-in">{errors.password}</p>
                            )}
                        </div>

                        {/* button sumbit */}
                        <Button 
                            type="submit" 
                            className="w-full h-11 text-base font-medium" 
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </Button>
                    </form>
                    
                    {/* footer */}
                    <div className="text-center pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                            Dont have an account?{" "}
                            <Link 
                                href="/signUp" 
                                className="font-semibold text-primary hover:text-primary/80 transition-colors"
                            >
                                Create account
                            </Link>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}