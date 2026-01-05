import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FiHome,
  FiBook,
  FiUsers,
  FiBarChart2,
  FiSettings,
  FiFileText,
  FiDollarSign,
  FiCalendar,
  FiMessageSquare,
  FiFile,
  FiUserCheck,
  FiLogOut,
  FiChevronLeft,
  FiChevronRight,
  FiMenu,
  FiBell,
  FiUser,
  FiLayers,
  FiClipboard,
  FiCheckSquare
} from 'react-icons/fi';
import { FaChalkboardTeacher } from 'react-icons/fa';

const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const { logout } = useAuth();

  const menuItems = [
    {
      title: 'Dashboard',
      icon: <FiHome size={20} />,
      path: '/dashboard',
      badge: null
    },
    {
      title: 'Courses',
      icon: <FiBook size={20} />,
      submenu: [
        { title: 'All Courses', path: '/dashboard/courses' },
        { title: 'Add New Course', path: '/dashboard/courses/add' },
        { title: 'Course Categories', path: '/dashboard/courses/categories' },
        { title: 'Course Reviews', path: '/dashboard/courses/reviews' }
      ]
    },
    {
      title: 'Exam System',
      icon: <FiClipboard size={20} />,
      submenu: [
        { title: 'All Exams', path: '/dashboard/exams' },
        { title: 'Create Exam', path: '/dashboard/exams/create' },
        { title: 'Question Bank', path: '/dashboard/exams/questions' },
        { title: 'Exam Categories', path: '/dashboard/exams/categories' },
        { title: 'Exam Results', path: '/dashboard/exams/results' },
        { title: 'Schedule Exams', path: '/dashboard/exams/schedule' }
      ]
    },
    {
      title: 'Students',
      icon: <FiUsers size={20} />,
      path: '/dashboard/students',
      badge: '24'
    },
    {
      title: 'Instructors',
      icon: <FaChalkboardTeacher size={20} />,
      submenu: [
        { title: 'All Instructors', path: '/dashboard/instructors' },
        { title: 'Pending Approval', path: '/dashboard/instructors/pending', badge: '3' },
        { title: 'Instructor Requests', path: '/dashboard/instructors/requests' }
      ]
    },
    {
      title: 'Content',
      icon: <FiLayers size={20} />,
      submenu: [
        { title: 'Lessons', path: '/dashboard/content/lessons' },
        { title: 'Quizzes', path: '/dashboard/content/quizzes' },
        { title: 'Assignments', path: '/dashboard/content/assignments' },
        { title: 'Resources', path: '/dashboard/content/resources' }
      ]
    },
    {
      title: 'Analytics',
      icon: <FiBarChart2 size={20} />,
      submenu: [
        { title: 'Overview', path: '/dashboard/analytics' },
        { title: 'Revenue', path: '/dashboard/analytics/revenue' },
        { title: 'Student Progress', path: '/dashboard/analytics/progress' },
        { title: 'Course Performance', path: '/dashboard/analytics/courses' }
      ]
    },
    {
      title: 'Enrollments',
      icon: <FiUserCheck size={20} />,
      path: '/dashboard/enrollments',
      badge: '156'
    },
    {
      title: 'Payments',
      icon: <FiDollarSign size={20} />,
      submenu: [
        { title: 'Transactions', path: '/dashboard/payments' },
        { title: 'Pending Payments', path: '/dashboard/payments/pending', badge: '5' },
        { title: 'Refund Requests', path: '/dashboard/payments/refunds' },
        { title: 'Revenue Report', path: '/dashboard/payments/report' }
      ]
    },
    {
      title: 'Communication',
      icon: <FiMessageSquare size={20} />,
      submenu: [
        { title: 'Announcements', path: '/dashboard/communication/announcements' },
        { title: 'Messages', path: '/dashboard/communication/messages', badge: '12' },
        { title: 'Notifications', path: '/dashboard/communication/notifications' },
        { title: 'Email Campaigns', path: '/dashboard/communication/email' }
      ]
    },
    {
      title: 'Assignments',
      icon: <FiCheckSquare size={20} />,
      submenu: [
        { title: 'All Assignments', path: '/dashboard/assignments' },
        { title: 'Submission Review', path: '/dashboard/assignments/submissions', badge: '8' },
        { title: 'Grading', path: '/dashboard/assignments/grading' },
        { title: 'Plagiarism Check', path: '/dashboard/assignments/plagiarism' }
      ]
    },
    {
      title: 'Reports',
      icon: <FiFileText size={20} />,
      submenu: [
        { title: 'Student Reports', path: '/dashboard/reports/students' },
        { title: 'Course Reports', path: '/dashboard/reports/courses' },
        { title: 'Financial Reports', path: '/dashboard/reports/financial' },
        { title: 'System Reports', path: '/dashboard/reports/system' }
      ]
    },
    {
      title: 'Settings',
      icon: <FiSettings size={20} />,
      submenu: [
        { title: 'General Settings', path: '/dashboard/settings/general' },
        { title: 'Payment Settings', path: '/dashboard/settings/payment' },
        { title: 'Email Settings', path: '/dashboard/settings/email' },
        { title: 'User Management', path: '/dashboard/settings/users' },
        { title: 'System Logs', path: '/dashboard/settings/logs' }
      ]
    }
  ];

  const toggleSubmenu = (index) => {
    setActiveSubmenu(activeSubmenu === index ? null : index);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className={`flex flex-col h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <FiBook size={20} />
            </div>
            <h2 className="text-xl font-bold">EduAdmin</h2>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          {isCollapsed ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
        </button>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-gray-700">
        {!isCollapsed ? (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
              <FiUser size={20} />
            </div>
            <div>
              <h3 className="font-semibold">Admin User</h3>
              <p className="text-sm text-gray-400">Super Admin</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
              <FiUser size={20} />
            </div>
          </div>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              {item.submenu ? (
                <div>
                  <button
                    onClick={() => toggleSubmenu(index)}
                    className={`flex items-center w-full p-3 rounded-lg transition-all hover:bg-gray-700 ${activeSubmenu === index ? 'bg-gray-700' : ''}`}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    {!isCollapsed && (
                      <>
                        <span className="ml-3 flex-1 text-left">{item.title}</span>
                        <FiChevronRight
                          className={`transition-transform ${activeSubmenu === index ? 'rotate-90' : ''}`}
                          size={16}
                        />
                        {item.badge && !isCollapsed && (
                          <span className="ml-2 px-2 py-1 text-xs bg-emerald-500 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </button>
                  {!isCollapsed && activeSubmenu === index && (
                    <ul className="ml-8 mt-1 space-y-1">
                      {item.submenu.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <NavLink
                            to={subItem.path}
                            className={({ isActive }) =>
                              `flex items-center p-2 rounded-lg transition-colors hover:bg-gray-700 ${isActive ? 'bg-emerald-900/30 text-emerald-400' : 'text-gray-300'}`
                            }
                          >
                            <span className="flex-1">{subItem.title}</span>
                            {subItem.badge && (
                              <span className="px-2 py-1 text-xs bg-emerald-500 rounded-full">
                                {subItem.badge}
                              </span>
                            )}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition-colors hover:bg-gray-700 ${isActive ? 'bg-emerald-900/30 text-emerald-400' : 'text-gray-300'}`
                  }
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {!isCollapsed && (
                    <>
                      <span className="ml-3 flex-1">{item.title}</span>
                      {item.badge && (
                        <span className="px-2 py-1 text-xs bg-emerald-500 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-700">
        {!isCollapsed ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-gray-700/50 rounded-lg">
              <span className="text-sm">Storage</span>
              <span className="text-xs text-emerald-400">75%</span>
            </div>
            <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-3/4"></div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center w-full p-3 text-red-400 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <FiLogOut size={20} />
              <span className="ml-3">Logout</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <button
              onClick={handleLogout}
              className="p-2 text-red-400 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <FiLogOut size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSidebar;