import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaHeartbeat,
  FaTint,
  FaLungs,
  FaBed,
  FaFire,
  FaSyringe,
  FaPills,
  FaCalendarCheck,
  FaRobot,
  FaArrowUp,
  FaArrowDown,
  FaCheckCircle,
  FaRegCircle,
  FaDownload
} from "react-icons/fa";

const Dashboard = () => {
  // State for interactive medicine reminders
  const [medicines, setMedicines] = useState([
    { id: 1, name: "Thyroxine 50mcg", time: "08:00 AM", taken: true },
    { id: 2, name: "Vitamin D3", time: "01:00 PM", taken: false },
    { id: 3, name: "Omega 3 Fish Oil", time: "09:00 PM", taken: false },
  ]);

  const toggleMedicine = (id) => {
    setMedicines(medicines.map(med =>
      med.id === id ? { ...med, taken: !med.taken } : med
    ));
  };

  // Dummy Vitals Data
  const vitals = [
    { title: "Heart Rate", value: "72", unit: "bpm", status: "Normal", icon: <FaHeartbeat />, color: "text-red-500", bg: "bg-red-50 dark:bg-red-900/20", trend: "up", trendValue: "2%" },
    { title: "Blood Pressure", value: "120/80", unit: "mmHg", status: "Optimal", icon: <FaHeartbeat />, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20", trend: "stable", trendValue: "0%" },
    { title: "Sugar Level", value: "95", unit: "mg/dL", status: "Fasting", icon: <FaSyringe />, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20", trend: "down", trendValue: "4%" },
    { title: "Oxygen (SpO2)", value: "98", unit: "%", status: "Healthy", icon: <FaLungs />, color: "text-cyan-500", bg: "bg-cyan-50 dark:bg-cyan-900/20", trend: "stable", trendValue: "0%" },
    { title: "Sleep", value: "7.5", unit: "hrs", status: "Restful", icon: <FaBed />, color: "text-indigo-500", bg: "bg-indigo-50 dark:bg-indigo-900/20", trend: "up", trendValue: "10%" },
    { title: "Water Intake", value: "1.8", unit: "L", status: "Goal: 2.5L", icon: <FaTint />, color: "text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/20", trend: "up", trendValue: "15%" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 lg:p-8 w-full flex flex-col gap-8 bg-[#F8FAFC] dark:bg-gray-900 min-h-screen transition-colors duration-300"
    >
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white">My Health Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Your comprehensive medical overview and AI insights.</p>
        </div>
        <button className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 px-5 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 active:scale-95 transition-all shadow-sm font-medium">
          <FaDownload /> Download Report
        </button>
      </div>

      {/* TOP SECTION: HEALTH SCORE & AI SUMMARY */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Health Score Card */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center text-center relative overflow-hidden group transition-colors">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>
          <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-6 w-full text-left flex justify-between items-center">
            Overall Health Score
            <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-full">+3 pts this week</span>
          </h3>

          {/* CSS Circular Progress Mockup */}
          <div className="relative w-40 h-40 flex items-center justify-center rounded-full border-[12px] border-blue-500 shadow-inner group-hover:scale-105 transition-transform duration-500">
            <div className="flex flex-col items-center">
              <span className="text-5xl font-extrabold text-gray-800 dark:text-white">87</span>
              <span className="text-sm font-medium text-gray-400 dark:text-gray-500">out of 100</span>
            </div>
          </div>
          <p className="text-green-500 font-bold mt-6 text-lg tracking-wide">EXCELLENT</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Keep up the great work, Gaurav!</p>
        </div>

        {/* AI Health Summary */}
        <div className="lg:col-span-2 bg-gradient-to-br from-blue-600 to-indigo-700 p-6 sm:p-8 rounded-3xl shadow-md text-white relative overflow-hidden">
          <FaRobot className="absolute -bottom-4 -right-4 text-9xl text-white opacity-10" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                <FaRobot className="text-2xl" />
              </div>
              <h3 className="font-bold text-xl">AI Health Analysis</h3>
            </div>
            <p className="text-blue-50 leading-relaxed mb-6">
              Based on your recent vitals and activity over the last 7 days, your cardiovascular health is operating at peak efficiency. Your sleep patterns have improved by 10%, contributing to your excellent blood pressure readings.
            </p>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <FaFire className="text-orange-400" /> AI Suggestions for Today
              </h4>
              <ul className="space-y-2 text-sm text-blue-50">
                <li className="flex gap-2 items-start">
                  <span className="text-blue-300">•</span>
                  Increase water intake by 700ml to hit your daily hydration goal.
                </li>
                <li className="flex gap-2 items-start">
                  <span className="text-blue-300">•</span>
                  Your Vitamin D3 is scheduled at 1:00 PM. Take it with a fatty meal for better absorption.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* VITALS GRID */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
          Current Vitals
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {vitals.map((vital, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2.5 rounded-xl ${vital.bg} ${vital.color}`}>
                  {vital.icon}
                </div>
                <span className={`text-[10px] font-bold flex items-center gap-1 ${vital.trend === 'up' ? 'text-green-500' : vital.trend === 'down' ? 'text-red-500' : 'text-gray-400'}`}>
                  {vital.trend === 'up' && <FaArrowUp />}
                  {vital.trend === 'down' && <FaArrowDown />}
                  {vital.trendValue}
                </span>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-xs font-medium mb-1">{vital.title}</p>
              <h4 className="font-bold text-xl text-gray-800 dark:text-white mb-1">
                {vital.value} <span className="text-xs font-normal text-gray-400">{vital.unit}</span>
              </h4>
              <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 inline-block px-2 py-1 rounded-md">{vital.status}</p>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM SECTION: MEDICINES & APPOINTMENTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Medicine Reminders */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-gray-800 dark:text-white flex items-center gap-2">
              <FaPills className="text-blue-500" /> Today's Medicines
            </h3>
            <Link to="/manage-medicine" className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
              Manage
            </Link>
          </div>

          <div className="space-y-3">
            {medicines.map((med) => (
              <div
                key={med.id}
                onClick={() => toggleMedicine(med.id)}
                className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all active:scale-[0.98] ${med.taken ? 'bg-gray-50 dark:bg-gray-700/50 border-gray-100 dark:border-gray-700 opacity-60' : 'bg-white dark:bg-gray-800 border-blue-100 dark:border-blue-900/50 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-sm'}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`text-2xl ${med.taken ? 'text-green-500' : 'text-gray-300 dark:text-gray-600'}`}>
                    {med.taken ? <FaCheckCircle /> : <FaRegCircle />}
                  </div>
                  <div>
                    <h4 className={`font-bold text-sm ${med.taken ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-gray-200'}`}>{med.name}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{med.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Appointment */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-gray-800 dark:text-white flex items-center gap-2">
              <FaCalendarCheck className="text-blue-500" /> Next Checkup
            </h3>
            <Link to="/upcoming-checkups" className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
              View All
            </Link>
          </div>

          <div className="bg-[#F8FAFC] dark:bg-gray-700 border border-blue-100 dark:border-gray-600 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-5">
            <div className="bg-blue-600 text-white w-20 h-20 rounded-2xl flex flex-col items-center justify-center shrink-0 shadow-md">
              <span className="font-bold text-2xl">21</span>
              <span className="text-xs font-medium tracking-widest">MAY</span>
            </div>

            <div className="flex-1 text-center sm:text-left">
              <p className="text-sm font-bold text-blue-600 dark:text-blue-400 mb-1">11:30 AM</p>
              <h4 className="font-bold text-lg text-gray-800 dark:text-white">Dr. Arjun Mehta</h4>
              <p className="text-sm text-gray-500 dark:text-gray-300 mb-3">Cardiologist • General Checkup</p>

              <div className="flex justify-center sm:justify-start gap-2">
                <button className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 active:scale-95 transition-all">Reschedule</button>
                <button className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-700 active:scale-95 transition-all">Details</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default Dashboard;