import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import {
    FaMapMarkerAlt,
    FaStar,
    FaAmbulance,
    FaUserMd,
    FaDirections,
    FaPhoneAlt,
    FaArrowRight
} from "react-icons/fa";

const Hospitals = () => {
    const [currentLocation, setCurrentLocation] = useState("Patna, Bihar");
    const [hospitals, setHospitals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Backend se data fetch karne ke liye useEffect
    useEffect(() => {
        const fetchHospitals = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/hospitals");
                setHospitals(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching hospitals:", err);
                setError("Failed to load hospitals. Please try again later.");
                setLoading(false);
            }
        };

        fetchHospitals();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-900 flex justify-center items-center text-xl dark:text-white">
                <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></span> Loading Hospitals...
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-900 flex justify-center items-center text-xl text-red-500">
                {error}
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="p-4 lg:p-8 w-full flex flex-col bg-[#F8FAFC] dark:bg-gray-900 min-h-screen font-sans text-gray-800 dark:text-gray-200 transition-colors duration-300"
        >
            {/* TOP HEADER SECTION */}
            <div className="border-t-4 border-b border-gray-800 dark:border-gray-600 py-6 px-4 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-gray-800 shadow-sm mt-4 rounded-xl">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-extrabold uppercase tracking-wide text-blue-900 dark:text-blue-400">
                        Hospitals Near You
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Showing top-rated medical facilities in {currentLocation}.
                    </p>
                </div>
            </div>

            {/* HOSPITALS LIST */}
            <div className="flex flex-col gap-10">
                {hospitals.map((hospital) => (
                    <div key={hospital._id} className="flex flex-col">
                        <div className="border-t-2 border-gray-300 dark:border-gray-700 w-full mb-6"></div>

                        <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">

                            {/* Hospital Title & Basic Info */}
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                                <div>
                                    <Link to={`/hospital/${hospital._id}`} className="hover:underline decoration-blue-500">
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 hover:text-blue-500 transition-colors">
                                            {hospital.name}
                                        </h2>
                                    </Link>
                                    <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
                                        <span className="flex items-center gap-1 text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-md">
                                            <FaMapMarkerAlt className="text-gray-400 dark:text-gray-500" /> {hospital.address}, {hospital.city}
                                        </span>
                                        <span className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 px-3 py-1 rounded-md border border-yellow-100 dark:border-yellow-900/30">
                                            <FaStar /> {hospital.rating || "N/A"} Rating
                                        </span>
                                        {/* Checking if facilities include 24/7 Emergency */}
                                        {hospital.facilities && hospital.facilities.includes("24/7 Emergency") && (
                                            <span className="flex items-center gap-1 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-3 py-1 rounded-md border border-red-100 dark:border-red-900/30">
                                                <FaAmbulance /> 24/7 Emergency
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex gap-2 w-full md:w-auto">
                                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-5 py-2.5 rounded-lg font-bold hover:bg-blue-100 dark:hover:bg-blue-900/50 active:scale-95 transition-all">
                                        <FaPhoneAlt /> Call
                                    </button>
                                    <Link to={`/hospital/${hospital._id}`} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-blue-700 active:scale-95 transition-all shadow-md">
                                        View Details <FaArrowRight />
                                    </Link>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Bullet Points Section */}
                                <div className="bg-blue-50/50 dark:bg-blue-900/10 p-5 rounded-xl border border-blue-100/50 dark:border-blue-800/30">
                                    <h3 className="font-bold text-gray-800 dark:text-white mb-3 uppercase tracking-wider text-sm border-b dark:border-gray-700 pb-2">Hospital Brief</h3>
                                    <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                                        {hospital.brief && hospital.brief.length > 0 ? (
                                            hospital.brief.map((point, index) => (
                                                <li key={index} className="leading-relaxed">{point}</li>
                                            ))
                                        ) : (
                                            <li>No brief details available.</li>
                                        )}
                                    </ul>
                                </div>

                                {/* Top Doctors Preview Section */}
                                <div className="bg-gray-50 dark:bg-gray-700/50 p-5 rounded-xl border border-gray-100 dark:border-gray-700">
                                    <h3 className="font-bold text-gray-800 dark:text-white mb-3 uppercase tracking-wider text-sm border-b dark:border-gray-600 pb-2 flex items-center gap-2">
                                        <FaUserMd className="text-blue-500" /> TOP DOCTORS AVAILABLE
                                    </h3>

                                    <div className="flex flex-col gap-3 mt-4">
                                        {hospital.doctors && hospital.doctors.length > 0 ? (
                                            hospital.doctors.slice(0, 3).map((doc) => (
                                                <Link
                                                    to={`/doctor/${doc._id}`}
                                                    key={doc._id}
                                                    className="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-sm cursor-pointer active:scale-[0.98] transition-all group"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-500 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                            <FaUserMd />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-gray-800 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                                {doc.name}
                                                            </h4>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400">{doc.specialty}</p>
                                                        </div>
                                                    </div>
                                                    {/* Ye raha tumhara Book Slot ka button */}
                                                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-md group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                        Book Slot
                                                    </span>
                                                </Link>
                                            ))
                                        ) : (
                                            <p className="text-sm text-gray-500 dark:text-gray-400 italic">Click on 'View Details' to see available doctors.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="border-b-4 border-gray-800 dark:border-gray-600 w-full mt-6"></div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default Hospitals;