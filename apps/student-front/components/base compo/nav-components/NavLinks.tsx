"use client";

import * as React from 'react';
import { motion } from 'framer-motion';
import Link from "next/link";

interface NavItem {
    name: string;
    href: string;
}

interface NavLinksProps {
    items: NavItem[];
    pathname: string;
}

export function NavLinks({ items, pathname }: NavLinksProps) {
    return (
        <div className='hidden md:flex flex-1 justify-center gap-8 lg:gap-12 flex-row text-gray-900 dark:text-white font-medium'>
            {items.map((item) => {
                const isActive = pathname === item.href;

                return (
                    <Link key={item.name} href={item.href} className="relative">
                        <motion.p
                            className={`text-md cursor-pointer transition-colors ${isActive
                                ? 'text-blue-600 dark:text-blue-400 font-bold'
                                : 'hover:text-blue-600 dark:hover:text-blue-400'
                                }`}
                            whileHover={{ y: -2 }}
                            whileTap={{ y: 0 }}
                        >
                            {item.name}
                        </motion.p>
                        {isActive && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                    </Link>
                );
            })}
        </div>
    );
}
