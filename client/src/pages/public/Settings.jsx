import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import {
    FaUser, FaLock, FaBell, FaShieldAlt, FaCreditCard,
    FaSave, FaMobileAlt, FaEnvelope, FaMapMarkerAlt,
    FaToggleOn, FaToggleOff, FaDownload, FaDesktop,
    FaExclamationTriangle, FaCheckCircle, FaPalette, FaTimes, FaSignOutAlt
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Settings = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    const navigate = useNavigate();

    // Check authentication status
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

    // Set default tab based on authentication
    const [activeTab, setActiveTab] = useState(isAuthenticated ? "Profile" : "Preferences");

    // Ensure tab is correct if auth state changes while on page
    useEffect(() => {
        if (!isAuthenticated && !["Notifications", "Preferences"].includes(activeTab)) {
            setActiveTab("Preferences");
        }
    }, [isAuthenticated, activeTab]);

    // Handle Logout
    const handleLogout = () => {
        localStorage.removeItem("isAuthenticated");
        navigate("/");
        window.location.reload(); // Force a full app state reset
    };

    // --- PROFILE STATE (Edit/Save Flow) ---
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [profileData, setProfileData] = useState({
        name: "Gaurav Singh",
        email: "gaurav@example.com",
        mobile: "+91 9876543210",
        dob: "2005-08-15",
        gender: "Male",
        bloodGroup: "O+",
        height: "172",
        weight: "59",
        bmi: "19.9",
        emergencyName: "Ravi Singh",
        emergencyPhone: "+91 9123456789"
    });
    const [tempProfileData, setTempProfileData] = useState({ ...profileData });

    const handleProfileChange = (e) => {
        setTempProfileData({ ...tempProfileData, [e.target.name]: e.target.value });
    };

    const handleSaveProfile = () => {
        setProfileData({ ...tempProfileData });
        setIsEditingProfile(false);
    };

    const handleCancelProfile = () => {
        setTempProfileData({ ...profileData });
        setIsEditingProfile(false);
    };

    // --- 2FA STATE FLOW ---
    const [twoFactorState, setTwoFactorState] = useState("disabled"); // disabled, setup, enabled
    const [otpCode, setOtpCode] = useState("");

    const handleVerify2FA = () => {
        if (otpCode.length === 6) {
            setTwoFactorState("enabled");
            setOtpCode("");
        }
    };

    // --- TOGGLES STATE ---
    const [toggles, setToggles] = useState({
        apptPush: true, apptSms: true, apptEmail: false,
        medRefill: true, reportUpdates: true, promoOffers: false,
        aiConsent: true, doctorAccess: true, darkMode: false
    });

    const handleToggle = (key) => setToggles(prev => ({ ...prev, [key]: !prev[key] }));

    // Define all tabs
    const allTabs = [
        { name: "Profile", icon: <FaUser />, requiresAuth: true },
        { name: "Security", icon: <FaLock />, requiresAuth: true },
        { name: "Notifications", icon: <FaBell />, requiresAuth: false },
        { name: "Privacy", icon: <FaShieldAlt />, requiresAuth: true },
        { name: "Preferences", icon: <FaPalette />, requiresAuth: false },
        { name: "Billing", icon: <FaCreditCard />, requiresAuth: true }
    ];

    // Filter tabs based on authentication
    const visibleTabs = allTabs.filter(tab => !tab.requiresAuth || isAuthenticated);

    const ToggleSwitch = ({ label, description, stateKey }) => (
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl border border-gray-100 dark:border-gray-600">
            <div className="pr-4">
                <p className="font-bold text-gray-900 dark:text-white text-sm">{label}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{description}</p>
            </div>
            <button onClick={() => handleToggle(stateKey)} className={`text-3xl transition-colors shrink-0 ${toggles[stateKey] ? 'text-blue-600' : 'text-gray-300'}`}>
                {toggles[stateKey] ? <FaToggleOn /> : <FaToggleOff />}
            </button>
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="p-4 lg:p-8 w-full flex flex-col gap-6 bg-[#F8FAFC] dark:bg-gray-900 min-h-screen font-sans text-gray-800 dark:text-gray-100 transition-colors duration-300"
        >
            <div className="mb-2">
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Account Settings</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Manage your personal information, security, and app preferences.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                {/* LEFT: Tab Navigation */}
                <div className="w-full lg:w-1/4 shrink-0 flex flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-hide">
                    {visibleTabs.map((tab) => (
                        <button
                            key={tab.name}
                            onClick={() => setActiveTab(tab.name)}
                            className={`flex items-center gap-3 px-5 py-4 rounded-2xl font-bold text-sm transition-all whitespace-nowrap lg:whitespace-normal ${activeTab === tab.name ? 'bg-blue-600 text-white shadow-md' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 border border-gray-100 dark:border-gray-700'}`}
                        >
                            <span className="text-lg">{tab.icon}</span> {tab.name}
                        </button>
                    ))}

                    {/* Logout Button (Only visible if logged in) */}
                    {isAuthenticated && (
                        <button
                            onClick={handleLogout}
                            className="mt-4 flex items-center gap-3 px-5 py-4 rounded-2xl font-bold text-sm transition-all whitespace-nowrap lg:whitespace-normal bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40 border border-red-100 dark:border-red-800/30"
                        >
                            <span className="text-lg"><FaSignOutAlt /></span> Logout
                        </button>
                    )}
                </div>

                {/* RIGHT: Content Area */}
                <div className="flex-1 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden min-h-[600px] shrink-0">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                            className="p-6 md:p-8 lg:p-10 flex flex-col h-full"
                        >
                            {/* --- 1. PROFILE & PERSONAL INFO (Requires Auth) --- */}
                            {isAuthenticated && activeTab === "Profile" && (
                                <div className="space-y-8">
                                    <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-4">
                                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Personal Information</h2>
                                        {!isEditingProfile && (
                                            <button onClick={() => setIsEditingProfile(true)} className="text-blue-600 font-bold text-sm hover:underline">Edit Details</button>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Basic Details */}
                                        <div className="space-y-4">
                                            <h3 className="font-bold text-gray-800 dark:text-gray-200 text-sm">Basic Details & Contact</h3>
                                            <input name="name" disabled={!isEditingProfile} value={tempProfileData.name} onChange={handleProfileChange} placeholder="Full Name" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 disabled:text-gray-500 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                                            <input name="email" type="email" disabled={!isEditingProfile} value={tempProfileData.email} onChange={handleProfileChange} placeholder="Email" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 disabled:text-gray-500 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                                            <input name="mobile" type="tel" disabled={!isEditingProfile} value={tempProfileData.mobile} onChange={handleProfileChange} placeholder="Mobile" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 disabled:text-gray-500 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                                            <div className="grid grid-cols-2 gap-4">
                                                <input name="dob" type="date" disabled={!isEditingProfile} value={tempProfileData.dob} onChange={handleProfileChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 disabled:text-gray-500 text-sm" />
                                                <select name="gender" disabled={!isEditingProfile} value={tempProfileData.gender} onChange={handleProfileChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 disabled:text-gray-500 text-sm">
                                                    <option>Male</option><option>Female</option><option>Other</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* Vitals & Emergency */}
                                        <div className="space-y-4">
                                            <h3 className="font-bold text-gray-800 dark:text-gray-200 text-sm">Vitals & Emergency Info</h3>
                                            <div className="grid grid-cols-3 gap-4">
                                                <input name="height" type="number" placeholder="Ht(cm)" disabled={!isEditingProfile} value={tempProfileData.height} onChange={handleProfileChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 disabled:text-gray-500 text-sm" />
                                                <input name="weight" type="number" placeholder="Wt(kg)" disabled={!isEditingProfile} value={tempProfileData.weight} onChange={handleProfileChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 disabled:text-gray-500 text-sm" />
                                                <input name="bloodGroup" placeholder="Blood" disabled={!isEditingProfile} value={tempProfileData.bloodGroup} onChange={handleProfileChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 disabled:text-gray-500 text-sm" />
                                            </div>
                                            <div className="bg-blue-50/50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800/30 flex justify-between items-center text-sm">
                                                <span className="font-medium text-blue-800 dark:text-blue-400">Calculated BMI:</span>
                                                <span className="font-bold text-blue-600 dark:text-blue-300">{tempProfileData.bmi} (Normal)</span>
                                            </div>
                                            <input name="emergencyName" disabled={!isEditingProfile} value={tempProfileData.emergencyName} onChange={handleProfileChange} placeholder="Emergency Contact Name" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 disabled:text-gray-500 text-sm" />
                                            <input name="emergencyPhone" type="tel" disabled={!isEditingProfile} value={tempProfileData.emergencyPhone} onChange={handleProfileChange} placeholder="Emergency Contact Phone" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 disabled:text-gray-500 text-sm" />
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    {isEditingProfile && (
                                        <div className="flex justify-end gap-3 pt-4">
                                            <button onClick={handleCancelProfile} className="px-6 py-3 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors text-sm"><FaTimes className="inline mr-2" /> Cancel</button>
                                            <button onClick={handleSaveProfile} className="px-6 py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-md text-sm"><FaSave className="inline mr-2" /> Save Changes</button>
                                        </div>
                                    )}

                                    {/* Address Book */}
                                    <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="font-bold text-gray-800 dark:text-gray-200 text-sm">Address Book</h3>
                                            <button className="text-blue-600 font-bold text-xs hover:underline">+ Add New</button>
                                        </div>
                                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-2xl border border-gray-200 dark:border-gray-600 flex justify-between items-center">
                                            <div className="flex gap-4 items-center">
                                                <FaMapMarkerAlt className="text-gray-400 text-xl" />
                                                <div>
                                                    <p className="font-bold text-gray-900 dark:text-white text-sm">Home (Primary)</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">Tech Park Tower, Boring Road, Patna, Bihar</p>
                                                </div>
                                            </div>
                                            <button className="text-red-500 text-xs font-bold hover:underline">Remove</button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* --- 2. ACCOUNT & SECURITY (Requires Auth) --- */}
                            {isAuthenticated && activeTab === "Security" && (
                                <div className="space-y-8">
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-4">Account Security</h2>

                                    {/* 2FA Realistic Flow */}
                                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-3xl shadow-sm">
                                        <div className="flex gap-4 items-start">
                                            <div className={`p-3 rounded-xl ${twoFactorState === 'enabled' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                                                <FaShieldAlt className="text-2xl" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-gray-900 dark:text-white">Two-Factor Authentication (2FA)</h3>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 mb-4">Add an extra layer of security via SMS OTP.</p>

                                                {twoFactorState === "disabled" && (
                                                    <button onClick={() => setTwoFactorState("setup")} className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-800 transition-colors">Setup 2FA</button>
                                                )}

                                                {twoFactorState === "setup" && (
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <input
                                                            type="text" maxLength="6" placeholder="Enter 6-digit OTP"
                                                            value={otpCode} onChange={(e) => setOtpCode(e.target.value)}
                                                            className="w-40 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-center tracking-widest font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                                                        />
                                                        <button onClick={handleVerify2FA} className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md hover:bg-blue-700">Verify</button>
                                                        <button onClick={() => setTwoFactorState("disabled")} className="text-gray-500 dark:text-gray-400 text-sm font-bold ml-2">Cancel</button>
                                                    </div>
                                                )}

                                                {twoFactorState === "enabled" && (
                                                    <div className="flex items-center gap-4 mt-2">
                                                        <span className="flex items-center gap-1.5 text-sm font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-3 py-1.5 rounded-lg border border-green-200 dark:border-green-800/30"><FaCheckCircle /> 2FA is Enabled</span>
                                                        <button onClick={() => setTwoFactorState("disabled")} className="text-red-500 text-xs font-bold hover:underline">Disable</button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Password Management */}
                                    <div className="space-y-4">
                                        <h3 className="font-bold text-gray-800 dark:text-gray-200 text-sm">Change Password</h3>
                                        <div className="flex flex-col md:flex-row gap-4">
                                            <input type="password" placeholder="Current Password" className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                                            <input type="password" placeholder="New Password" className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                                            <button className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-6 py-3 rounded-xl font-bold hover:bg-gray-300 transition-all text-sm">Update</button>
                                        </div>
                                    </div>

                                    {/* Active Sessions */}
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-end border-b border-gray-100 dark:border-gray-700 pb-2">
                                            <h3 className="font-bold text-gray-800 dark:text-gray-200 text-sm">Active Sessions</h3>
                                            <button className="text-red-500 text-xs font-bold hover:underline">Log out of all devices</button>
                                        </div>
                                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-2xl border border-gray-200 dark:border-gray-600 flex justify-between items-center">
                                            <div className="flex gap-4 items-center">
                                                <FaDesktop className="text-gray-400 text-xl" />
                                                <div>
                                                    <p className="font-bold text-gray-900 dark:text-white text-sm">Windows 11 - Chrome</p>
                                                    <p className="text-xs text-green-600 font-bold">Active now • Patna, India</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Danger Zone */}
                                    <div className="border border-red-200 dark:border-red-800/30 bg-red-50/50 dark:bg-red-900/10 p-6 rounded-3xl mt-4">
                                        <h3 className="font-bold text-red-700 dark:text-red-500 flex items-center gap-2 mb-2"><FaExclamationTriangle /> Danger Zone</h3>
                                        <p className="text-gray-600 dark:text-gray-400 text-xs mb-4">Temporarily deactivate your account or permanently delete it along with all medical data.</p>
                                        <div className="flex gap-4">
                                            <button className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-5 py-2.5 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all text-sm">Deactivate Account</button>
                                            <button className="bg-red-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-red-700 shadow-md transition-all text-sm">Delete Permanently</button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* --- 3. NOTIFICATIONS & ALERTS (Public) --- */}
                            {activeTab === "Notifications" && (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-4">Notifications & Alerts</h2>

                                    <div className="space-y-3">
                                        <h3 className="font-bold text-gray-800 dark:text-gray-200 text-sm">Appointment Reminders</h3>
                                        <ToggleSwitch label="Push Notifications" description="Receive alerts on your device." stateKey="apptPush" />
                                        <ToggleSwitch label="SMS Alerts" description="Text messages for upcoming schedules." stateKey="apptSms" />
                                        <ToggleSwitch label="Email Alerts" description="Detailed emails regarding appointments." stateKey="apptEmail" />
                                    </div>

                                    <div className="space-y-3 pt-4">
                                        <h3 className="font-bold text-gray-800 dark:text-gray-200 text-sm">Health & Store Alerts</h3>
                                        <ToggleSwitch label="Medicine Refill Alerts" description="Reminders when daily meds run low." stateKey="medRefill" />
                                        <ToggleSwitch label="Report Updates" description="Get notified when lab tests are ready." stateKey="reportUpdates" />
                                        <ToggleSwitch label="Promotional Offers" description="Marketing emails and discount codes." stateKey="promoOffers" />
                                    </div>
                                </div>
                            )}

                            {/* --- 4. PRIVACY & DATA CONTROL (Requires Auth) --- */}
                            {isAuthenticated && activeTab === "Privacy" && (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-4">Privacy & Data</h2>

                                    <div className="space-y-3">
                                        <ToggleSwitch label="AI Analysis Consent" description="Allow MEDCARE AI to translate lab tests." stateKey="aiConsent" />
                                        <ToggleSwitch label="Doctor Access" description="Allow booked doctors to view your history." stateKey="doctorAccess" />
                                    </div>

                                    <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-3xl border border-blue-100 dark:border-blue-800/30 flex flex-col md:flex-row items-center justify-between gap-6">
                                        <div>
                                            <h3 className="font-bold text-blue-900 dark:text-blue-300">Export Medical Data</h3>
                                            <p className="text-blue-700 dark:text-blue-400 text-xs mt-1">Download a ZIP file containing all personal data, prescriptions, and lab reports for compliance.</p>
                                        </div>
                                        <button className="shrink-0 bg-blue-600 text-white px-6 py-3.5 rounded-xl font-bold hover:bg-blue-700 shadow-md flex items-center gap-2 text-sm transition-transform active:scale-95">
                                            <FaDownload /> Download Data
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* --- 5. APP PREFERENCES (Public) --- */}
                            {activeTab === "Preferences" && (
                                <div className="space-y-8">
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-4">Appearance & Accessibility</h2>

                                    {/* Custom Dark Mode Toggle */}
                                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl border border-gray-100 dark:border-gray-600">
                                        <div className="pr-4">
                                            <p className="font-bold text-gray-900 dark:text-white text-sm">Dark Mode</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Switch the app theme to dark mode (Syncs with sidebar).</p>
                                        </div>
                                        <button
                                            onClick={toggleTheme}
                                            className={`text-3xl transition-colors shrink-0 ${isDarkMode ? 'text-blue-600' : 'text-gray-300'}`}
                                        >
                                            {isDarkMode ? <FaToggleOn /> : <FaToggleOff />}
                                        </button>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="font-bold text-gray-800 dark:text-gray-200 text-sm mr-4">Language Selection</label>
                                        <select className="w-full md:w-1/2 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm outline-none focus:ring-2 focus:ring-blue-500">
                                            <option>English (US)</option>
                                            <option>Hindi (हिंदी)</option>
                                        </select>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Applies to UI text and AI Report Translations.</p>
                                    </div>
                                </div>
                            )}

                            {/* --- 6. BILLING & PAYMENTS (Requires Auth) --- */}
                            {isAuthenticated && activeTab === "Billing" && (
                                <div className="space-y-8">
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-4">Billing & Payments</h2>

                                    <div className="space-y-4">
                                        <h3 className="font-bold text-gray-800 dark:text-gray-200 text-sm">Saved Payment Methods</h3>
                                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-2xl border border-gray-200 dark:border-gray-600 flex justify-between items-center">
                                            <div className="flex gap-4 items-center">
                                                <div className="w-12 h-8 bg-blue-100 text-blue-800 rounded flex items-center justify-center text-xs font-black">UPI</div>
                                                <div>
                                                    <p className="font-bold text-gray-900 dark:text-white text-sm">gaurav@okicici</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">Fast checkout for Medical Store</p>
                                                </div>
                                            </div>
                                            <button className="text-red-500 text-xs font-bold hover:underline">Remove</button>
                                        </div>
                                        <button className="w-full border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 py-4 rounded-2xl font-bold hover:border-blue-500 hover:text-blue-500 transition-colors text-sm flex items-center justify-center gap-2">
                                            <FaCreditCard /> Add New Card / UPI
                                        </button>
                                    </div>

                                    <div className="space-y-2 pt-4 border-t border-gray-100 dark:border-gray-700">
                                        <label className="font-bold text-gray-800 dark:text-gray-200 text-sm">Refund Preference</label>
                                        <select className="w-full md:w-1/2 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm outline-none focus:ring-2 focus:ring-blue-500">
                                            <option>Original Payment Source (5-7 Days)</option>
                                            <option>MEDCARE Wallet (Instant)</option>
                                        </select>
                                    </div>
                                </div>
                            )}

                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
};

export default Settings;