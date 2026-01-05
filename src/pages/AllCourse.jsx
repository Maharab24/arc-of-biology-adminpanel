import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiSearch, FiFilter, FiGrid, FiList, FiChevronRight } from 'react-icons/fi';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';

const AllCourse = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [activeFilter, setActiveFilter] = useState("all");
  const [courses, setCourses] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState("grid");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
}, []);
  /* ---------------- Load data from API ---------------- */
  useEffect(() => {
    setLoading(true);
    fetch("/Course.json")
      .then(res => res.json())
      .then(data => {
        setCourses(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load courses:", err);
        setLoading(false);
      });
  }, []);

  /* ---------------- Filter options ---------------- */
  const filterOptions = [
    { id: "all", label: "All Courses", count: courses.length },
    { id: "hsc", label: "HSC", count: courses.filter(c => c.id === "hsc").length },
    { id: "varsity", label: "Varsity", count: courses.filter(c => c.id === "varsity").length },
    { id: "crash", label: "Crash Course", count: courses.filter(c => c.id === "crash").length },
    { id: "medical", label: "Medical", count: courses.filter(c => c.id === "medical").length },
    { id: "olympiad", label: "Olympiad", count: courses.filter(c => c.id === "olympiad").length }
  ];

  /* ---------------- Sorting logic ---------------- */
  const sortCourses = (courses) => {
    switch(sortBy) {
      case "popular":
        return [...courses].sort((a, b) => b.rating - a.rating);
      case "newest":
        return [...courses].sort((a, b) => new Date(b.date) - new Date(a.date));
      case "price-low":
        return [...courses].sort((a, b) => a.price - b.price);
      case "price-high":
        return [...courses].sort((a, b) => b.price - a.price);
      default:
        return courses;
    }
  };

  /* ---------------- Filter and search logic ---------------- */
  const filteredCourses = courses
    .filter(course =>
      activeFilter === "all" ? true : course.id === activeFilter
    )
    .filter(course =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  const sortedCourses = sortCourses(filteredCourses);

  /* ---------------- Animations ---------------- */
  const floatAnimation = {
    y: [0, -15, 0],
    rotate: [0, 5, -5, 0],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
  };

  const cardHoverAnimation = {
    scale: 1.05,
    rotateY: 10,
    rotateX: 5,
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    transition: { duration: 0.3 }
  };

  const glowAnimation = {
    scale: [1, 1.1, 1],
    opacity: [0.3, 0.6, 0.3],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
  };

  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, when: "beforeChildren" }
    }
  };

  const floatingElements = ["🧬", "🔬", "🧪", "🦠", "🧫", "🧠", "💊", "🌱", "🩺", "📚", "🎓", "📖"];

  /* ---------------- Render stars ---------------- */
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className="text-yellow-400">
        {index < Math.floor(rating) ? <AiFillStar /> : <AiOutlineStar />}
      </span>
    ));
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen py-20 px-4 sm:px-8 overflow-hidden relative"
    >
      {/* Animated background elements */}
      <motion.div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-r from-purple-300/20 to-pink-300/20 rounded-full blur-3xl" animate={glowAnimation} />
      <motion.div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-l from-cyan-300/20 to-emerald-300/20 rounded-full blur-3xl" animate={glowAnimation} />

      {/* Gradient mesh background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-200/30 via-transparent to-transparent"></div>

      {/* Floating icons */}
      {floatingElements.map((icon, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl opacity-20 pointer-events-none"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            filter: `hue-rotate(${i * 40}deg)`
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            rotate: [0, 360, 0]
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            delay: i * 1.5
          }}
        >
          {icon}
        </motion.div>
      ))}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Page Header */}
        <motion.div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            <span className="bg-gradient-to-r from-emerald-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
              All Courses
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
          >
            Explore our comprehensive collection of biology courses designed for all levels
          </motion.p>
        </motion.div>

        {/* Search and Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-10 space-y-6"
        >
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Search courses by title, description, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <FiFilter className="text-gray-500" />
              <span className="text-gray-700 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="ml-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="popular">Most Popular</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg ${viewMode === "grid" ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-600'}`}
                >
                  <FiGrid size={20} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg ${viewMode === "list" ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-600'}`}
                >
                  <FiList size={20} />
                </button>
              </div>
              <span className="text-gray-600">
                {sortedCourses.length} {sortedCourses.length === 1 ? 'course' : 'courses'} found
              </span>
            </div>
          </div>
        </motion.div>

        {/* Filter Chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {filterOptions.map(option => (
            <motion.button
              key={option.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(option.id)}
              className={`px-5 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                activeFilter === option.id
                  ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-200"
                  : "bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-emerald-300 text-gray-700 hover:text-emerald-600"
              }`}
            >
              {option.label}
              <span className={`text-sm px-2 py-1 rounded-full ${
                activeFilter === option.id
                  ? "bg-white/20"
                  : "bg-gray-100"
              }`}>
                {option.count}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="h-[400px] bg-gray-100/50 rounded-3xl animate-pulse"
              />
            ))}
          </div>
        ) : (
          <>
            {/* Grid View */}
            {viewMode === "grid" && (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerAnimation}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <AnimatePresence mode="wait">
                  {sortedCourses.map((course, index) => (
                    <motion.div
                      key={course.id + index}
                      layout
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={cardHoverAnimation}
                      onMouseEnter={() => setHoveredCard(course.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                      className="relative group cursor-pointer"
                    >
                      {/* Card glow effect */}
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 rounded-3xl blur opacity-0 group-hover:opacity-70 transition duration-500"></div>

                      {/* Card background with gradient */}
                      <div className="relative h-full bg-gradient-to-br from-white via-white/95 to-white/90 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-100/50 shadow-xl">
                        {/* Animated gradient stripe */}
                        <motion.div
                          className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500"
                          animate={hoveredCard === course.id ?
                            { scaleX: [0, 1.2, 1] } :
                            { scaleX: 1 }
                          }
                          transition={{ duration: 0.5 }}
                        />

                        {/* Card content */}
                        <Link to={course.path} className="block h-full p-6">
                          {/* Icon container with gradient */}
                          <div className="relative mb-6">
                            <motion.div
                              className="absolute -inset-4 bg-gradient-to-r from-emerald-200/50 to-cyan-200/50 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500"
                              animate={floatAnimation}
                            />
                            <motion.div
                              className="relative text-6xl mb-4 text-center"
                              animate={floatAnimation}
                            >
                              {course.icon}
                            </motion.div>
                          </div>

                          {/* Course tags */}
                          {course.tags && (
                            <div className="flex flex-wrap gap-2 mb-3">
                              {course.tags.slice(0, 2).map((tag, idx) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Title */}
                          <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-emerald-800 bg-clip-text text-transparent mb-3">
                            {course.title}
                          </h3>

                          {/* Description */}
                          <p className="text-gray-600 mb-6 leading-relaxed line-clamp-2">
                            {course.description}
                          </p>

                          {/* Rating */}
                          <div className="flex items-center gap-2 mb-4">
                            <div className="flex">
                              {renderStars(course.rating || 4.5)}
                            </div>
                            <span className="text-sm text-gray-500">
                              ({course.rating || 4.5})
                            </span>
                            <span className="text-sm text-gray-400">
                              • {course.students || "100+ students"}
                            </span>
                          </div>

                          {/* Course details grid */}
                          <div className="grid grid-cols-2 gap-3 mb-6">
                            <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-emerald-50 to-emerald-100/50 rounded-xl">
                              <div className="text-lg">⏱</div>
                              <div className="text-sm font-medium text-emerald-800">{course.duration}</div>
                            </div>
                            <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-cyan-50 to-cyan-100/50 rounded-xl">
                              <div className="text-lg">🎯</div>
                              <div className="text-sm font-medium text-cyan-800">{course.level}</div>
                            </div>
                          </div>

                          {/* Price and Enroll */}
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-2xl font-bold text-emerald-600">
                                ${course.price || "49.99"}
                              </span>
                              {course.originalPrice && (
                                <span className="ml-2 text-sm text-gray-400 line-through">
                                  ${course.originalPrice}
                                </span>
                              )}
                            </div>

                            {/* Enroll button with gradient */}
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              className="relative overflow-hidden rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 p-1"
                            >
                              <div className="bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-xl py-2 px-4 text-center">
                                <span className="font-semibold text-white flex items-center justify-center gap-2">
                                  Enroll Now
                                  <motion.span
                                    animate={hoveredCard === course.id ?
                                      { x: [0, 5, 0] } :
                                      { x: 0 }
                                    }
                                    transition={{ duration: 0.5, repeat: Infinity }}
                                  >
                                    <FiChevronRight />
                                  </motion.span>
                                </span>
                              </div>
                            </motion.div>
                          </div>

                          {/* Floating particles on hover */}
                          {hoveredCard === course.id && (
                            <>
                              <motion.div
                                className="absolute top-4 right-4 text-2xl opacity-30"
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", stiffness: 200 }}
                              >
                                ✨
                              </motion.div>
                              <motion.div
                                className="absolute bottom-4 left-4 text-xl opacity-30"
                                initial={{ scale: 0, rotate: 180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                              >
                                ⭐
                              </motion.div>
                            </>
                          )}
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            {/* List View */}
            {viewMode === "list" && (
              <motion.div
                className="space-y-6"
                variants={containerAnimation}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                {sortedCourses.map((course, index) => (
                  <motion.div
                    key={course.id + index + "list"}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    whileHover={{ x: 10 }}
                    className="group"
                  >
                    <Link to={course.path}>
                      <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                        <div className="flex flex-col md:flex-row items-center">
                          {/* Course Icon */}
                          <div className="md:w-1/4 p-6 flex items-center justify-center">
                            <motion.div
                              className="text-6xl"
                              animate={floatAnimation}
                            >
                              {course.icon}
                            </motion.div>
                          </div>

                          {/* Course Details */}
                          <div className="md:w-2/4 p-6">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="px-3 py-1 text-sm font-medium bg-emerald-100 text-emerald-800 rounded-full">
                                {course.id.toUpperCase()}
                              </span>
                              <span className="text-sm text-gray-500">{course.level}</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                              {course.title}
                            </h3>
                            <p className="text-gray-600 mb-4 line-clamp-2">
                              {course.description}
                            </p>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                {renderStars(course.rating || 4.5)}
                                <span className="ml-1 text-sm text-gray-500">
                                  ({course.rating || 4.5})
                                </span>
                              </div>
                              <span className="text-gray-400">•</span>
                              <span className="text-sm text-gray-500">{course.duration}</span>
                              <span className="text-gray-400">•</span>
                              <span className="text-sm text-gray-500">{course.students || "100+ students"}</span>
                            </div>
                          </div>

                          {/* Price and Enroll */}
                          <div className="md:w-1/4 p-6 border-l border-gray-200/50">
                            <div className="text-center">
                              <div className="text-3xl font-bold text-emerald-600 mb-2">
                                ${course.price || "49.99"}
                              </div>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-xl shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300 transition-all duration-300"
                              >
                                Enroll Now
                              </motion.button>
                              <button className="w-full mt-3 py-2 text-emerald-600 font-medium hover:text-emerald-700 transition-colors">
                                View Details →
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* No Results */}
            {sortedCourses.length === 0 && !loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  No courses found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setActiveFilter("all");
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-full shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300 transition-all duration-300"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </>
        )}

        {/* Pagination or Load More */}
        {sortedCourses.length > 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            className="text-center mt-16"
          >
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full p-2">
              <button className="px-4 py-2 text-gray-600 hover:text-emerald-600 font-medium rounded-full hover:bg-emerald-50 transition-colors">
                Previous
              </button>
              {[1, 2, 3, 4, 5].map(num => (
                <button
                  key={num}
                  className={`w-10 h-10 rounded-full font-medium ${
                    num === 1
                      ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white"
                      : "text-gray-600 hover:text-emerald-600 hover:bg-emerald-50"
                  }`}
                >
                  {num}
                </button>
              ))}
              <button className="px-4 py-2 text-gray-600 hover:text-emerald-600 font-medium rounded-full hover:bg-emerald-50 transition-colors">
                Next
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AllCourse;