'use client';

import React, { useState } from 'react';
import { Menu, X, ArrowRight, Contact } from 'lucide-react';
import { Button } from './ui/button';
import { ModeToggle } from './mode-toggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useTranslations } from 'next-intl';
import { Link } from "@/i18n/routing";
import ContactDialog from './ContactDialog';
import ContactLinks from './ContactLinks';

export default function Header() {
  const t = useTranslations('Navigation');

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: t('home'), href: '/' },
    { name: t('about'), href: '/about' },
    { name: t('music'), href: '/music' },
    { name: t('informatics'), href: '/cs' },
  ];

  return (
    <header 
        className="fixed top-0 z-50 w-full transition-all backdrop-blur-md bg-background/40 text-foreground"
    >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            
            {/* LEFT: Logo */}
            <div className="flex items-center gap-2 cursor-pointer">
                <Link href="/" className="text-lg font-bold tracking-tight">Elia Doumerc</Link>
            </div>

            {/* MIDDLE: Desktop Navigation (Hidden on Mobile) */}
            <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
                <Link key={link.name} href={link.href}     
                className="text-sm font-medium hover:text-brand transition-colors"
                >
                {link.name}
                </Link>
            ))}
            </nav>

            {/* RIGHT: Actions & Toggles */}
            <div className="flex items-center gap-2">
            
                {/* 1. Always Visible Elements */}
                <ModeToggle />
                <LanguageSwitcher />

                {/* 2. Desktop Only Elements (User Profile, CTA) */}
                <div className="hidden md:flex items-center gap-2">
                    <ContactDialog />
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
                <Link 
                    key={link.name} 
                    href={link.href} 
                    className="flex items-center justify-between text-base font-medium hover:text-brand rounded-md p-2 -mx-2 transition-colors"
                >
                    {link.name}
                    <ArrowRight size={16} className="" />
                </Link>
                ))}
                
                <ContactLinks />
            </nav>
        </div>
    )}
    </header>
  )
}