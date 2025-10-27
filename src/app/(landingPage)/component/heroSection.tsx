'use client'

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection(){
    return(
        <section className="bg-gradient-to-br from-amber-50 to-yellow-100 min-h-screen flex items-center overflow-hidden pt-4 lg:pt-0"> 
            {/* Main container */}
            <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Text Content  */}
                    <div className="space-y-6 lg:space-y-8 text-center lg:text-left order-1 lg:order-1">
                        {/* Headline */}
                        <div className="space-y-4 lg:space-y-6">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-gray-900 leading-tight">
                                Task Management
                                <span className="block text-amber-600 mt-1 lg:mt-2">
                                    Made Simple
                                </span>
                            </h1>
                            
                            {/* Description */}
                            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                                The modern todo app that helps you focus on what  
                                matters most. Create, organize, and track your
                                tasks effortlessly across all devices.
                            </p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                            <Link href="/signUp" className="flex justify-center lg:justify-start">
                                <Button 
                                    size="lg" 
                                    className="bg-amber-500 hover:bg-amber-600 text-white font-semibold text-base sm:text-lg w-full sm:w-auto px-6 sm:px-8 py-4 sm:py-6 h-auto shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    Start Free Today
                                </Button>
                            </Link>
                            <Link href="#features" className="flex justify-center lg:justify-start">
                                <Button 
                                    variant="outline" 
                                    size="lg"
                                    className="border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white font-semibold text-base sm:text-lg w-full sm:w-auto px-6 sm:px-8 py-4 sm:py-6 h-auto transition-all duration-300"
                                >
                                    See How It Works
                                </Button>
                            </Link>
                        </div>

                        {/* Additional Info */}
                        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 lg:gap-6 justify-center lg:justify-start text-xs sm:text-sm text-gray-500">
                            <div className="flex items-center gap-2 justify-center lg:justify-start">
                                <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                                <span>No credit card required</span>
                            </div>
                            <div className="flex items-center gap-2 justify-center lg:justify-start">
                                <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                                <span>Setup in 2 minutes</span>
                            </div>
                            <div className="flex items-center gap-2 justify-center lg:justify-start">
                                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                                <span>Free forever</span>
                            </div>
                        </div>
                    </div>

                    {/* Image Content  */}
                    <div className="relative flex justify-center order-2 lg:order-2 mb-4 lg:mb-0 pt-4"> 
                        <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
                            {/* Background Decoration */}
                            <div className="absolute -inset-2 sm:-inset-3 lg:-inset-4 bg-gradient-to-r from-amber-200 to-yellow-300 rounded-2xl lg:rounded-3xl transform rotate-3 opacity-20"></div>
                            <div className="absolute -inset-2 sm:-inset-3 lg:-inset-4 bg-gradient-to-r from-amber-300 to-yellow-400 rounded-2xl lg:rounded-3xl transform -rotate-3 opacity-20"></div>
                            
                            {/* Image Container */}
                            <div className="relative bg-white rounded-xl lg:rounded-2xl shadow-lg lg:shadow-2xl p-4 sm:p-6 lg:p-8 border border-amber-200">
                                <div className="bg-gradient-to-br from-amber-100 to-yellow-200 rounded-lg lg:rounded-xl flex items-center justify-center overflow-hidden">
                                    <div className="w-full h-0 pb-[73.8%] relative">
                                        <Image 
                                            src={'/assets/img/Mockup.png'} 
                                            alt="Todo App Mockup" 
                                            fill
                                            className="object-contain"
                                            sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, (max-width: 1024px) 400px, 1080px"
                                            priority
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background decorative elements */}
            <div className="absolute bottom-10 left-5 w-20 h-20 bg-amber-300/20 rounded-full blur-xl hidden sm:block"></div>
            <div className="absolute top-10 right-5 w-16 h-16 bg-yellow-300/20 rounded-full blur-lg hidden sm:block"></div>
        </section>
    )
}