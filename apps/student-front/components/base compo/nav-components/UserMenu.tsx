"use client";

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useAuth, useLogout } from '@/app/hooks/api hooks/useAuth';
import { toast } from 'sonner';

interface UserMenuProps {
    pathname: string;
}

export function UserMenu({ pathname }: UserMenuProps) {
    const { data: user, isLoading } = useAuth();
    const logoutMutation = useLogout();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const isLoginPage = pathname === '/login';

    // Prevent flickering by not rendering the login button while authentication is being checked
    if (isLoading) return <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse hidden md:block" />;

    const handleLogout = () => {
        logoutMutation.mutate(undefined, {
            onSuccess: () => {
                toast.success('Logged out successfully');
                setIsMenuOpen(false);
            },
            onError: () => {
                toast.error('Failed to logout');
            }
        });
    };

    return (
        <div className="hidden md:flex gap-4 items-center">
            {!user && !isLoginPage && (
                <Link href="/login">
                    <Button variant="default" size="lg"> Login </Button>
                </Link>
            )}
            <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer border-2 border-transparent hover:border-blue-500 transition-colors">
                        <AvatarFallback className='bg-blue-300 border border-blue-700 text-blue-700 font-bold'>
                            {user ? user.email.substring(0, 2).toUpperCase() : 'GS'}
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 p-2 rounded-xl border border-gray-200 dark:border-gray-800 shadow-xl bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl mt-2 z-50">
                    <div className="flex flex-col p-2 border-b border-gray-100 dark:border-gray-800 mb-2">
                        <span className="font-bold text-sm text-gray-900 dark:text-white">
                            {user ? 'Authenticated User' : 'Guest User'}
                        </span>
                        <span className="text-xs text-gray-500">
                            {user ? user.email : 'guest@example.com'}
                        </span>
                    </div>
                    <div className="flex flex-col space-y-1">
                        {user && (
                            <Button asChild variant="ghost" className="w-full justify-start h-9 text-sm focus:ring-0" onClick={() => setIsMenuOpen(false)}>
                                <Link href="/profile/your-profile">Profile</Link>
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
                            <Button asChild variant="ghost" className="w-full justify-start h-9 text-sm focus:ring-0" onClick={() => setIsMenuOpen(false)}>
                                <Link href="/login">Login</Link>
                            </Button>
                        )}
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
