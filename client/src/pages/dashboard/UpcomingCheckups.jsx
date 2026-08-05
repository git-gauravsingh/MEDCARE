import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCalendarCheck, FaArrowLeft, FaUserMd, FaMapMarkerAlt, FaClock, FaVideo } from "react-icons/fa";

const UpcomingCheckups = () => {
    // Dummy Data
    const appointments = [
        { id: 1, doc: "Dr. Arjun Mehta", spec: "Cardiologist", date: "21 May 2026", time: "11:30 AM", place: "City Care Hospital", type: "In-Person", status: "Confirmed" },
        { id: 2, doc: "Dr. Neha Sharma", spec: "Dermatologist", date: "24 May 2026", time: "02:00 PM", place: "Metro Clinic", type: "Video Consult", status: "Confirmed" },
        { id: 3, doc: "Dr. Rohan Verma", spec: "Neurologist", date: "02 Jun 2026", time: "10:00 AM", place: "Brain & Spine Center", type: "In-Person", status: "Pending" }
    ];

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 lg:p-8 w-full min-h-screen bg-[#F8FAFC] dark:bg-gray-900 transition-colors duration-300">
            
            <div className="flex items-center gap-4 mb-8">
                <Link to="/dashboard" className="p-2 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:text-blue-600 transition-colors">
                    <FaArrowLeft />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <FaCalendarCheck className="text-blue-600" /> All Upcoming Checkups
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">View and manage all your scheduled appointments.</p>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="space-y-4">
                    {appointments.map((apt) => (
                        <div key={apt.id} className="flex flex-col md:flex-row items-start md:items-center gap-4 p-5 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 bg-gray-50 dark:bg-gray-700/50">
                            
                            <div className="flex gap-4 items-center flex-1">
                                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center text-gray-400 text-xl shrink-0"><FaUserMd /></div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white text-lg">{apt.doc}</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{apt.spec}</p>
                                </div>
                            </div>

                            <div className="flex-1 w-full space-y-1">
                                <p className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2 font-medium">
                                    <FaClock className="text-blue-500" /> {apt.date} at {apt.time}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                                    {apt.type === "Video Consult" ? <FaVideo className="text-red-400" /> : <FaMapMarkerAlt className="text-red-400" />} {apt.place}
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto shrink-0 mt-4 md:mt-0">
                                <span className={`px-3 py-1.5 rounded-lg text-xs font-bold text-center flex items-center justify-center ${apt.status === 'Confirmed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                                    {apt.status}
                                </span>
                                <button className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default UpcomingCheckups;