import { FaArrowRight, FaRobot, FaShieldAlt } from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi2";

const Hero = () => {
    return (
        <section className="bg-white">

            <div className="mx-auto flex min-h-[90vh] max-w-7xl flex-col-reverse items-center justify-between gap-16 px-6 py-16 lg:flex-row">

                {/* LEFT */}

                <div className="w-full lg:w-1/2">

                    {/* Badge */}

                    <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">

                        <FaRobot />

                        AI Powered Healthcare Platform

                    </div>

                    {/* Heading */}

                    <h1 className="mt-8 text-5xl font-extrabold leading-tight text-slate-900 lg:text-6xl">

                        Smarter Healthcare,

                        <br />

                        <span className="text-blue-600">

                            Powered by AI.

                        </span>

                    </h1>

                    {/* Description */}

                    <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">

                        Analyze symptoms, understand medical reports,
                        discover trusted doctors, book appointments,
                        manage medicines and receive intelligent
                        healthcare guidance from one platform.

                    </p>

                    {/* Buttons */}

                    <div className="mt-10 flex flex-wrap gap-4">

                        <button className="flex items-center gap-3 rounded-xl bg-blue-600 px-7 py-4 font-semibold text-white transition hover:bg-blue-700">

                            Start AI Diagnosis

                            <FaArrowRight />

                        </button>

                        <button className="rounded-xl border border-slate-300 px-7 py-4 font-semibold text-slate-700 transition hover:border-blue-600 hover:text-blue-600">

                            Find Doctors

                        </button>

                    </div>

                    {/* Features */}

                    <div className="mt-12 grid gap-4">

                        <div className="flex items-center gap-3">

                            <FaShieldAlt className="text-green-500" />

                            <span className="text-slate-700">

                                Secure & Encrypted Medical Records

                            </span>

                        </div>

                        <div className="flex items-center gap-3">

                            <FaRobot className="text-blue-600" />

                            <span className="text-slate-700">

                                AI Chatbot for Instant Guidance

                            </span>

                        </div>

                        <div className="flex items-center gap-3">

                            <HiOutlineDocumentText
                                className="text-blue-600"
                                size={22}
                            />

                            <span className="text-slate-700">

                                Medical Report Analysis

                            </span>

                        </div>

                    </div>

                    {/* Stats */}

                    <div className="mt-14 grid grid-cols-3 gap-5">

                        <div className="rounded-2xl border border-slate-200 bg-white p-5">

                            <h2 className="text-3xl font-bold text-blue-600">

                                50K+

                            </h2>

                            <p className="mt-2 text-sm text-slate-500">

                                Happy Patients

                            </p>

                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-5">

                            <h2 className="text-3xl font-bold text-blue-600">

                                500+

                            </h2>

                            <p className="mt-2 text-sm text-slate-500">

                                Doctors

                            </p>

                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-5">

                            <h2 className="text-3xl font-bold text-blue-600">

                                99%

                            </h2>

                            <p className="mt-2 text-sm text-slate-500">

                                AI Accuracy

                            </p>

                        </div>

                    </div>

                </div>

                {/* RIGHT */}

                <div className="relative flex w-full items-center justify-center lg:w-1/2">

                    {/* Doctor Card */}

                    <div className="relative w-[360px] overflow-hidden rounded-[36px] bg-gradient-to-b from-blue-600 to-blue-700 shadow-2xl">

                        <div className="flex h-[520px] flex-col items-center justify-center">

                            {/* Replace with Doctor PNG */}

                            <div className="flex h-48 w-48 items-center justify-center rounded-full bg-white">

                                <span className="text-7xl">

                                    👨‍⚕️

                                </span>

                            </div>

                            <h2 className="mt-8 text-3xl font-bold text-white">

                                AI Assisted Care

                            </h2>

                            <p className="mt-3 px-8 text-center text-blue-100">

                                Professional healthcare supported
                                by intelligent AI technology.

                            </p>

                        </div>
                    </div>

                    {/* AI Chat Card */}

                    <div className="absolute -left-8 top-12 w-72 rounded-3xl border border-slate-200 bg-white p-5 shadow-xl">

                        <div className="flex items-center gap-4">

                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white">

                                <FaRobot size={20} />

                            </div>

                            <div>

                                <h3 className="font-semibold text-slate-900">

                                    AI Health Assistant

                                </h3>

                                <p className="text-sm text-green-600">

                                    ● Online

                                </p>

                            </div>

                        </div>

                        <div className="mt-5 rounded-2xl bg-slate-100 p-4">

                            <p className="text-sm leading-7 text-slate-600">

                                Hello 👋

                                <br />

                                Describe your symptoms and I'll help you understand the next steps.

                            </p>

                        </div>

                    </div>

                    {/* Report Card */}

                    <div className="absolute -right-8 top-24 w-64 rounded-3xl border border-slate-200 bg-white p-5 shadow-xl">

                        <div className="flex items-center gap-3">

                            <div className="rounded-xl bg-blue-100 p-3">

                                <HiOutlineDocumentText
                                    size={24}
                                    className="text-blue-600"
                                />

                            </div>

                            <div>

                                <h3 className="font-semibold">

                                    AI Report Analysis

                                </h3>

                                <p className="text-sm text-slate-500">

                                    Blood Test.pdf

                                </p>

                            </div>

                        </div>

                        <div className="mt-5 space-y-3">

                            <div className="h-2 rounded-full bg-slate-200"></div>

                            <div className="h-2 w-5/6 rounded-full bg-slate-200"></div>

                            <div className="h-2 w-3/4 rounded-full bg-slate-200"></div>

                        </div>

                        <button className="mt-5 w-full rounded-xl bg-blue-50 py-3 font-medium text-blue-600">

                            View Analysis

                        </button>

                    </div>

                    {/* Heart Card */}

                    <div className="absolute -bottom-6 left-6 w-60 rounded-3xl border border-slate-200 bg-white p-5 shadow-xl">

                        <p className="text-sm text-slate-500">

                            Heart Rate

                        </p>

                        <div className="mt-3 flex items-center justify-between">

                            <h2 className="text-4xl font-bold text-slate-900">

                                72

                            </h2>

                            <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-600">

                                Normal

                            </span>

                        </div>

                        <div className="mt-5 h-2 rounded-full bg-slate-200">

                            <div className="h-full w-4/5 rounded-full bg-green-500"></div>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
};

export default Hero;