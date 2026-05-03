"use client"
import * as React from 'react';
import { Logo } from './Logo';
import { ModeToggle } from '../ui/dark.mood';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { usePathname } from "next/navigation";

// Sub-components
import { NavLinks } from './nav-components/NavLinks';
import { UserMenu } from './nav-components/UserMenu';
import { MobileMenu } from './nav-components/MobileMenu';

const navItems = [
    { name: "Home ", href: "/" },
    { name: "All Courses", href: "/all-cource" },
    { name: "Pricing", href: "/plans" },
    { name: "About us", href: "/about_us" },
];

export function Navigation() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = React.useState(false);
    const [isHidden, setIsHidden] = React.useState(false);
    const [isAtTop, setIsAtTop] = React.useState(true);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        // Check if we are at the very top of the page
        setIsAtTop(latest < 20);

        const previous = scrollY.getPrevious() ?? 0;
        // If scrolling down and scrolled past 100px, hide the nav
        if (latest > previous && latest > 100) {
            setIsHidden(true);
        } else if (latest < previous) {
            // If scrolling up, show the nav
            setIsHidden(false);
        }
    });

    return (
        <div className='fixed top-0 left-0 w-full z-50 page-margin pointer-events-none'>
            <motion.div
                variants={{
                    visible: { y: 0, opacity: 1 },
                    hidden: { y: "-150%", opacity: 0 }
                }}
                initial="visible"
                animate={isHidden ? "hidden" : "visible"}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={`flex w-full h-16 container mx-auto items-center rounded-full justify-between px-6 md:px-10 mt-5 relative z-50 pointer-events-auto transition-all duration-300 ${
                    isAtTop 
                        ? 'bg-transparent border-transparent shadow-none' 
                        : 'border border-gray-200 dark:border-gray-800 backdrop-blur-xl bg-white/40 dark:bg-gray-950/40 shadow-sm'
                }`}
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
