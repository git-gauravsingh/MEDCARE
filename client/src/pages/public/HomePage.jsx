import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    FaAmbulance, FaRobot, FaUserCircle, FaHeartbeat, FaClinicMedical,
    FaPills, FaPhoneAlt, FaWeight, FaTint, FaLungs, FaCalendarAlt,
    FaClock, FaUserMd, FaMapMarkerAlt, FaVideo, FaRedo, FaTimes,
    FaStar, FaDirections, FaShoppingCart, FaCreditCard, FaTooth,
    FaEye, FaBone, FaArrowRight, FaCommentDots, FaStethoscope, FaHospital
} from "react-icons/fa";

const HomePage = () => {
    // Dummy Data for Previews
    const topDoctors = [
        { id: 1, name: "Dr. Arjun Mehta", specialty: "Cardiologist", rating: "4.8" },
        { id: 2, name: "Dr. Neha Sharma", specialty: "Dermatologist", rating: "4.7" },
        { id: 3, name: "Dr. Rohan Verma", specialty: "Neurologist", rating: "4.9" },
    ];

    const clinicCategories = [
        { name: 'Dental', icon: <FaTooth /> },
        { name: 'Eye', icon: <FaEye /> },
        { name: 'Skin', icon: <FaUserCircle /> },
        { name: 'General', icon: <FaClinicMedical /> },
        { name: 'ENT', icon: <FaUserMd /> },
        { name: 'Physio', icon: <FaBone /> },
        { name: 'Ortho', icon: <FaBone /> },
        { name: 'Cardio', icon: <FaHeartbeat /> }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="p-4 lg:p-8 w-full flex flex-col gap-8 pb-20 transition-colors duration-300"
        >
            {/* 1. MY HEALTH SUMMARY */}
            <section className="w-full">
                <div className="flex justify-between items-end mb-4">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                            <FaHeartbeat className="text-blue-500" /> 1. My Health
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Your health summary & insights</p>
                    </div>
                    <Link to="/dashboard" className="text-blue-600 dark:text-blue-400 font-medium text-sm px-4 py-1 border border-blue-200 dark:border-blue-800/50 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/30 active:scale-95 transition-all flex items-center gap-1">
                        View All <FaArrowRight className="text-xs" />
                    </Link>
                </div>

                <Link to="/dashboard" className="flex bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex-col lg:flex-row gap-6 cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                    {/* Health Score Circular UI */}
                    <div className="flex-1 flex items-center justify-center lg:border-r border-gray-100 dark:border-gray-700 pr-0 lg:pr-6">
                        <div className="text-center">
                            <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Health Score</h3>
                            <div className="w-32 h-32 rounded-full border-8 border-blue-500 flex items-center justify-center mx-auto text-4xl font-bold text-gray-900 dark:text-white">
                                87<span className="text-sm text-gray-400 font-normal">/100</span>
                            </div>
                            <p className="text-green-500 font-medium mt-2 flex items-center justify-center gap-1"><FaStar /> Excellent</p>
                        </div>
                    </div>
                    {/* Vitals Grid */}
                    <div className="flex-[2] grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors group">
                            <p className="text-gray-500 dark:text-gray-400 text-xs flex items-center gap-1"><FaWeight className="group-hover:text-blue-500" /> BMI</p>
                            <p className="font-bold text-lg text-gray-900 dark:text-white">24.5</p>
                            <p className="text-green-500 text-xs font-medium">Normal</p>
                        </div>
                        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors group">
                            <p className="text-gray-500 dark:text-gray-400 text-xs flex items-center gap-1"><FaHeartbeat className="group-hover:text-red-500" /> Heart Rate</p>
                            <p className="font-bold text-lg text-gray-900 dark:text-white">72 <span className="text-sm font-normal text-gray-500">bpm</span></p>
                        </div>
                        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors group">
                            <p className="text-gray-500 dark:text-gray-400 text-xs flex items-center gap-1"><FaTint className="group-hover:text-red-500" /> Blood Pressure</p>
                            <p className="font-bold text-lg text-gray-900 dark:text-white">120/80</p>
                        </div>
                        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors group">
                            <p className="text-gray-500 dark:text-gray-400 text-xs flex items-center gap-1"><FaLungs className="group-hover:text-blue-500" /> Oxygen Level</p>
                            <p className="font-bold text-lg text-gray-900 dark:text-white">98 %</p>
                        </div>
                    </div>
                </Link>
            </section>

            {/* 2. UPCOMING APPOINTMENTS */}
            <section className="w-full">
                <div className="flex justify-between items-end mb-4">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                            <FaCalendarAlt className="text-blue-500" /> 2. Upcoming Appointments
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Your scheduled doctor visits</p>
                    </div>
                    <Link to="/appointments" className="text-blue-600 dark:text-blue-400 font-medium text-sm px-4 py-1 border border-blue-200 dark:border-blue-800/50 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/30 active:scale-95 transition-all flex items-center gap-1">
                        View All <FaArrowRight className="text-xs" />
                    </Link>
                </div>

                <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 space-y-3">
                    {[
                        { date: "21", month: "MAY", time: "11:30 AM", doc: "Dr. Arjun Mehta", spec: "Cardiologist", place: "City Care Hospital", id: 1 },
                        { date: "24", month: "MAY", time: "02:00 PM", doc: "Dr. Neha Sharma", spec: "Dermatologist", place: "Metro Clinic", id: 2 },
                    ].map((apt) => (
                        <div key={apt.id} className="flex flex-col md:flex-row items-center gap-4 p-4 border border-gray-100 dark:border-gray-700 rounded-xl hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 hover:-translate-y-1 cursor-pointer transition-all duration-300">
                            <div className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 w-14 h-14 rounded-xl flex flex-col items-center justify-center border border-blue-100 dark:border-blue-800/30 shrink-0">
                                <span className="font-bold text-lg leading-tight">{apt.date}</span>
                                <span className="text-[10px] font-bold">{apt.month}</span>
                            </div>
                            <div className="font-medium text-sm w-24 shrink-0 text-center md:text-left text-gray-700 dark:text-gray-300 flex justify-center md:justify-start items-center gap-1">
                                <FaClock className="text-gray-400" /> {apt.time}
                            </div>

                            <div className="flex gap-3 items-center flex-1 w-full md:border-l pl-0 md:pl-4 border-gray-100 dark:border-gray-700">
                                <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-400 shrink-0"><FaUserMd /></div>
                                <div>
                                    <h4 className="font-bold text-sm text-gray-900 dark:text-white">{apt.doc}</h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1"><FaStethoscope className="text-[10px]" /> {apt.spec}</p>
                                </div>
                            </div>

                            <div className="flex-1 w-full text-center md:text-left text-sm text-gray-600 dark:text-gray-400 flex items-center justify-center md:justify-start gap-1">
                                <FaMapMarkerAlt className="text-red-400" /> {apt.place}
                            </div>

                            <div className="flex gap-2 w-full md:w-auto">
                                <button className="flex-1 md:flex-none bg-blue-600 text-white px-4 py-1.5 rounded-lg text-xs font-medium active:scale-95 transition-transform hover:bg-blue-700 flex items-center justify-center gap-1">
                                    <FaVideo /> Join
                                </button>
                                <button className="flex-1 md:flex-none border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 px-4 py-1.5 rounded-lg text-xs font-medium active:scale-95 transition-transform hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-center gap-1">
                                    <FaRedo /> Reschedule
                                </button>
                                <button className="flex-1 md:flex-none border border-red-200 dark:border-red-900/50 text-red-500 dark:text-red-400 px-4 py-1.5 rounded-lg text-xs font-medium active:scale-95 transition-transform hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center justify-center gap-1">
                                    <FaTimes /> Cancel
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. DOCTORS NEAR YOU */}
            <section className="w-full">
                <div className="flex justify-between items-end mb-4">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                            <FaUserMd className="text-blue-500" /> 3. Doctors Near You
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Top doctors in your area</p>
                    </div>
                    <Link to="/doctors" className="text-blue-600 dark:text-blue-400 font-medium text-sm px-4 py-1 border border-blue-200 dark:border-blue-800/50 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/30 active:scale-95 transition-all flex items-center gap-1">
                        View All <FaArrowRight className="text-xs" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {topDoctors.map((doc) => (
                        <div key={doc.id} className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
                            <div className="flex gap-4 items-center mb-4">
                                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-400 text-2xl group-hover:border-2 group-hover:border-blue-200 dark:group-hover:border-blue-500 transition-all">
                                    <FaUserMd />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{doc.name}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{doc.specialty}</p>
                                    <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full font-bold mt-1 flex items-center gap-1 w-fit">
                                        <FaStar /> {doc.rating}
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Link to={`/book-appointment/${doc.id}`} className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 active:scale-95 transition-all text-center flex items-center justify-center gap-1">
                                    <FaCalendarAlt /> Book
                                </Link>
                                <Link to={`/doctor/${doc.id}`} className="flex-1 border border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 active:scale-95 transition-all text-center flex items-center justify-center gap-1">
                                    <FaUserCircle /> Profile
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 4. HOSPITALS */}
            <section className="w-full">
                <div className="flex justify-between items-end mb-4">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                            <FaHospital className="text-blue-500" /> 4. Hospitals
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Best hospitals near you</p>
                    </div>
                    <Link to="/hospitals" className="text-blue-600 dark:text-blue-400 font-medium text-sm px-4 py-1 border border-blue-200 dark:border-blue-800/50 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/30 active:scale-95 transition-all flex items-center gap-1">
                        View All <FaArrowRight className="text-xs" />
                    </Link>
                </div>

                <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 space-y-4">
                    {[1, 2, 3].map((item) => (
                        <Link to={`/hospital/${item}`} key={item} className="flex flex-col sm:flex-row gap-4 items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl border border-transparent hover:border-gray-200 dark:hover:border-gray-600 cursor-pointer hover:shadow-sm transition-all duration-200 group">
                            <div className="w-full sm:w-32 h-20 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center text-gray-400 text-3xl group-hover:opacity-90 transition-opacity">
                                <FaHospital />
                            </div>
                            <div className="flex-1 w-full">
                                <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">City Care Hospital</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
                                    <FaMapMarkerAlt className="text-gray-400" /> 1.2 km away • <span className="text-red-500 dark:text-red-400 text-xs font-bold">Emergency Available</span>
                                </p>
                            </div>
                            <button className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium active:scale-95 transition-transform hover:bg-blue-700 flex items-center justify-center gap-2">
                                <FaDirections /> Directions
                            </button>
                        </Link>
                    ))}
                </div>
            </section>

            {/* 5. CLINICS */}
            <section className="w-full">
                <div className="flex justify-between items-end mb-4">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                            <FaClinicMedical className="text-blue-500" /> 5. Clinics
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Explore by specialty</p>
                    </div>
                    <Link to="/clinics" className="text-blue-600 dark:text-blue-400 font-medium text-sm px-4 py-1 border border-blue-200 dark:border-blue-800/50 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/30 active:scale-95 transition-all flex items-center gap-1">
                        View All <FaArrowRight className="text-xs" />
                    </Link>
                </div>

                <div className="grid grid-cols-4 md:grid-cols-8 gap-4 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    {clinicCategories.map((clinic, index) => (
                        <Link to={`/clinics?specialty=${clinic.name.toLowerCase()}`} key={index} className="flex flex-col items-center gap-2 cursor-pointer group active:scale-95 transition-transform">
                            <div className="w-16 h-16 rounded-2xl bg-gray-50 dark:bg-gray-700 flex items-center justify-center text-blue-500 dark:text-blue-400 text-2xl border border-gray-100 dark:border-gray-600 group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white dark:group-hover:bg-blue-600 dark:group-hover:text-white transition-all duration-300">
                                {clinic.icon}
                            </div>
                            <span className="text-xs font-medium text-gray-600 dark:text-gray-300 text-center group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{clinic.name}</span>
                        </Link>
                    ))}
                </div>
            </section>

            {/* 6. MEDICAL STORE */}
            <section className="w-full">
                <div className="flex justify-between items-end mb-4">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                            <FaPills className="text-blue-500" /> 6. Medical Store
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Health products & medicines</p>
                    </div>
                    <Link to="/medicine" className="text-blue-600 dark:text-blue-400 font-medium text-sm px-4 py-1 border border-blue-200 dark:border-blue-800/50 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/30 active:scale-95 transition-all flex items-center gap-1">
                        View All <FaArrowRight className="text-xs" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { id: 1, name: "Paracetamol 650mg", price: "₹45", oldPrice: "₹50", discount: "-10%", type: "Tablet" },
                        { id: 2, name: "Vitamin D3 60000 IU", price: "₹120", oldPrice: "₹140", discount: "-15%", type: "Capsule" },
                        { id: 3, name: "Amoxicillin 500mg", price: "₹60", oldPrice: "₹68", discount: "-12%", type: "Capsule" },
                        { id: 4, name: "Calcium Tablet", price: "₹110", oldPrice: "₹120", discount: "-8%", type: "Tablet" }
                    ].map((med) => (
                        <Link to={`/medicine/${med.id}`} key={med.id} className="block bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 relative group cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                            <span className="absolute top-3 left-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-[10px] font-bold px-2 py-1 rounded">{med.discount}</span>
                            <button onClick={(e) => { e.preventDefault(); }} className="absolute top-3 right-3 text-gray-300 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 active:scale-90 transition-transform text-lg"><FaHeartbeat /></button>

                            <div className="h-32 bg-gray-50 dark:bg-gray-700 rounded-xl mb-4 mt-8 flex items-center justify-center text-gray-300 dark:text-gray-500 text-4xl group-hover:scale-105 transition-transform duration-300">
                                <FaPills />
                            </div>

                            <h4 className="font-bold text-sm text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{med.name}</h4>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">{med.type}</p>

                            <div className="flex items-end gap-2 mb-4">
                                <span className="font-bold text-lg text-gray-900 dark:text-white">{med.price}</span>
                                <span className="text-xs text-gray-400 dark:text-gray-500 line-through mb-1">{med.oldPrice}</span>
                            </div>

                            <div className="flex gap-2">
                                <button onClick={(e) => e.preventDefault()} className="flex-1 border border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 py-1.5 rounded-lg text-xs font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 active:scale-95 transition-all flex items-center justify-center gap-1">
                                    <FaShoppingCart /> Add
                                </button>
                                <button onClick={(e) => e.preventDefault()} className="flex-1 bg-blue-600 text-white py-1.5 rounded-lg text-xs font-medium hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-1">
                                    <FaCreditCard /> Buy
                                </button>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* 7. HEALTH BLOGS */}
            <section className="w-full">
                <div className="flex justify-between items-end mb-4">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                            <FaCommentDots className="text-blue-500" /> 7. Health Blogs
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Latest health articles & tips</p>
                    </div>
                    <Link to="/blogs" className="text-blue-600 dark:text-blue-400 font-medium text-sm px-4 py-1 border border-blue-200 dark:border-blue-800/50 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/30 active:scale-95 transition-all flex items-center gap-1">
                        View All <FaArrowRight className="text-xs" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { id: 1, title: "10 Superfoods for a Stronger Immune System", category: "Nutrition", author: "Dr. Neha Sharma", date: "18 May 2025", time: "5 min read" },
                        { id: 2, title: "Simple Morning Habits for a Healthy Life", category: "Fitness", author: "Dr. Arjun Mehta", date: "16 May 2025", time: "4 min read" },
                        { id: 3, title: "How to Manage Stress in a Busy Schedule", category: "Mental Health", author: "Dr. Rohan Verma", date: "14 May 2025", time: "6 min read" }
                    ].map((blog) => (
                        <Link to={`/blogs/${blog.id}`} key={blog.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden group cursor-pointer block hover:shadow-md hover:-translate-y-1 active:scale-[0.98] transition-all duration-300">
                            <div className="h-40 bg-gray-200 dark:bg-gray-700 relative overflow-hidden flex items-center justify-center text-gray-300 dark:text-gray-600 text-4xl">
                                <FaCommentDots />
                                <div className="absolute inset-0 w-full h-full bg-gray-300 dark:bg-gray-600 opacity-50 group-hover:scale-105 transition-transform duration-500"></div>
                                <span className="absolute bottom-3 left-3 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 text-[10px] font-bold px-3 py-1 rounded-full shadow-sm z-10">{blog.category}</span>
                            </div>
                            <div className="p-4">
                                <h4 className="font-bold text-sm mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{blog.title}</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-1"><FaUserCircle /> {blog.author}</p>
                                <p className="text-[10px] text-gray-400 dark:text-gray-500 flex items-center gap-2">
                                    <span className="flex items-center gap-1"><FaClock /> {blog.time}</span>
                                    <span className="flex items-center gap-1"><FaCalendarAlt /> {blog.date}</span>
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* 8. AI HEALTH ASSISTANT */}
            <section className="w-full">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <FaRobot className="text-blue-500" /> 8. AI Health Assistant
                </h2>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row gap-6 items-center">
                    <div className="w-40 h-40 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-blue-500 dark:text-blue-400 text-6xl shadow-inner shrink-0">
                        <FaRobot className="animate-pulse" />
                    </div>
                    <div className="flex-1">
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl rounded-tl-none inline-block mb-4 shadow-sm">
                            <p className="font-bold text-sm text-gray-900 dark:text-white">Hi Gaurav! 👋</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">I'm your AI health assistant. How can I help you today?</p>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-6">
                            <span className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1.5 rounded-full cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/50 border border-blue-100 dark:border-blue-800/30 active:scale-95 transition-transform flex items-center gap-1"><FaStethoscope /> Symptoms of dengue</span>
                            <span className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1.5 rounded-full cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/50 border border-blue-100 dark:border-blue-800/30 active:scale-95 transition-transform flex items-center gap-1"><FaHeartbeat /> Improve sleep</span>
                            <span className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1.5 rounded-full cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/50 border border-blue-100 dark:border-blue-800/30 active:scale-95 transition-transform flex items-center gap-1"><FaClinicMedical /> Diet plan</span>
                        </div>
                        <div className="flex gap-3">
                            <Link to="/ai-assistant" className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 active:scale-95 transition-all shadow-sm flex items-center gap-2">
                                Start Conversation <FaArrowRight />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* 9. EMERGENCY */}
            <section className="w-full">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <FaAmbulance className="text-red-500" /> 9. Emergency Services
                </h2>
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-center shadow-sm gap-4">
                    <div>
                        <h3 className="text-red-600 dark:text-red-400 font-bold text-xl flex items-center gap-2">
                            <FaAmbulance /> Emergency SOS
                        </h3>
                        <p className="text-red-500 dark:text-red-300 text-sm mt-1">Tap for immediate ambulance, blood bank, or hospital assistance.</p>
                    </div>
                    <Link to="/emergency" className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg active:scale-95 text-center flex items-center justify-center gap-2">
                        <FaPhoneAlt /> Call Now - 24/7
                    </Link>
                </div>
            </section>

        </motion.div>
    );
};

export default HomePage;