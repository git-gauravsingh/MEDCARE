import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    FaSearch,
    FaFilter,
    FaStar,
    FaMapMarkerAlt,
    FaUserMd,
    FaClock,
    FaCheckCircle,
    FaRegHeart,
    FaHeart
} from "react-icons/fa";

const Doctors = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [savedDoctors, setSavedDoctors] = useState([1, 4]);
    const [doctorsList, setDoctorsList] = useState([]);
    const [loading, setLoading] = useState(true);

    const categories = [
        "All", "Cardiologist", "Neurologist", "Dermatologist",
        "Pediatrician", "Orthopedic", "Dentist", "General Physician"
    ];

    // Fetch doctors from backend API
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/doctors");
                const data = await response.json();
                setDoctorsList(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching doctors:", error);
                setLoading(false);
            }
        };

        fetchDoctors();
    }, []);

    // Filter Logic
    const filteredDoctors = doctorsList.filter(doc => {
        const matchesCategory = activeCategory === "All" || doc.specialty?.toLowerCase() === activeCategory.toLowerCase();
        const matchesSearch = doc.name?.toLowerCase().includes(searchQuery.toLowerCase()) || doc.specialty?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const toggleSaveDoctor = (id, e) => {
        e.preventDefault();
        if (savedDoctors.includes(id)) {
            setSavedDoctors(savedDoctors.filter(docId => docId !== id));
        } else {
            setSavedDoctors([...savedDoctors, id]);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen text-gray-500 bg-[#F8FAFC] dark:bg-gray-900">
                Loading doctors...
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="p-4 lg:p-8 w-full flex flex-col gap-6 bg-[#F8FAFC] dark:bg-gray-900 transition-colors duration-300 min-h-screen"
        >
            {/* HEADER & SEARCH SECTION */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white">Find a Doctor</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Book appointments with top medical specialists.</p>
                </div>

                <div className="flex w-full md:w-auto gap-2">
                    <div className="relative flex-1 md:w-80">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search doctors, specialties..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all"
                        />
                    </div>
                    <button className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 active:scale-95 transition-all shadow-sm flex items-center justify-center text-gray-600 dark:text-gray-300">
                        <FaFilter />
                    </button>
                </div>
            </div>

            {/* CATEGORY PILLS (Scrollable horizontally) */}
            <div className="flex items-center gap-3 overflow-x-auto p-5 scrollbar-auto">
                {categories.map((category, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveCategory(category)}
                        className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all active:scale-95 ${activeCategory === category
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-blue-200 dark:hover:border-blue-800'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* DOCTORS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-2">
                {filteredDoctors.length > 0 ? (
                    filteredDoctors.map((doc) => {
                        const docId = doc._id || doc.id;
                        const isAvailable = doc.isAvailableToday ?? doc.available;
                        const experienceText = doc.experienceYears ? `${doc.experienceYears}+ Years Exp.` : (doc.experience || "Experience N/A");
                        const feeText = doc.consultationFee ? `₹${doc.consultationFee}` : (doc.fee || "₹500");
                        const ratingVal = doc.rating || "4.5";
                        const reviewCountVal = doc.reviewCount || doc.reviews || 0;
                        const slotsArr = doc.availableSlots || doc.slots || [];

                        return (
                            <div key={docId} className="bg-white dark:bg-gray-800 rounded-3xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative group">

                                {/* Favorite Button */}
                                <button
                                    onClick={(e) => toggleSaveDoctor(docId, e)}
                                    className="absolute top-5 right-5 text-xl active:scale-75 transition-transform z-10"
                                >
                                    {savedDoctors.includes(docId) ? <FaHeart className="text-red-500" /> : <FaRegHeart className="text-gray-300 dark:text-gray-600 hover:text-red-400" />}
                                </button>

                                {/* Doctor Info Header */}
                                <div className="flex gap-4 items-start mb-4">
                                    <div className="relative">
                                        <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-300 dark:text-blue-400 text-3xl group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
                                            <FaUserMd />
                                        </div>
                                        {isAvailable && (
                                            <span className="absolute -top-1 -right-1 bg-green-500 border-2 border-white dark:border-gray-800 w-4 h-4 rounded-full"></span>
                                        )}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <Link to={`/doctor/${docId}`} className="font-bold text-lg text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                                {doc.name}
                                            </Link>
                                            <FaCheckCircle className="text-blue-500 text-sm" title="Verified" />
                                        </div>
                                        <p className="text-blue-600 dark:text-blue-400 font-medium text-sm mb-1">{doc.specialty}</p>
                                        <p className="text-gray-500 dark:text-gray-400 text-xs mb-2">{experienceText}</p>
                                        <div className="flex items-center gap-1 text-xs">
                                            <FaStar className="text-yellow-400 text-sm" />
                                            <span className="font-bold text-gray-700 dark:text-gray-200">{ratingVal}</span>
                                            <span className="text-gray-400 dark:text-gray-500">({reviewCountVal} reviews)</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Location & Fee */}
                                <div className="flex flex-col gap-2 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-xl mb-4 border border-gray-100 dark:border-gray-700">
                                    <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                                        <FaMapMarkerAlt className="text-gray-400 shrink-0" />
                                        {doc.hospital && typeof doc.hospital === 'object' ? (
                                            <Link
                                                to={`/hospital/${doc.hospital._id}`}
                                                className="truncate text-blue-600 dark:text-blue-400 hover:underline font-medium"
                                            >
                                                {doc.hospital.name ? `${doc.hospital.name}, ${doc.hospital.city || ''}` : "View Hospital"}
                                            </Link>
                                        ) : doc.clinic && typeof doc.clinic === 'object' ? (
                                            <Link
                                                to={`/clinic/${doc.clinic._id}`}
                                                className="truncate text-blue-600 dark:text-blue-400 hover:underline font-medium"
                                            >
                                                {doc.clinic.name ? `${doc.clinic.name}, ${doc.clinic.city || ''}` : "View Clinic"}
                                            </Link>
                                        ) : (
                                            <span className="truncate">{doc.locationName || doc.location || "Patna, India"}</span>
                                        )}
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-500 dark:text-gray-400">Consultation Fee</span>
                                        <span className="font-bold text-gray-800 dark:text-white">{feeText}</span>
                                    </div>
                                </div>

                                {/* Quick Time Slots */}
                                {isAvailable && slotsArr.length > 0 ? (
                                    <div className="mb-4">
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-1"><FaClock className="text-gray-400" /> Available Today</p>
                                        <div className="flex gap-2 flex-wrap">
                                            {slotsArr.map((slot, i) => (
                                                <Link
                                                    to={`/book-appointment/${docId}?time=${slot}`}
                                                    key={i}
                                                    className="px-3 py-1.5 border border-blue-200 dark:border-blue-800/50 text-blue-600 dark:text-blue-400 rounded-lg text-xs font-medium hover:bg-blue-600 hover:text-white dark:hover:text-white active:scale-95 transition-all cursor-pointer"
                                                >
                                                    {slot}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="mb-4 py-1.5 px-3 bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 rounded-lg text-xs font-medium inline-block border border-red-100 dark:border-red-900/30">
                                        Not available today
                                    </div>
                                )}

                                {/* Main Action Buttons */}
                                <div className="flex gap-3 mt-auto">
                                    <Link to={`/doctor/${docId}`} className="flex-1 border border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 active:scale-95 transition-all text-center">
                                        View Profile
                                    </Link>
                                    <Link to={`/book-appointment/${docId}`} className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 shadow-md shadow-blue-200 dark:shadow-none active:scale-95 transition-all text-center">
                                        Book Now
                                    </Link>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="col-span-full py-12 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
                        <FaSearch className="text-4xl mb-4 opacity-50" />
                        <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400">No doctors found</h3>
                        <p className="text-sm">Try adjusting your filters or search query.</p>
                        <button
                            onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                            className="mt-4 text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default Doctors;