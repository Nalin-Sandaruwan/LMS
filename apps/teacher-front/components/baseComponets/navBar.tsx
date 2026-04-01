"use client"
import * as React from 'react';
import Logo from "@/public/icons/logo.svg";
import Image from "next/image";
import { Button } from '../ui/button';
import { ModeToggle } from '@/components/ui/dark.mood';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface IAppProps { }

const navItems = [
    { name: "Home", href: "/" },
    { name: "Your Courses", href: "/your-courses" },
    { name: "Profile", href: "/profile" },
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
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer shrink-0"
                >
                    <Image src={Logo} alt="Logo" className='w-[80px] h-auto m-1' />
                </motion.div>

                {/* Desktop Navigation Links */}
                <div className='hidden md:flex flex-1 justify-center gap-8 lg:gap-12 flex-row text-gray-900 dark:text-white font-medium'>
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;

                        return (
                            <Link key={item.name} href={item.href} className="relative">
                                <motion.p
                                    className={`text-md cursor-pointer transition-colors ${isActive
                                        ? 'text-green-600 dark:text-green-400 font-bold'
                                        : 'hover:text-green-600 dark:hover:text-green-400'
                                        }`}
                                    whileHover={{ y: -2 }}
                                    whileTap={{ y: 0 }}
                                >
                                    {item.name}
                                </motion.p>
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-green-600 dark:bg-green-400 rounded-full"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* Desktop Actions & Mobile Menu Toggle */}
                <div className='flex justify-end items-center gap-3 md:gap-4 shrink-0'>
                    <ModeToggle />

                    {/* Desktop Only Actions */}
                    <div className="hidden md:flex gap-4 items-center">
                        <Link href="/login">
                            <Button variant="default" size="lg"> Login </Button>
                        </Link>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar className="cursor-pointer border-2 border-transparent hover:border-green-500 transition-colors">
                                    <AvatarFallback className='bg-green-300 border border-green-700 text-green-700 font-bold'>CN</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 p-2 rounded-xl border border-gray-200 dark:border-gray-800 shadow-xl bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl mt-2 z-50">
                                <div className="flex flex-col p-2 border-b border-gray-100 dark:border-gray-800 mb-2">
                                    <span className="font-bold text-sm text-gray-900 dark:text-white">Guest User</span>
                                    <span className="text-xs text-gray-500">guest@example.com</span>
                                </div>
                                <div className="flex flex-col space-y-1">
                                    <Button asChild variant="ghost" className="w-full justify-start h-9 text-sm focus:ring-0">
                                        <Link href="/profile/your-profile">Profile</Link>
                                    </Button>

                                    <div className="h-px bg-gray-100 dark:bg-gray-800 my-1" />
                                    <Button variant="ghost" className="w-full justify-start h-9 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30 focus:ring-0">Logout</Button>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

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

            {/* Mobile Navigation Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0, y: -20 }}
                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="md:hidden absolute top-[85px] left-0 w-full px-4 overflow-hidden z-40"
                    >
                        <div className="bg-white/95 dark:bg-gray-950/95 backdrop-blur-3xl border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-2xl flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                {navItems.map((item, idx) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link key={item.name} href={item.href} onClick={() => setIsOpen(false)}>
                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.1 + idx * 0.05 }}
                                                className={`text-lg font-bold px-4 py-3 rounded-2xl transition-colors ${isActive
                                                    ? 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                                                    : 'text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900'
                                                    }`}
                                            >
                                                {item.name}
                                            </motion.div>
                                        </Link>
                                    );
                                })}
                            </div>

                            <div className="h-px w-full bg-gray-200 dark:bg-gray-800" />

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="flex items-center gap-4 px-4"
                            >
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Avatar className="h-12 w-12 cursor-pointer border-2 border-white dark:border-gray-800 shadow-sm hover:border-green-500 transition-colors">
                                            <AvatarFallback className='bg-green-300 border border-green-700 text-green-700 font-bold'>CN</AvatarFallback>
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent side="top" align="start" className="w-56 p-2 rounded-xl border border-gray-200 dark:border-gray-800 shadow-2xl bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl mb-4 z-50">
                                        <div className="flex flex-col space-y-1">
                                            <Button asChild variant="ghost" className="w-full justify-start h-9 text-sm focus:ring-0">
                                                <Link href="/profile/your-profile" onClick={() => setIsOpen(false)}>Profile</Link>
                                            </Button>
                                            <div className="h-px bg-gray-100 dark:bg-gray-800 my-1" />
                                            <Button variant="ghost" className="w-full justify-start h-9 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30 focus:ring-0">Logout</Button>
                                        </div>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-gray-900 dark:text-white">Guest User</span>
                                    <span className="text-xs text-green-600 dark:text-green-400 font-medium">Click to login</span>
                                </div>
                                <Link href="/login" onClick={() => setIsOpen(false)} className="ml-auto">
                                    <Button variant="default" className="px-6 shadow-md shadow-green-500/20"> Login </Button>
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
