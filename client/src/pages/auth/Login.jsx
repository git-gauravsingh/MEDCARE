import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaArrowRight, FaHospital, FaMobileAlt, FaKey, FaGoogle } from "react-icons/fa";

const Login = () => {
  const [loginMethod, setLoginMethod] = useState("email"); // 'email' or 'mobile'
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    mobile: "",
    password: "",
    otp: ""
  });

  const handleSendOTP = (e) => {
    e.preventDefault();
    if (formData.mobile.length < 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    setError("");
    setOtpSent(true); // Switches UI to show OTP input
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // 1. Mobile OTP Validation
    if (loginMethod === "mobile") {
      if (formData.otp !== "2277") {
        setError("Invalid OTP. Please enter 2277.");
        return;
      }
      console.log("Mobile Login successful:", formData.mobile);
    }
    // 2. Email Validation
    else {
      if (!formData.email || !formData.password) {
        setError("Please enter both email and password.");
        return;
      }
      console.log("Email Login successful:", formData.email);
    }

    // Dummy Auth Logic
    localStorage.setItem("isAuthenticated", "true");
    window.location.href = "/";
  };

  const handleGoogleLogin = () => {
    // 1. Ek chota popup window open karega
    const popupWidth = 450;
    const popupHeight = 550;
    const left = window.screen.width / 2 - popupWidth / 2;
    const top = window.screen.height / 2 - popupHeight / 2;

    const popup = window.open(
      "",
      "Google Login",
      `width=${popupWidth},height=${popupHeight},left=${left},top=${top},toolbar=no,menubar=no`
    );

    if (popup) {
      // 2. Dummy UI jo Google Account Selection jaisa lagega
      popup.document.write(`
        <html style="font-family: Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 0;">
          <body style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh;">
            <div style="background: white; padding: 40px; border-radius: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); text-align: center; width: 80%; max-width: 350px;">
              <h2 style="margin-bottom: 10px; color: #333;">Sign in with Google</h2>
              <p style="color: #666; font-size: 14px; margin-bottom: 30px;">Choose an account to continue to <b>MEDCARE</b></p>
              
              <div style="border: 1px solid #e2e8f0; border-radius: 12px; padding: 15px; text-align: left; cursor: pointer; display: flex; align-items: center; gap: 15px; margin-bottom: 10px;">
                <div style="width: 40px; height: 40px; background: #2563eb; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 18px;">
                  G
                </div>
                <div>
                  <div style="font-weight: bold; color: #1e293b;">Gaurav Singh</div>
                  <div style="font-size: 12px; color: #64748b;">gaurav@example.com</div>
                </div>
              </div>
              
              <p style="color: #94a3b8; font-size: 12px; margin-top: 20px;">Redirecting automatically in a moment...</p>
            </div>
          </body>
        </html>
      `);

      // 3. 2.5 seconds ka timer set kiya hai account selection simulate karne ke liye
      setTimeout(() => {
        popup.close();
        localStorage.setItem("isAuthenticated", "true");
        window.location.href = "/";
      }, 2500);

    } else {
      // Agar browser ne popup block kar diya ho
      alert("Please allow popups to sign in with Google.");
    }
  };

  return (
    <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">

      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex justify-center mb-4">
          <div className="bg-blue-600 p-3 rounded-2xl text-white text-2xl">
            <FaHospital />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome Back</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Sign in to manage your health records.</p>
      </div>

      {/* Login Method Toggle Tabs */}
      <div className="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-xl mb-6">
        <button
          type="button"
          onClick={() => { setLoginMethod("email"); setError(""); setOtpSent(false); }}
          className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${loginMethod === "email" ? "bg-white dark:bg-gray-800 text-blue-600 shadow-sm" : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"}`}
        >
          Email ID
        </button>
        <button
          type="button"
          onClick={() => { setLoginMethod("mobile"); setError(""); }}
          className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${loginMethod === "mobile" ? "bg-white dark:bg-gray-800 text-blue-600 shadow-sm" : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"}`}
        >
          Mobile Number
        </button>
      </div>

      {/* Error Message Display */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 text-red-600 dark:text-red-400 text-sm font-medium rounded-xl text-center">
          {error}
        </div>
      )}

      {/* Dynamic Form */}
      <form onSubmit={loginMethod === "mobile" && !otpSent ? handleSendOTP : handleSubmit} className="space-y-4">

        {/* --- EMAIL FLOW --- */}
        {loginMethod === "email" && (
          <>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-4 text-gray-400" />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="relative">
              <FaLock className="absolute left-4 top-4 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            <div className="text-right">
              <Link to="/password-recovery" className="text-sm font-bold text-blue-600 hover:underline">Forgot password?</Link>
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 mt-2">
              Sign In <FaArrowRight />
            </button>
          </>
        )}

        {/* --- MOBILE FLOW --- */}
        {loginMethod === "mobile" && (
          <>
            <div className="relative">
              <FaMobileAlt className="absolute left-4 top-4 text-gray-400" />
              <input
                type="tel"
                maxLength="10"
                placeholder="10-digit Mobile Number"
                disabled={otpSent}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white disabled:opacity-60 focus:ring-2 focus:ring-blue-500 outline-none transition-all tracking-wide"
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              />
            </div>

            {otpSent && (
              <div className="relative">
                <FaKey className="absolute left-4 top-4 text-gray-400" />
                <input
                  type="text"
                  maxLength="4"
                  placeholder="Enter OTP (e.g. 2277)"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all tracking-widest font-bold"
                  onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                />
              </div>
            )}

            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 mt-4">
              {otpSent ? "Verify & Login" : "Send OTP"} <FaArrowRight />
            </button>

            {otpSent && (
              <div className="text-center">
                <button type="button" onClick={() => { setOtpSent(false); setError(""); }} className="text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 underline mt-2">
                  Change Mobile Number
                </button>
              </div>
            )}
          </>
        )}
      </form>

      {/* --- SOCIAL LOGIN SECTION --- */}
      <div className="relative flex items-center justify-center my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200 dark:border-gray-600"></div>
        </div>
        <div className="relative px-4 bg-white dark:bg-gray-800 text-xs font-bold text-gray-400 uppercase">
          Or continue with
        </div>
      </div>

      <button
        type="button"
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-white font-bold py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 transition-all shadow-sm active:scale-95"
      >
        <FaGoogle className="text-red-500" /> Google
      </button>

      {/* Footer Options */}
      <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          Don't have an account? {" "}
          <Link to="/signup" className="font-bold text-blue-600 hover:underline">Create account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;