import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    FaCalendarCheck, FaUserMd, FaMapMarkerAlt, FaVideo,
    FaCheckCircle, FaClock, FaTimesCircle, FaFileDownload
} from "react-icons/fa";

const Appointments = () => {
    const [activeTab, setActiveTab] = useState("Today");

    const tabs = ["Today", "Upcoming", "Completed"];

    // Dummy Data for July 2026
    const appointmentsList = [
        {
            id: 1,
            doctor: "Dr. Arjun Mehta",
            specialty: "Cardiologist",
            date: "10 July 2026",
            time: "11:30 AM",
            type: "In-Clinic",
            location: "City Care Hospital, New Delhi",
            status: "Today",
            isOnline: false
        },
        {
            id: 2,
            doctor: "Dr. Neha Sharma",
            specialty: "Dermatologist",
            date: "10 July 2026",
            time: "04:00 PM",
            type: "Video Consult",
            location: "Online",
            status: "Today",
            isOnline: true
        },
        {
            id: 3,
            doctor: "Dr. Rohan Verma",
            specialty: "Neurologist",
            date: "15 July 2026",
            time: "10:00 AM",
            type: "In-Clinic",
            location: "Sunrise Hospital, New Delhi",
            status: "Upcoming",
            isOnline: false
        },
        {
            id: 4,
            doctor: "Dr. Priya Desai",
            specialty: "Dentist",
            date: "01 July 2026",
            time: "02:30 PM",
            type: "In-Clinic",
            location: "Perfect Teeth Clinic, New Delhi",
            status: "Completed",
            isOnline: false
        }
    ];

    const filteredAppointments = appointmentsList.filter(app => app.status === activeTab);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="p-4 lg:p-8 w-full flex flex-col gap-6 bg-[#F8FAFC] dark:bg-gray-900 min-h-screen font-sans text-gray-800 dark:text-gray-200 transition-colors duration-300"
        >
            {/* HEADER */}
            <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-colors">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
                        <FaCalendarCheck className="text-blue-600 dark:text-blue-400" /> My Appointments
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">Manage your upcoming visits and consultation history.</p>
                </div>
                <Link to="/doctors" className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 active:scale-95 transition-all shadow-md text-sm">
                    Book New Appointment
                </Link>
            </div>

            {/* TAB NAVIGATION */}
            <div className="flex bg-gray-200 dark:bg-gray-800 p-1 rounded-xl w-full max-w-md mx-auto md:mx-0 transition-colors border border-transparent dark:border-gray-700">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === tab
                                ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* APPOINTMENTS LIST */}
            <div className="flex flex-col gap-4 mt-2">
                {filteredAppointments.length > 0 ? (
                    filteredAppointments.map((app) => (
                        <div key={app.id} className="bg-white dark:bg-gray-800 rounded-3xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300 flex flex-col md:flex-row items-center gap-6">

                            {/* Date & Time Block */}
                            <div className="bg-blue-50 dark:bg-blue-900/20 w-full md:w-32 py-4 rounded-2xl flex flex-col items-center justify-center border border-blue-100 dark:border-blue-800/30 shrink-0">
                                <span className="text-blue-600 dark:text-blue-400 font-extrabold text-xl">{app.date.split(" ")[0]}</span>
                                <span className="text-blue-800 dark:text-blue-300 text-xs font-bold uppercase tracking-widest">{app.date.split(" ")[1]} {app.date.split(" ")[2]}</span>
                                <span className="text-gray-500 dark:text-gray-400 text-xs font-medium mt-1">{app.time}</span>
                            </div>

                            {/* Doctor Info */}
                            <div className="flex-1 w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-400 dark:text-gray-500 text-2xl shrink-0">
                                        <FaUserMd />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-lg text-gray-900 dark:text-white">{app.doctor}</h3>
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${app.isOnline
                                                    ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
                                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                                                }`}>
                                                {app.type}
                                            </span>
                                        </div>
                                        <p className="text-blue-600 dark:text-blue-400 font-medium text-sm">{app.specialty}</p>
                                        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-1">
                                            {app.isOnline ? <FaVideo className="text-purple-400" /> : <FaMapMarkerAlt className="text-gray-400" />}
                                            <span>{app.location}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Quick Actions */}
                                <div className="flex w-full md:w-auto gap-2">
                                    {activeTab === "Completed" ? (
                                        <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-xl text-xs font-bold hover:bg-gray-100 dark:hover:bg-gray-700 active:scale-95 transition-all">
                                            <FaFileDownload /> Prescription
                                        </button>
                                    ) : (
                                        <>
                                            <button className="flex-1 md:flex-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-xl text-xs font-bold hover:bg-gray-50 dark:hover:bg-gray-700 active:scale-95 transition-all">
                                                Reschedule
                                            </button>
                                            {app.isOnline && activeTab === "Today" && (
                                                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-purple-700 active:scale-95 transition-all shadow-sm">
                                                    <FaVideo /> Join Call
                                                </button>
                                            )}
                                        </>
                                    )}
                                    <Link to={`/appointment/${app.id}`} className="flex-1 md:flex-none bg-blue-600 text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-blue-700 active:scale-95 transition-all text-center flex items-center justify-center shadow-sm">
                                        View Details
                                    </Link>
                                </div>
                            </div>

                        </div>
                    ))
                ) : (
                    <div className="py-20 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
                        <FaClock className="text-5xl mb-4 opacity-30" />
                        <h3 className="text-xl font-bold text-gray-600 dark:text-gray-400">No {activeTab.toLowerCase()} appointments</h3>
                        <p className="text-sm mt-2">You have no appointments scheduled for this category.</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default Appointments;