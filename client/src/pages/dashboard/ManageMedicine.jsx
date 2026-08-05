import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    FaPills, FaPlus, FaTrash, FaArrowLeft, FaClock,
    FaCalendarDay, FaSun, FaMoon, FaCoffee
} from "react-icons/fa";

const ManageMedicine = () => {
    // State for existing medicines
    const [medicines, setMedicines] = useState([
        { id: 1, name: "Vitamin D3", timing: ["After Breakfast"], frequency: "Weekly", daysGap: 7 },
        { id: 2, name: "Paracetamol", timing: ["Afternoon", "Night"], frequency: "As needed", daysGap: 0 }
    ]);

    // State for new medicine form
    const [newMed, setNewMed] = useState({ name: "", frequency: "Daily", customGap: "" });
    const [selectedTimings, setSelectedTimings] = useState([]);

    const timings = [
        { label: "Empty Stomach (Morning)", icon: <FaCoffee /> },
        { label: "After Breakfast", icon: <FaSun /> },
        { label: "Afternoon", icon: <FaSun className="text-orange-500" /> },
        { label: "Evening", icon: <FaMoon className="text-indigo-400" /> },
        { label: "Night (Before Bed)", icon: <FaMoon /> }
    ];

    const toggleTiming = (timing) => {
        if (selectedTimings.includes(timing)) {
            setSelectedTimings(selectedTimings.filter(t => t !== timing));
        } else {
            setSelectedTimings([...selectedTimings, timing]);
        }
    };

    const handleAddMedicine = (e) => {
        e.preventDefault();
        if (!newMed.name || selectedTimings.length === 0) return;

        const medicineEntry = {
            id: Date.now(),
            name: newMed.name,
            timing: selectedTimings,
            frequency: newMed.frequency,
            daysGap: newMed.frequency === "Custom Gap" ? newMed.customGap : 0
        };

        setMedicines([...medicines, medicineEntry]);
        setNewMed({ name: "", frequency: "Daily", customGap: "" });
        setSelectedTimings([]);
    };

    const handleRemoveMedicine = (id) => {
        setMedicines(medicines.filter(med => med.id !== id));
    };

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 lg:p-8 w-full min-h-screen bg-[#F8FAFC] dark:bg-gray-900 transition-colors duration-300 pb-20">

            <div className="flex items-center gap-4 mb-8">
                <Link to="/dashboard" className="p-2 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:text-blue-600 transition-colors">
                    <FaArrowLeft />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <FaPills className="text-blue-600" /> Manage Medications
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Add, remove, and schedule your daily doses.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                {/* LEFT: Add New Medicine Form */}
                <div className="xl:col-span-1">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <h2 className="font-bold text-lg text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-gray-700 pb-2">Add New Medicine</h2>

                        <form onSubmit={handleAddMedicine} className="space-y-5">
                            <div>
                                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Medicine Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Calcium Sandoz"
                                    value={newMed.name}
                                    onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
                                    className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2 block">Time of Day</label>
                                <div className="space-y-2">
                                    {timings.map((time, idx) => (
                                        <button
                                            key={idx} type="button"
                                            onClick={() => toggleTiming(time.label)}
                                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${selectedTimings.includes(time.label) ? 'bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900/30 dark:border-blue-500 dark:text-blue-300' : 'bg-gray-50 border-gray-200 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'}`}
                                        >
                                            {time.icon} {time.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Frequency</label>
                                <select
                                    value={newMed.frequency}
                                    onChange={(e) => setNewMed({ ...newMed, frequency: e.target.value })}
                                    className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                >
                                    <option>Daily</option>
                                    <option>Alternate Days</option>
                                    <option>Custom Gap</option>
                                    <option>As needed</option>
                                </select>
                            </div>

                            {newMed.frequency === "Custom Gap" && (
                                <div>
                                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Gap in Days</label>
                                    <input
                                        type="number"
                                        placeholder="e.g. 3 (Take every 3rd day)"
                                        value={newMed.customGap}
                                        onChange={(e) => setNewMed({ ...newMed, customGap: e.target.value })}
                                        className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                            )}

                            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl shadow-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                                <FaPlus /> Add to Schedule
                            </button>
                        </form>
                    </div>
                </div>

                {/* RIGHT: Active Medicines List */}
                <div className="xl:col-span-2">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 min-h-full">
                        <h2 className="font-bold text-lg text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-gray-700 pb-2">Your Current Schedule</h2>

                        {medicines.length === 0 ? (
                            <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                                <FaPills className="text-4xl mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                                <p>No medicines added yet.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {medicines.map((med) => (
                                    <div key={med.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 bg-gray-50 dark:bg-gray-700 rounded-2xl border border-gray-200 dark:border-gray-600 gap-4">
                                        <div>
                                            <h3 className="font-bold text-gray-900 dark:text-white text-lg">{med.name}</h3>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {med.timing.map((t, i) => (
                                                    <span key={i} className="text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 px-2.5 py-1 rounded-md flex items-center gap-1">
                                                        <FaClock /> {t}
                                                    </span>
                                                ))}
                                                <span className="text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 px-2.5 py-1 rounded-md flex items-center gap-1">
                                                    <FaCalendarDay /> {med.frequency} {med.daysGap > 0 ? `(${med.daysGap} days gap)` : ''}
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleRemoveMedicine(med.id)}
                                            className="shrink-0 text-red-500 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 p-3 rounded-xl transition-colors"
                                            title="Remove Medicine"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ManageMedicine;