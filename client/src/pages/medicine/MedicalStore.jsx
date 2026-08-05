import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    FaSearch, FaFilter, FaStar, FaPills, FaBolt
} from "react-icons/fa";

const MedicalStore = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");

    const categories = ["All", "Daily Essentials", "Diabetes Care", "Vitamins & Supplements", "Pain Relief", "Heart Health"];

    // Dummy Medicine Data
    const medicinesList = [
        {
            id: 1, name: "Paracetamol 650mg", category: "Daily Essentials", type: "Tablet",
            price: "₹45", oldPrice: "₹50", discount: "10% OFF",
            rating: "4.8", reviews: 1240, rxRequired: false, delivery: "Tomorrow, by 9 PM"
        },
        {
            id: 2, name: "Vitamin D3 60000 IU", category: "Vitamins & Supplements", type: "Capsule",
            price: "₹120", oldPrice: "₹140", discount: "14% OFF",
            rating: "4.7", reviews: 856, rxRequired: false, delivery: "Tomorrow, by 9 PM"
        },
        {
            id: 3, name: "Metformin 500mg", category: "Diabetes Care", type: "Tablet",
            price: "₹85", oldPrice: "₹100", discount: "15% OFF",
            rating: "4.6", reviews: 432, rxRequired: true, delivery: "Today, by 8 PM"
        },
        {
            id: 4, name: "Ibuprofen 400mg", category: "Pain Relief", type: "Tablet",
            price: "₹35", oldPrice: "₹45", discount: "22% OFF",
            rating: "4.5", reviews: 620, rxRequired: false, delivery: "Tomorrow, by 9 PM"
        },
        {
            id: 5, name: "Atorvastatin 20mg", category: "Heart Health", type: "Tablet",
            price: "₹150", oldPrice: "₹180", discount: "16% OFF",
            rating: "4.9", reviews: 310, rxRequired: true, delivery: "Today, by 8 PM"
        },
        {
            id: 6, name: "Cough Syrup (Sugar-Free)", category: "Daily Essentials", type: "Syrup",
            price: "₹110", oldPrice: "₹125", discount: "12% OFF",
            rating: "4.4", reviews: 890, rxRequired: false, delivery: "Tomorrow, by 9 PM"
        }
    ];

    // Filter Logic
    const filteredMedicines = medicinesList.filter(med => {
        const matchesCategory = activeCategory === "All" || med.category === activeCategory;
        const matchesSearch = med.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Helper to render sections
    const renderMedicineGrid = (meds, title, icon) => (
        <div className="mb-10">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                {icon} {title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {meds.map((med) => (
                    <div key={med.id} className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col relative group">

                        {/* Tags */}
                        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                            <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-bold px-2 py-1 rounded">{med.discount}</span>
                            {med.rxRequired && <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-[10px] font-bold px-2 py-1 rounded border border-red-200 dark:border-red-900/30">Rx Req</span>}
                        </div>

                        {/* Clickable Area for Details */}
                        <Link to={`/medicine/${med.id}`} className="block flex-1 cursor-pointer">
                            <div className="h-40 bg-gray-50 dark:bg-gray-700 rounded-xl mb-4 mt-6 flex items-center justify-center text-gray-300 dark:text-gray-500 text-5xl group-hover:scale-105 transition-transform duration-300">
                                <FaPills />
                            </div>

                            <h3 className="font-bold text-sm text-gray-900 dark:text-white leading-tight mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{med.name}</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{med.type}</p>

                            {/* Ratings on Main Card */}
                            <div className="flex items-center gap-2 mb-3">
                                <span className="flex items-center gap-1 bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                                    {med.rating} <FaStar className="text-[8px]" />
                                </span>
                                <span className="text-xs text-gray-400 dark:text-gray-500">({med.reviews} reviews)</span>
                            </div>

                            {/* Pricing */}
                            <div className="flex items-end gap-2 mb-2">
                                <span className="font-bold text-lg text-gray-900 dark:text-white">{med.price}</span>
                                <span className="text-xs text-gray-400 dark:text-gray-500 line-through mb-1">{med.oldPrice}</span>
                            </div>
                            <p className="text-[10px] text-gray-500 dark:text-gray-400 flex items-center gap-1 mb-4"><FaBolt className="text-yellow-500" /> Delivery: {med.delivery}</p>
                        </Link>

                        {/* Actions */}
                        <div className="flex gap-2 mt-auto">
                            <button className="flex-1 border border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 py-2 rounded-lg text-xs font-bold hover:bg-blue-50 dark:hover:bg-blue-900/20 active:scale-95 transition-all">Add to Cart</button>
                            <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-xs font-bold hover:bg-blue-700 active:scale-95 transition-all shadow-sm">Buy Now</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="p-4 lg:p-8 w-full flex flex-col bg-[#F8FAFC] dark:bg-gray-900 min-h-screen font-sans transition-colors duration-300"
        >
            {/* HERO & SEARCH */}
            <div className="bg-white dark:bg-gray-800 p-6 lg:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 mb-8 flex flex-col gap-6">
                <div className="w-full max-w-3xl">
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">MEDCARE Pharmacy</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">100% Genuine Medicines • Quick Delivery • Trusted by Millions</p>

                    <div className="flex w-full gap-2">
                        <div className="relative flex-1">
                            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search for medicines, health products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all text-sm"
                            />
                        </div>
                        <button className="bg-gray-100 dark:bg-gray-700 p-3 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 active:scale-95 transition-all text-gray-600 dark:text-gray-300">
                            <FaFilter />
                        </button>
                    </div>
                </div>
            </div>

            {/* CATEGORY PILLS */}
            <div className="flex items-center gap-3 overflow-x-auto p-7 mb-5 scrollbar-hide">
                {categories.map((category, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveCategory(category)}
                        className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all active:scale-95 border ${activeCategory === category
                                ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white shadow-md'
                                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* SECTIONS */}
            {filteredMedicines.length > 0 ? (
                <>
                    {/* If searching or filtering, show all results together */}
                    {activeCategory !== "All" || searchQuery !== "" ? (
                        renderMedicineGrid(filteredMedicines, "Search Results", <FaSearch className="text-blue-500" />)
                    ) : (
                        /* Default View: Organized by importance */
                        <>
                            {renderMedicineGrid(filteredMedicines.filter(m => m.category === "Daily Essentials"), "Daily Essentials", <FaBolt className="text-yellow-500" />)}
                            {renderMedicineGrid(filteredMedicines.filter(m => m.category !== "Daily Essentials"), "Shop by Category", <FaPills className="text-blue-500" />)}
                        </>
                    )}
                </>
            ) : (
                <div className="py-20 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
                    <FaSearch className="text-5xl mb-4 opacity-30" />
                    <h3 className="text-xl font-bold text-gray-600 dark:text-gray-400">No medicines found</h3>
                    <p className="text-sm mt-2">Try searching with a different salt name or brand.</p>
                </div>
            )}
        </motion.div>
    );
};

export default MedicalStore;