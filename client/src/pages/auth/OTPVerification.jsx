import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaShieldAlt, FaArrowRight, FaHospital } from "react-icons/fa";

const OTPVerification = () => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);

    const handleChange = (index, value) => {
        if (value.length <= 1 && /^[0-9]*$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted OTP:", otp.join(""));
    };

    return (
        <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
            {/* Header */}
            <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                    <div className="bg-blue-600 p-3 rounded-2xl text-white text-2xl">
                        <FaShieldAlt />
                    </div>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Verify Account</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Enter the 6-digit code sent to your email.</p>
            </div>

            {/* OTP Inputs */}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex justify-between gap-2">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            className="w-12 h-14 text-center text-xl font-bold rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                    ))}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
                >
                    Verify Code <FaArrowRight />
                </button>
            </form>

            {/* Footer */}
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
                Didn't receive code? {" "}
                <button className="font-bold text-blue-600 hover:underline">Resend</button>
            </p>
        </div>
    );
};

export default OTPVerification;