import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import {
  FiUsers, FiBook, FiDollarSign, FiTrendingUp, FiBarChart,
  FiCalendar, FiCheckCircle, FiClock, FiAlertCircle, FiDownload,
  FiActivity, FiShield, FiGlobe, FiTarget, FiStar, FiMessageSquare
} from 'react-icons/fi';
import { FaChalkboardTeacher, FaGraduationCap } from 'react-icons/fa';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('monthly');

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  // Admin Stats
  const stats = [
    {
      label: "Total Revenue",
      value: "$45,289",
      change: "+12.5%",
      icon: <FiDollarSign />,
      color: "from-emerald-500 to-cyan-500",
      bgColor: "bg-gradient-to-br from-emerald-50 to-cyan-50"
    },
    {
      label: "Active Users",
      value: "3,847",
      change: "+8.2%",
      icon: <FiUsers />,
      color: "from-blue-500 to-indigo-500",
      bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50"
    },
    {
      label: "Total Courses",
      value: "156",
      change: "+5 new",
      icon: <FiBook />,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-gradient-to-br from-purple-50 to-pink-50"
    },
    {
      label: "Completion Rate",
      value: "89%",
      change: "+3.4%",
      icon: <FiTrendingUp />,
      color: "from-orange-500 to-yellow-500",
      bgColor: "bg-gradient-to-br from-orange-50 to-yellow-50"
    }
  ];

  // Recent Activities
  const recentActivities = [
    {
      user: "Sarah Johnson",
      action: "enrolled in",
      course: "Advanced Biology",
      time: "2 min ago",
      type: "enrollment"
    },
    {
      user: "Michael Chen",
      action: "completed",
      course: "Chemistry Fundamentals",
      time: "15 min ago",
      type: "completion"
    },
    {
      user: "Emma Wilson",
      action: "submitted assignment in",
      course: "Physics 101",
      time: "1 hour ago",
      type: "assignment"
    },
    {
      user: "Alex Turner",
      action: "requested refund for",
      course: "Mathematics Mastery",
      time: "3 hours ago",
      type: "refund"
    },
    {
      user: "Dr. Lisa Park",
      action: "published new course:",
      course: "Genetics & Evolution",
      time: "5 hours ago",
      type: "publish"
    }
  ];

  // Revenue Data
  const revenueData = [
    { month: 'Jan', revenue: 12000 },
    { month: 'Feb', revenue: 19000 },
    { month: 'Mar', revenue: 15000 },
    { month: 'Apr', revenue: 22000 },
    { month: 'May', revenue: 18000 },
    { month: 'Jun', revenue: 25000 },
    { month: 'Jul', revenue: 28000 },
    { month: 'Aug', revenue: 32000 },
    { month: 'Sep', revenue: 30000 },
    { month: 'Oct', revenue: 35000 },
    { month: 'Nov', revenue: 38000 },
    { month: 'Dec', revenue: 45289 }
  ];

  // Pending Actions
  const pendingActions = [
    {
      title: "Course Approvals",
      count: 12,
      icon: <FiCheckCircle />,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Instructor Requests",
      count: 8,
      icon: <FaChalkboardTeacher />,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      title: "Refund Requests",
      count: 5,
      icon: <FiDollarSign />,
      color: "text-red-600",
      bgColor: "bg-red-100"
    },
    {
      title: "Content Reviews",
      count: 23,
      icon: <FiBook />,
      color: "text-amber-600",
      bgColor: "bg-amber-100"
    }
  ];

  // Top Courses
  const topCourses = [
    { id: 1, title: "Advanced Cell Biology", students: 1245, revenue: "$28,450", rating: 4.9 },
    { id: 2, title: "Human Anatomy Mastery", students: 987, revenue: "$22,180", rating: 4.8 },
    { id: 3, title: "Genetics Fundamentals", students: 845, revenue: "$19,220", rating: 4.7 },
    { id: 4, title: "Microbiology Crash Course", students: 723, revenue: "$16,540", rating: 4.6 },
    { id: 5, title: "Biochemistry Essentials", students: 654, revenue: "$14,870", rating: 4.8 }
  ];

  // System Status
  const systemStatus = [
    { label: "Server Uptime", value: "99.9%", status: "good" },
    { label: "Active Sessions", value: "1,247", status: "normal" },
    { label: "Storage Used", value: "78%", status: "warning" },
    { label: "Response Time", value: "120ms", status: "good" }
  ];

  const floatingElements = ["📊", "💰", "👥", "📈", "🎯", "⚙️", "🛡️", "🌐", "📋", "🔔"];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-8 overflow-hidden relative bg-gradient-to-br from-gray-50 to-emerald-50/30">
      {/* Animated background */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating icons */}
      {floatingElements.map((icon, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl opacity-10 pointer-events-none"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, Math.random() * 20 - 10, 0],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: i * 1
          }}
        >
          {icon}
        </motion.div>
      ))}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.name || 'Admin'}. Here's what's happening with your platform.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex bg-white rounded-xl border border-gray-200 p-1">
              {['daily', 'weekly', 'monthly', 'yearly'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${timeRange === range ? 'bg-emerald-500 text-white' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </button>
              ))}
            </div>
            <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2">
              <FiDownload />
              Export
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${stat.bgColor} backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-lg`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white`}>
                  {stat.icon}
                </div>
                <span className="text-sm font-medium text-emerald-600">{stat.change}</span>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Left Column - Revenue Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Revenue Overview</h2>
                <div className="text-sm text-gray-600">Last updated: Today, 10:30 AM</div>
              </div>
              <div className="h-64 flex items-end gap-2 mb-6">
                {revenueData.slice(-6).map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(data.revenue / 50000) * 100}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="w-full bg-gradient-to-t from-emerald-500 to-cyan-400 rounded-t-lg max-h-full"
                      style={{ height: `${(data.revenue / 50000) * 100}%` }}
                    />
                    <div className="mt-2 text-sm text-gray-600">{data.month}</div>
                    <div className="text-xs text-gray-500">${(data.revenue / 1000).toFixed(0)}k</div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-gray-600">Total Revenue This Year</div>
                  <div className="text-2xl font-bold text-gray-900">$452,890</div>
                </div>
                <Link
                  to="/dashboard/analytics"
                  className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl hover:bg-emerald-100 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Pending Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-lg">
              <div className="flex items-center gap-2 mb-6">
                <FiAlertCircle className="text-amber-600" />
                <h2 className="text-2xl font-bold text-gray-900">Pending Actions</h2>
              </div>
              <div className="space-y-4">
                {pendingActions.map((action, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 hover:bg-gray-50/50 rounded-xl transition-colors border border-gray-100"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${action.bgColor} ${action.color}`}>
                        {action.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{action.title}</h4>
                        <p className="text-sm text-gray-600">Requires attention</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                        {action.count}
                      </span>
                      <Link
                        to="/dashboard/pending"
                        className="text-emerald-600 hover:text-emerald-700"
                      >
                        →
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Top Courses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Top Performing Courses</h2>
                <Link
                  to="/dashboard/courses"
                  className="text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  View All →
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-600 border-b">
                      <th className="pb-3 font-medium">Course</th>
                      <th className="pb-3 font-medium">Students</th>
                      <th className="pb-3 font-medium">Revenue</th>
                      <th className="pb-3 font-medium">Rating</th>
                      <th className="pb-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topCourses.map((course, index) => (
                      <tr key={course.id} className="border-b last:border-0">
                        <td className="py-4">
                          <div className="font-medium text-gray-900">{course.title}</div>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            <FiUsers className="text-gray-400" />
                            {course.students.toLocaleString()}
                          </div>
                        </td>
                        <td className="py-4 text-emerald-600 font-semibold">{course.revenue}</td>
                        <td className="py-4">
                          <div className="flex items-center gap-1">
                            <FiStar className="text-amber-500 fill-current" />
                            <span>{course.rating}</span>
                          </div>
                        </td>
                        <td className="py-4">
                          <Link
                            to={`/dashboard/courses/${course.id}`}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>

          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-lg">
              <div className="flex items-center gap-2 mb-6">
                <FiActivity className="text-emerald-600" />
                <h2 className="text-2xl font-bold text-gray-900">Recent Activities</h2>
              </div>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-3 hover:bg-gray-50/50 rounded-xl transition-colors"
                  >
                    <div className={`p-2 rounded-lg ${
                      activity.type === 'enrollment' ? 'bg-blue-100 text-blue-600' :
                      activity.type === 'completion' ? 'bg-emerald-100 text-emerald-600' :
                      activity.type === 'assignment' ? 'bg-purple-100 text-purple-600' :
                      activity.type === 'refund' ? 'bg-red-100 text-red-600' :
                      'bg-amber-100 text-amber-600'
                    }`}>
                      {activity.type === 'enrollment' && <FaGraduationCap />}
                      {activity.type === 'completion' && <FiCheckCircle />}
                      {activity.type === 'assignment' && <FiBook />}
                      {activity.type === 'refund' && <FiDollarSign />}
                      {activity.type === 'publish' && <FiMessageSquare />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">
                        <span className="font-semibold">{activity.user}</span> {activity.action}{' '}
                        <span className="font-semibold text-emerald-600">{activity.course}</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* System Status & Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* System Status */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-2 mb-6">
              <FiShield className="text-emerald-400" />
              <h2 className="text-2xl font-bold">System Status</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {systemStatus.map((status, index) => (
                <div key={index} className="bg-gray-800/50 rounded-xl p-4">
                  <div className="text-sm text-gray-400 mb-1">{status.label}</div>
                  <div className="text-2xl font-bold mb-1">{status.value}</div>
                  <div className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${
                      status.status === 'good' ? 'bg-emerald-500' :
                      status.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'
                    }`} />
                    <span className="text-xs text-gray-400">
                      {status.status === 'good' ? 'All Systems Normal' :
                       status.status === 'warning' ? 'Needs Attention' : 'Critical'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-lg">
            <div className="flex items-center gap-2 mb-6">
              <FiTarget className="text-emerald-600" />
              <h2 className="text-2xl font-bold text-gray-900">Quick Actions</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: "Add New Course", icon: <FiBook />, link: "/dashboard/courses/add", color: "bg-emerald-500" },
                { title: "Manage Users", icon: <FiUsers />, link: "/dashboard/users", color: "bg-blue-500" },
                { title: "View Reports", icon: <FiBarChart />, link: "/dashboard/reports", color: "bg-purple-500" },
                { title: "System Settings", icon: <FiGlobe />, link: "/dashboard/settings", color: "bg-gray-700" },
              ].map((action, index) => (
                <Link
                  key={index}
                  to={action.link}
                  className={`${action.color} text-white rounded-xl p-4 hover:opacity-90 transition-opacity`}
                >
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="text-2xl">{action.icon}</div>
                    <div className="font-medium">{action.title}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;