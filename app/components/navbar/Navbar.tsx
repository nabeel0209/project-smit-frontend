"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

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
  brandName = "Learnix Labs",
  isLoggedIn = false,
  onLogout,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  const navLinks: NavLink[] = [
    { name: "Features", href: "#features" },
    { name: "How it Works", href: "#how-it-works" },
    { name: "Contact Us", href: "#contact" },
  ];

  const handleAuthAction = () => {
    setIsOpen(false);
    if (isLoggedIn && onLogout) {
      onLogout();
    } else {
      router.push("/signUp");
    }
  };

  return (
    <>
      <nav
        className={`fixed w-full top-0 left-0 z-100 transition-all duration-300 bg-background/80 backdrop-blur-md border-b border-border-soft ${
          scrolled || isOpen ? "py-3" : "py-4"
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-12 container mx-auto relative">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 z-110">
            <span className="font-semibold text-lg text-text tracking-tight">
              {brandName}
            </span>
          </Link>

          {/* Desktop nav links - centered */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-primary"
                    : "text-text-muted hover:text-text"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {!isLoggedIn && (
              <Link
                href="/login"
                className={`relative py-1 text-sm font-medium transition-colors ${
                  pathname === "/login"
                    ? "text-primary"
                    : "text-text-muted hover:text-text"
                }`}
              >
                Log In
              </Link>
            )}
          </div>

          {/* Right action button */}
          <div className="hidden md:flex items-center z-110">
            <button
              onClick={handleAuthAction}
              className="bg-primary text-black px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-primary-hover transition-colors"
            >
              {isLoggedIn ? "Logout" : "Sign Up"}
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden z-110">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-text p-2"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-80 md:hidden transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile drawer panel */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white z-90 shadow-xl md:hidden transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pt-28 px-8 pb-8 overflow-y-auto">
          <div className="flex flex-col gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-text"
              >
                {link.name}
              </Link>
            ))}

            {!isLoggedIn && (
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-text-muted"
              >
                Log In
              </Link>
            )}

            <button
              onClick={handleAuthAction}
              className="w-full bg-primary text-white py-3.5 rounded-full font-semibold text-base mt-2"
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
