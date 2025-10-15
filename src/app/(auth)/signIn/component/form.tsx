import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import Link from "next/link";
import { useAuth } from "@/lib/auth/authContext";

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
        <form onSubmit={handleSubmit} className="space-y-5">
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
                <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                        Password
                    </Label>
                    <Link 
                        href="/forgot-password" 
                        className="text-sm text-amber-600 hover:text-amber-700 transition-colors font-medium"
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
            </div>

            {/* Submit Button */}
            <Button 
                type="submit" 
                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]" 
                disabled={isLoading}
            >
                {isLoading ? (
                    <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Signing in...
                    </>
                ) : (
                    <>
                        <span className="mr-2">🚀</span>
                        Sign In
                    </>
                )}
            </Button>
        </form>       
    )
}