import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiSearch, FiFilter, FiGrid, FiList, FiChevronRight } from 'react-icons/fi';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';

const AllCourse = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState("grid");
  const [loading, setLoading] = useState(true);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  // Load data from API
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

  // Filter options
  const filterOptions = [
    { id: "all", label: "All Courses", count: courses.length },
    { id: "hsc", label: "HSC", count: courses.filter(c => c.id === "hsc").length },
    { id: "varsity", label: "Varsity", count: courses.filter(c => c.id === "varsity").length },
    { id: "crash", label: "Crash Course", count: courses.filter(c => c.id === "crash").length },
    { id: "medical", label: "Medical", count: courses.filter(c => c.id === "medical").length },
    { id: "olympiad", label: "Olympiad", count: courses.filter(c => c.id === "olympiad").length }
  ];

  // Sorting logic
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

  // Filter and search logic
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

  // Render stars
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className="text-yellow-500">
        {index < Math.floor(rating) ? <AiFillStar /> : <AiOutlineStar />}
      </span>
    ));
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            All Courses
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive collection of biology courses
          </p>
        </div>

        {/* Search and Controls */}
        <div className="mb-8 space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <FiFilter className="text-gray-500" />
              <span className="text-gray-700">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="ml-2 px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                  className={`p-2 rounded ${viewMode === "grid" ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-600'}`}
                >
                  <FiGrid size={20} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${viewMode === "list" ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-600'}`}
                >
                  <FiList size={20} />
                </button>
              </div>
              <span className="text-gray-600">
                {sortedCourses.length} courses found
              </span>
            </div>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {filterOptions.map(option => (
            <button
              key={option.id}
              onClick={() => setActiveFilter(option.id)}
              className={`px-4 py-2 rounded-full font-medium text-sm transition-colors ${
                activeFilter === option.id
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {option.label}
              <span className="ml-2 bg-white/30 px-2 py-0.5 rounded-full text-xs">
                {option.count}
              </span>
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="h-64 bg-gray-100 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : (
          <>
            {/* Grid View */}
            {viewMode === "grid" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="wait">
                  {sortedCourses.map((course, index) => (
                    <motion.div
                      key={course.id + index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ y: -5 }}
                      className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <Link to={course.path} className="block h-full p-6">
                        {/* Course Icon */}
                        <div className="text-4xl mb-4 text-center">
                          {course.icon}
                        </div>

                        {/* Course tags */}
                        {course.tags && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {course.tags.slice(0, 2).map((tag, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 text-xs font-medium bg-emerald-50 text-emerald-700 rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Title */}
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {course.title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {course.description}
                        </p>

                        {/* Rating */}
                        <div className="flex items-center gap-1 mb-4">
                          <div className="flex">
                            {renderStars(course.rating || 4.5)}
                          </div>
                          <span className="text-sm text-gray-500 ml-1">
                            ({course.rating || 4.5})
                          </span>
                        </div>

                        {/* Course details */}
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                            <span className="text-sm">⏱</span>
                            <span className="text-xs font-medium">{course.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                            <span className="text-sm">🎯</span>
                            <span className="text-xs font-medium">{course.level}</span>
                          </div>
                        </div>

                        {/* Price and Enroll */}
                        <div className="flex items-center justify-between pt-4 border-t">
                          <div>
                            <span className="text-xl font-bold text-emerald-600">
                              ${course.price || "49.99"}
                            </span>
                            {course.originalPrice && (
                              <span className="ml-2 text-sm text-gray-400 line-through">
                                ${course.originalPrice}
                              </span>
                            )}
                          </div>

                          <button className="flex items-center gap-1 px-4 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors">
                            Enroll
                            <FiChevronRight />
                          </button>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}

            {/* List View */}
            {viewMode === "list" && (
              <div className="space-y-4">
                {sortedCourses.map((course, index) => (
                  <motion.div
                    key={course.id + index + "list"}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <Link to={course.path}>
                      <div className="flex flex-col md:flex-row items-center p-6">
                        {/* Course Icon */}
                        <div className="md:w-1/6 flex justify-center mb-4 md:mb-0">
                          <div className="text-4xl">
                            {course.icon}
                          </div>
                        </div>

                        {/* Course Details */}
                        <div className="md:w-4/6 md:px-6">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-1 text-xs font-medium bg-emerald-50 text-emerald-700 rounded">
                              {course.id.toUpperCase()}
                            </span>
                            <span className="text-sm text-gray-500">{course.level}</span>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {course.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-1">
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
                        <div className="md:w-1/6 mt-4 md:mt-0 text-center">
                          <div className="text-xl font-bold text-emerald-600 mb-2">
                            ${course.price || "49.99"}
                          </div>
                          <button className="w-full py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors">
                            Enroll Now
                          </button>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}

            {/* No Results */}
            {sortedCourses.length === 0 && !loading && (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No courses found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search or filter
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setActiveFilter("all");
                  }}
                  className="px-6 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </>
        )}

        {/* Pagination */}
        {sortedCourses.length > 0 && !loading && (
          <div className="flex justify-center mt-10">
            <div className="flex items-center gap-1">
              <button className="px-3 py-2 text-gray-600 hover:text-emerald-600 rounded hover:bg-gray-100">
                Previous
              </button>
              {[1, 2, 3].map(num => (
                <button
                  key={num}
                  className={`w-8 h-8 rounded font-medium ${
                    num === 1
                      ? "bg-emerald-600 text-white"
                      : "text-gray-600 hover:text-emerald-600 hover:bg-gray-100"
                  }`}
                >
                  {num}
                </button>
              ))}
              <button className="px-3 py-2 text-gray-600 hover:text-emerald-600 rounded hover:bg-gray-100">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCourse;