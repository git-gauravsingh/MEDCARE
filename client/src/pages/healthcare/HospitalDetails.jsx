import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import {
    FaArrowLeft, FaHospital, FaMapMarkerAlt, FaPhoneAlt,
    FaEnvelope, FaStar, FaCheckCircle, FaUserMd,
    FaBriefcase, FaRupeeSign, FaClock
} from 'react-icons/fa';

const HospitalDetails = () => {
    const { id } = useParams();
    const [hospital, setHospital] = useState(null);
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchHospitalDetails = async () => {
            try {
                // Backend se hospital aur uske linked doctors fetch kar rahe hain
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/hospitals/${id}`
                );
                setHospital(response.data.hospital);
                setDoctors(response.data.doctors);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching hospital details:", err);
                setError('Hospital not found or server error.');
                setLoading(false);
            }
        };

        fetchHospitalDetails();
    }, [id]);

    if (loading) return <div className="text-white text-center mt-10 text-xl flex justify-center items-center"><span className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mr-3"></span> Loading Hospital Details...</div>;
    if (error) return <div className="text-red-400 text-center mt-10 text-xl">{error} <br /> <Link to="/doctors" className="text-blue-500 underline text-sm mt-2 block">Back to Doctors</Link></div>;
    if (!hospital) return null;

    return (
        <div className="min-h-screen bg-[#0f172a] text-gray-200 p-6">
            {/* Back Button */}
            <Link to="/doctors" className="flex items-center text-blue-400 hover:text-blue-300 mb-6 transition">
                <FaArrowLeft className="mr-2" /> Back to Doctors
            </Link>

            {/* --- HOSPITAL HEADER SECTION --- */}
            <div className="bg-[#1e293b] rounded-2xl p-6 md:p-8 shadow-lg border border-slate-700 mb-8">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    <div className="bg-blue-600/20 p-5 rounded-xl text-blue-400">
                        <FaHospital className="text-5xl" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center flex-wrap gap-3 mb-2">
                            <h1 className="text-3xl font-bold text-white">{hospital.name}</h1>
                            {hospital.isVerified && (
                                <span className="flex items-center bg-green-500/10 text-green-400 text-xs px-2 py-1 rounded-full border border-green-500/20">
                                    <FaCheckCircle className="mr-1" /> Verified
                                </span>
                            )}
                            <span className="flex items-center bg-yellow-500/10 text-yellow-400 text-xs px-2 py-1 rounded-full border border-yellow-500/20">
                                <FaStar className="mr-1" /> {hospital.rating || "N/A"}
                            </span>
                        </div>
                        <p className="text-slate-400 flex items-center mb-1">
                            <FaMapMarkerAlt className="mr-2 text-slate-500" />
                            {hospital.address}, {hospital.city}
                        </p>
                        <p className="text-sm text-blue-400 font-medium">{hospital.hospitalType} Hospital</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-6 border-t border-slate-700">
                    {/* About/Brief */}
                    <div className="md:col-span-2">
                        <h3 className="text-lg font-semibold text-white mb-3">About Hospital</h3>
                        <ul className="list-disc list-inside text-slate-300 space-y-1 text-sm">
                            {hospital.brief && hospital.brief.length > 0 ? (
                                hospital.brief.map((point, index) => <li key={index}>{point}</li>)
                            ) : (
                                <li>No details available.</li>
                            )}
                        </ul>

                        <h3 className="text-lg font-semibold text-white mt-5 mb-3">Facilities</h3>
                        <div className="flex flex-wrap gap-2">
                            {hospital.facilities && hospital.facilities.length > 0 ? (
                                hospital.facilities.map((facility, index) => (
                                    <span key={index} className="bg-slate-700 text-slate-200 text-xs px-3 py-1.5 rounded-md border border-slate-600">
                                        {facility}
                                    </span>
                                ))
                            ) : (
                                <span className="text-slate-500 text-sm">Facilities not listed</span>
                            )}
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="bg-[#0f172a] p-4 rounded-xl border border-slate-700 h-fit">
                        <h3 className="text-md font-semibold text-white mb-3 border-b border-slate-700 pb-2">Contact Details</h3>
                        <div className="space-y-3 text-sm">
                            <p className="flex items-center text-slate-300">
                                <FaPhoneAlt className="mr-3 text-blue-400" /> {hospital.contactNumber || "N/A"}
                            </p>
                            <p className="flex items-center text-slate-300">
                                <FaEnvelope className="mr-3 text-blue-400" /> {hospital.email || "N/A"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- DOCTORS SECTION --- */}
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <FaUserMd className="mr-3 text-blue-500" />
                Doctors Available at {hospital.name}
            </h2>

            {doctors.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {doctors.map((doc) => (
                        <div key={doc._id} className="bg-[#1e293b] rounded-xl p-5 border border-slate-700 hover:border-blue-500/50 transition-all shadow-md flex flex-col justify-between">

                            {/* Doctor Header */}
                            <div className="flex items-start gap-4 mb-4">
                                <div className="bg-[#0f172a] p-3 rounded-lg text-blue-400 shrink-0 border border-slate-700">
                                    <FaUserMd className="text-3xl" />
                                </div>
                                <div>
                                    <Link to={`/doctor/${doc._id}`} className="hover:underline decoration-blue-500 transition-all">
                                        <h3 className="font-bold text-lg text-white flex items-center gap-2 hover:text-blue-400">
                                            {doc.name}
                                            {doc.isVerified && <FaCheckCircle className="text-green-400 text-sm" title="Verified" />}
                                        </h3>
                                    </Link>
                                    <p className="text-blue-400 text-sm font-medium">{doc.specialty}</p>
                                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                                        <span className="flex items-center"><FaBriefcase className="mr-1" /> {doc.experienceYears} Yrs Exp</span>
                                        <span className="flex items-center text-yellow-400"><FaStar className="mr-1" /> {doc.rating} ({doc.reviewCount})</span>
                                    </div>
                                </div>
                            </div>

                            {/* Doctor Details (Fee & Availability) */}
                            <div className="bg-[#0f172a] rounded-lg p-3 text-sm space-y-2 mb-4 border border-slate-700/50">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400">Consultation Fee</span>
                                    <span className="text-white font-semibold flex items-center"><FaRupeeSign className="text-xs mr-0.5" />{doc.consultationFee}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400">Availability</span>
                                    <span className={`font-medium ${doc.isAvailableToday ? 'text-green-400' : 'text-red-400'}`}>
                                        {doc.isAvailableToday ? 'Available Today' : 'Not Available'}
                                    </span>
                                </div>
                            </div>

                            {/* Time Slots */}
                            {doc.isAvailableToday && doc.availableSlots && doc.availableSlots.length > 0 && (
                                <div className="mb-4">
                                    <p className="text-xs text-slate-400 mb-2 flex items-center"><FaClock className="mr-1" /> Available Slots:</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {doc.availableSlots.map((slot, idx) => (
                                            <span key={idx} className="bg-blue-600/20 text-blue-300 text-[10px] px-2 py-1 rounded border border-blue-500/30">
                                                {slot}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Action Button */}
                            <button className="w-full mt-auto bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition">
                                Book Appointment
                            </button>

                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-[#1e293b] rounded-xl p-8 text-center border border-slate-700 text-slate-400">
                    <FaUserMd className="text-4xl mx-auto mb-3 text-slate-500" />
                    <p>No doctors are currently listed for this hospital.</p>
                </div>
            )}
        </div>
    );
};

export default HospitalDetails;