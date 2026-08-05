import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    FaArrowLeft, FaUserMd, FaMapMarkerAlt, FaVideo, FaRegCalendarAlt,
    FaRegClock, FaFileInvoice, FaFileDownload, FaQrcode, FaCheckCircle,
    FaRegTimesCircle
} from "react-icons/fa";

const AppointmentDetails = () => {
    const { id } = useParams();

    // Dummy Detailed Data
    const appointment = {
        id: id,
        tokenNumber: "TKN-8924A",
        doctor: "Dr. Arjun Mehta",
        specialty: "Cardiologist",
        date: "10 July 2026",
        time: "11:30 AM",
        type: "In-Clinic Consultation",
        location: "City Care Hospital, Block B, New Delhi",
        status: "Confirmed",
        isOnline: false,
        patientName: "Gaurav Singh",
        patientAge: "21",
        patientGender: "Male",
        consultationFee: "₹800",
        paymentStatus: "Paid via UPI"
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="p-4 lg:p-8 w-full flex flex-col gap-6 bg-[#F8FAFC] min-h-screen font-sans text-gray-800"
        >
            <Link to="/appointments" className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors font-medium text-sm w-max">
                <FaArrowLeft /> Back to Appointments
            </Link>

            <div className="flex flex-col lg:flex-row gap-6 items-start">

                {/* LEFT: Main Details Card */}
                <div className="w-full lg:w-2/3 flex flex-col gap-6">
                    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden">

                        {/* Header Status */}
                        <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                            <span className="bg-blue-50 text-blue-700 font-bold px-4 py-1.5 rounded-lg text-sm tracking-wide">
                                Token: {appointment.tokenNumber}
                            </span>
                            <span className="flex items-center gap-1.5 text-green-600 bg-green-50 px-3 py-1.5 rounded-lg text-sm font-bold">
                                <FaCheckCircle /> {appointment.status}
                            </span>
                        </div>

                        {/* Doctor Info */}
                        <div className="flex items-center gap-5 mb-8">
                            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 text-3xl">
                                <FaUserMd />
                            </div>
                            <div>
                                <h1 className="text-2xl font-extrabold text-gray-900">{appointment.doctor}</h1>
                                <p className="text-blue-600 font-medium">{appointment.specialty}</p>
                            </div>
                        </div>

                        {/* Date, Time & Location Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-center gap-4">
                                <FaRegCalendarAlt className="text-2xl text-gray-400" />
                                <div>
                                    <p className="text-xs text-gray-500 font-medium">Appointment Date</p>
                                    <p className="font-bold text-gray-900">{appointment.date}</p>
                                </div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-center gap-4">
                                <FaRegClock className="text-2xl text-gray-400" />
                                <div>
                                    <p className="text-xs text-gray-500 font-medium">Time</p>
                                    <p className="font-bold text-gray-900">{appointment.time}</p>
                                </div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-center gap-4 md:col-span-2">
                                {appointment.isOnline ? <FaVideo className="text-2xl text-purple-400" /> : <FaMapMarkerAlt className="text-2xl text-gray-400" />}
                                <div>
                                    <p className="text-xs text-gray-500 font-medium">{appointment.type}</p>
                                    <p className="font-bold text-gray-900">{appointment.location}</p>
                                </div>
                            </div>
                        </div>

                        {/* Patient & Payment Details */}
                        <div className="border-t border-gray-100 pt-6">
                            <h3 className="font-bold text-lg text-gray-900 mb-4">Patient Information</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4">
                                <div>
                                    <p className="text-xs text-gray-500">Patient Name</p>
                                    <p className="font-medium text-sm text-gray-900">{appointment.patientName}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Age / Gender</p>
                                    <p className="font-medium text-sm text-gray-900">{appointment.patientAge}, {appointment.patientGender}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Consultation Fee</p>
                                    <p className="font-medium text-sm text-gray-900">{appointment.consultationFee}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Payment Status</p>
                                    <p className="font-medium text-sm text-green-600">{appointment.paymentStatus}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT: Actions & QR Code */}
                <div className="w-full lg:w-1/3 flex flex-col gap-6">
                    {/* Actions Card */}
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-900 mb-4">Actions</h3>
                        <div className="flex flex-col gap-3">
                            {appointment.isOnline && (
                                <button className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2 text-sm">
                                    <FaVideo /> Join Video Consultation
                                </button>
                            )}
                            <button className="w-full bg-blue-50 text-blue-600 py-3 rounded-xl font-bold hover:bg-blue-100 active:scale-95 transition-all flex items-center justify-center gap-2 text-sm">
                                <FaRegCalendarAlt /> Add to Calendar
                            </button>
                            <button className="w-full bg-white border border-gray-200 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 active:scale-95 transition-all flex items-center justify-center gap-2 text-sm">
                                <FaFileInvoice /> View Invoice
                            </button>
                            <button className="w-full bg-white border border-red-200 text-red-500 py-3 rounded-xl font-bold hover:bg-red-50 active:scale-95 transition-all flex items-center justify-center gap-2 text-sm mt-4">
                                <FaRegTimesCircle /> Cancel Appointment
                            </button>
                        </div>
                    </div>

                    {/* QR Code Card (For In-Clinic check-in) */}
                    {!appointment.isOnline && (
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                            <h3 className="font-bold text-gray-900 mb-2">Clinic Check-in</h3>
                            <p className="text-xs text-gray-500 mb-4">Show this QR code at the reception desk to quickly check in.</p>
                            <div className="w-32 h-32 bg-gray-100 border border-gray-200 rounded-xl flex items-center justify-center text-gray-300">
                                <FaQrcode className="text-6xl" />
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </motion.div>
    );
};

export default AppointmentDetails;