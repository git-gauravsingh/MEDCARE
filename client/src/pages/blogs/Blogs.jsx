import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    FaSearch, FaRegBookmark, FaBookmark, FaUserCircle,
    FaClock, FaCalendarAlt, FaArrowRight, FaEnvelope
} from "react-icons/fa";

const Blogs = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [savedBlogs, setSavedBlogs] = useState([2]); // Simulating a saved article

    const categories = ["All", "Nutrition", "Fitness", "Mental Health", "Heart Health", "Pediatrics", "Technology"];

    // Featured Blog Data
    const featuredBlog = {
        id: 100,
        title: "The Future of AI in Healthcare: What Patients Need to Know",
        category: "Technology",
        author: "Dr. Arvind Kumar",
        date: "09 July 2026",
        readTime: "8 min read",
        excerpt: "From robotic surgeries to AI-driven symptom checkers, discover how artificial intelligence is making healthcare faster, safer, and more personalized than ever before."
    };

    // Standard Blogs Data
    const blogsList = [
        { id: 1, title: "10 Superfoods for a Stronger Immune System", category: "Nutrition", author: "Dr. Neha Sharma", date: "05 July 2026", readTime: "5 min read" },
        { id: 2, title: "Simple Morning Habits for a Healthy Life", category: "Fitness", author: "Dr. Arjun Mehta", date: "02 July 2026", readTime: "4 min read" },
        { id: 3, title: "How to Manage Stress in a Busy Schedule", category: "Mental Health", author: "Dr. Rohan Verma", date: "28 June 2026", readTime: "6 min read" },
        { id: 4, title: "Understanding Your Cholesterol Levels", category: "Heart Health", author: "Dr. Anita Desai", date: "25 June 2026", readTime: "7 min read" },
        { id: 5, title: "Childhood Vaccinations: A Complete Guide", category: "Pediatrics", author: "Dr. Vikram Singh", date: "20 June 2026", readTime: "10 min read" },
        { id: 6, title: "The Truth About Intermittent Fasting", category: "Nutrition", author: "Dr. Priya Patel", date: "15 June 2026", readTime: "6 min read" },
        { id: 7, title: "Home Workouts for Joint Pain Relief", category: "Fitness", author: "Dr. R.K. Mishra", date: "10 June 2026", readTime: "5 min read" },
        { id: 8, title: "Recognizing the Early Signs of Anxiety", category: "Mental Health", author: "Dr. Sneha Verma", date: "05 June 2026", readTime: "8 min read" }
    ];

    // Filter Logic
    const filteredBlogs = blogsList.filter(blog => {
        const matchesCategory = activeCategory === "All" || blog.category === activeCategory;
        const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const toggleBookmark = (id, e) => {
        e.preventDefault(); // Prevents navigating to the blog post when clicking the bookmark
        if (savedBlogs.includes(id)) {
            setSavedBlogs(savedBlogs.filter(blogId => blogId !== id));
        } else {
            setSavedBlogs([...savedBlogs, id]);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="p-4 lg:p-8 w-full flex flex-col gap-8 bg-[#F8FAFC] dark:bg-gray-900 min-h-screen font-sans transition-colors duration-300"
        >
            {/* PAGE HEADER & SEARCH */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white dark:bg-gray-800 p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
                <div className="flex-1">
                    <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white mb-2">Health Insights</h1>
                    <p className="text-gray-500 dark:text-gray-400">Expert articles, medical updates, and wellness tips.</p>
                </div>

                <div className="w-full lg:w-[400px] relative">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search for articles, topics..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all"
                    />
                </div>
            </div>

            {/* CATEGORY */}
            <div className="flex gap-3 items-center overflow-x-auto p-7 scrollbar-hide">
                {categories.map((category, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveCategory(category)}
                        className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all active:scale-95 border ${activeCategory === category
                                ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white shadow-md'
                                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* FEATURED ARTICLE BANNER (Only shows when no search/filters are active) */}
            {activeCategory === "All" && searchQuery === "" && (
                <Link to={`/blogs/${featuredBlog.id}`} className="w-full bg-blue-900 dark:bg-blue-950 rounded-3xl relative overflow-hidden group cursor-pointer shadow-md flex flex-col min-h-[400px] md:min-h-[500px]">
                    {/* Background Graphic Placeholder */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-800 dark:from-blue-950 dark:to-blue-900 z-0">
                        <div className="absolute right-0 top-0 w-full md:w-1/2 h-full opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] group-hover:scale-105 transition-transform duration-700"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 p-6 md:p-12 mt-auto flex flex-col gap-4 w-full md:w-2/3 lg:w-1/2">
                        <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full w-max uppercase tracking-wider">Featured • {featuredBlog.category}</span>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight group-hover:text-blue-200 transition-colors">
                            {featuredBlog.title}
                        </h2>
                        <p className="text-blue-100 text-sm md:text-base leading-relaxed hidden md:block">
                            {featuredBlog.excerpt}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-blue-200 text-xs md:text-sm mt-4">
                            <span className="flex items-center gap-1.5"><FaUserCircle /> {featuredBlog.author}</span>
                            <span className="flex items-center gap-1.5"><FaCalendarAlt /> {featuredBlog.date}</span>
                            <span className="flex items-center gap-1.5"><FaClock /> {featuredBlog.readTime}</span>
                        </div>
                    </div>
                </Link>
            )}

            {/* BLOGS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredBlogs.length > 0 ? (
                    filteredBlogs.map((blog) => (
                        <Link to={`/blogs/${blog.id}`} key={blog.id} className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden group cursor-pointer flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative">

                            {/* Bookmark Button */}
                            <button
                                onClick={(e) => toggleBookmark(blog.id, e)}
                                className="absolute top-4 right-4 z-20 w-8 h-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white dark:hover:bg-gray-900 active:scale-90 transition-all text-blue-600 dark:text-blue-400"
                            >
                                {savedBlogs.includes(blog.id) ? <FaBookmark /> : <FaRegBookmark />}
                            </button>

                            {/* Image Placeholder */}
                            <div className="h-48 bg-gray-200 dark:bg-gray-700 relative overflow-hidden w-full shrink-0">
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-700 dark:to-gray-600 group-hover:scale-105 transition-transform duration-500"></div>
                                <span className="absolute bottom-3 left-3 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 text-[10px] font-bold px-3 py-1 rounded-full shadow-sm z-10 uppercase tracking-wider">
                                    {blog.category}
                                </span>
                            </div>

                            {/* Card Content */}
                            <div className="p-5 flex flex-col flex-1">
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                                    {blog.title}
                                </h3>

                                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 flex flex-col gap-2 text-xs text-gray-500 dark:text-gray-400">
                                    <div className="flex items-center gap-2 font-medium text-gray-700 dark:text-gray-300">
                                        <FaUserCircle className="text-gray-400 dark:text-gray-500 text-sm" /> {blog.author}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="flex items-center gap-1"><FaCalendarAlt className="text-gray-400 dark:text-gray-500" /> {blog.date}</span>
                                        <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium"><FaClock /> {blog.readTime}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="col-span-full py-16 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700">
                        <FaSearch className="text-5xl mb-4 opacity-30" />
                        <h3 className="text-xl font-bold text-gray-600 dark:text-gray-400">No articles found</h3>
                        <p className="text-sm mt-2">Try adjusting your category filter or search terms.</p>
                    </div>
                )}
            </div>

            {/* NEWSLETTER SECTION */}
            <div className="mt-10 bg-white dark:bg-gray-800 p-8 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 text-center flex flex-col items-center justify-center w-full h-auto bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] relative overflow-hidden transition-colors">
                <div className="absolute inset-0 bg-blue-50/90 dark:bg-gray-800/95 z-0"></div>
                <div className="relative z-10 max-w-2xl flex flex-col items-center">
                    <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg shadow-blue-200 dark:shadow-none">
                        <FaEnvelope />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-3">Subscribe to our Newsletter</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">Get the latest medical news, fitness routines, and healthy recipes delivered straight to your inbox every week.</p>

                    <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="flex-1 px-5 py-3.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                        />
                        <button className="bg-blue-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-blue-700 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2">
                            Subscribe <FaArrowRight />
                        </button>
                    </div>
                </div>
            </div>

        </motion.div>
    );
};

export default Blogs;