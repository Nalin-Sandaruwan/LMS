"use client"
import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';
import { Button } from '../../ui/button';

export function CookieConsent() {
    const [isVisible, setIsVisible] = React.useState(false);

    React.useEffect(() => {
        // Check if user has already accepted
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            // Delay showing to not overwhelm the user
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookie-consent', 'declined');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:w-[400px] z-[100]"
                >
                    <div className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border border-gray-200 dark:border-gray-800 p-6 rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center shrink-0">
                                <Cookie className="w-6 h-6 text-[#4F46E5]" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-[#1B1D36] dark:text-white mb-1">
                                    Cookie Consent
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                                    We use cookies to enhance your experience, analyze site traffic, and serve better education content.
                                </p>
                                <div className="flex items-center gap-3">
                                    <Button 
                                        onClick={handleAccept}
                                        className="flex-1 bg-[#4F46E5] hover:bg-indigo-700 text-white rounded-xl h-10 text-sm font-bold shadow-lg shadow-indigo-500/20"
                                    >
                                        Accept All
                                    </Button>
                                    <Button 
                                        variant="outline"
                                        onClick={handleDecline}
                                        className="flex-1 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 rounded-xl h-10 text-sm font-bold"
                                    >
                                        Decline
                                    </Button>
                                </div>
                            </div>
                            <button 
                                onClick={() => setIsVisible(false)}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
