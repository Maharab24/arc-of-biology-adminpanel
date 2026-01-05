import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiClock,
  FiUsers,
  FiBookOpen,
  FiChevronRight,
  FiChevronDown,
  FiPlay,
  FiDownload,
  FiMessageSquare,
  FiStar,
  FiCheck,
  FiCalendar,
  FiAward,
  FiTarget,
  FiBarChart2
} from "react-icons/fi";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeModule, setActiveModule] = useState(0);
  const [enrolled, setEnrolled] = useState(false);
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false);

  // Simulated related courses
  const [relatedCourses, setRelatedCourses] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    fetch("/Course.json")
      .then(res => res.json())
      .then(data => {
        const foundCourse = data.find(c => c.id === courseId);
        setCourse(foundCourse);
        // Filter related courses (same category or level)
        const related = data
          .filter(c => c.id !== courseId && (c.level === foundCourse?.level || c.id === foundCourse?.id))
          .slice(0, 3);
        setRelatedCourses(related);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load course:", err);
        setLoading(false);
      });
  }, [courseId]);

  const handleEnroll = () => {
    setShowEnrollmentModal(true);
  };

  const confirmEnrollment = () => {
    setEnrolled(true);
    setShowEnrollmentModal(false);
    // In a real app, you would send enrollment data to backend
  };

  const handleGoToDashboard = () => {
    // Redirect to login page when "Go to Dashboard" is clicked
    navigate("/login");
  };

  const glowAnimation = {
    scale: [1, 1.1, 1],
    opacity: [0.3, 0.6, 0.3],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
  };

  const floatAnimation = {
    y: [0, -15, 0],
    rotate: [0, 5, -5, 0],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className="text-yellow-400">
        {index < Math.floor(rating) ? <AiFillStar /> : <AiOutlineStar />}
      </span>
    ));
  };

  // Course modules data (in a real app, this would come from the API)
  const courseModules = [
    {
      title: "Introduction to Biology",
      duration: "2 hours",
      lessons: 4,
      topics: ["What is Biology?", "Branches of Biology", "Scientific Method", "Lab Safety"]
    },
    {
      title: "Cell Biology",
      duration: "6 hours",
      lessons: 8,
      topics: ["Cell Structure", "Cell Membrane", "Cellular Transport", "Cell Division", "Cellular Respiration"]
    },
    {
      title: "Genetics and DNA",
      duration: "8 hours",
      lessons: 10,
      topics: ["DNA Structure", "DNA Replication", "Protein Synthesis", "Genetic Disorders", "Biotechnology"]
    },
    {
      title: "Human Anatomy",
      duration: "10 hours",
      lessons: 12,
      topics: ["Skeletal System", "Muscular System", "Nervous System", "Circulatory System", "Respiratory System"]
    },
    {
      title: "Final Exam and Review",
      duration: "4 hours",
      lessons: 3,
      topics: ["Comprehensive Review", "Practice Tests", "Exam Strategies", "Q&A Session"]
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🧬</div>
          <p className="text-gray-600">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold mb-2">Course not found</h2>
          <p className="text-gray-600 mb-6">The course you're looking for doesn't exist.</p>
          <Link to="/courses" className="px-6 py-3 bg-emerald-600 text-white rounded-full font-semibold">
            Browse All Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4 sm:px-8 overflow-hidden relative">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-r from-purple-300/20 to-pink-300/20 rounded-full blur-3xl"
        animate={glowAnimation}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-l from-cyan-300/20 to-emerald-300/20 rounded-full blur-3xl"
        animate={glowAnimation}
      />

      {/* Gradient mesh background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-200/30 via-transparent to-transparent"></div>

      {/* Floating icons */}
      {["🧬", "🔬", "🧪", "🦠", "🧫"].map((icon, i) => (
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

      <div className="max-w-7xl mx-auto relative z-10 mt-10">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="flex items-center text-sm text-gray-600">
            <Link to="/" className="hover:text-emerald-600">Home</Link>
            <FiChevronRight className="mx-2" />
            <Link to="/AllCourse" className="hover:text-emerald-600">Courses</Link>
            <FiChevronRight className="mx-2" />
            <span className="text-emerald-600 font-medium">{course.title}</span>
          </nav>
        </div>

        {/* Main Course Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left Column */}
            <div className="lg:w-2/3">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-4 py-2 bg-emerald-100 text-emerald-800 font-medium rounded-full">
                  {course.id.toUpperCase()}
                </span>
                <span className="px-4 py-2 bg-blue-100 text-blue-800 font-medium rounded-full">
                  {course.level}
                </span>
                {enrolled && (
                  <span className="px-4 py-2 bg-green-100 text-green-800 font-medium rounded-full flex items-center gap-2">
                    <FiCheck /> Enrolled
                  </span>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-emerald-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
                  {course.title}
                </span>
              </h1>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {course.description}
              </p>

              {/* Ratings and Info */}
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {renderStars(4.8)}
                  </div>
                  <span className="font-semibold">4.8</span>
                  <span className="text-gray-500">(1,234 reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiUsers className="text-gray-500" />
                  <span>{course.students}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiClock className="text-gray-500" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiBookOpen className="text-gray-500" />
                  <span>25 Lessons</span>
                </div>
              </div>

              {/* Instructor Info */}
              <div className="flex items-center gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                  DR
                </div>
                <div>
                  <h4 className="font-semibold">Dr. Sarah Johnson</h4>
                  <p className="text-gray-600 text-sm">Senior Biology Professor with 15+ years experience</p>
                </div>
              </div>
            </div>

            {/* Right Column - Enrollment Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="lg:w-1/3"
            >
              <div className="sticky top-24 bg-gradient-to-br from-white via-white/95 to-white/90 backdrop-blur-sm rounded-3xl border border-gray-200/50 shadow-xl overflow-hidden">
                {/* Animated gradient stripe */}
                <div className="h-2 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500" />

                <div className="p-6">
                  {/* Course Icon */}
                  <motion.div
                    className="text-6xl text-center mb-6"
                    animate={floatAnimation}
                  >
                    {course.icon}
                  </motion.div>

                  {/* Price */}
                  <div className="text-center mb-6">
                    <div className="text-5xl font-bold text-emerald-600 mb-2">
                      $49.99
                    </div>
                    <div className="text-gray-500 line-through mb-1">$99.99</div>
                    <div className="text-sm text-gray-600">One-time payment • Lifetime access</div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {[
                      "Full lifetime access",
                      "Certificate of completion",
                      "30-day money-back guarantee",
                      "Downloadable resources",
                      "Community access"
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center">
                          <FiCheck className="text-emerald-600 text-sm" />
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Enrollment Button */}
                  <button
                    onClick={enrolled ? handleGoToDashboard : handleEnroll}
                    className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${
                      enrolled
                        ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white"
                        : "bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:shadow-xl hover:shadow-emerald-300"
                    }`}
                  >
                    {enrolled ? "Go to Dashboard" : "Enroll Now"}
                  </button>

                  {/* Secondary Actions */}

                  <p className="text-center text-sm text-gray-500 mt-4">
                    14-day money-back guarantee
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Course Content */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">
              <span className="bg-gradient-to-r from-gray-900 to-emerald-800 bg-clip-text text-transparent">
                Course Content
              </span>
            </h2>
            <div className="text-gray-600">
              5 modules • 25 lessons • {course.duration}
            </div>
          </div>

          <div className="space-y-4">
            {courseModules.map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => setActiveModule(activeModule === index ? -1 : index)}
                  className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-100 to-cyan-100 rounded-lg flex items-center justify-center">
                      <span className="font-bold text-emerald-700">{index + 1}</span>
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-lg">{module.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        <span className="flex items-center gap-1">
                          <FiPlay /> {module.lessons} lessons
                        </span>
                        <span className="flex items-center gap-1">
                          <FiClock /> {module.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                  <FiChevronDown
                    className={`transition-transform duration-300 ${
                      activeModule === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {activeModule === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6"
                    >
                      <div className="pt-4 border-t border-gray-200">
                        <h4 className="font-medium mb-3">Topics covered:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {module.topics.map((topic, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg"
                            >
                              <FiCheck className="text-emerald-600" />
                              <span>{topic}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* What You'll Learn */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">
            <span className="bg-gradient-to-r from-gray-900 to-emerald-800 bg-clip-text text-transparent">
              What You'll Learn
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Master fundamental biological concepts and principles",
              "Understand cellular structure and function",
              "Learn genetics and inheritance patterns",
              "Explore human anatomy and physiology",
              "Develop laboratory skills and techniques",
              "Prepare for exams with expert strategies"
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <FiCheck className="text-white" />
                </div>
                <span className="font-medium">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Requirements */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">
            <span className="bg-gradient-to-r from-gray-900 to-emerald-800 bg-clip-text text-transparent">
              Requirements
            </span>
          </h2>
          <div className="bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-2xl p-6">
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <FiTarget className="text-emerald-600" />
                </div>
                <span>Basic understanding of science concepts (high school level)</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <FiCalendar className="text-emerald-600" />
                </div>
                <span>Commitment of 3-5 hours per week</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <FiBookOpen className="text-emerald-600" />
                </div>
                <span>Notebook and pen for taking notes</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <FiAward className="text-emerald-600" />
                </div>
                <span>Eagerness to learn and explore biological concepts</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Related Courses */}
        {relatedCourses.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">
                <span className="bg-gradient-to-r from-gray-900 to-emerald-800 bg-clip-text text-transparent">
                  Related Courses
                </span>
              </h2>
              <Link to="/courses" className="text-emerald-600 font-medium hover:text-emerald-700 flex items-center gap-2">
                View all <FiChevronRight />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedCourses.map((relatedCourse, index) => (
                <motion.div
                  key={relatedCourse.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 overflow-hidden shadow-lg"
                >
                  <Link to={`/courses/${relatedCourse.id}`}>
                    <div className="p-6">
                      <div className="text-4xl mb-4">{relatedCourse.icon}</div>
                      <h3 className="font-bold text-lg mb-2">{relatedCourse.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{relatedCourse.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-emerald-600">$49.99</span>
                        <span className="text-sm text-gray-500">{relatedCourse.level}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Enrollment Modal */}
      <AnimatePresence>
        {showEnrollmentModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowEnrollmentModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl max-w-md w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-2 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500" />
              <div className="p-6">
                <div className="text-center mb-6">
                  <div className="text-5xl mb-4">{course.icon}</div>
                  <h3 className="text-2xl font-bold mb-2">Confirm Enrollment</h3>
                  <p className="text-gray-600">
                    You're about to enroll in <span className="font-semibold">{course.title}</span>
                  </p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                    <span>Course Price</span>
                    <span className="font-bold text-emerald-600">$49.99</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                    <span>Discount</span>
                    <span className="font-bold text-green-600">-$50.00</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-xl">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-2xl text-emerald-600">$49.99</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={confirmEnrollment}
                    className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl hover:shadow-lg transition-shadow"
                  >
                    Confirm & Pay Now
                  </button>
                  <button
                    onClick={() => setShowEnrollmentModal(false)}
                    className="w-full py-3 border border-gray-300 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>

                <p className="text-center text-sm text-gray-500 mt-4">
                  14-day money-back guarantee • Lifetime access
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CourseDetails;