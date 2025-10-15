'use client'

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Smooth Scrolling
function useSmoothScroll() {
  const scrollToSection = (sectionId: string) => {
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 80; 
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100); 
  };

  // Function scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return { scrollToSection, scrollToTop };
}

export default function NavbarLandingSection(){
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { scrollToSection, scrollToTop } = useSmoothScroll();
    
    const dataNavbar = [
        {name:'Features', navId:'features'},
        {name:'Use Cases', navId:'use-cases'},
    ];

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // auto close for mobile and tablet
    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const handleNavClick = (navId: string) => {
        closeMobileMenu();
        scrollToSection(navId);
    };

    // Handle logo click - scroll to top
    const handleLogoClick = (e: React.MouseEvent) => {
        e.preventDefault();
        closeMobileMenu();
        scrollToTop();
    };
    
    return(
        <nav className="bg-gradient-to-r from-amber-400 to-yellow-500 shadow-lg sticky top-0 z-50">
            <div className="max-w-[1440px] mx-auto">
                <div className="flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <button 
                            onClick={handleLogoClick}
                            className="flex items-center hover:opacity-80 transition-opacity duration-200"
                        >
                            <Image 
                                src={'/globe.svg'} 
                                alt="logo" 
                                height={32} 
                                width={32} 
                                className="pr-2"
                            />
                            <h1 className="text-2xl font-bold text-white drop-shadow-sm">
                                TodoApp
                            </h1>
                        </button>
                    </div>
                    
                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-8">
                        <div className="flex space-x-6">
                            {dataNavbar.map(data =>(
                                <button
                                    key={data.navId}
                                    onClick={() => handleNavClick(data.navId)}
                                    className="text-white hover:text-amber-100 font-medium transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-amber-500/30"
                                >
                                    {data.name}
                                </button>
                            ))}
                        </div>
                        
                        <div className="flex items-center space-x-4 ml-6">
                            <Link href={'/signIn'}>
                                <Button 
                                    variant="ghost" 
                                    className="text-white hover:text-amber-900 hover:bg-amber-200 border border-amber-300"
                                >
                                    Sign In
                                </Button>
                            </Link>
                            <Link href={'/signUp'}>
                                <Button className="bg-white text-amber-600 hover:bg-amber-100 font-semibold shadow-md">
                                    Sign Up
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Hamburger Button */}
                    <div className="lg:hidden">
                        <Button 
                            variant="ghost" 
                            className="text-white hover:bg-amber-500/30 p-2 min-w-10 h-10"
                            onClick={toggleMobileMenu}
                        >
                            {isMobileMenuOpen ? (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden animate-in fade-in-80">
                        <div className="bg-amber-500/95 backdrop-blur-sm border-t border-amber-400/50">
                            <div className="space-y-1">
                                {dataNavbar.map(data =>(
                                    <button
                                        key={data.navId}
                                        onClick={() => handleNavClick(data.navId)}
                                        className="text-white block px-6 py-4 text-base font-medium hover:bg-amber-600/50 transition-colors duration-200 border-b border-amber-400/30 last:border-b-0 w-full text-left"
                                    >
                                        {data.name}
                                    </button>
                                ))}
                            </div>
                            
                            <div className="p-4 border-t border-amber-400/50 space-y-3 bg-amber-600/30">
                                <Link href={'/signIn'} className="block" onClick={closeMobileMenu}>
                                    <Button 
                                        variant="ghost" 
                                        className="w-full justify-center text-white hover:bg-amber-600/50 border border-amber-300/50 py-3 text-base"
                                    >
                                        Sign In
                                    </Button>
                                </Link>
                                <Link href={'/signUp'} className="block" onClick={closeMobileMenu}>
                                    <Button 
                                        className="w-full justify-center bg-white text-amber-600 hover:bg-amber-100 font-semibold py-3 text-base"
                                    >
                                        Sign Up
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}