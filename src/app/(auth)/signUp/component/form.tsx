'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react";
import { useAuth } from "@/lib/auth/authContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function FormSignUp() {
    // to store current input 
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        username: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState<{ [key: string]: string }>({})
    const { register } = useAuth();
    const router = useRouter();

    // handle change input 
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

    // validatio Form signUp
    const validateForm = (): boolean => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.username.trim()) newErrors.username = 'Username is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
        else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Sumbit form to DB
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        setErrors({});
        

        try {
            const result = await register(formData.email, formData.password, formData.username);
            
            if (result.success) {
                // Clear form
                setFormData({
                    email: '',
                    password: '',
                    confirmPassword: '',
                    username: ''
                });
                
                // Redirect to login after 2 seconds
                setTimeout(() => {
                    router.push('/signIn');
                }, 2000);
                
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

                {/* Card Header */}
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">
                        Create Account
                    </CardTitle>
                    <CardDescription className="text-center">
                        Enter your information to create an account
                    </CardDescription>
                </CardHeader>

                {/* Formulir main content */}
                <CardContent className="space-y-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                name="username"
                                type="text"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="john_doe"
                                disabled={isLoading}
                                className={errors.username ? "border-destructive" : ""}
                            />
                            {errors.username && (
                                <p className="text-sm text-destructive">{errors.username}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="john@example.com"
                                disabled={isLoading}
                                className={errors.email ? "border-destructive" : ""}
                            />
                            {errors.email && (
                                <p className="text-sm text-destructive">{errors.email}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                disabled={isLoading}
                                className={errors.password ? "border-destructive" : ""}
                            />
                            {errors.password && (
                                <p className="text-sm text-destructive">{errors.password}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="••••••••"
                                disabled={isLoading}
                                className={errors.confirmPassword ? "border-destructive" : ""}
                            />
                            {errors.confirmPassword && (
                                <p className="text-sm text-destructive">{errors.confirmPassword}</p>
                            )}
                        </div>
                        {/* button submit */}
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Creating Account...
                                </div>
                            ) : (
                                'Create Account'
                            )}
                        </Button>
                    </form>
                    
                    {/* footer */}
                    <div className="text-center text-sm">
                        <p className="text-muted-foreground">
                            Already have an account?{" "}
                            <a href="/signIn" className="text-primary hover:underline font-medium">
                                Sign in
                            </a>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}