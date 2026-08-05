import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaSearch, FaChevronDown, FaChevronUp, FaCalendarCheck,
    FaPills, FaFileMedical, FaUserCog, FaHeadset, FaBookOpen
} from "react-icons/fa";

const Help = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [expandedFaq, setExpandedFaq] = useState(null);

    const categories = [
        { name: "All", icon: <FaBookOpen /> },
        { name: "Appointments", icon: <FaCalendarCheck /> },
        { name: "Medicines", icon: <FaPills /> },
        { name: "Reports", icon: <FaFileMedical /> },
        { name: "Account", icon: <FaUserCog /> }
    ];

    // Dummy FAQ Data
    const faqsList = [
        {
            id: 1,
            category: "Appointments",
            question: "How do I book a new appointment?",
            answer: "To book an appointment, navigate to the 'Doctors' or 'Clinics' page from your dashboard. Select your preferred doctor, choose an available date and time slot, and click 'Book Slot'. You can pay online or choose to pay at the clinic."
        },
        {
            id: 2,
            category: "Appointments",
            question: "Can I cancel or reschedule an existing appointment?",
            answer: "Yes. Go to the 'Appointments' tab, find your upcoming appointment, and click the 'Reschedule' or 'Cancel' button. Please note that cancellations must be done at least 2 hours prior to the scheduled time for a full refund."
        },
        {
            id: 3,
            category: "Medicines",
            question: "How do I order medicines that require a prescription?",
            answer: "When adding a prescription-only medicine to your cart, you will be prompted to upload a valid photo or PDF of your doctor's prescription. Our pharmacists will verify it before dispatching your order."
        },
        {
            id: 4,
            category: "Medicines",
            question: "How long does medicine delivery take?",
            answer: "We offer 'Next Day Delivery' for most daily essentials and standard medicines. Life-saving drugs and urgent care items may qualify for same-day delivery depending on your location."
        },
        {
            id: 5,
            category: "Reports",
            question: "When will my lab test reports be available?",
            answer: "Most standard blood and urine tests are uploaded to your 'Reports' dashboard within 24 hours. Specialized scans or cultures may take 3 to 5 working days. You will receive a notification once they are ready."
        },
        {
            id: 6,
            category: "Reports",
            question: "How does the AI Report Analysis work?",
            answer: "Our AI translator securely scans your medical report and breaks down complex medical jargon into simple, everyday language. It highlights abnormal values and suggests general lifestyle tips, but it does not replace a doctor's diagnosis."
        },
        {
            id: 7,
            category: "Account",
            question: "How do I update my profile or contact information?",
            answer: "Click on your profile icon in the top right corner and select 'Settings'. From there, you can update your email, phone number, address, and password."
        }
    ];

    // Filter Logic
    const filteredFaqs = faqsList.filter(faq => {
        const matchesCategory = activeCategory === "All" || faq.category === activeCategory;
        const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const toggleFaq = (id) => {
        setExpandedFaq(expandedFaq === id ? null : id);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="p-4 lg:p-8 w-full flex flex-col gap-8 bg-[#F8FAFC] dark:bg-gray-900 min-h-screen font-sans text-gray-800 dark:text-gray-200 transition-colors duration-300"
        >
            {/* HERO SECTION */}
            <div className="w-full shrink-0 min-h-[300px] bg-blue-600 rounded-3xl p-8 md:p-12 shadow-sm text-center flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

                <div className="relative z-10 w-full max-w-2xl py-4">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">How can we help you today?</h1>
                    <p className="text-blue-100 mb-8">Search our knowledge base for quick answers and step-by-step guides.</p>

                    <div className="relative w-full">
                        <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-lg" />
                        <input
                            type="text"
                            placeholder="Type your question here (e.g., 'Cancel appointment')"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-white dark:bg-gray-800 w-full pl-12 pr-6 py-4 rounded-2xl border-none focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-500/50 shadow-lg text-gray-700 dark:text-gray-200 transition-all text-base"
                        />
                    </div>
                </div>
            </div>

            {/* QUICK CATEGORY CARDS */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                {categories.map((cat, idx) => (
                    <button
                        key={idx}
                        onClick={() => {
                            setActiveCategory(cat.name);
                            setSearchQuery(""); // Clear search when switching categories
                        }}
                        className={`p-6 rounded-2xl border flex flex-col items-center justify-center gap-3 transition-all ${activeCategory === cat.name
                                ? 'bg-white dark:bg-gray-800 border-blue-600 shadow-md text-blue-600 dark:text-blue-400'
                                : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-blue-200 dark:hover:border-blue-800 hover:bg-blue-50/50 dark:hover:bg-blue-900/20'
                            }`}
                    >
                        <div className={`text-2xl ${activeCategory === cat.name ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'}`}>
                            {cat.icon}
                        </div>
                        <span className="font-bold text-sm">{cat.name}</span>
                    </button>
                ))}
            </div>

            {/* FAQ ACCORDION SECTION */}
            <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    {activeCategory === "All" ? "Frequently Asked Questions" : `${activeCategory} Questions`}
                </h2>

                <div className="flex flex-col gap-4">
                    {filteredFaqs.length > 0 ? (
                        filteredFaqs.map((faq) => (
                            <div key={faq.id} className="border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden bg-gray-50/50 dark:bg-gray-700/30">
                                <button
                                    onClick={() => toggleFaq(faq.id)}
                                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors focus:outline-none"
                                >
                                    <span className={`font-bold pr-4 ${expandedFaq === faq.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-800 dark:text-gray-200'}`}>
                                        {faq.question}
                                    </span>
                                    <span className={`shrink-0 transition-transform duration-300 ${expandedFaq === faq.id ? 'text-blue-600 dark:text-blue-400 rotate-180' : 'text-gray-400 dark:text-gray-500'}`}>
                                        <FaChevronDown />
                                    </span>
                                </button>

                                <AnimatePresence>
                                    {expandedFaq === faq.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-5 pt-1 text-gray-600 dark:text-gray-300 text-sm leading-relaxed border-t border-gray-100 dark:border-gray-700 mx-6">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))
                    ) : (
                        <div className="py-12 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 text-center">
                            <FaSearch className="text-4xl mb-3 opacity-30" />
                            <h3 className="text-lg font-bold text-gray-600 dark:text-gray-400">No results found</h3>
                            <p className="text-sm mt-1">We couldn't find any articles matching your search.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* BOTTOM SUPPORT BANNER */}
            <div className="bg-gray-900 dark:bg-gray-950 text-white p-8 rounded-3xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                <div className="absolute right-0 top-0 opacity-10 text-8xl -mt-8 -mr-8">
                    <FaHeadset />
                </div>
                <div className="relative z-10 text-center md:text-left">
                    <h3 className="text-xl font-bold mb-1">Still need help?</h3>
                    <p className="text-gray-400 text-sm">Our support team is available to assist you with any specific issues.</p>
                </div>
                <Link to="/contact" className="relative z-10 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-8 py-3.5 rounded-xl font-bold hover:bg-gray-100 dark:hover:bg-gray-700 active:scale-95 transition-all shadow-md flex items-center gap-2 whitespace-nowrap">
                    <FaHeadset /> Contact Support
                </Link>
            </div>

        </motion.div>
    );
};

export default Help;