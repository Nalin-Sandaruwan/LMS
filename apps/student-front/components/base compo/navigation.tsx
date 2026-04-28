"use client"
import * as React from 'react';
import { Logo } from './Logo';
import { ModeToggle } from '../ui/dark.mood';
import { motion } from 'framer-motion';
import { usePathname } from "next/navigation";

// Sub-components
import { NavLinks } from './nav-components/NavLinks';
import { UserMenu } from './nav-components/UserMenu';
import { MobileMenu } from './nav-components/MobileMenu';

const navItems = [
    { name: "Homes", href: "/" },
    { name: "All Courses", href: "/all-cource" },
    { name: "Pricing", href: "/plans" },
    { name: "About us", href: "/about_us" },
];

export function Navigation() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className='absolute top-0 w-full z-50 page-margin'>
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
                className='flex w-full h-16 container mx-auto border border-gray-200 dark:border-gray-800 items-center rounded-full justify-between px-6 md:px-10 backdrop-blur-xl mt-5 bg-white/40 dark:bg-gray-950/40 shadow-sm relative z-50'
            >
                {/* Logo Section */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer shrink-0"
                >
                    <Logo className='w-[110px] md:w-[150px] h-auto transition-all' />
                </motion.div>

                {/* Desktop Navigation Links */}
                <NavLinks items={navItems} pathname={pathname} />

                {/* Actions & Mobile Menu Toggle */}
                <div className='flex justify-end items-center gap-3 md:gap-4 shrink-0'>
                    <ModeToggle />

                    {/* Desktop User Menu */}
                    <UserMenu pathname={pathname} />

                    {/* Mobile Hamburger Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </motion.div>

            {/* Mobile Navigation Overlay */}
            <MobileMenu
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                navItems={navItems}
                pathname={pathname}
            />
        </div>
    );
}
