import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import {
  FaArrowLeft, FaUserMd, FaStar, FaBriefcase,
  FaMapMarkerAlt, FaHospitalAlt, FaRupeeSign,
  FaCheckCircle, FaClock, FaCalendarCheck
} from 'react-icons/fa';

const DoctorDetails = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/doctors/${id}`
        );
        setDoctor(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching doctor details:", err);
        setError('Doctor not found or server error.');
        setLoading(false);
      }
    };

    fetchDoctorDetails();
  }, [id]);

  if (loading) return <div className="text-white text-center mt-10 text-xl flex justify-center items-center"><span className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mr-3"></span> Loading Doctor Details...</div>;
  if (error) return <div className="text-red-400 text-center mt-10 text-xl">{error}</div>;
  if (!doctor) return null;

  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-200 p-6 md:p-10">
      <Link to={-1} className="flex items-center text-blue-400 hover:text-blue-300 mb-6 transition w-fit">
        <FaArrowLeft className="mr-2" /> Back
      </Link>

      <div className="max-w-4xl mx-auto bg-[#1e293b] rounded-2xl p-6 md:p-8 shadow-xl border border-slate-700">

        {/* Top Header Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 border-b border-slate-700 pb-8">
          <div className="bg-blue-600/20 p-6 rounded-full text-blue-400 border border-blue-500/30">
            <FaUserMd className="text-6xl" />
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
              <h1 className="text-3xl md:text-4xl font-bold text-white">{doctor.name}</h1>
              {doctor.isVerified && (
                <span className="flex items-center bg-green-500/10 text-green-400 text-xs px-3 py-1 rounded-full border border-green-500/20 mt-1 md:mt-0">
                  <FaCheckCircle className="mr-1" /> Verified
                </span>
              )}
            </div>

            <p className="text-xl text-blue-400 font-medium mb-4">{doctor.specialty}</p>

            <div className="flex flex-wrap justify-center md:justify-start gap-6 text-slate-300">
              <div className="flex items-center">
                <FaBriefcase className="text-slate-500 mr-2" />
                <span>{doctor.experienceYears} Years Experience</span>
              </div>
              <div className="flex items-center text-yellow-400">
                <FaStar className="mr-2" />
                <span>{doctor.rating} Rating ({doctor.reviewCount} Reviews)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Info Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">

          {/* Left Column: Location & Associated With */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-blue-500" /> Location
              </h3>
              <div className="bg-[#0f172a] p-4 rounded-xl border border-slate-700 text-slate-300">
                {doctor.location}
              </div>
            </div>

            {(doctor.hospital || doctor.clinic) && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <FaHospitalAlt className="mr-2 text-blue-500" /> Associated With
                </h3>
                <div className="bg-[#0f172a] p-4 rounded-xl border border-slate-700">
                  {doctor.hospital && (
                    <p className="text-slate-300 font-medium">
                      Hospital: <span className="text-white">{doctor.hospital.name}</span>, {doctor.hospital.city}
                    </p>
                  )}
                  {doctor.clinic && (
                    <p className="text-slate-300 font-medium mt-2">
                      Clinic: <span className="text-white">{doctor.clinic.name}</span>, {doctor.clinic.city}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Consultation & Booking */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-900/40 to-[#0f172a] p-5 rounded-xl border border-blue-800/50">
              <div className="flex justify-between items-center border-b border-slate-700 pb-3 mb-3">
                <span className="text-slate-300 font-medium">Consultation Fee</span>
                <span className="text-2xl font-bold text-white flex items-center">
                  <FaRupeeSign className="text-xl" />{doctor.consultationFee}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-300 font-medium">Status</span>
                <span className={`font-semibold px-3 py-1 rounded-full text-sm ${doctor.isAvailableToday ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                  {doctor.isAvailableToday ? 'Available Today' : 'Not Available'}
                </span>
              </div>
            </div>

            {/* Time Slots */}
            {doctor.isAvailableToday && doctor.availableSlots && doctor.availableSlots.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-slate-400 mb-3 flex items-center">
                  <FaClock className="mr-2" /> Select a Time Slot
                </h3>
                <div className="flex flex-wrap gap-2">
                  {doctor.availableSlots.map((slot, index) => (
                    <button key={index} className="bg-[#0f172a] hover:bg-blue-600/30 text-blue-300 hover:text-white text-sm px-4 py-2 rounded-lg border border-slate-700 hover:border-blue-500 transition-all focus:bg-blue-600 focus:text-white">
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold py-3 rounded-xl transition shadow-lg mt-4 disabled:opacity-50 disabled:cursor-not-allowed" disabled={!doctor.isAvailableToday}>
              <FaCalendarCheck /> Book Appointment
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;