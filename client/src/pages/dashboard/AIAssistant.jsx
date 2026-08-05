import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaRobot, FaUserCircle, FaPaperPlane, FaMicrophone,
    FaPaperclip, FaFileMedical, FaPills, FaBars, FaPlus,
    FaSearch, FaHistory, FaImage, FaTrash, FaFileAlt, FaVideo, FaCommentAlt, FaStethoscope
} from "react-icons/fa";

const AIAssistant = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const chatEndRef = useRef(null);
    const pdfInputRef = useRef(null);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [assistantMode, setAssistantMode] = useState("disease");
    const [medicineSuggestions, setMedicineSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [loadingMedicine, setLoadingMedicine] = useState(false);
    const [awaitingBodyPart, setAwaitingBodyPart] = useState(false);
    const [predictedDiseases, setPredictedDiseases] = useState([]);
    const [isInnerSidebarOpen, setIsInnerSidebarOpen] = useState(true);
    const [isAttachmentOpen, setIsAttachmentOpen] = useState(false);
    const [accumulatedSymptoms, setAccumulatedSymptoms] = useState([]);
    const [followupCount, setFollowupCount] = useState(0);

    // --- NEW STATES FOR CHAT HISTORY ---
    // --- NEW STATES FOR CHAT HISTORY ---
    const [chatHistoryList, setChatHistoryList] = useState([]);
    const [currentSessionId, setCurrentSessionId] = useState(null);

    // --- NAYA HELPER FUNCTION ---
    const getToolName = (mode) => {
        switch (mode) {
            case "disease": return "Disease Diagnosis";
            case "medicine": return "Medicine Details";
            case "report": return "Report Analysis";
            default: return "Disease Diagnosis";
        }
    };

    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: "ai",
            type: "text",
            content: "Hello! I am MEDCARE AI, your personal clinical symptom tracker. Please describe the symptoms you are experiencing so I can note them down.",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    ]);

    const fetchChatHistory = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/chats");
            setChatHistoryList(res.data);
        } catch (error) {
            console.error("Failed to fetch chat history:", error);
        }
    };

    const loadSpecificChat = async (chatId) => {
        try {
            const res = await axios.get(`http://localhost:8000/api/chats/${chatId}`);
            // Fix: Backend ke raw JSON objects ko formatting dena zaroori hai
            const formattedMessages = res.data.messages.map(msg => {
                if (msg.sender === "ai" && typeof msg.content === "object" && msg.content !== null) {
                    if (msg.content.diseases) {
                        msg.content = formatTop3Summary(msg.content);
                    } else if (msg.content.name && msg.content.basic_details) {
                        msg.content = formatDiseaseDetails(msg.content);
                    } else if (msg.content.medicine_name) {
                        msg.content = formatMedicineDetails(msg.content);
                    } else {
                        msg.content = JSON.stringify(msg.content);
                    }
                }
                return msg;
            });
            setMessages(formattedMessages);
            setCurrentSessionId(chatId);
        } catch (error) {
            console.error("Failed to load specific chat:", error);
        }
    };

    const deleteChat = async (chatId, e) => {
        e.stopPropagation(); // Click list-item ko trigger na kare
        try {
            await axios.delete(`http://localhost:8000/api/chats/${chatId}`);
            if (currentSessionId === chatId) handleNewChat(); // Agar open chat delete ki toh new start karo
            fetchChatHistory();
        } catch (error) {
            console.error("Failed to delete chat:", error);
        }
    };

    useEffect(() => {
        fetchChatHistory();
    }, []);

    const handleNewChat = () => {
        setCurrentSessionId(null);
        setMessages([
            { id: Date.now(), sender: "ai", type: "text", content: "Hello! I am MEDCARE AI, your personal clinical symptom tracker. Please describe the symptoms you are experiencing so I can note them down.", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
        ]);
        setAccumulatedSymptoms([]);
        setPredictedDiseases([]);
        setAssistantMode("disease");
        setFollowupCount(0);
        setInputValue("");
    };
    // ----------------------------------------

    // 3. PDF REPORT UPLOAD HANDLER
    const handleReportUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setAssistantMode("report");
        setPredictedDiseases([]);
        setAccumulatedSymptoms([]);
        setAwaitingBodyPart(false);
        setFollowupCount(0);

        setIsAttachmentOpen(false);

        const fileMsg = {
            id: Date.now(),
            sender: "user",
            type: "text",
            content: `📄 Uploaded Report: **${file.name}**`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, fileMsg]);
        setIsTyping(true);

        try {
            const formData = new FormData();
            formData.append("file", file);

            // --- NAYA CODE: Tool name aur session_id add kiya ---
            formData.append("tool_used", "Report Analysis");
            if (currentSessionId) formData.append("session_id", currentSessionId);

            const response = await axios.post("http://localhost:8000/api/predict/report", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            const data = response.data;

            if (data.success) {
                if (data.session_id && !currentSessionId) {
                    setCurrentSessionId(data.session_id);
                    fetchChatHistory();
                }

                const report = data.tests
                    .map(test => `${test.test_name}

Result : ${test.converted_value} ${test.converted_unit}
Status : ${test.status}`)
                    .join("\n\n---------------------\n\n");


                const botReply =
                    "### Report Analysis Complete\n\n" + report;

                setMessages(prev => [
                    ...prev,
                    {
                        id: Date.now(),
                        sender: "ai",
                        type: "text",
                        content: botReply,
                        time: new Date().toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit"
                        })
                    }
                ]);
            }
        } catch (error) {
            setMessages(prev => [...prev, {
                id: Date.now(),
                sender: "ai",
                type: "text",
                content: "Failed to process the PDF. Please ensure it's a valid text-based medical report.",
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
        } finally {
            setIsTyping(false);
            if (e.target) e.target.value = null; // clear input for next time
        }
    };

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest('.attachment-menu-container')) {
                setIsAttachmentOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);


    // --- NEW FORMATTERS FOR STRUCTURED JSON RESPONSES ---
    const formatTop3Summary = (summaryData) => {

        if (!summaryData || !summaryData.diseases)
            return "Unable to parse diagnosis.";

        let text = " Based on your symptoms, here are the top possible diseases.\n";
        text += "Type the disease name to get a complete detailed report.\n\n";


        summaryData.diseases.forEach((disease, idx) => {


            text += `## ${idx + 1}. ${disease.name.toUpperCase()} \n`;
            text += ` ═══════════════════════════\n`;

            if (disease.confidence !== undefined) {
                text += ` Confidence: ${disease.confidence}%\n\n`;
            }

            text += ` ════ Basic Details ════\n`;
            text += `${disease.basic_details} \n\n`;

            if (disease.reason?.length) {
                text += ` ════ Reasons ════\n`;
                disease.reason.forEach(item => {
                    text += `• ${item} \n`;
                });
                text += "\n";
            }

            if (disease.diet_recommendation?.length) {
                text += ` ════ Diet Recommendation ════\n`;
                disease.diet_recommendation.forEach(item => {
                    text += `• ${item} \n`;
                });
                text += "\n";
            }

            if (disease.recommended_tests?.length) {
                text += ` ════ Recommended Tests ════\n`;
                disease.recommended_tests.forEach(item => {
                    text += `• ${item} \n`;
                });
                text += "\n";
            }

            text += ` Emergency Level: ${disease.emergency_level} \n\n`;

        });

        text += "\n\n To know complete details, simply type the disease name (Example: Typhoid).";

        return text.trim();
    };

    const formatDiseaseDetails = (details, confidence = null, predictedDiseaseName = null) => {

        const diseaseName = predictedDiseaseName || details?.name || details?.disease || "UNKNOWN";

        let text = `## MEDICAL REPORT: ${diseaseName.toUpperCase()} \n`;

        if (confidence !== null)
            text += ` AI Confidence: ${confidence.toFixed(2)}%\n`;

        text += "\n";

        // Basic Details
        if (details?.basic_details) {
            text += `════ ABOUT THE DISEASE ════\n`;
            text += `${details.basic_details} \n\n`;
        }

        // Reasons
        if (details?.reason?.length) {
            text += `════ REASONS ════\n`;
            text += details.reason.map(x => `• ${x} `).join("\n");
            text += "\n\n";
        }

        // Emergency Signs
        if (details?.emergency_signs?.length) {
            text += `════ EMERGENCY SIGNS ════\n`;
            text += details.emergency_signs.map(x => `• ${x} `).join("\n");
            text += "\n\n";
        }

        // Precautions
        if (details?.precautions?.length) {
            text += `════ PRECAUTIONS ════\n`;
            text += details.precautions.map(x => `• ${x} `).join("\n");
            text += "\n\n";
        }

        // Things to Avoid
        if (details?.things_to_avoid?.length) {
            text += `════ THINGS TO AVOID ════\n`;
            text += details.things_to_avoid.map(x => `• ${x} `).join("\n");
            text += "\n\n";
        }

        // Diet
        if (details?.diet_recommendation?.length) {
            text += `════ DIET RECOMMENDATION ════\n`;
            text += details.diet_recommendation.map(x => `• ${x} `).join("\n");
            text += "\n\n";
        }

        // Medicines
        if (details?.common_medicines?.length) {
            text += `════ COMMON MEDICINES ════\n`;
            text += details.common_medicines.map(x => `• ${x} `).join("\n");
            text += "\n\n";
        }

        // Treatment
        if (details?.treatment_options?.length) {
            text += `════ TREATMENT OPTIONS ════\n`;
            text += details.treatment_options.map(x => `• ${x} `).join("\n");
            text += "\n\n";
        }

        // Recovery
        if (details?.recovery_time?.length) {
            text += `════ RECOVERY TIME ════\n`;
            text += details.recovery_time.map(x => `• ${x} `).join("\n");
            text += "\n\n";
        }

        // Physical Activities
        if (details?.physical_activities?.length) {
            text += `════ PHYSICAL ACTIVITIES ════\n`;
            text += details.physical_activities.map(x => `• ${x} `).join("\n");
            text += "\n\n";
        }

        // Recommended Tests
        if (details?.recommended_tests?.length) {
            text += `════ RECOMMENDED TESTS ════\n`;
            text += details.recommended_tests.map(x => `• ${x} `).join("\n");
            text += "\n\n";
        }

        // When to Visit Doctor
        if (details?.when_to_visit_doctor?.length) {
            text += `════ WHEN TO VISIT A DOCTOR ════\n`;
            text += details.when_to_visit_doctor.map(x => `• ${x} `).join("\n");
            text += "\n\n";
        }

        // Specialist
        if (details?.specialist) {
            text += `════ RECOMMENDED SPECIALIST ════\n`;
            text += `${details.specialist} \n\n`;
        }

        // Emergency Level
        if (details?.emergency_level) {
            text += `════ EMERGENCY LEVEL ════\n`;
            text += `${details.emergency_level} \n\n`;
        }

        return text.trim();
    };

    const formatMedicineDetails = (m) => {

        const toBulletList = (text) => {
            if (!text) return "N/A";
            return text
                .split("|")
                .map(item => `- ${item.trim()} `)
                .join("\n");
        };

        return `

#  ${m.medicine_name}

                ---

## Generic Name
${toBulletList(m.generic_name)}

## Medicine Type
${m.medicine_type || "N/A"}

## Uses
${toBulletList(m.uses)}

## Introduction
${m.introduction || "N/A"}

## How It Works
${toBulletList(m.how_it_works)}

## Dosage
${toBulletList(m.dosage)}

## Side Effects
${toBulletList(m.side_effects)}

## Precautions
${toBulletList(m.precautions)}

## Storage
${toBulletList(m.storage)}

                `;
    };

    // 1. CONVERSATIONAL SYMPTOM TRACKING HANDLER (TEXT INPUT)
    const handleSendMessage = async (text) => {
        if (!text.trim()) return;
        setIsAttachmentOpen(false);

        const userMsg = {
            id: crypto.randomUUID(),
            sender: "user",
            type: "text",
            content: text,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, userMsg]);
        setInputValue("");
        setIsTyping(true);

        try {
            // --- UPDATED PAYLOAD FOR CHAT HISTORY ---
            const response = await axios.post("http://localhost:8000/api/chat/message", {
                session_id: currentSessionId,
                tool_used: getToolName(assistantMode),
                message: text,
                current_symptoms: accumulatedSymptoms,
                followup_count: followupCount,
                awaiting_body_part: awaitingBodyPart,
                predicted_diseases: predictedDiseases
            });

            const data = response.data;
            console.log("RESPONSE =", response);
            console.log("DATA =", response.data);
            if (!response.data) {
                console.error("Backend returned NULL");
                return;
            }

            // --- SAVE SESSION ID IF IT'S NEW ---
            if (data.session_id && !currentSessionId) {
                setCurrentSessionId(data.session_id);
                fetchChatHistory(); // Update sidebar list
            }

            if (data && data.awaiting_body_part !== undefined) {
                setAwaitingBodyPart(data.awaiting_body_part);
            }

            // Sync local states
            if (data.updated_symptoms) {
                setAccumulatedSymptoms(data.updated_symptoms);
            }

            if (
                data.type === "collecting" ||
                data.type === "diagnosis_complete"
            ) {
                setAwaitingBodyPart(false);
            }

            // NAYA CHANGE: Backend se aaya naya followup_count update kar rahe hain
            if (data.followup_count !== undefined) {
                setFollowupCount(data.followup_count);
            }

            let botContent = "";

            // Handle the routing states
            if (
                data.type === "collecting" ||
                data.type === "followup" ||
                data.type === "chat" ||
                data.type === "body_part"
            ) {
                botContent = data.message;
            }
            else if (data.type === "diagnosis_complete") {

                // Save top 3 disease names
                if (data.predicted_diseases) {
                    setPredictedDiseases(data.predicted_diseases);
                }

                botContent = formatTop3Summary(data.data);
            }
            else if (data.type === "disease_details") {
                botContent = formatDiseaseDetails(data.data);
            }
            else {
                botContent = "I received a response, but couldn't format it properly.";
            }

            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                sender: "ai",
                type: "text",
                content: botContent,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);

        } catch (error) {
            console.log(error);

            console.log(error.response);

            console.log(error.response?.data);

            setMessages(prev => [...prev, {
                id: Date.now(),
                sender: "ai",
                type: "text",
                content: "Sorry, I encountered an issue analyzing your input. Please make sure the backend service is running smoothly.",
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    const getMedicineDetails = async (id) => {
        try {
            const res = await axios.get(`http://127.0.0.1:8000/api/medicine/details/${id}`);
            const medicine = res.data.data;
            setShowSuggestions(false);
            setMedicineSuggestions([]);
            setInputValue("");

            const userText = medicine.medicine_name;
            const aiFormattedText = formatMedicineDetails(medicine);

            setMessages(prev => [
                ...prev,
                {
                    id: crypto.randomUUID(), // Date.now() linter issue fix
                    sender: "user",
                    type: "text",
                    content: userText,
                    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                },
                {
                    id: crypto.randomUUID(), 
                    sender: "ai",
                    type: "text",
                    content: aiFormattedText,
                    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                },
            ]);

            // --- NAYA CODE: History Save Karne Ke Liye Backend Call ---
            const saveRes = await axios.post("http://localhost:8000/api/chat/save_interaction", {
                session_id: currentSessionId,
                tool_used: "Medicine Details",
                user_message: userText,
                ai_response: medicine // Raw object bhejo, database JSON me handle kar lega
            });

            // Agar naya session bana hai toh URL/Sidebar update karo
            if (saveRes.data.session_id && !currentSessionId) {
                setCurrentSessionId(saveRes.data.session_id);
                fetchChatHistory();
            }

        } catch (err) {
            console.error(err);
        }
    };

    const fetchMedicineSuggestions = async (query) => {
        if (!query.trim()) {
            setMedicineSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        if (query.trim().length < 2) {
            setMedicineSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        try {
            setLoadingMedicine(true);

            const res = await axios.get(
                `http://127.0.0.1:8000/api/medicine/suggestions`,
                {
                    params: {
                        query: query
                    }
                }
            );

            setMedicineSuggestions(res.data.data);
            setShowSuggestions(true);

        } catch (err) {
            console.error("Medicine Search Error:", err);
            setMedicineSuggestions([]);
            setShowSuggestions(false);
        } finally {
            setLoadingMedicine(false);
        }
    };

    // 2. IMAGE PREDICTION HANDLER
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsAttachmentOpen(false);

        const imageMsg = {
            id: crypto.randomUUID(),
            sender: "user",
            type: "image",
            content: URL.createObjectURL(file),
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, imageMsg]);
        setIsTyping(true);

        try {
            const formData = new FormData();
            formData.append("file", file);

            // --- NAYA CODE: Tool name aur session_id add kiya ---
            formData.append("tool_used", "Skin Disease Prediction");
            if (currentSessionId) formData.append("session_id", currentSessionId);

            // NOTE: Match with your backend URL
            const response = await axios.post("http://localhost:8000/api/predict/image", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            const result = response.data;

            // --- NAYA CODE: Naya session set kiya ---
            if (result.success && result.session_id && !currentSessionId) {
                setCurrentSessionId(result.session_id);
                fetchChatHistory();
            }

            // FIX: Teesra parameter (result.disease) pass karna zaroori hai
            const detailedReport = formatTop3Summary(result.summary);


            setMessages(prev => [...prev, {
                id: Date.now(),
                sender: "ai",
                type: "text",
                content: detailedReport,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
        } catch (error) {
            setMessages(prev => [...prev, {
                id: Date.now(),
                sender: "ai",
                type: "text",
                content: "Failed to accurately analyze the image content. Please try again.",
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="flex h-full w-full bg-[#F8FAFC] dark:bg-gray-900 font-sans transition-colors duration-300 overflow-hidden">
            <aside className={`${isInnerSidebarOpen ? 'w-72' : 'w-0'} shrink-0 bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 flex flex-col transition-all duration-300 overflow-hidden z-10`}>
                <div className="p-4 flex flex-col h-full w-72">
                    <button
                        onClick={handleNewChat}
                        className="flex items-center gap-3 bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 p-3 rounded-2xl font-bold text-sm transition-colors mb-6 shadow-sm"
                    >
                        <FaPlus /> New Chat
                    </button>
                    <div className="relative mb-6">
                        <FaSearch className="absolute left-3 top-3 text-gray-400 text-sm" />
                        <input
                            type="text"
                            placeholder="Search chats..."
                            className="w-full pl-9 pr-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm outline-none focus:ring-1 focus:ring-blue-500 dark:text-white"
                        />
                    </div>
                    <div className="flex-1 overflow-y-auto scrollbar-hide">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-2 flex items-center gap-2">
                            <FaHistory /> Recent History
                        </h3>
                        <div className="flex flex-col gap-1">
                            {/* --- UPDATED SIDEBAR MAP --- */}
                            {chatHistoryList.map((chat) => (
                                <button
                                    key={chat.chat_id}
                                    onClick={() => loadSpecificChat(chat.chat_id)}
                                    className={`flex items-center justify-between w-full text-left p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm transition-colors truncate ${currentSessionId === chat.chat_id ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                                >
                                    <div className="flex items-center gap-3 truncate">
                                        <FaCommentAlt className="text-gray-400 shrink-0" />
                                        <span className="truncate">{chat.title}</span>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0 ml-2">
                                        <span className="text-[10px] text-gray-400">{chat.display_time}</span>
                                        <FaTrash
                                            className="text-red-400 hover:text-red-600 transition-colors z-10"
                                            onClick={(e) => deleteChat(chat.chat_id, e)}
                                        />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                    {accumulatedSymptoms.length > 0 && (
                        <div className="p-3 bg-slate-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-600 rounded-2xl mb-2">
                            <h4 className="text-[11px] font-bold uppercase text-blue-600 dark:text-blue-400 mb-1.5">Tracked Symptoms ({accumulatedSymptoms.length})</h4>
                            <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto">
                                {accumulatedSymptoms.map((s, i) => (
                                    <span key={i} className="text-[10px] px-2 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-md font-medium capitalize">
                                        {s.replace(/_/g, " ")}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className="pt-4 border-t border-gray-100 dark:border-gray-700 mt-2">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">AI Tools</h3>

                        <button
                            onClick={() => {
                                setAssistantMode("disease");
                                setMedicineSuggestions([]);
                                setShowSuggestions(false);
                                setInputValue("");
                            }}
                            className={`flex items-center gap-3 w-full text-left p-3 rounded-xl text-sm transition-all
    ${assistantMode === "disease"
                                    ? "bg-blue-600 text-white shadow-md"
                                    : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                                }`}
                        >
                            <FaStethoscope
                                className={assistantMode === "diagnosis" ? "text-white" : "text-blue-500"}
                            />
                            Disease Diagnosis
                        </button>
                        <button
                            onClick={() => {
                                setAssistantMode("medicine");
                                setMedicineSuggestions([]);
                                setShowSuggestions(false);
                                setInputValue("");
                            }}
                            className={`flex items-center gap-3 w-full text-left p-3 rounded-xl text-sm transition-all
    ${assistantMode === "medicine"
                                    ? "bg-blue-600 text-white shadow-md"
                                    : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                                }`}
                        >
                            <FaPills className={assistantMode === "medicine" ? "text-white" : "text-blue-500"} />
                            Medicine Details
                        </button>
                        <button
                            onClick={() => {
                                setAssistantMode("report");
                                setMedicineSuggestions([]);
                                setShowSuggestions(false);
                                setInputValue("");
                            }}
                            className={`flex items-center gap-3 w-full text-left p-3 rounded-xl text-sm transition-all
        ${assistantMode === "report"
                                    ? "bg-blue-600 text-white shadow-md"
                                    : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                                }`}
                        >
                            <FaFileMedical className={assistantMode === "report" ? "text-white" : "text-blue-500"} />
                            Analyze Report
                        </button>
                    </div>
                </div>
            </aside>
            <div className="flex-1 flex flex-col h-full min-w-0">
                <div className="bg-white dark:bg-gray-800 p-4 border-b border-gray-100 dark:border-gray-700 shadow-sm flex items-center shrink-0 gap-4">
                    <button
                        onClick={() => setIsInnerSidebarOpen(!isInnerSidebarOpen)}
                        className="text-gray-500 dark:text-gray-300 hover:text-blue-600 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                        <FaBars className="text-xl" />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full flex items-center justify-center text-xl shadow-sm">
                            <FaRobot />
                        </div>
                        <div>
                            <h1 className="font-bold text-gray-900 dark:text-white text-lg leading-tight">MEDCARE AI</h1>
                            <p className="text-[11px] text-green-500 font-medium flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Context Synced
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:px-24 scrollbar-hide space-y-6">
                    {assistantMode === "medicine" ? (
                        <div className="mb-4 rounded-xl border border-blue-200 bg-blue-50 p-4 dark:bg-blue-900/20 dark:border-blue-700">
                            <h3 className="font-semibold text-blue-700 dark:text-blue-300">
                                Medicine Mode Activated
                            </h3>
                            <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                                Search any medicine by name or components.
                            </p>
                        </div>
                    ) : assistantMode === "report" ? (
                        <div className="mb-4 rounded-xl border border-purple-200 bg-purple-50 p-4 dark:bg-purple-900/20 dark:border-purple-700">
                            <h3 className="font-semibold text-purple-700 dark:text-purple-300">
                                Report Analyzer Mode
                            </h3>
                            <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">
                                Upload a PDF or Image of your laboratory report.
                            </p>
                        </div>
                    ) : (
                        <div className="mb-4 rounded-xl border border-green-200 bg-green-50 p-4 dark:bg-green-900/20 dark:border-green-700">
                            <h3 className="font-semibold text-green-700 dark:text-green-300">
                                Disease Diagnosis Mode
                            </h3>
                            <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                                Describe your symptoms to receive an AI-powered disease prediction.
                            </p>
                        </div>
                    )}
                    <AnimatePresence>
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} w-full`}
                            >
                                <div className={`flex gap-3 max-w-[85%] md:max-w-[70%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                    <div className="shrink-0 mt-auto mb-1">
                                        {msg.sender === 'user' ? (
                                            <FaUserCircle className="text-gray-400 text-3xl" />
                                        ) : (
                                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm shadow-md">
                                                <FaRobot />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <div className={`p-4 rounded-2xl shadow-sm text-sm ${msg.sender === 'user'
                                            ? 'bg-blue-600 text-white rounded-br-none'
                                            : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-100 rounded-bl-none'
                                            }`}>
                                            {msg.type === 'image' ? (
                                                <img src={msg.content} alt="Uploaded Skin Condition" className="max-w-[200px] md:max-w-[300px] rounded-lg object-cover shadow-sm" />
                                            ) : (
                                                < div className="leading-relaxed whitespace-pre-wrap">
                                                    <ReactMarkdown
                                                        rehypePlugins={[rehypeRaw]}
                                                        components={{
                                                            h1: ({ children }) => (
                                                                <h1 className="font-bold text-3xl text-emerald-600">
                                                                    {children}
                                                                </h1>
                                                            ),

                                                            h2: ({ children }) => (
                                                                <h2 className="font-bold text-lg ">
                                                                    {children}
                                                                </h2>
                                                            ),

                                                            img: ({ src, alt }) => (
                                                                <img
                                                                    src={src}
                                                                    alt={alt}
                                                                    className="mx-auto w-52 h-52 object-contain rounded-xl border bg-white p-2"
                                                                />
                                                            ),
                                                            p: ({ children }) => (
                                                                <p className="mb-0">
                                                                    {children}
                                                                </p>
                                                            ),

                                                            ul: ({ children }) => (
                                                                <ul className="list-disc pl-5">
                                                                    {children}
                                                                </ul>
                                                            ),

                                                            li: ({ children }) => (
                                                                <li className="my-0">
                                                                    {children}
                                                                </li>
                                                            ),
                                                        }}
                                                    >
                                                        {msg.content}
                                                    </ReactMarkdown>
                                                </div>
                                            )}
                                        </div>
                                        <span className={`text-[10px] text-gray-400 font-medium px-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                                            {msg.time}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {isTyping && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start w-full">
                            <div className="flex gap-3 max-w-[85%] flex-row">
                                <div className="w-8 h-8 mt-auto mb-1 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm shadow-md shrink-0">
                                    <FaRobot />
                                </div>
                                <div className="p-4 rounded-2xl rounded-bl-none bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm flex gap-1 items-center h-10">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                    <div ref={chatEndRef} />
                </div>
                <div className="p-4 md:px-6 lg:px-24 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 shrink-0">
                    <div className="flex items-center gap-2 md:gap-3 relative attachment-menu-container">
                        {assistantMode !== "medicine" && (
                            <div className="relative">
                                <button
                                    onClick={() => setIsAttachmentOpen(!isAttachmentOpen)}
                                    className="p-3 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 active:scale-95"
                                >
                                    <FaPaperclip className="text-lg" />
                                </button>

                                <AnimatePresence>
                                    {isAttachmentOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.15 }}
                                            className="absolute bottom-14 left-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-2xl shadow-xl p-2 w-48 flex flex-col gap-1 z-50"
                                        >
                                            {/* 1. Normal Image Upload (For Skin/Disease Prediction) */}
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                onChange={handleImageUpload}
                                                className="hidden"
                                                accept="image/*"
                                            />
                                            {assistantMode === "disease" && (
                                                <button
                                                    onClick={() => fileInputRef.current.click()}
                                                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors"
                                                >
                                                    <FaImage className="text-blue-500" />
                                                    Photo or Image
                                                </button>
                                            )}

                                            {/* 2. Report Analyzer Upload (PDF + Images) */}
                                            <input
                                                type="file"
                                                ref={pdfInputRef}
                                                onChange={handleReportUpload}
                                                className="hidden"
                                                accept=".pdf, image/jpeg, image/png, image/jpg"
                                            />
                                            {assistantMode === "report" && (
                                                <button
                                                    onClick={() => pdfInputRef.current.click()}
                                                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors"
                                                >
                                                    <FaFileAlt className="text-red-500" />
                                                    Upload Report
                                                </button>
                                            )}

                                            {/* 3. Video File (Dummy/Future feature) */}
                                            {assistantMode === "disease" && (
                                                <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors">
                                                    <FaVideo className="text-purple-500" /> Video File
                                                </button>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => {
                                const value = e.target.value;

                                setInputValue(value);

                                if (assistantMode === "medicine") {

                                    if (value.trim() === "") {
                                        setMedicineSuggestions([]);
                                        setShowSuggestions(false);
                                        return;
                                    }

                                    fetchMedicineSuggestions(value);
                                }
                            }}
                            onKeyDown={(e) => {

                                if (e.key !== "Enter") return;

                                if (assistantMode === "disease") {

                                    handleSendMessage(inputValue);

                                } else if (assistantMode === "medicine") {

                                    fetchMedicineSuggestions(inputValue);

                                }

                            }}
                            placeholder={
                                assistantMode === "medicine"
                                    ? "Search medicine (e.g. Dolo 650, Paracetamol...)"
                                    : assistantMode === "report"
                                        ? "Upload your laboratory report using upload📎"
                                        : "Describe symptoms or type disease name..."
                            }
                            className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl py-3 px-4 pr-12 outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                        />
                        {/* <button className="absolute right-15 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-blue-600 transition-colors">
                            <FaMicrophone />
                        </button> */}
                        <button
                            onClick={() => {

                                if (assistantMode === "disease") {

                                    handleSendMessage(inputValue);

                                } else if (assistantMode === "medicine") {

                                    fetchMedicineSuggestions(inputValue);

                                } else {

                                    return;

                                }

                            }}
                            disabled={!inputValue.trim()}
                            className="p-3.5 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
                        >
                            <FaPaperPlane />
                        </button>
                        {assistantMode === "medicine" &&
                            showSuggestions &&
                            inputValue.trim() !== "" &&
                            medicineSuggestions.length > 0 && (
                                <div className="absolute bottom-16 left-14 right-14 bg-white border rounded-xl shadow-xl z-50 max-h-72 overflow-y-auto">

                                    {medicineSuggestions.map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => getMedicineDetails(item.id)}
                                            className="w-full text-left p-3 hover:bg-gray-100 border-b"
                                        >
                                            <div className="font-semibold">
                                                {item.medicine_name}
                                            </div>

                                            <div className="text-xs text-gray-500">
                                                {item.generic_name} • {item.medicine_type}
                                            </div>
                                        </button>
                                    ))}

                                </div>
                            )}
                    </div>
                    <div className="text-center mt-2">
                        <p className="text-[10px] text-gray-400">MEDCARE AI can make mistakes. Please verify critical information with a real doctor.</p>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default AIAssistant;