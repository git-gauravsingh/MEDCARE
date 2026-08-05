import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    FaAmbulance, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt,
    FaWhatsapp, FaBuilding, FaPaperPlane, FaCheckCircle
} from "react-icons/fa";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        department: "General Inquiry",
        message: ""
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
        setFormData({ name: "", email: "", department: "General Inquiry", message: "" });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="p-4 lg:p-8 w-full flex flex-col gap-6 bg-[#F8FAFC] dark:bg-gray-900 min-h-screen font-sans text-gray-800 dark:text-gray-200 transition-colors duration-300"
        >
            {/* 1. BULLETPROOF EMERGENCY SOS BANNER */}
            <div className="w-full h-auto min-h-[14rem] shrink-0 bg-gradient-to-r from-red-600 to-red-700 p-6 md:p-8 rounded-3xl shadow-md text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">

                {/* Background Icon */}
                <div className="absolute right-0 top-0 opacity-10 text-9xl -mt-4 -mr-4 pointer-events-none">
                    <FaAmbulance />
                </div>

                {/* Text Content */}
                <div className="relative z-10 w-full md:w-2/3 flex flex-col gap-2">
                    <h2 className="text-2xl md:text-3xl font-extrabold flex items-center gap-3">
                        <FaAmbulance className="animate-pulse" /> Medical Emergency?
                    </h2>
                    <p className="text-red-100 text-sm md:text-base leading-relaxed">
                        For immediate medical assistance, ambulance requests, or critical care, please do not use the contact form. Call our 24/7 emergency hotline immediately.
                    </p>
                </div>

                {/* Call Button */}
                <div className="relative z-10 w-full md:w-auto mt-2 md:mt-0">
                    <a href="tel:108" className="flex items-center justify-center gap-3 bg-white dark:bg-gray-900 text-red-600 dark:text-red-500 px-8 py-4 rounded-xl font-black text-xl hover:bg-red-50 dark:hover:bg-gray-800 active:scale-95 transition-all shadow-lg w-full">
                        <FaPhoneAlt /> CALL 108
                    </a>
                </div>
            </div>

            {/* PAGE HEADER */}
            <div className="mt-2 mb-4">
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Get in Touch</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Reach out to our corporate team for partnerships, feedback, or official inquiries.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">

                {/* LEFT SIDE: Contact Info & HQ Details */}
                <div className="w-full lg:w-5/12 flex flex-col gap-6">

                    {/* Direct Connect Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4 hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
                            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xl shrink-0">
                                <FaPhoneAlt />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">Toll-Free Helpline</p>
                                <p className="font-bold text-gray-900 dark:text-white text-lg">1800-123-4567</p>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4 hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
                            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xl shrink-0">
                                <FaEnvelope />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">Official Email</p>
                                <p className="font-bold text-gray-900 dark:text-white">contact@medcare.com</p>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4 hover:border-green-200 dark:hover:border-green-800 transition-colors cursor-pointer group">
                            <div className="w-12 h-12 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center text-xl shrink-0 group-hover:bg-green-500 group-hover:text-white transition-colors">
                                <FaWhatsapp />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">WhatsApp Business</p>
                                <p className="font-bold text-gray-900 dark:text-white">+91 98765 43210</p>
                            </div>
                        </div>
                    </div>

                    {/* Corporate HQ Details */}
                    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col transition-colors">
                        <div className="h-40 bg-gray-200 dark:bg-gray-700 relative">
                            {/* Map Placeholder */}
                            <div className="absolute inset-0 bg-blue-50/50 dark:bg-blue-900/20 flex flex-col items-center justify-center text-blue-600" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '15px 15px' }}>
                                <FaMapMarkerAlt className="text-4xl mb-2 text-blue-500 drop-shadow-md" />
                                <span className="font-bold text-sm bg-white dark:bg-gray-800 dark:text-gray-200 px-3 py-1 rounded-full shadow-sm">View on Maps</span>
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <FaBuilding className="text-blue-500" /> MEDCARE Headquarters
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                                Tech Park Tower, 4th Floor<br />
                                Boring Road, Patna<br />
                                Bihar - 800001, India
                            </p>
                            <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-xl border border-gray-100 dark:border-gray-600 text-xs text-gray-500 dark:text-gray-400">
                                <span className="font-bold text-gray-700 dark:text-gray-300">Corporate Hours:</span> Monday - Friday, 9:00 AM to 6:00 PM (IST)
                            </div>
                        </div>
                    </div>

                </div>

                {/* RIGHT SIDE: Department-Specific Form */}
                <div className="w-full lg:w-7/12 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 md:p-10 flex flex-col justify-center transition-colors">

                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send us a message</h2>

                    {isSubmitted ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/30 rounded-2xl p-8 flex flex-col items-center justify-center text-center h-full min-h-[300px]"
                        >
                            <FaCheckCircle className="text-6xl text-green-500 mb-4" />
                            <h3 className="text-xl font-bold text-green-800 dark:text-green-400 mb-2">Message Sent Successfully!</h3>
                            <p className="text-green-600 dark:text-green-500 text-sm">Thank you for reaching out. Our team will get back to you within 24-48 business hours.</p>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Full Name <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all text-sm bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:bg-white dark:focus:bg-gray-800"
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Email Address <span className="text-red-500">*</span></label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all text-sm bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:bg-white dark:focus:bg-gray-800"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Department / Subject <span className="text-red-500">*</span></label>
                                <select
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all text-sm bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:bg-white dark:focus:bg-gray-800 appearance-none"
                                >
                                    <option value="General Inquiry">General Inquiry</option>
                                    <option value="Doctor/Hospital Onboarding">Doctor / Hospital Onboarding</option>
                                    <option value="Business Partnerships">Business Partnerships</option>
                                    <option value="Press & Media">Press & Media</option>
                                    <option value="Feedback & Suggestions">Feedback & Suggestions</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Your Message <span className="text-red-500">*</span></label>
                                <textarea
                                    name="message"
                                    required
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Type your message here..."
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all text-sm bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:bg-white dark:focus:bg-gray-800 resize-none"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="mt-2 w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2"
                            >
                                <FaPaperPlane /> Send Message
                            </button>
                            <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-2">
                                By submitting this form, you agree to our privacy policy.
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default Contact;