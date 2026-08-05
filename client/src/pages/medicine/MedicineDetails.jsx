import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    FaArrowLeft, FaStar, FaShoppingCart, FaPills, FaShieldAlt,
    FaExclamationTriangle, FaInfoCircle, FaCheckCircle
} from "react-icons/fa";

const MedicineDetails = () => {
    const { id } = useParams();

    // Dummy Detailed Data (In reality, fetched via API using the ID)
    const medicine = {
        name: "Paracetamol 650mg",
        brand: "Dolo 650",
        type: "Tablet",
        price: "₹45",
        oldPrice: "₹50",
        discount: "10% OFF",
        rating: "4.8",
        reviewsCount: 1240,
        rxRequired: false,
        components: ["Paracetamol (650mg)"],
        uses: ["Fever relief", "Mild to moderate pain relief (headache, toothache, body ache)"],
        sideEffects: ["Nausea", "Stomach upset", "Skin rash (rare)", "Liver damage (if overdosed)"],
        contraindications: ["Severe liver disease", "Alcohol dependence", "Allergy to paracetamol"],
        howToUse: "Take this medicine in the dose and duration as advised by your doctor. Swallow it as a whole. Do not chew, crush or break it. Take with or after food to avoid stomach upset.",
        reviews: [
            { user: "Ravi K.", rating: 5, date: "2 days ago", comment: "Genuine medicine, fast delivery by MEDCARE." },
            { user: "Priya S.", rating: 4, date: "1 week ago", comment: "Good pricing, always keep this in my first aid kit." }
        ]
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="p-4 lg:p-8 w-full flex flex-col gap-6 bg-[#F8FAFC] min-h-screen font-sans"
        >
            <Link to="/medicine" className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors font-medium text-sm w-max">
                <FaArrowLeft /> Back to Store
            </Link>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* LEFT: Image & Buy Section */}
                <div className="w-full lg:w-1/3 flex flex-col gap-4">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-center h-80 relative">
                        {medicine.rxRequired && <span className="absolute top-4 left-4 bg-red-100 text-red-600 text-xs font-bold px-3 py-1 rounded border border-red-200">Prescription Required</span>}
                        <FaPills className="text-9xl text-gray-200" />
                    </div>

                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                        <div className="flex items-end gap-3 mb-2">
                            <span className="text-3xl font-extrabold text-gray-900">{medicine.price}</span>
                            <span className="text-lg text-gray-400 line-through mb-1">{medicine.oldPrice}</span>
                            <span className="text-sm font-bold text-green-600 mb-1">({medicine.discount})</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-6 border-b pb-4">Inclusive of all taxes</p>

                        <div className="flex flex-col gap-3">
                            <button className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold hover:bg-blue-700 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2">
                                <FaShoppingCart /> Add to Cart
                            </button>
                            <button className="w-full bg-orange-500 text-white py-3.5 rounded-xl font-bold hover:bg-orange-600 active:scale-95 transition-all shadow-md">
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>

                {/* RIGHT: Details Section */}
                <div className="flex-1 flex flex-col gap-6">
                    {/* Header Info */}
                    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
                        <h1 className="text-3xl font-extrabold text-gray-900 mb-1">{medicine.name}</h1>
                        <p className="text-blue-600 font-bold text-sm mb-4">By {medicine.brand} • {medicine.type}</p>

                        <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-6">
                            <span className="flex items-center gap-1 bg-green-600 text-white text-sm font-bold px-2 py-1 rounded">
                                {medicine.rating} <FaStar className="text-[10px]" />
                            </span>
                            <span className="text-sm text-gray-500 font-medium">{medicine.reviewsCount} Ratings & Reviews</span>
                        </div>

                        {/* Medical Details */}
                        <div className="space-y-8">
                            <div>
                                <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-3"><FaInfoCircle className="text-blue-500" /> Composition</h3>
                                <div className="flex gap-2 flex-wrap">
                                    {medicine.components.map((comp, idx) => (
                                        <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-sm border border-gray-200">{comp}</span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-3"><FaCheckCircle className="text-green-500" /> Uses</h3>
                                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                                    {medicine.uses.map((use, idx) => <li key={idx}>{use}</li>)}
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-3"><FaShieldAlt className="text-yellow-500" /> How to Use</h3>
                                <p className="text-sm text-gray-600 leading-relaxed bg-yellow-50 p-4 rounded-xl border border-yellow-100">{medicine.howToUse}</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-red-50 p-5 rounded-xl border border-red-100">
                                    <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-3"><FaExclamationTriangle className="text-red-500" /> Side Effects</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                                        {medicine.sideEffects.map((effect, idx) => <li key={idx}>{effect}</li>)}
                                    </ul>
                                </div>
                                <div className="bg-orange-50 p-5 rounded-xl border border-orange-100">
                                    <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-3"><FaExclamationTriangle className="text-orange-500" /> Who should not use (Contraindications)</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                                        {medicine.contraindications.map((contra, idx) => <li key={idx}>{contra}</li>)}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Customer Reviews Section */}
                    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-xl text-gray-900 mb-6 border-b border-gray-100 pb-4">Customer Reviews</h3>
                        <div className="space-y-6">
                            {medicine.reviews.map((rev, idx) => (
                                <div key={idx} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs">{rev.user.charAt(0)}</div>
                                        <div>
                                            <p className="font-bold text-sm text-gray-800">{rev.user}</p>
                                            <p className="text-[10px] text-gray-400">{rev.date}</p>
                                        </div>
                                        <div className="ml-auto flex items-center gap-1 bg-green-100 text-green-700 text-[10px] font-bold px-1.5 py-0.5 rounded">
                                            {rev.rating} <FaStar />
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600">{rev.comment}</p>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-4 border border-gray-300 text-gray-700 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors">
                            Read All Reviews
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default MedicineDetails;