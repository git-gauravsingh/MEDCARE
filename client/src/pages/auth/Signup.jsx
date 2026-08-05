import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser, FaArrowRight, FaHospital } from "react-icons/fa";

const Signup = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Signup data:", formData);
    };

    return (
        <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
            {/* Header */}
            <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                    <div className="bg-blue-600 p-3 rounded-2xl text-white text-2xl">
                        <FaHospital />
                    </div>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create Account</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Join us and manage your health efficiently.</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                    <FaUser className="absolute left-4 top-4 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Full Name" 
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                </div>

                <div className="relative">
                    <FaEnvelope className="absolute left-4 top-4 text-gray-400" />
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                </div>
                
                <div className="relative">
                    <FaLock className="absolute left-4 top-4 text-gray-400" />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                </div>

                <button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 mt-4"
                >
                    Sign Up <FaArrowRight />
                </button>
            </form>

            {/* Footer */}
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
                Already have an account? {" "}
                <Link to="/login" className="font-bold text-blue-600 hover:underline">Sign In</Link>
            </p>
        </div>
    );
};

export default Signup;