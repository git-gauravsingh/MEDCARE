import React, { useState, useEffect } from "react";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import {
    FaStethoscope, FaHospital, FaPills, FaRobot,
    FaUserCircle, FaBell, FaBars, FaHome, FaHeartbeat, FaClinicMedical,
    FaBlog, FaCalendarCheck, FaFileMedical, FaPhoneAlt, FaQuestionCircle,
    FaCog, FaMoon
} from "react-icons/fa";
import { MdOutlineLocalHospital } from "react-icons/md";
import { useTheme } from "../../context/ThemeContext";

const DashboardLayout = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const location = useLocation();
    const navigate = useNavigate();
    const { isDarkMode, toggleTheme } = useTheme();

    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const isAIAssistantRoute = location.pathname === "/ai-assistant";

    // Automatically collapse main sidebar on AI Assistant, and expand it everywhere else
    useEffect(() => {
        if (location.pathname === "/ai-assistant") {
            setIsSidebarCollapsed(true);
        } else {
            setIsSidebarCollapsed(false);
        }
    }, [location.pathname]);

    // Navigation Items
    const navItems = [
        { name: "Home", icon: <FaHome />, path: "/" },
        { name: "My Health", icon: <FaHeartbeat />, path: "/dashboard" },
        { name: "AI Assistant", icon: <FaRobot />, path: "/ai-assistant" },
        { name: "Doctors", icon: <FaStethoscope />, path: "/doctors" },
        { name: "Hospitals", icon: <FaHospital />, path: "/hospitals" },
        { name: "Clinics", icon: <FaClinicMedical />, path: "/clinics" },
        { name: "Medical Store", icon: <FaPills />, path: "/medicine" },
        { name: "Blogs", icon: <FaBlog />, path: "/blogs" },
        { name: "Appointments", icon: <FaCalendarCheck />, path: "/appointments" },
        { name: "Reports", icon: <FaFileMedical />, path: "/reports" },
    ];

    const bottomNavItems = [
        { name: "Contact", icon: <FaPhoneAlt />, path: "/contact" },
        { name: "Help", icon: <FaQuestionCircle />, path: "/help" },
        { name: "Settings", icon: <FaCog />, path: "/settings" },
    ];

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900 font-sans text-gray-800 transition-colors overflow-hidden">
            {/* DESKTOP SIDEBAR */}
            <aside className={`${isSidebarCollapsed ? 'w-20' : 'w-64'} hidden md:flex flex-col bg-white dark:bg-gray-800 border-r dark:border-gray-700 shadow-sm transition-all duration-300 z-20`}>
                <div className={`p-5 flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between'} border-b dark:border-gray-700`}>
                    {!isSidebarCollapsed && (
                        <h1 className="text-xl font-bold text-blue-600 flex items-center gap-2">
                            <MdOutlineLocalHospital className="text-2xl" /> MEDCARE
                        </h1>
                    )}
                    {isSidebarCollapsed && <MdOutlineLocalHospital className="text-3xl text-blue-600 cursor-pointer hover:scale-105" onClick={() => setIsSidebarCollapsed(false)} />}
                </div>

                <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-1 px-3 scrollbar-hide">
                    {navItems.map((item, index) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link key={index} to={item.path} title={isSidebarCollapsed ? item.name : ""} className={`flex items-center ${isSidebarCollapsed ? 'justify-center p-3' : 'px-4 py-3 gap-4'} rounded-lg transition-all duration-200 active:scale-95 ${isActive ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'}`}>
                                <span className="text-lg">{item.icon}</span>
                                {!isSidebarCollapsed && <span className="font-medium">{item.name}</span>}
                            </Link>
                        );
                    })}
                    <hr className="my-4 border-gray-100 dark:border-gray-700" />
                    {bottomNavItems.map((item, index) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link key={index} to={item.path} title={isSidebarCollapsed ? item.name : ""} className={`flex items-center ${isSidebarCollapsed ? 'justify-center p-3' : 'px-4 py-3 gap-4'} rounded-lg transition-all duration-200 active:scale-95 ${isActive ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'}`}>
                                <span className="text-lg">{item.icon}</span>
                                {!isSidebarCollapsed && <span className="font-medium">{item.name}</span>}
                            </Link>
                        );
                    })}
                </div>

                <div className={`p-4 border-t dark:border-gray-700 flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
                    {!isSidebarCollapsed && <span className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center gap-2"><FaMoon /> Dark Mode</span>}

                    {isSidebarCollapsed && (
                        <button onClick={toggleTheme} className={`transition-colors ${isDarkMode ? 'text-blue-600' : 'text-gray-500'}`}>
                            <FaMoon />
                        </button>
                    )}

                    {!isSidebarCollapsed && (
                        <div onClick={toggleTheme} className={`w-10 h-5 rounded-full flex items-center p-1 cursor-pointer transition-colors duration-300 ${isDarkMode ? 'bg-blue-600' : 'bg-gray-300'}`}>
                            <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${isDarkMode ? 'translate-x-4' : 'translate-x-0'}`}></div>
                        </div>
                    )}
                </div>
            </aside>

            {/* MOBILE SIDEBAR OVERLAY */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
                    <aside className="w-64 h-full bg-white dark:bg-gray-800 flex flex-col shadow-xl p-5" onClick={(e) => e.stopPropagation()}>
                        <h1 className="text-2xl font-bold text-blue-600 mb-8 flex items-center gap-2"><MdOutlineLocalHospital /> MEDCARE</h1>
                        <nav className="flex flex-col gap-2 flex-1 overflow-y-auto">
                            {navItems.map((item, idx) => (
                                <Link key={idx} to={item.path} onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-4 px-4 py-3 rounded-lg ${location.pathname === item.path ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                                    {item.icon} {item.name}
                                </Link>
                            ))}
                        </nav>
                    </aside>
                </div>
            )}

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 flex flex-col h-full overflow-hidden bg-[#F8FAFC] dark:bg-gray-900 transition-colors">
                
                {/* NAVBAR */}
                <header className="bg-white dark:bg-gray-800 p-4 lg:px-8 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center shadow-sm shrink-0 z-10">
                    <div className="flex items-center gap-4">
                        <button onClick={() => { window.innerWidth >= 768 ? setIsSidebarCollapsed(!isSidebarCollapsed) : setIsMobileMenuOpen(true); }} className="text-gray-500 dark:text-gray-300 hover:text-blue-600 text-2xl p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors active:scale-90">
                            <FaBars />
                        </button>
                    </div>
                    
                    <div className="flex items-center gap-3 lg:gap-6">
                        {/* Dynamic Pills synced with routing */}
                        <div className="gap-2 hidden sm:flex items-center rounded-full p-1 cursor-pointer">
                            <button 
                                onClick={() => navigate('/')} 
                                className={`px-5 lg:px-8 py-2 rounded-full text-sm font-medium transition-all ${!isAIAssistantRoute ? 'bg-blue-600 shadow text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                            >
                                Home
                            </button>
                            <button 
                                onClick={() => navigate('/ai-assistant')} 
                                className={`px-5 lg:px-8 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all ${isAIAssistantRoute ? 'bg-blue-600 text-white shadow' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                            >
                                <FaRobot /> AI Assistant
                            </button>
                        </div>

                        <FaBell className="text-gray-500 dark:text-gray-300 text-xl hover:text-blue-600 cursor-pointer" />
                        
                        {/* CONDITIONAL AUTH UI */}
                        {isAuthenticated ? (
                            <Link to="/settings" className="flex items-center gap-3 border-l border-gray-200 dark:border-gray-600 pl-4 cursor-pointer hover:opacity-80 transition-opacity" title="Go to Profile">
                                <FaUserCircle className="text-gray-400 text-3xl" />
                                <span className="font-medium text-sm hidden lg:block text-gray-800 dark:text-gray-200">Gaurav Singh</span>
                            </Link>
                        ) : (
                            <div className="flex items-center border-l border-gray-200 dark:border-gray-600 pl-4">
                                <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-sm font-bold shadow-sm transition-colors">
                                    Login / Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;