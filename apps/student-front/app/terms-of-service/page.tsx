"use client"
import * as React from 'react';
import { Navigation } from "@/components/base compo/navigation";
import { Footer } from "@/components/base compo/footer";
import { motion } from 'framer-motion';

export default function TermsOfServicePage() {
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
                    Terms of <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">Service</span>
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mb-12">Last updated: April 30, 2026</p>

                <div className="prose prose-blue dark:prose-invert max-w-none space-y-8 text-gray-600 dark:text-gray-300">
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Agreement to Terms</h2>
                        <p>
                            By accessing or using TechLMS, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Use License</h2>
                        <p>
                            Permission is granted to temporarily download one copy of the materials (information or software) on TechLMS's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Modify or copy the materials.</li>
                            <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial).</li>
                            <li>Attempt to decompile or reverse engineer any software contained on TechLMS's website.</li>
                            <li>Remove any copyright or other proprietary notations from the materials.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. User Accounts</h2>
                        <p>
                            When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our service.
                        </p>
                        <p>
                            You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Limitations</h2>
                        <p>
                            In no event shall TechLMS or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on TechLMS's website.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Governing Law</h2>
                        <p>
                            These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
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
