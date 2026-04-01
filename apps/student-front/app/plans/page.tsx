"use client"
import * as React from 'react';
import { Navigation } from "@/components/base compo/navigation";
import { Footer } from "@/components/base compo/footer";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

const plans = [
  {
    name: "Starter",
    description: "Perfect for exploring and trying out our platform.",
    price: "Free",
    period: "/ forever",
    features: [
      "Access to 5 beginner courses",
      "Community forum access",
      "Basic support",
      "720p video quality"
    ],
    buttonText: "Get Started",
    popular: false,
    color: "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
  },
  {
    name: "Pro",
    description: "Everything you need to master your new skills.",
    price: "$29",
    period: "/ month",
    features: [
      "Access to all 200+ courses",
      "Certificates of completion",
      "Premium 24/7 support",
      "1080p & 4K video quality",
      "Downloadable resources",
      "Exclusive Discord channel"
    ],
    buttonText: "Subscribe Now",
    popular: true,
    color: "bg-blue-600 text-white"
  },
  {
    name: "Lifetime",
    description: "Pay once and own your learning journey forever.",
    price: "$299",
    period: " one-time",
    features: [
      "Everything in Pro",
      "Lifetime access to all future updates",
      "1-on-1 mentorship (1 hr/month)",
      "Priority project reviews",
      "Beta access to new courses"
    ],
    buttonText: "Get Lifetime Access",
    popular: false,
    color: "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
  }
];

export default function PlansPage() {
  const [isAnnual, setIsAnnual] = React.useState(false);

  return (
    <div className="relative flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navigation />
      
      <main className="grow pt-32 pb-24">
        {/* Glow Effects */}
        <div className="absolute top-40 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-blue-500/10 rounded-full blur-[120px] -z-10" />

        {/* Page Header */}
        <section className="container mx-auto px-4 md:px-6 mb-16 text-center">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl mx-auto"
            >
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
                    Simple, transparent <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">pricing</span>
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">
                    Invest in your career. Whether you are just starting or leveling up, we have a plan that fits your goals.
                </p>

                {/* Billing Toggle */}
                <div className="flex items-center justify-center gap-4">
                    <span className={`text-sm font-semibold ${!isAnnual ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>Monthly</span>
                    <button 
                        onClick={() => setIsAnnual(!isAnnual)}
                        className="w-14 h-8 bg-blue-100 dark:bg-blue-900/40 rounded-full p-1 flex items-center transition-colors relative"
                    >
                        <motion.div 
                            className="w-6 h-6 bg-blue-600 rounded-full shadow-sm"
                            layout
                            animate={{ x: isAnnual ? 24 : 0 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                    </button>
                    <span className={`text-sm font-semibold flex items-center gap-2 ${isAnnual ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                        Annually 
                        <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs px-2 py-0.5 rounded-full">Save 20%</span>
                    </span>
                </div>
            </motion.div>
        </section>

        {/* Pricing Cards */}
        <section className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
                {plans.map((plan, idx) => {
                    // Calculate annual price for Pro
                    const displayPrice = isAnnual && plan.name === "Pro" ? "$23" : plan.price;
                    
                    return (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.15, duration: 0.5 }}
                            className={`relative bg-white dark:bg-gray-900 rounded-3xl p-8 flex flex-col ${
                                plan.popular 
                                ? 'border-2 border-blue-500 shadow-2xl scale-100 md:scale-105 z-10' 
                                : 'border border-gray-200 dark:border-gray-800 shadow-lg'
                            }`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 h-10">{plan.description}</p>
                            </div>

                            <div className="mb-8 flex items-end gap-1">
                                <span className="text-5xl font-black text-gray-900 dark:text-white">{displayPrice}</span>
                                <span className="text-gray-500 dark:text-gray-400 font-medium mb-1">{plan.period}</span>
                            </div>

                            <Button 
                                variant={plan.popular ? "default" : "outline"} 
                                className={`w-full mb-8 h-12 text-md font-bold ${
                                    plan.popular ? 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/25' : ''
                                }`}
                            >
                                {plan.buttonText}
                            </Button>

                            <div className="flex flex-col gap-4 grow">
                                <p className="text-sm font-semibold text-gray-900 dark:text-white">What's included:</p>
                                {plan.features.map((feature, i) => (
                                    <div key={i} className="flex gap-3">
                                        <svg className="w-5 h-5 text-blue-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </section>

        {/* FAQ Teaser */}
        <section className="container mx-auto px-4 md:px-6 mt-24 text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Still have questions?</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">We're here to help you make the best choice for your career.</p>
            <Button variant="outline" className="border-gray-300 dark:border-gray-700">Contact Support</Button>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
