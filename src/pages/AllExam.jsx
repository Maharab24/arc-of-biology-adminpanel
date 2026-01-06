import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiSearch, FiFilter, FiCalendar, FiClock, FiUsers, FiBookOpen, FiChevronRight } from 'react-icons/fi';
import { AiOutlineQuestionCircle, AiFillCheckCircle, AiOutlineClockCircle } from 'react-icons/ai';

const AllExam = () => {
  const [exams, setExams] = useState([]);
  const [filteredExams, setFilteredExams] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("upcoming");
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");

  // Mock exam data (in real app, this would come from API)
  const mockExams = [
    {
      id: "hsc-2024",
      title: "HSC Biology Final Exam",
      description: "Complete syllabus final examination with practical and theory sections",
      date: "2024-11-15",
      time: "10:00 AM - 1:00 PM",
      duration: "3 Hours",
      totalQuestions: 100,
      totalMarks: 100,
      enrolled: 1250,
      maxParticipants: 1500,
      difficulty: "Intermediate",
      type: "Board",
      status: "upcoming",
      icon: "🎓",
      path: "/exams/hsc-2024"
    },
    {
      id: "medical-neet",
      title: "NEET 2024 Mock Test",
      description: "Full-length NEET preparation test with previous year question patterns",
      date: "2024-10-20",
      time: "9:00 AM - 12:00 PM",
      duration: "3 Hours",
      totalQuestions: 180,
      totalMarks: 720,
      enrolled: 850,
      maxParticipants: 1000,
      difficulty: "Advanced",
      type: "Medical",
      status: "upcoming",
      icon: "⚕️",
      path: "/exams/medical-neet"
    },
    {
      id: "varsity-admission",
      title: "Varsity Admission Test",
      description: "Comprehensive biology test for university admission preparation",
      date: "2024-09-30",
      time: "2:00 PM - 5:00 PM",
      duration: "3 Hours",
      totalQuestions: 80,
      totalMarks: 80,
      enrolled: 2100,
      maxParticipants: 2500,
      difficulty: "Intermediate",
      type: "Admission",
      status: "upcoming",
      icon: "🏛️",
      path: "/exams/varsity-admission"
    },
    {
      id: "olympiad-prelim",
      title: "Biology Olympiad Preliminary",
      description: "National level biology olympiad preliminary round",
      date: "2024-08-25",
      time: "11:00 AM - 2:00 PM",
      duration: "3 Hours",
      totalQuestions: 120,
      totalMarks: 120,
      enrolled: 950,
      maxParticipants: 1200,
      difficulty: "Expert",
      type: "Olympiad",
      status: "upcoming",
      icon: "🏅",
      path: "/exams/olympiad-prelim"
    },
    {
      id: "crash-course-final",
      title: "Crash Course Final Assessment",
      description: "Final assessment for biology crash course participants",
      date: "2024-07-15",
      time: "3:00 PM - 5:00 PM",
      duration: "2 Hours",
      totalQuestions: 60,
      totalMarks: 60,
      enrolled: 1800,
      maxParticipants: 2000,
      difficulty: "Beginner",
      type: "Assessment",
      status: "completed",
      icon: "⚡",
      path: "/exams/crash-course-final"
    },
    {
      id: "mid-term-2024",
      title: "Mid Term Biology Exam",
      description: "Half-yearly biology examination for regular students",
      date: "2024-06-10",
      time: "9:30 AM - 12:30 PM",
      duration: "3 Hours",
      totalQuestions: 90,
      totalMarks: 90,
      enrolled: 3200,
      maxParticipants: 3500,
      difficulty: "Intermediate",
      type: "Academic",
      status: "completed",
      icon: "📚",
      path: "/exams/mid-term-2024"
    },
    {
      id: "chapter-test-cell",
      title: "Cell Biology Chapter Test",
      description: "Focused test on cell biology chapter for HSC students",
      date: "2024-10-05",
      time: "4:00 PM - 5:30 PM",
      duration: "1.5 Hours",
      totalQuestions: 50,
      totalMarks: 50,
      enrolled: 750,
      maxParticipants: 1000,
      difficulty: "Intermediate",
      type: "Chapter",
      status: "upcoming",
      icon: "🧬",
      path: "/exams/chapter-test-cell"
    },
    {
      id: "genetics-quiz",
      title: "Genetics Weekly Quiz",
      description: "Weekly quiz competition on genetics for medical students",
      date: "2024-10-12",
      time: "6:00 PM - 7:00 PM",
      duration: "1 Hour",
      totalQuestions: 30,
      totalMarks: 30,
      enrolled: 420,
      maxParticipants: 500,
      difficulty: "Advanced",
      type: "Quiz",
      status: "upcoming",
      icon: "🧪",
      path: "/exams/genetics-quiz"
    }
  ];

  // Load data on component mount
  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setExams(mockExams);
      setFilteredExams(mockExams);
      setLoading(false);
    }, 800);
  }, []);

  // Filter and search logic
  useEffect(() => {
    let result = [...exams];

    // Apply status filter
    if (activeFilter !== "all") {
      result = result.filter(exam => exam.status === activeFilter);
    }

    // Apply search filter
    if (searchTerm) {
      result = result.filter(exam =>
        exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exam.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exam.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    result = sortExams(result, sortBy);

    setFilteredExams(result);
  }, [exams, activeFilter, searchTerm, sortBy]);

  // Sorting logic
  const sortExams = (examsArray, sortType) => {
    const sorted = [...examsArray];

    switch(sortType) {
      case "upcoming":
        return sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
      case "popular":
        return sorted.sort((a, b) => b.enrolled - a.enrolled);
      case "difficulty-low":
        const difficultyOrder = { "Beginner": 1, "Intermediate": 2, "Advanced": 3, "Expert": 4 };
        return sorted.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
      case "difficulty-high":
        const difficultyOrderRev = { "Beginner": 1, "Intermediate": 2, "Advanced": 3, "Expert": 4 };
        return sorted.sort((a, b) => difficultyOrderRev[b.difficulty] - difficultyOrderRev[a.difficulty]);
      case "date":
        return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
      default:
        return sorted;
    }
  };

  // Filter options
  const filterOptions = [
    { id: "all", label: "All Exams", count: exams.length, icon: "📋" },
    { id: "upcoming", label: "Upcoming", count: exams.filter(e => e.status === "upcoming").length, icon: "📅" },
    { id: "completed", label: "Completed", count: exams.filter(e => e.status === "completed").length, icon: "✅" },
    { id: "board", label: "Board Exams", count: exams.filter(e => e.type === "Board").length, icon: "🎓" },
    { id: "medical", label: "Medical", count: exams.filter(e => e.type === "Medical").length, icon: "⚕️" },
    { id: "quiz", label: "Quizzes", count: exams.filter(e => e.type === "Quiz").length, icon: "❓" }
  ];

  // Difficulty badge color
  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-blue-100 text-blue-800";
      case "Advanced": return "bg-purple-100 text-purple-800";
      case "Expert": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Status badge
  const getStatusBadge = (status) => {
    if (status === "upcoming") {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          <AiOutlineClockCircle className="mr-1" /> Upcoming
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
        <AiFillCheckCircle className="mr-1" /> Completed
      </span>
    );
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Calculate days remaining
  const getDaysRemaining = (dateString) => {
    const today = new Date();
    const examDate = new Date(dateString);
    const diffTime = examDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Past";
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    return `${diffDays} days`;
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            All Exams & Tests
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Prepare for success with our comprehensive collection of biology exams, tests, and quizzes
          </p>
        </div>

        {/* Search and Controls */}
        <div className="mb-8 space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search exams by title, type, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm"
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
                className="ml-2 px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
              >
                <option value="upcoming">Upcoming First</option>
                <option value="date">Recent First</option>
                <option value="popular">Most Popular</option>
                <option value="difficulty-low">Difficulty: Low to High</option>
                <option value="difficulty-high">Difficulty: High to Low</option>
              </select>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg ${viewMode === "grid" ? 'bg-emerald-100 text-emerald-600 shadow-sm' : 'bg-white text-gray-600 border'}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg ${viewMode === "list" ? 'bg-emerald-100 text-emerald-600 shadow-sm' : 'bg-white text-gray-600 border'}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
              <span className="text-gray-600 font-medium">
                {filteredExams.length} {filteredExams.length === 1 ? 'exam' : 'exams'} found
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
              className={`flex items-center px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
                activeFilter === option.id
                  ? "bg-emerald-600 text-white shadow-md"
                  : "bg-white text-gray-700 border hover:bg-gray-50"
              }`}
            >
              <span className="mr-2">{option.icon}</span>
              {option.label}
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                activeFilter === option.id ? "bg-white/30" : "bg-gray-100"
              }`}>
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
                className="h-80 bg-gray-200 rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : (
          <>
            {/* Grid View */}
            {viewMode === "grid" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="wait">
                  {filteredExams.map((exam, index) => (
                    <motion.div
                      key={exam.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ y: -4, transition: { duration: 0.2 } }}
                      className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300"
                    >
                      <Link to={exam.path} className="block h-full">
                        <div className="p-6">
                          {/* Exam Header */}
                          <div className="flex justify-between items-start mb-4">
                            <div className="text-4xl">{exam.icon}</div>
                            <div className="text-right">
                              {getStatusBadge(exam.status)}
                              <div className="mt-2 text-sm text-gray-500">
                                {getDaysRemaining(exam.date)}
                              </div>
                            </div>
                          </div>

                          {/* Exam Title and Type */}
                          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                            {exam.title}
                          </h3>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                              {exam.type}
                            </span>
                            <span className={`px-2 py-1 text-xs font-medium rounded ${getDifficultyColor(exam.difficulty)}`}>
                              {exam.difficulty}
                            </span>
                          </div>

                          {/* Description */}
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {exam.description}
                          </p>

                          {/* Exam Details Grid */}
                          <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                              <FiCalendar className="text-gray-500" />
                              <div>
                                <div className="text-xs text-gray-500">Date</div>
                                <div className="text-sm font-semibold">{formatDate(exam.date)}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                              <FiClock className="text-gray-500" />
                              <div>
                                <div className="text-xs text-gray-500">Duration</div>
                                <div className="text-sm font-semibold">{exam.duration}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                              <AiOutlineQuestionCircle className="text-gray-500" />
                              <div>
                                <div className="text-xs text-gray-500">Questions</div>
                                <div className="text-sm font-semibold">{exam.totalQuestions}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                              <FiBookOpen className="text-gray-500" />
                              <div>
                                <div className="text-xs text-gray-500">Marks</div>
                                <div className="text-sm font-semibold">{exam.totalMarks}</div>
                              </div>
                            </div>
                          </div>

                          {/* Enrollment Progress */}
                          <div className="mb-4">
                            <div className="flex justify-between text-xs text-gray-600 mb-1">
                              <span>Enrolled: {exam.enrolled}/{exam.maxParticipants}</span>
                              <span>{Math.round((exam.enrolled / exam.maxParticipants) * 100)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${(exam.enrolled / exam.maxParticipants) * 100}%` }}
                              ></div>
                            </div>
                          </div>

                          {/* Action Button */}
                          <div className="pt-4 border-t">
                            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors">
                              {exam.status === "upcoming" ? "Register Now" : "View Results"}
                              <FiChevronRight />
                            </button>
                          </div>
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
                {filteredExams.map((exam, index) => (
                  <motion.div
                    key={exam.id + "-list"}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <Link to={exam.path}>
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                          {/* Left Section - Icon and Basic Info */}
                          <div className="flex items-center gap-4">
                            <div className="text-3xl">{exam.icon}</div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                {getStatusBadge(exam.status)}
                                <span className={`px-2 py-1 text-xs font-medium rounded ${getDifficultyColor(exam.difficulty)}`}>
                                  {exam.difficulty}
                                </span>
                              </div>
                              <h3 className="text-lg font-bold text-gray-900 mb-1">
                                {exam.title}
                              </h3>
                              <p className="text-gray-600 text-sm">
                                {exam.description}
                              </p>
                            </div>
                          </div>

                          {/* Middle Section - Exam Details */}
                          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 md:px-6">
                            <div className="text-center">
                              <div className="text-xs text-gray-500 mb-1">Date</div>
                              <div className="font-semibold">{formatDate(exam.date)}</div>
                            </div>
                            <div className="text-center">
                              <div className="text-xs text-gray-500 mb-1">Time</div>
                              <div className="font-semibold">{exam.time}</div>
                            </div>
                            <div className="text-center">
                              <div className="text-xs text-gray-500 mb-1">Questions</div>
                              <div className="font-semibold">{exam.totalQuestions}</div>
                            </div>
                            <div className="text-center">
                              <div className="text-xs text-gray-500 mb-1">Enrolled</div>
                              <div className="font-semibold">{exam.enrolled}</div>
                            </div>
                          </div>

                          {/* Right Section - Action Button */}
                          <div className="w-full md:w-auto">
                            <button className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors">
                              {exam.status === "upcoming" ? "Register" : "View"}
                              <FiChevronRight />
                            </button>
                            <div className="mt-2 text-center text-xs text-gray-500">
                              {getDaysRemaining(exam.date)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}

            {/* No Results */}
            {filteredExams.length === 0 && !loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  No exams found
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  No exams match your current search criteria. Try adjusting your filters or search term.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setActiveFilter("all");
                    setSortBy("upcoming");
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </>
        )}

        {/* Stats Section */}
        {filteredExams.length > 0 && !loading && (
          <div className="mt-12 p-6 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl text-white">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">
                  {exams.filter(e => e.status === "upcoming").length}
                </div>
                <div className="text-emerald-100">Upcoming Exams</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">
                  {exams.reduce((sum, exam) => sum + exam.enrolled, 0).toLocaleString()}
                </div>
                <div className="text-emerald-100">Total Enrollments</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">
                  {exams.filter(e => e.type === "Medical").length}
                </div>
                <div className="text-emerald-100">Medical Tests</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">
                  {exams.filter(e => e.difficulty === "Intermediate").length}
                </div>
                <div className="text-emerald-100">Intermediate Level</div>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Want to create your own exam?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Teachers and institutions can create customized exams for their students with our exam builder tool.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors">
              Create Custom Exam
            </button>
            <button className="px-8 py-3 border-2 border-emerald-600 text-emerald-600 font-semibold rounded-lg hover:bg-emerald-50 transition-colors">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllExam;