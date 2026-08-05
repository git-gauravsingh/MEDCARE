import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaSearch, FaFilter, FaVial, FaXRay, FaFilePrescription,
    FaFileMedical, FaDownload, FaShareAlt, FaRobot,
    FaTimes, FaCheckCircle, FaExclamationTriangle, FaClock, FaCalendarAlt
} from "react-icons/fa";

const Reports = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [selectedAIReport, setSelectedAIReport] = useState(null);

    const categories = ["All", "Lab Tests", "Scans", "Prescriptions", "Discharge Summaries"];

    // Dummy Reports Data
    const reportsList = [
        {
            id: 1,
            title: "Complete Blood Count (CBC) & Lipid Profile",
            type: "Lab Tests",
            date: "05 Jul 2026",
            provider: "Paras HMRI Hospital, Patna",
            status: "Abnormal",
            fileSize: "1.2 MB",
            aiSummary: "Your Hemoglobin is slightly low (11.5 g/dL), and your LDL (bad cholesterol) is borderline high. The AI recommends increasing iron-rich foods and reducing saturated fats. Please consult your doctor for a detailed review."
        },
        {
            id: 2,
            title: "Chest X-Ray (PA View)",
            type: "Scans",
            date: "15 Jun 2026",
            provider: "Ruban Memorial Hospital",
            status: "Ready",
            fileSize: "4.5 MB",
            aiSummary: "The X-Ray results are completely normal. There are no signs of infection, fluid buildup, or abnormalities in the lungs, and your heart size appears healthy."
        },
        {
            id: 3,
            title: "Consultation Prescription",
            type: "Prescriptions",
            date: "10 Jul 2026",
            provider: "Dr. Arjun Mehta • City Care Hospital",
            status: "Ready",
            fileSize: "800 KB",
            aiSummary: "Your prescription includes Metformin 500mg (take twice daily after meals) for blood sugar control, and a Vitamin D3 supplement (take once a week after breakfast)."
        },
        {
            id: 4,
            title: "Thyroid Function Test (TSH)",
            type: "Lab Tests",
            date: "12 Jul 2026",
            provider: "Thyrocare Labs",
            status: "Pending",
            fileSize: "--",
            aiSummary: "This report is currently being processed by the laboratory. The AI analysis will become available immediately once the final results are uploaded."
        },
        {
            id: 5,
            title: "Dental X-Ray (OPG)",
            type: "Scans",
            date: "01 Jul 2026",
            provider: "SmileCare Dental Clinic",
            status: "Ready",
            fileSize: "3.1 MB",
            aiSummary: "The scan shows healthy bone structure. However, your lower right wisdom tooth is slightly impacted. Your dentist may recommend extraction if it causes discomfort."
        }
    ];

    // Filter & Sort Logic (Newest to Oldest)
    const filteredReports = reportsList
        .filter(report => {
            const matchesCategory = activeCategory === "All" || report.type === activeCategory;
            const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) || report.provider.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        })
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    // Helper for icons based on report type
    const getReportIcon = (type) => {
        switch (type) {
            case "Lab Tests": return <FaVial className="text-red-500" />;
            case "Scans": return <FaXRay className="text-blue-500" />;
            case "Prescriptions": return <FaFilePrescription className="text-green-500" />;
            default: return <FaFileMedical className="text-gray-500" />;
        }
    };

    // Helper for status badges
    const renderStatusBadge = (status) => {
        switch (status) {
            case "Ready":
                return <span className="flex items-center gap-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-xs font-bold"><FaCheckCircle /> Ready</span>;
            case "Abnormal":
                return <span className="flex items-center gap-1.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-3 py-1 rounded-full text-xs font-bold"><FaExclamationTriangle /> Consult Doctor</span>;
            case "Pending":
                return <span className="flex items-center gap-1.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 px-3 py-1 rounded-full text-xs font-bold"><FaClock /> Processing</span>;
            default: return null;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="p-4 lg:p-8 w-full flex flex-col gap-6 bg-[#F8FAFC] dark:bg-gray-900 min-h-screen font-sans text-gray-800 dark:text-gray-200 transition-colors duration-300"
        >
            {/* HEADER & SEARCH */}
            <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 transition-colors">
                <div className="flex-1">
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Medical Reports</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Access, download, and understand your lab tests and medical records securely.</p>
                </div>

                <div className="flex w-full lg:w-auto gap-3">
                    <div className="relative flex-1 lg:w-80">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search reports, labs..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all text-sm"
                        />
                    </div>
                    <button className="bg-gray-100 dark:bg-gray-700 p-3 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 active:scale-95 transition-all text-gray-600 dark:text-gray-300 flex items-center justify-center">
                        <FaFilter />
                    </button>
                </div>
            </div>

            {/* CATEGORY */}
            <div className="flex gap-3 items-center overflow-x-auto p-5 scrollbar-hide">
                {categories.map((category, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveCategory(category)}
                        className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all active:scale-95 border ${activeCategory === category
                                ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* REPORTS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-2">
                {filteredReports.length > 0 ? (
                    filteredReports.map((report) => (
                        <div key={report.id} className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative">

                            {/* Card Header: Icon & Status */}
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-700/50 flex items-center justify-center text-2xl border border-gray-100 dark:border-gray-600">
                                    {getReportIcon(report.type)}
                                </div>
                                {renderStatusBadge(report.status)}
                            </div>

                            {/* Core Info */}
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white leading-tight mb-2 pr-4">{report.title}</h3>
                            <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-4">{report.type}</p>

                            <div className="mt-auto border-t border-gray-100 dark:border-gray-700 pt-4 flex flex-col gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
                                <div className="flex items-center gap-2">
                                    <FaCalendarAlt className="text-gray-400" /> {report.date}
                                </div>
                                <div className="flex items-center gap-2 line-clamp-1">
                                    <FaFileMedical className="text-gray-400" /> {report.provider}
                                </div>
                            </div>

                            {/* Quick Actions & AI Button */}
                            <div className="flex flex-col gap-3">
                                {/* AI Explain Button */}
                                <button
                                    onClick={() => setSelectedAIReport(report)}
                                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 rounded-xl text-sm font-bold hover:shadow-md hover:from-blue-700 hover:to-indigo-700 active:scale-95 transition-all"
                                >
                                    <FaRobot className="text-lg" /> AI Report Analysis
                                </button>

                                <div className="flex gap-3">
                                    <button
                                        disabled={report.status === "Pending"}
                                        className="flex-1 flex items-center justify-center gap-2 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2.5 rounded-xl text-xs font-bold hover:bg-gray-100 dark:hover:bg-gray-700 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <FaDownload /> {report.fileSize}
                                    </button>
                                    <button
                                        disabled={report.status === "Pending"}
                                        className="flex-1 flex items-center justify-center gap-2 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2.5 rounded-xl text-xs font-bold hover:bg-gray-100 dark:hover:bg-gray-700 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <FaShareAlt /> Share
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-16 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
                        <FaSearch className="text-5xl mb-4 opacity-30" />
                        <h3 className="text-xl font-bold text-gray-600 dark:text-gray-400">No reports found</h3>
                        <p className="text-sm mt-2">Try adjusting your filters or search terms.</p>
                    </div>
                )}
            </div>

            {/* AI TRANSLATOR MODAL */}
            <AnimatePresence>
                {selectedAIReport && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white dark:bg-gray-800 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col max-h-[90vh]"
                        >
                            {/* Modal Header */}
                            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 flex justify-between items-center text-white">
                                <div className="flex items-center gap-3">
                                    <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
                                        <FaRobot className="text-2xl" />
                                    </div>
                                    <div>
                                        <h2 className="font-bold text-lg">AI Report Analysis</h2>
                                        <p className="text-blue-100 text-xs">MEDCARE Intelligence</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedAIReport(null)}
                                    className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors active:scale-90"
                                >
                                    <FaTimes />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="p-6 md:p-8 overflow-y-auto">
                                <h3 className="font-extrabold text-gray-900 dark:text-white mb-1">{selectedAIReport.title}</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-6 flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-4">
                                    <FaCalendarAlt /> {selectedAIReport.date} • {selectedAIReport.provider}
                                </p>

                                <div className="bg-blue-50/50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 p-5 rounded-2xl">
                                    <h4 className="font-bold text-blue-900 dark:text-blue-300 flex items-center gap-2 mb-3 text-sm uppercase tracking-wider">
                                        <FaCheckCircle className="text-blue-500" /> Simplified Explanation
                                    </h4>
                                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                                        {selectedAIReport.aiSummary}
                                    </p>
                                </div>

                                <div className="mt-6 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl text-xs text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-gray-700 flex items-start gap-2">
                                    <FaExclamationTriangle className="text-gray-400 mt-0.5 shrink-0" />
                                    <p>This AI analysis is designed to help you understand your reports in simple terms. It does not replace professional medical advice. Always consult your doctor for a formal diagnosis.</p>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="p-6 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex gap-3">
                                <button
                                    onClick={() => setSelectedAIReport(null)}
                                    className="flex-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-xl font-bold hover:bg-gray-100 dark:hover:bg-gray-600 active:scale-95 transition-all"
                                >
                                    Close
                                </button>
                                <button
                                    disabled={selectedAIReport.status === "Pending"}
                                    className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 active:scale-95 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    <FaDownload /> View Original PDF
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Reports;