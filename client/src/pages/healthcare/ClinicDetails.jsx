import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import {
    FaMapMarkerAlt, FaStar, FaUserMd, FaDirections, FaPhoneAlt, FaClock,
    FaArrowLeft, FaWheelchair, FaParking, FaPrescriptionBottleAlt, FaWifi, FaCheckCircle
} from "react-icons/fa";

const ClinicDetails = () => {
    const { id } = useParams();

    // Naye state variables
    const [clinic, setClinic] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Backend se specific clinic fetch karna
    useEffect(() => {
        const fetchClinicDetails = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/clinics/${id}`
                );
                setClinic(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching clinic details:", err);
                setError("Clinic not found or server error.");
                setLoading(false);
            }
        };

        fetchClinicDetails();
    }, [id]);

    const renderFacilityIcon = (facility) => {
        const normalizedFacility = facility.toLowerCase();
        if (normalizedFacility.includes('parking')) return <span className="flex items-center gap-2"><FaParking className="text-blue-500" /> {facility}</span>;
        if (normalizedFacility.includes('wheelchair') || normalizedFacility.includes('accessible')) return <span className="flex items-center gap-2"><FaWheelchair className="text-blue-500" /> {facility}</span>;
        if (normalizedFacility.includes('pharmacy')) return <span className="flex items-center gap-2"><FaPrescriptionBottleAlt className="text-blue-500" /> {facility}</span>;
        if (normalizedFacility.includes('wifi')) return <span className="flex items-center gap-2"><FaWifi className="text-blue-500" /> {facility}</span>;
        return <span className="flex items-center gap-2 text-gray-700">{facility}</span>;
    };

    if (loading) return <div className="min-h-screen flex justify-center items-center text-xl dark:text-white"><span className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></span> Loading Clinic Details...</div>;
    if (error) return <div className="min-h-screen flex flex-col justify-center items-center text-xl text-red-500">{error}<br /><Link to="/clinics" className="text-blue-500 underline text-sm mt-4">Back to Clinics</Link></div>;
    if (!clinic) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="p-4 lg:p-8 w-full flex flex-col gap-6 bg-[#F8FAFC] dark:bg-gray-900 min-h-screen font-sans text-gray-800 dark:text-gray-200"
        >
            {/* BACK BUTTON */}
            <div>
                <Link to="/clinics" className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium text-sm">
                    <FaArrowLeft /> Back to Clinics
                </Link>
            </div>

            {/* CLINIC HERO SECTION */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col lg:flex-row gap-8 items-start">
                <div className="w-full lg:w-1/3 h-64 bg-gray-200 dark:bg-gray-700 rounded-2xl flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-gray-50 dark:from-blue-900/20 dark:to-gray-800 opacity-50"></div>
                    <span className="z-10 font-medium">Clinic Image</span>
                </div>

                <div className="flex-1 w-full">
                    <div className="flex justify-between items-start mb-2">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{clinic.name}</h1>
                        <span className="flex items-center gap-1 text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 px-3 py-1 rounded-lg text-sm font-bold border border-yellow-100 dark:border-yellow-900/30">
                            <FaStar /> {clinic.rating || 4.5} ({clinic.reviewCount || 0})
                        </span>
                    </div>

                    <span className="inline-block text-xs font-bold uppercase tracking-wider bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full mb-4">
                        {clinic.category} Center
                    </span>

                    <div className="flex flex-col gap-3 text-sm text-gray-600 dark:text-gray-300 mb-6 border-y border-gray-100 dark:border-gray-700 py-4">
                        <div className="flex items-center gap-2">
                            <FaMapMarkerAlt className="text-gray-400 text-lg" />
                            <span>{clinic.address}, {clinic.city} <span className="font-bold ml-1 text-gray-800 dark:text-gray-100">({clinic.distance || ''})</span></span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaClock className="text-gray-400 text-lg" />
                            <span>{clinic.openingHours}</span>
                            <span className={`ml-2 px-2 py-0.5 rounded text-[10px] font-bold ${clinic.isOpenNow ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'}`}>
                                {clinic.isOpenNow ? "OPEN NOW" : "CLOSED"}
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 active:scale-95 transition-all shadow-md text-sm">
                            <FaDirections /> Get Directions
                        </button>
                        <button className="flex items-center justify-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 px-6 py-3 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-gray-700 active:scale-95 transition-all text-sm">
                            <FaPhoneAlt /> Call Clinic
                        </button>
                    </div>
                </div>
            </div>

            {/* DETAILS GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* LEFT COLUMN */}
                <div className="lg:col-span-1 flex flex-col gap-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3 border-b border-gray-100 dark:border-gray-700 pb-2">About the Clinic</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                            {clinic.about || "No description provided."}
                        </p>
                    </div>

                    {clinic.facilities && clinic.facilities.length > 0 && (
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-gray-700 pb-2">Facilities</h3>
                            <div className="flex flex-col gap-3">
                                {clinic.facilities.map((facility, idx) => (
                                    <div key={idx} className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {renderFacilityIcon(facility)}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* RIGHT COLUMN */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                        <FaUserMd className="text-blue-500" /> Doctors at this Clinic
                    </h3>

                    <div className="flex flex-col gap-4">
                        {clinic.doctorsList && clinic.doctorsList.length > 0 ? clinic.doctorsList.map((doc) => (
                            <div key={doc._id} className="flex flex-col sm:flex-row items-center justify-between bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-600 p-4 rounded-2xl hover:border-blue-300 dark:hover:border-blue-500 transition-colors gap-4">
                                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 w-full text-center sm:text-left">
                                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-500 dark:text-blue-400 text-2xl shrink-0">
                                        <FaUserMd />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                                            <h4 className="font-bold text-lg text-gray-900 dark:text-white">{doc.name}</h4>
                                            {doc.isVerified && <FaCheckCircle className="text-blue-500 text-sm" />}
                                        </div>
                                        <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">{doc.specialty}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                                            <span>Exp: {doc.experienceYears} Years</span>
                                            <span className="hidden sm:inline">•</span>
                                            <span>Consultation: <span className="font-bold text-gray-700 dark:text-gray-200">₹{doc.consultationFee}</span></span>
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 w-full sm:w-auto shrink-0">
                                    <button className="bg-blue-600 text-white px-5 py-2 rounded-lg font-bold text-sm hover:bg-blue-700 transition-colors text-center w-full">
                                        Book Slot
                                    </button>
                                    <Link to={`/doctor/${doc._id}`} className="border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 px-5 py-2 rounded-lg font-bold text-sm hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors text-center w-full">
                                        View Profile
                                    </Link>
                                </div>
                            </div>
                        )) : (
                            <p className="text-gray-500 dark:text-gray-400 italic">No doctors currently listed for this clinic.</p>
                        )}
                    </div>
                </div>

            </div>
        </motion.div>
    );
};

export default ClinicDetails; 