"use client"
import * as React from 'react';
import { Navigation } from "@/components/base compo/navigation";
import { Footer } from "@/components/base compo/footer";
import { motion } from 'framer-motion';

export default function AccessibilityPage() {
  return (
    <div className="relative flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navigation />
      
      <main className="grow pt-32 pb-24">
        {/* Glow Effects */}
        <div className="absolute top-20 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px] -z-10" />
        <div className="absolute top-40 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px] -z-10" />

        <section className="container mx-auto px-4 md:px-6 mb-16">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
            >
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
                    Accessibility <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">Statement</span>
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mb-12">Last updated: April 30, 2026</p>

                <div className="prose prose-blue dark:prose-invert max-w-none space-y-8 text-gray-600 dark:text-gray-300">
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Commitment</h2>
                        <p>
                            TechLMS is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards to ensure we provide an inclusive learning environment.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Conformance Status</h2>
                        <p>
                            The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA. TechLMS is partially conformant with WCAG 2.1 level AA.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Accessibility Features</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Keyboard Navigation:</strong> Our platform can be navigated using only a keyboard.</li>
                            <li><strong>Screen Reader Support:</strong> We use semantic HTML to ensure screen readers can accurately interpret our content.</li>
                            <li><strong>Color Contrast:</strong> We strive to maintain high contrast ratios for all text elements.</li>
                            <li><strong>Responsive Design:</strong> Our content scales gracefully across different devices and screen sizes.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Feedback</h2>
                        <p>
                            We welcome your feedback on the accessibility of TechLMS. Please let us know if you encounter accessibility barriers on our platform:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Phone: <span className="font-medium">+1 (555) 123-4567</span></li>
                            <li>Email: <span className="text-blue-600 dark:text-blue-400 font-medium">accessibility@techlms.com</span></li>
                        </ul>
                        <p className="mt-4">
                            We try to respond to feedback within 5 business days.
                        </p>
                    </section>
                </div>
            </motion.div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
