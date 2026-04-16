"use client";

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useAuth, useLogout } from '@/app/hooks/api hooks/useAuth';
import { toast } from 'sonner';

interface NavItem {
    name: string;
    href: string;
}

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    navItems: NavItem[];
    pathname: string;
}

export function MobileMenu({
    isOpen,
    onClose,
    navItems,
    pathname
}: MobileMenuProps) {
    const { data: user, isLoading } = useAuth();
    const logoutMutation = useLogout();

    const handleLogout = () => {
        logoutMutation.mutate(undefined, {
            onSuccess: () => {
                toast.success('Logged out successfully');
                onClose();
            },
            onError: () => {
                toast.error('Failed to logout');
            }
        });
    };

    return (
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
                                    <Link key={item.name} href={item.href} onClick={onClose}>
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 + idx * 0.05 }}
                                            className={`text-lg font-bold px-4 py-3 rounded-2xl transition-colors ${isActive
                                                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
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
                                    <Avatar className="h-12 w-12 cursor-pointer border-2 border-white dark:border-gray-800 shadow-sm hover:border-blue-500 transition-colors">
                                        <AvatarFallback className='bg-blue-300 border border-blue-700 text-blue-700 font-bold'>
                                            {user ? user.email.substring(0, 2).toUpperCase() : 'GS'}
                                        </AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side="top" align="start" className="w-56 p-2 rounded-xl border border-gray-200 dark:border-gray-800 shadow-2xl bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl mb-4 z-50">
                                    <div className="flex flex-col space-y-1">
                                        {user && (
                                            <Button asChild variant="ghost" className="w-full justify-start h-9 text-sm focus:ring-0">
                                                <Link href="/profile/your-profile" onClick={onClose}>Profile</Link>
                                            </Button>
                                        )}
                                        <div className="h-px bg-gray-100 dark:bg-gray-800 my-1" />
                                        {user ? (
                                            <Button
                                                onClick={handleLogout}
                                                disabled={logoutMutation.isPending}
                                                variant="ghost"
                                                className="w-full justify-start h-9 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30 focus:ring-0"
                                            >
                                                {logoutMutation.isPending ? 'Logging out...' : 'Logout'}
                                            </Button>
                                        ) : (
                                            <Button asChild variant="ghost" className="w-full justify-start h-9 text-sm focus:ring-0">
                                                <Link href="/login" onClick={onClose}>Login</Link>
                                            </Button>
                                        )}
                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-gray-900 dark:text-white">
                                    {user ? 'Authenticated' : 'Guest User'}
                                </span>
                                <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                                    {user ? user.email : 'Click to login'}
                                </span>
                            </div>
                            {!isLoading && !user && pathname !== '/login' && (
                                <Link href="/login" onClick={onClose} className="ml-auto">
                                    <Button variant="default" className="px-6 shadow-md shadow-blue-500/20"> Login </Button>
                                </Link>
                            )}
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
