'use client';

import React, { useState, useEffect, use } from 'react';
import { Menu, X, Mountain, Search, User, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { ModeToggle } from './mode-toggle';


export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Music', href: '/music' },
    { name: 'Informatics', href: '/informatics' },
  ];

  // Handle scroll effect for border/shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
        className="fixed top-0 z-50 w-full transition-all backdrop-blur-md bg-background/40 text-foreground"
    >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            
            {/* LEFT: Logo */}
            <div className="flex items-center gap-2 cursor-pointer">
                <span className="text-lg font-bold tracking-tight">Elia Doumerc</span>
            </div>

            {/* MIDDLE: Desktop Navigation (Hidden on Mobile) */}
            <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
                <a key={link.name} href={link.href}     
                className="text-sm font-medium hover:text-brand transition-colors"
                >
                {link.name}
                </a>
            ))}
            </nav>

            {/* RIGHT: Actions & Toggles */}
            <div className="flex items-center gap-2">
            
            {/* 1. Always Visible Elements */}
            <ModeToggle />

            {/* 2. Desktop Only Elements (User Profile, CTA) */}
            <div className="hidden md:flex items-center gap-2">
                <Button size="sm" className="hidden lg:flex">
                    Contact
                </Button>
            </div>

            {/* 3. Mobile Menu Toggle (Hidden on Desktop) */}
            <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
            >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
            </div>
        </div>

    {/* MOBILE MENU DRAWER
        Extends downwards when open.
    */}
    {isMobileMenuOpen && (
        <div className="px-4 py-6 md:hidden shadow-lg animate-in slide-in-from-top-5 duration-200">
        <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
            <a 
                key={link.name} 
                href={link.href} 
                className="flex items-center justify-between text-base font-medium hover:text-brand rounded-md p-2 -mx-2 transition-colors"
            >
                {link.name}
                <ArrowRight size={16} className="" />
            </a>
            ))}
            
            <div className="pt-4 mt-4 border-t border-brand flex flex-col gap-3">
            <Button className="w-full">
                Contact
            </Button>
            </div>
        </nav>
        </div>
    )}
    </header>
  )
}