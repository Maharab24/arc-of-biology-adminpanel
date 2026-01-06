import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUpload, FiTag, FiDollarSign, FiCalendar, FiUsers, FiBarChart, FiLink } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';

const AddCourse = () => {
  const [courseData, setCourseData] = useState({
    id: '',
    title: '',
    description: '',
    duration: '',
    level: '',
    students: '',
    color: 'from-emerald-500 to-teal-600',
    icon: '🎓',
    path: '',
    tags: [],
    rating: 4.5,
    price: '',
    originalPrice: '',
    newTag: ''
  });

  const [iconList, setIconList] = useState(['🎓', '🏛️', '⚡', '⚕️', '📚', '🏅', '🧬', '🔬', '🌿', '🧪']);
  const [previewMode, setPreviewMode] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  // Color options for gradient
  const colorOptions = [
    { value: 'from-emerald-500 to-teal-600', label: 'Emerald', preview: 'bg-gradient-to-r from-emerald-500 to-teal-600' },
    { value: 'from-cyan-400 to-blue-500', label: 'Cyan', preview: 'bg-gradient-to-r from-cyan-400 to-blue-500' },
    { value: 'from-amber-400 to-orange-500', label: 'Amber', preview: 'bg-gradient-to-r from-amber-400 to-orange-500' },
    { value: 'from-purple-500 to-indigo-600', label: 'Purple', preview: 'bg-gradient-to-r from-purple-500 to-indigo-600' },
    { value: 'from-green-400 to-emerald-500', label: 'Green', preview: 'bg-gradient-to-r from-green-400 to-emerald-500' },
    { value: 'from-rose-500 to-pink-600', label: 'Rose', preview: 'bg-gradient-to-r from-rose-500 to-pink-600' },
  ];

  // Level options
  const levelOptions = ['Beginner', 'Intermediate', 'Advanced', 'Expert', 'University', 'Champion', 'All Levels'];

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle tag addition
  const handleAddTag = () => {
    if (courseData.newTag.trim() && !courseData.tags.includes(courseData.newTag.trim())) {
      setCourseData(prev => ({
        ...prev,
        tags: [...prev.tags, prev.newTag.trim()],
        newTag: ''
      }));
    }
  };

  // Handle tag removal
  const handleRemoveTag = (tagToRemove) => {
    setCourseData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create the final course object
    const newCourse = {
      id: courseData.id || courseData.title.toLowerCase().replace(/\s+/g, '-'),
      title: courseData.title,
      description: courseData.description,
      duration: courseData.duration,
      level: courseData.level,
      students: courseData.students,
      color: courseData.color,
      icon: courseData.icon,
      path: courseData.path || `/courses/${courseData.id || courseData.title.toLowerCase().replace(/\s+/g, '-')}`,
      tags: courseData.tags,
      rating: parseFloat(courseData.rating),
      price: parseFloat(courseData.price),
      originalPrice: courseData.originalPrice ? parseFloat(courseData.originalPrice) : null
    };

    console.log('New Course Data:', newCourse);

    // In a real application, you would send this to your backend
    // For now, just show success message
    alert('Course added successfully! Check console for data.');

    // Reset form
    setCourseData({
      id: '',
      title: '',
      description: '',
      duration: '',
      level: '',
      students: '',
      color: 'from-emerald-500 to-teal-600',
      icon: '🎓',
      path: '',
      tags: [],
      rating: 4.5,
      price: '',
      originalPrice: '',
      newTag: ''
    });
    setImagePreview(null);
  };

  // Course preview component
  const CoursePreview = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-xl shadow-lg p-6 mb-6"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-900">Course Preview</h3>
        <button
          onClick={() => setPreviewMode(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <AiOutlineClose size={24} />
        </button>
      </div>

      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg p-6 text-white mb-4">
        <div className="text-5xl mb-4">{courseData.icon}</div>
        <h4 className="text-2xl font-bold mb-2">{courseData.title || 'Course Title'}</h4>
        <p className="text-emerald-100">{courseData.description || 'Course description will appear here...'}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <span className="text-sm text-gray-500">Duration</span>
          <p className="font-semibold">{courseData.duration || 'N/A'}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <span className="text-sm text-gray-500">Level</span>
          <p className="font-semibold">{courseData.level || 'N/A'}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <span className="text-sm text-gray-500">Price</span>
          <p className="font-semibold text-emerald-600">
            ${courseData.price || '0.00'}
            {courseData.originalPrice && (
              <span className="ml-2 text-sm text-gray-400 line-through">
                ${courseData.originalPrice}
              </span>
            )}
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <span className="text-sm text-gray-500">Students</span>
          <p className="font-semibold">{courseData.students || '0+ Enrolled'}</p>
        </div>
      </div>

      {courseData.tags.length > 0 && (
        <div className="mb-4">
          <span className="text-sm text-gray-500 mb-2 block">Tags</span>
          <div className="flex flex-wrap gap-2">
            {courseData.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="text-center">
        <button className="px-6 py-2 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors">
          Enroll Now
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Add New Course
          </h1>
          <p className="text-gray-600">
            Fill in the details to create a new biology course
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              {/* Basic Information Section */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">
                  Basic Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Course ID */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Course ID *
                    </label>
                    <input
                      type="text"
                      name="id"
                      value={courseData.id}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="e.g., hsc, varsity, crash"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">Unique identifier for the course</p>
                  </div>

                  {/* Course Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Course Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={courseData.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="e.g., Biology For HSC"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={courseData.description}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Brief description of the course..."
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Course Details Section */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">
                  Course Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Duration */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FiCalendar className="inline mr-2" />
                      Duration *
                    </label>
                    <input
                      type="text"
                      name="duration"
                      value={courseData.duration}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="e.g., 12 Months"
                      required
                    />
                  </div>

                  {/* Level */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FiBarChart className="inline mr-2" />
                      Level *
                    </label>
                    <select
                      name="level"
                      value={courseData.level}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select Level</option>
                      {levelOptions.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>

                  {/* Students */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FiUsers className="inline mr-2" />
                      Students Enrolled
                    </label>
                    <input
                      type="text"
                      name="students"
                      value={courseData.students}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="e.g., 500+ Enrolled"
                    />
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FiDollarSign className="inline mr-2" />
                      Price *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={courseData.price}
                      onChange={handleInputChange}
                      step="0.01"
                      min="0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="49.99"
                      required
                    />
                  </div>

                  {/* Original Price */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Original Price (Optional)
                    </label>
                    <input
                      type="number"
                      name="originalPrice"
                      value={courseData.originalPrice}
                      onChange={handleInputChange}
                      step="0.01"
                      min="0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="99.99"
                    />
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rating (0-5)
                    </label>
                    <input
                      type="number"
                      name="rating"
                      value={courseData.rating}
                      onChange={handleInputChange}
                      step="0.1"
                      min="0"
                      max="5"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="4.5"
                    />
                  </div>
                </div>
              </div>

              {/* Visual Elements Section */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">
                  Visual Elements
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Icon Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Icon
                    </label>
                    <div className="grid grid-cols-5 gap-2 mb-4">
                      {iconList.map(icon => (
                        <button
                          key={icon}
                          type="button"
                          onClick={() => setCourseData(prev => ({ ...prev, icon }))}
                          className={`p-3 text-2xl rounded-lg border ${courseData.icon === icon ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-emerald-300'}`}
                        >
                          {icon}
                        </button>
                      ))}
                    </div>
                    <input
                      type="text"
                      name="icon"
                      value={courseData.icon}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Or type an emoji"
                      maxLength="2"
                    />
                  </div>

                  {/* Color Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Color Theme
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {colorOptions.map(color => (
                        <button
                          key={color.value}
                          type="button"
                          onClick={() => setCourseData(prev => ({ ...prev, color: color.value }))}
                          className={`h-12 rounded-lg border-2 ${courseData.color === color.value ? 'border-emerald-500' : 'border-gray-200'}`}
                        >
                          <div className={`h-full w-full rounded ${color.preview}`}></div>
                          <span className="text-xs mt-1 block">{color.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Image Upload */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FiUpload className="inline mr-2" />
                    Course Image (Optional)
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-emerald-400">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FiUpload className="w-8 h-8 mb-2 text-gray-400" />
                        <p className="text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                  {imagePreview && (
                    <div className="mt-4">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="h-32 w-full object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Tags Section */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">
                  <FiTag className="inline mr-2" />
                  Tags & Categories
                </h2>

                <div className="mb-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={courseData.newTag}
                      onChange={(e) => setCourseData(prev => ({ ...prev, newTag: e.target.value }))}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Add a tag (e.g., Biology, Science, Medical)"
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Display Tags */}
                {courseData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {courseData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-2 bg-emerald-100 text-emerald-700 rounded-full"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-1 text-emerald-700 hover:text-emerald-900"
                        >
                          <AiOutlineClose size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* URL Path */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FiLink className="inline mr-2" />
                  Course URL Path
                </label>
                <div className="flex items-center">
                  <span className="px-4 py-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-gray-600">
                    /courses/
                  </span>
                  <input
                    type="text"
                    name="path"
                    value={courseData.path}
                    onChange={handleInputChange}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="hsc-biology"
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                <button
                  type="button"
                  onClick={() => setPreviewMode(!previewMode)}
                  className="px-6 py-3 border-2 border-emerald-600 text-emerald-600 font-medium rounded-lg hover:bg-emerald-50 transition-colors"
                >
                  {previewMode ? 'Hide Preview' : 'Show Preview'}
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Create Course
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Are you sure? All entered data will be lost.')) {
                      setCourseData({
                        id: '',
                        title: '',
                        description: '',
                        duration: '',
                        level: '',
                        students: '',
                        color: 'from-emerald-500 to-teal-600',
                        icon: '🎓',
                        path: '',
                        tags: [],
                        rating: 4.5,
                        price: '',
                        originalPrice: '',
                        newTag: ''
                      });
                      setImagePreview(null);
                    }
                  }}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Reset Form
                </button>
              </div>
            </motion.form>
          </div>

          {/* Right Column - Preview/Instructions */}
          <div className="lg:col-span-1">
            {/* Preview Section */}
            {previewMode && <CoursePreview />}

            {/* Instructions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                📝 Instructions
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2">•</span>
                  Fields marked with * are required
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2">•</span>
                  Course ID should be unique and lowercase
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2">•</span>
                  Use clear and descriptive titles
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2">•</span>
                  Add relevant tags for better searchability
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2">•</span>
                  Preview your course before submission
                </li>
              </ul>

              {/* Quick Stats */}
              <div className="mt-8 pt-6 border-t">
                <h4 className="font-semibold text-gray-900 mb-3">Course Statistics</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Total Fields</div>
                    <div className="text-2xl font-bold text-emerald-600">12</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Required</div>
                    <div className="text-2xl font-bold text-emerald-600">5</div>
                  </div>
                </div>
              </div>

              {/* Recent Courses */}
              <div className="mt-8 pt-6 border-t">
                <h4 className="font-semibold text-gray-900 mb-3">Recent Courses</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl">🎓</div>
                    <div>
                      <p className="font-medium">Biology For HSC</p>
                      <p className="text-xs text-gray-500">Added 2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl">⚕️</div>
                    <div>
                      <p className="font-medium">Medical Entrance</p>
                      <p className="text-xs text-gray-500">Added 1 week ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;