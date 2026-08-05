import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import {
    FaMapMarkerAlt,
    FaStar,
    FaUserMd,
    FaDirections,
    FaPhoneAlt,
    FaClock,
    FaSearch,
    FaClinicMedical,
    FaMap,
    FaList,
    FaWheelchair,
    FaParking,
    FaPrescriptionBottleAlt,
    FaWifi
} from "react-icons/fa";

const Clinics = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeSpecialty, setActiveSpecialty] = useState("All");
    const [isMapView, setIsMapView] = useState(false);
    
    // Naye state variables backend ke liye
    const [clinics, setClinics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const specialties = ["All", "Dental", "Eye", "Skin", "General", "Physiotherapy"];

    // Backend se data fetch karna
    useEffect(() => {
        const fetchClinics = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/clinics");
                setClinics(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching clinics:", err);
                setError("Failed to load clinics. Please try again later.");
                setLoading(false);
            }
        };

        fetchClinics();
    }, []);

    // Filter Logic
    const filteredClinics = clinics.filter(clinic => {
        const matchesCategory = activeSpecialty === "All" || clinic.category === activeSpecialty;
        const matchesSearch = clinic.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              clinic.address.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Helper to render the correct facility icon
    const renderFacilityIcon = (facility) => {
        const normalizedFacility = facility.toLowerCase();
        if (normalizedFacility.includes('parking')) return <span title="Free Parking" className="flex items-center gap-1"><FaParking className="text-blue-500" /> Parking</span>;
        if (normalizedFacility.includes('wheelchair') || normalizedFacility.includes('accessible')) return <span title="Wheelchair Accessible" className="flex items-center gap-1"><FaWheelchair className="text-blue-500" /> Accessible</span>;
        if (normalizedFacility.includes('pharmacy')) return <span title="In-house Pharmacy" className="flex items-center gap-1"><FaPrescriptionBottleAlt className="text-blue-500" /> Pharmacy</span>;
        if (normalizedFacility.includes('wifi')) return <span title="Free WiFi" className="flex items-center gap-1"><FaWifi className="text-blue-500" /> WiFi</span>;
        return <span className="flex items-center gap-1">{facility}</span>;
    };

    if (loading) return <div className="min-h-screen flex justify-center items-center text-xl dark:text-white"><span className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></span> Loading Clinics...</div>;
    if (error) return <div className="min-h-screen flex justify-center items-center text-xl text-red-500">{error}</div>;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="p-4 lg:p-8 w-full flex flex-col gap-6 bg-[#F8FAFC] dark:bg-gray-900 min-h-screen font-sans text-gray-800 dark:text-gray-200 transition-colors duration-300"
        >
            {/* HEADER, SEARCH & MAP TOGGLE */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                        <FaClinicMedical className="text-blue-600 dark:text-blue-400" /> Nearby Clinics
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Find specialized care centers in your area.</p>
                </div>

                <div className="flex flex-col md:flex-row w-full xl:w-auto gap-4 items-center">
                    {/* Search Bar */}
                    <div className="relative flex-1 w-full md:w-72">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search clinics, areas..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all"
                        />
                    </div>

                    {/* Map / List View Toggle */}
                    <div className="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-xl w-full md:w-auto">
                        <button
                            onClick={() => setIsMapView(false)}
                            className={`flex-1 flex justify-center items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium transition-all ${!isMapView ? 'bg-white dark:bg-gray-800 shadow text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                        >
                            <FaList /> List
                        </button>
                        <button
                            onClick={() => setIsMapView(true)}
                            className={`flex-1 flex justify-center items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium transition-all ${isMapView ? 'bg-white dark:bg-gray-800 shadow text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                        >
                            <FaMap /> Map
                        </button>
                    </div>
                </div>
            </div>

            {/* SPECIALTY FILTER PILLS */}
            {!isMapView && (
                <div className="flex items-center gap-3 overflow-x-auto p-5 scrollbar-auto">
                    {specialties.map((specialty, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveSpecialty(specialty)}
                            className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all active:scale-95 ${activeSpecialty === specialty
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-blue-200 dark:hover:border-blue-800'
                                }`}
                        >
                            {specialty}
                        </button>
                    ))}
                </div>
            )}

            {/* MAIN CONTENT AREA */}
            {isMapView ? (
                // --- MAP VIEW UI ---
                <div className="flex flex-col lg:flex-row gap-6 h-[600px]">
                    <div className="w-full lg:w-1/3 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col overflow-hidden h-full">
                        <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                            <h3 className="font-bold text-gray-800 dark:text-white">{filteredClinics.length} Clinics Found</h3>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {filteredClinics.map(clinic => (
                                <Link to={`/clinic/${clinic._id}`} key={clinic._id} className="block border border-gray-100 dark:border-gray-700 p-4 rounded-xl hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-sm cursor-pointer transition-all">
                                    <h4 className="font-bold text-gray-900 dark:text-white">{clinic.name}</h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 my-1">{clinic.address}, {clinic.city}</p>
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded">{clinic.category}</span>
                                        <span className="flex items-center gap-1 text-yellow-500 text-xs font-bold"><FaStar /> {clinic.rating}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="w-full lg:w-2/3 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/30 flex flex-col items-center justify-center relative overflow-hidden h-full">
                        <div className="absolute inset-0 opacity-20 dark:opacity-10" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                        <FaMapMarkerAlt className="text-6xl text-blue-400 dark:text-blue-500 mb-4 animate-bounce relative z-10" />
                        <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-300 relative z-10">Map View Enabled</h2>
                        <p className="text-blue-600 dark:text-blue-400 mt-2 relative z-10">Interactive map integration will appear here.</p>
                    </div>
                </div>
            ) : (
                // --- LIST VIEW UI ---
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
                    {filteredClinics.length > 0 ? (
                        filteredClinics.map((clinic) => (
                            <div key={clinic._id} className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">

                                {/* Clinic Header */}
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{clinic.name}</h2>
                                            <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full">{clinic.category}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mb-2">
                                            <FaMapMarkerAlt className="text-gray-400 dark:text-gray-500" />
                                            <span>{clinic.address}</span>
                                            <span className="mx-1">•</span>
                                            <span className="font-medium text-gray-700 dark:text-gray-300">{clinic.distance || clinic.city}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="flex items-center gap-1 text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded text-sm font-bold">
                                            <FaStar /> {clinic.rating || 4.5}
                                        </span>
                                        <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">({clinic.reviewCount || 0} reviews)</span>
                                    </div>
                                </div>

                                {/* Timings & Status */}
                                <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/50 p-3 rounded-xl border border-gray-100 dark:border-gray-700 mb-4 text-sm">
                                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                        <FaClock className="text-gray-400 dark:text-gray-500" />
                                        <span>{clinic.openingHours || "09:00 AM - 08:00 PM"}</span>
                                    </div>
                                    <span className={`px-2 py-1 rounded-md text-xs font-bold ${clinic.isOpenNow ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'}`}>
                                        {clinic.isOpenNow ? "OPEN NOW" : "CLOSED"}
                                    </span>
                                </div>

                                {/* Facility Icons */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {clinic.facilities && clinic.facilities.map((facility, idx) => (
                                        <div key={idx} className="bg-blue-50/50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 text-gray-600 dark:text-gray-300 px-2.5 py-1 rounded-lg text-xs font-medium">
                                            {renderFacilityIcon(facility)}
                                        </div>
                                    ))}
                                </div>

                                {/* Doctors Section */}
                                <div className="mb-6 flex-1">
                                    <h3 className="font-bold text-sm text-gray-800 dark:text-white mb-3 uppercase tracking-wider">Available Doctors</h3>
                                    <div className="flex flex-col gap-3">
                                        {clinic.doctorsList && clinic.doctorsList.slice(0, 2).map((doc) => (
                                            <Link to={`/doctor/${doc._id}`} key={doc._id} className="flex items-center justify-between bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-3 rounded-xl hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-sm transition-all group">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-500 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                        <FaUserMd />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-sm text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{doc.name}</h4>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">{doc.specialty}</p>
                                                    </div>
                                                </div>
                                                <button className="text-blue-600 dark:text-blue-400 text-xs font-bold px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/30 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                    Profile
                                                </button>
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col gap-2 mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                                    <Link to={`/clinic/${clinic._id}`} className="w-full flex items-center justify-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 py-2.5 rounded-xl font-bold hover:bg-blue-100 dark:hover:bg-blue-900/50 active:scale-95 transition-all text-sm">
                                        Explore Clinic Details
                                    </Link>
                                    <div className="flex gap-2">
                                        <button className="flex-1 flex items-center justify-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 py-2.5 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-gray-700 active:scale-95 transition-all text-sm">
                                            <FaPhoneAlt /> Call
                                        </button>
                                        <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-xl font-bold hover:bg-blue-700 active:scale-95 transition-all shadow-md text-sm">
                                            <FaDirections /> Get Directions
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-12 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
                            <FaClinicMedical className="text-4xl mb-4 opacity-50" />
                            <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400">No clinics found</h3>
                            <p className="text-sm">Try adjusting your search query or specialty filter.</p>
                        </div>
                    )}
                </div>
            )}
        </motion.div>
    );
};

export default Clinics;