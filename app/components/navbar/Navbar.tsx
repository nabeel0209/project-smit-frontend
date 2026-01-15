"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';

interface NavLink {
  name: string;
  href: string;
}

interface NavbarProps {
  brandName?: string;
  isLoggedIn?: boolean; 
  onLogout?: () => void; 
}

const Navbar: React.FC<NavbarProps> = ({ 
  brandName = "BrandName",
  isLoggedIn = false, 
  onLogout 
}) => {
  const pathname = usePathname();
  const router = useRouter(); 
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const navLinks: NavLink[] = [
    { name: 'Features', href: '#features' },
    { name: 'How it Works', href: '#how-it-works' },
    { name: 'Pricing', href: '#pricing' },
  ];

  const handleAuthAction = () => {
    setIsOpen(false);
    if (isLoggedIn && onLogout) {
      onLogout();
    } else {
      router.push('/signup');
    }
  };

  return (
    <>
      {/* --- MAIN NAVBAR --- */}
      <nav className={`fixed w-full top-0 left-0 z-[100] transition-all duration-300 ${
        scrolled || isOpen ? "bg-white shadow-sm py-3" : "bg-white py-5"
      } border-b border-[#D1FAE5]`}>
        <div className="flex items-center justify-between px-6 md:px-12 max-w-7xl mx-auto relative">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 group z-[110]">
            <span className="font-bold text-xl text-[#064E3B] tracking-tight">{brandName}</span>
          </Link>

          {/* Desktop Navigation - CENTERED (Now including Log In) */}
          <div className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className={`group relative py-1 font-bold transition-colors ${
                  pathname === link.href ? "text-[#10B981]" : "text-[#64748B] hover:text-[#064E3B]"
                }`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2.5px] bg-[#10B981] transition-all duration-300 ${
                  pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                }`}></span>
              </Link>
            ))}

            {/* Log In Moved here next to Pricing */}
            {!isLoggedIn && (
              <Link 
                href="/login" 
                className={`group relative py-1 font-bold transition-colors ${
                  pathname === '/login' ? "text-[#10B981]" : "text-[#64748B] hover:text-[#064E3B]"
                }`}
              >
                Log In
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2.5px] bg-[#10B981] transition-all duration-300 ${
                  pathname === '/login' ? "w-full" : "w-0 group-hover:w-full"
                }`}></span>
              </Link>
            )}
          </div>

          {/* Right Section - Main Action Button Only */}
          <div className="hidden md:flex items-center z-[110]">
            <button 
              onClick={handleAuthAction}
              className="bg-[#10B981] text-white px-8 py-2.5 rounded-full font-bold hover:bg-[#059669] transition-all shadow-lg active:scale-95"
            >
              {isLoggedIn ? "Logout" : "Sign Up"}
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden z-[110]">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-[#064E3B] p-2"
            >
              {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </nav>

      {/* --- MOBILE DRAWER SYSTEM --- */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[80] md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <div className={`fixed top-0 right-0 h-full w-[300px] bg-white z-[90] shadow-2xl md:hidden transition-transform duration-300 ease-in-out transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}>
        <div className="flex flex-col h-full pt-28 px-8 pb-8 overflow-y-auto">
          <div className="flex flex-col gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                onClick={() => setIsOpen(false)} 
                className="text-2xl font-bold text-[#064E3B]"
              >
                {link.name}
              </Link>
            ))}
            
            {!isLoggedIn && (
              <Link 
                href="/login" 
                onClick={() => setIsOpen(false)}
                className="text-2xl font-bold text-[#64748B]"
              >
                Log In
              </Link>
            )}

            {/* <div className="h-[1px] bg-slate-100 w-full" /> */}

            <button 
              onClick={handleAuthAction} 
              className="w-full bg-[#10B981] text-white py-4 rounded-2xl font-bold text-xl shadow-xl mt-4"
            >
              {isLoggedIn ? "Logout" : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;