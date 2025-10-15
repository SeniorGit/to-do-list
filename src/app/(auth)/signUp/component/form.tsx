'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { useAuth } from "@/lib/auth/authContext";
import { Loader2 } from "lucide-react";

interface FormSignUpProps {
    onSuccess: () => void;
}

export function FormSignUp({ onSuccess }: FormSignUpProps) {
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

    // validation Form signUp
    const validateForm = (): boolean => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.username.trim()) newErrors.username = 'Username is required';
        else if (formData.username.length < 3) newErrors.username = 'Username must be at least 3 characters';
        
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        
        if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
        else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Submit form to DB
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        setErrors({});

        try {
            const result = await register(formData.email, formData.password, formData.username);
            
            if (result.success) {
                setFormData({
                    email: '',
                    password: '',
                    confirmPassword: '',
                    username: ''
                });
    
                onSuccess();
            } 
        } catch (error) {
            console.error(error);
            setErrors({ submit: 'Registration failed. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username Field */}
            <div className="space-y-3">
                <Label htmlFor="username" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                    Username
                </Label>
                <Input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="john_doe"
                    disabled={isLoading}
                    className={`h-12 transition-all duration-200 ${
                        errors.username 
                        ? "border-destructive focus:border-destructive border-2" 
                        : "border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                    }`}
                />
                {errors.username && (
                    <p className="text-sm text-destructive animate-in fade-in flex items-center gap-2">
                        <span>⚠️</span>
                        {errors.username}
                    </p>
                )}
            </div>

            {/* Email Field */}
            <div className="space-y-3">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
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
                    className={`h-12 transition-all duration-200 ${
                        errors.email 
                        ? "border-destructive focus:border-destructive border-2" 
                        : "border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                    }`}
                />
                {errors.email && (
                    <p className="text-sm text-destructive animate-in fade-in flex items-center gap-2">
                        <span>⚠️</span>
                        {errors.email}
                    </p>
                )}
            </div>

            {/* Password Field */}
            <div className="space-y-3">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                    Password
                </Label>
                <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    disabled={isLoading}
                    className={`h-12 transition-all duration-200 ${
                        errors.password 
                        ? "border-destructive focus:border-destructive border-2" 
                        : "border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                    }`}
                />
                {errors.password && (
                    <p className="text-sm text-destructive animate-in fade-in flex items-center gap-2">
                        <span>⚠️</span>
                        {errors.password}
                    </p>
                )}
                <p className="text-xs text-gray-500 flex items-center gap-1">
                    <span>💡</span>
                    Must be at least 6 characters
                </p>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-3">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                    Confirm Password
                </Label>
                <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    disabled={isLoading}
                    className={`h-12 transition-all duration-200 ${
                        errors.confirmPassword 
                        ? "border-destructive focus:border-destructive border-2" 
                        : "border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                    }`}
                />
                {errors.confirmPassword && (
                    <p className="text-sm text-destructive animate-in fade-in flex items-center gap-2">
                        <span>⚠️</span>
                        {errors.confirmPassword}
                    </p>
                )}
            </div>

            {/* Submit Error */}
            {errors.submit && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <p className="text-sm text-destructive text-center flex items-center justify-center gap-2">
                        <span>❌</span>
                        {errors.submit}
                    </p>
                </div>
            )}

            {/* Submit Button */}
            <Button 
                type="submit" 
                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]" 
                disabled={isLoading}
            >
                {isLoading ? (
                    <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating Account...
                    </>
                ) : (
                    <>
                        <span className="mr-2">🎯</span>
                        Create Account
                    </>
                )}
            </Button>
        </form>
    )
}