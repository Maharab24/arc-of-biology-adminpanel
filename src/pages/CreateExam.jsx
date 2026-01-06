import React, { useState } from 'react';
import { FiChevronRight } from "react-icons/fi";
import { motion } from 'framer-motion';
import {
  FiCalendar,
  FiClock,
  FiBook,
  FiUsers,
  FiTag,
  FiEdit,
  FiPlus,
  FiTrash2,
  FiUpload,
  FiSave,
  FiEye,
  FiEyeOff
} from 'react-icons/fi';
import {
  AiOutlineQuestionCircle,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlinePlusCircle
} from 'react-icons/ai';
import { BsClockHistory } from 'react-icons/bs';

const CreateExam = () => {
  const [examData, setExamData] = useState({
    id: '',
    title: '',
    description: '',
    examType: '',
    difficulty: '',
    category: '',
    date: '',
    startTime: '',
    endTime: '',
    duration: '',
    totalQuestions: '',
    totalMarks: '',
    maxParticipants: '',
    passingMarks: '',
    negativeMarking: false,
    negativeMarkValue: '0.25',
    instructions: '',
    tags: [],
    status: 'upcoming',
    icon: '📝',
    newTag: ''
  });

  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    text: '',
    type: 'mcq',
    options: ['', '', '', ''],
    correctAnswer: '',
    marks: 1,
    difficulty: 'medium'
  });
  const [previewMode, setPreviewMode] = useState(false);
  const [activeSection, setActiveSection] = useState('basic');

  // Exam types
  const examTypes = [
    'Board Exam', 'Medical Entrance', 'University Admission',
    'Chapter Test', 'Weekly Quiz', 'Monthly Assessment',
    'Final Exam', 'Mock Test', 'Practice Test', 'Competition'
  ];

  // Difficulty levels
  const difficultyLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

  // Categories
  const categories = [
    'Cell Biology', 'Genetics', 'Biochemistry', 'Human Anatomy',
    'Physiology', 'Ecology', 'Evolution', 'Microbiology',
    'Botany', 'Zoology', 'Biotechnology', 'Molecular Biology'
  ];

  // Question types
  const questionTypes = [
    { value: 'mcq', label: 'Multiple Choice', icon: '🔘' },
    { value: 'truefalse', label: 'True/False', icon: '✅❌' },
    { value: 'short', label: 'Short Answer', icon: '📝' },
    { value: 'essay', label: 'Essay', icon: '📄' },
    { value: 'matching', label: 'Matching', icon: '🔄' },
    { value: 'numerical', label: 'Numerical', icon: '🔢' }
  ];

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setExamData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle tag addition
  const handleAddTag = () => {
    if (examData.newTag.trim() && !examData.tags.includes(examData.newTag.trim())) {
      setExamData(prev => ({
        ...prev,
        tags: [...prev.tags, prev.newTag.trim()],
        newTag: ''
      }));
    }
  };

  // Handle tag removal
  const handleRemoveTag = (tagToRemove) => {
    setExamData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  // Calculate duration
  const calculateDuration = () => {
    if (examData.startTime && examData.endTime) {
      const start = new Date(`2000-01-01T${examData.startTime}`);
      const end = new Date(`2000-01-01T${examData.endTime}`);
      const diff = (end - start) / (1000 * 60); // in minutes

      if (diff > 0) {
        const hours = Math.floor(diff / 60);
        const minutes = diff % 60;
        const duration = `${hours > 0 ? `${hours}h ` : ''}${minutes > 0 ? `${minutes}m` : ''}`;
        setExamData(prev => ({ ...prev, duration: duration.trim() }));
      }
    }
  };

  // Add new question
  const handleAddQuestion = () => {
    if (newQuestion.text.trim() && newQuestion.type) {
      const question = {
        id: Date.now(),
        ...newQuestion,
        options: newQuestion.type === 'mcq' || newQuestion.type === 'matching'
          ? newQuestion.options.filter(opt => opt.trim() !== '')
          : []
      };

      setQuestions(prev => [...prev, question]);
      setNewQuestion({
        text: '',
        type: 'mcq',
        options: ['', '', '', ''],
        correctAnswer: '',
        marks: 1,
        difficulty: 'medium'
      });
    }
  };

  // Remove question
  const handleRemoveQuestion = (id) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
  };

  // Update question option
  const handleOptionChange = (index, value) => {
    const updatedOptions = [...newQuestion.options];
    updatedOptions[index] = value;
    setNewQuestion(prev => ({ ...prev, options: updatedOptions }));
  };

  // Add option
  const handleAddOption = () => {
    setNewQuestion(prev => ({
      ...prev,
      options: [...prev.options, '']
    }));
  };

  // Remove option
  const handleRemoveOption = (index) => {
    const updatedOptions = newQuestion.options.filter((_, i) => i !== index);
    setNewQuestion(prev => ({ ...prev, options: updatedOptions }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const finalExamData = {
      ...examData,
      questions,
      totalQuestions: questions.length,
      totalMarks: questions.reduce((sum, q) => sum + parseInt(q.marks || 1), 0)
    };

    console.log('Exam Created:', finalExamData);
    alert('Exam created successfully! Check console for data.');

    // Reset form
    setExamData({
      id: '',
      title: '',
      description: '',
      examType: '',
      difficulty: '',
      category: '',
      date: '',
      startTime: '',
      endTime: '',
      duration: '',
      totalQuestions: '',
      totalMarks: '',
      maxParticipants: '',
      passingMarks: '',
      negativeMarking: false,
      negativeMarkValue: '0.25',
      instructions: '',
      tags: [],
      status: 'upcoming',
      icon: '📝',
      newTag: ''
    });
    setQuestions([]);
  };

  // Form sections
  const formSections = [
    { id: 'basic', label: 'Basic Info', icon: '📋' },
    { id: 'schedule', label: 'Schedule', icon: '📅' },
    { id: 'settings', label: 'Exam Settings', icon: '⚙️' },
    { id: 'questions', label: 'Questions', icon: '❓' },
    { id: 'instructions', label: 'Instructions', icon: '📝' }
  ];

  // Preview component
  const ExamPreview = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900">Exam Preview</h3>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            examData.status === 'upcoming'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-green-100 text-green-800'
          }`}>
            {examData.status === 'upcoming' ? 'Upcoming' : 'Active'}
          </span>
        </div>
      </div>

      {/* Exam Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg p-6 text-white mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-4xl">{examData.icon || '📝'}</div>
          <div className="text-right">
            <div className="text-sm text-emerald-100">{examData.category || 'General Biology'}</div>
            <div className="text-lg font-bold">{examData.examType || 'Exam Type'}</div>
          </div>
        </div>
        <h4 className="text-2xl font-bold mb-2">{examData.title || 'Exam Title'}</h4>
        <p className="text-emerald-100">{examData.description || 'Exam description...'}</p>
      </div>

      {/* Exam Details Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-500 mb-1">Date & Time</div>
          <div className="font-semibold">
            {examData.date ? new Date(examData.date).toLocaleDateString() : 'Not set'} • {examData.startTime || '--:--'}
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-500 mb-1">Duration</div>
          <div className="font-semibold">{examData.duration || '0h 0m'}</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-500 mb-1">Questions</div>
          <div className="font-semibold">{questions.length} ({examData.totalMarks || 0} marks)</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-500 mb-1">Difficulty</div>
          <div className="font-semibold">{examData.difficulty || 'Not set'}</div>
        </div>
      </div>

      {/* Tags */}
      {examData.tags.length > 0 && (
        <div className="mb-6">
          <div className="text-sm text-gray-500 mb-2">Tags</div>
          <div className="flex flex-wrap gap-2">
            {examData.tags.map((tag, index) => (
              <span key={index} className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Sample Question */}
      {questions.length > 0 && (
        <div className="border-t pt-6">
          <h5 className="font-bold text-gray-900 mb-4">Sample Questions ({questions.length} total)</h5>
          <div className="space-y-4">
            {questions.slice(0, 2).map((q, index) => (
              <div key={q.id} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-medium">Q{index + 1}. {q.text.substring(0, 50)}...</div>
                  <span className="text-sm px-2 py-1 bg-gray-200 text-gray-700 rounded">
                    {q.marks} mark{q.marks !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="text-sm text-gray-500">{q.type.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="mt-6 pt-6 border-t">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-emerald-600">{questions.length}</div>
            <div className="text-sm text-gray-500">Questions</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-emerald-600">
              {examData.maxParticipants || '∞'}
            </div>
            <div className="text-sm text-gray-500">Max Participants</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-emerald-600">
              {examData.negativeMarking ? 'Yes' : 'No'}
            </div>
            <div className="text-sm text-gray-500">Negative Marking</div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Create New Exam
          </h1>
          <p className="text-gray-600">
            Design a comprehensive biology exam with detailed questions and settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            {/* Progress Steps */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="flex overflow-x-auto pb-2">
                {formSections.map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center px-4 py-3 mr-4 rounded-lg whitespace-nowrap ${
                      activeSection === section.id
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span className="mr-2">{section.icon}</span>
                    {section.label}
                    {index < formSections.length - 1 && (
                      <FiChevronRight className="ml-2" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Form */}
            <motion.form
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              {/* Basic Information */}
              {activeSection === 'basic' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b flex items-center">
                    <span className="mr-2">📋</span> Basic Information
                  </h2>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Exam ID *
                        </label>
                        <input
                          type="text"
                          name="id"
                          value={examData.id}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="e.g., hsc-bio-2024"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Exam Title *
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={examData.title}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="e.g., HSC Biology Final Exam 2024"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description *
                      </label>
                      <textarea
                        name="description"
                        value={examData.description}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="Describe the exam scope, topics covered, and purpose..."
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <FiBook className="inline mr-2" />
                          Exam Type *
                        </label>
                        <select
                          name="examType"
                          value={examData.examType}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          required
                        >
                          <option value="">Select Type</option>
                          {examTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Difficulty Level *
                        </label>
                        <select
                          name="difficulty"
                          value={examData.difficulty}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          required
                        >
                          <option value="">Select Level</option>
                          {difficultyLevels.map(level => (
                            <option key={level} value={level}>{level}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Category *
                        </label>
                        <select
                          name="category"
                          value={examData.category}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          required
                        >
                          <option value="">Select Category</option>
                          {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Tags */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FiTag className="inline mr-2" />
                        Tags (Optional)
                      </label>
                      <div className="flex gap-2 mb-3">
                        <input
                          type="text"
                          value={examData.newTag}
                          onChange={(e) => setExamData(prev => ({ ...prev, newTag: e.target.value }))}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="Add tags like cell-biology, genetics, etc."
                        />
                        <button
                          type="button"
                          onClick={handleAddTag}
                          className="px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                        >
                          <FiPlus />
                        </button>
                      </div>
                      {examData.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {examData.tags.map((tag, index) => (
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
                                <AiOutlineCloseCircle />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Schedule */}
              {activeSection === 'schedule' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b flex items-center">
                    <span className="mr-2">📅</span> Schedule & Timing
                  </h2>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <FiCalendar className="inline mr-2" />
                          Exam Date *
                        </label>
                        <input
                          type="date"
                          name="date"
                          value={examData.date}
                          onChange={handleInputChange}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <FiClock className="inline mr-2" />
                            Start Time *
                          </label>
                          <input
                            type="time"
                            name="startTime"
                            value={examData.startTime}
                            onChange={handleInputChange}
                            onBlur={calculateDuration}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <FiClock className="inline mr-2" />
                            End Time *
                          </label>
                          <input
                            type="time"
                            name="endTime"
                            value={examData.endTime}
                            onChange={handleInputChange}
                            onBlur={calculateDuration}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <BsClockHistory className="inline mr-2" />
                          Duration
                        </label>
                        <input
                          type="text"
                          name="duration"
                          value={examData.duration}
                          readOnly
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg"
                          placeholder="Auto-calculated"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <FiUsers className="inline mr-2" />
                          Max Participants
                        </label>
                        <input
                          type="number"
                          name="maxParticipants"
                          value={examData.maxParticipants}
                          onChange={handleInputChange}
                          min="1"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="e.g., 1000"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Exam Status
                        </label>
                        <select
                          name="status"
                          value={examData.status}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                          <option value="upcoming">Upcoming</option>
                          <option value="active">Active</option>
                          <option value="completed">Completed</option>
                          <option value="draft">Draft</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Exam Settings */}
              {activeSection === 'settings' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b flex items-center">
                    <span className="mr-2">⚙️</span> Exam Settings
                  </h2>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <AiOutlineQuestionCircle className="inline mr-2" />
                          Passing Marks (%)
                        </label>
                        <input
                          type="number"
                          name="passingMarks"
                          value={examData.passingMarks}
                          onChange={handleInputChange}
                          min="0"
                          max="100"
                          step="0.1"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="e.g., 40"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Total Marks
                        </label>
                        <input
                          type="number"
                          name="totalMarks"
                          value={examData.totalMarks || questions.reduce((sum, q) => sum + parseInt(q.marks || 1), 0)}
                          readOnly
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                      <div className="flex items-center justify-between mb-4">
                        <label className="flex items-center text-sm font-medium text-gray-700">
                          <input
                            type="checkbox"
                            name="negativeMarking"
                            checked={examData.negativeMarking}
                            onChange={handleInputChange}
                            className="mr-2 h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                          />
                          Negative Marking
                        </label>
                      </div>

                      {examData.negativeMarking && (
                        <div className="pl-6">
                          <label className="block text-sm text-gray-600 mb-2">
                            Deduct marks for wrong answers:
                          </label>
                          <div className="flex items-center gap-4">
                            {['0.25', '0.33', '0.5', '1'].map(value => (
                              <label key={value} className="flex items-center">
                                <input
                                  type="radio"
                                  name="negativeMarkValue"
                                  value={value}
                                  checked={examData.negativeMarkValue === value}
                                  onChange={handleInputChange}
                                  className="mr-2 h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                                />
                                <span className="text-sm text-gray-700">-{value} mark</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Exam Instructions
                      </label>
                      <textarea
                        name="instructions"
                        value={examData.instructions}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="Provide clear instructions for the exam..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Questions */}
              {activeSection === 'questions' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b flex items-center justify-between">
                    <span className="flex items-center">
                      <span className="mr-2">❓</span> Questions
                    </span>
                    <span className="text-sm font-normal text-gray-600">
                      Total: {questions.length} questions • {questions.reduce((sum, q) => sum + parseInt(q.marks || 1), 0)} marks
                    </span>
                  </h2>

                  <div className="space-y-6">
                    {/* Add New Question Form */}
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                      <h3 className="font-bold text-gray-900 mb-4">Add New Question</h3>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Question Text *
                          </label>
                          <textarea
                            value={newQuestion.text}
                            onChange={(e) => setNewQuestion(prev => ({ ...prev, text: e.target.value }))}
                            rows="3"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            placeholder="Enter the question..."
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Question Type
                            </label>
                            <select
                              value={newQuestion.type}
                              onChange={(e) => setNewQuestion(prev => ({ ...prev, type: e.target.value }))}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            >
                              {questionTypes.map(qt => (
                                <option key={qt.value} value={qt.value}>
                                  {qt.icon} {qt.label}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Marks
                            </label>
                            <input
                              type="number"
                              value={newQuestion.marks}
                              onChange={(e) => setNewQuestion(prev => ({ ...prev, marks: e.target.value }))}
                              min="0.5"
                              step="0.5"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Difficulty
                            </label>
                            <select
                              value={newQuestion.difficulty}
                              onChange={(e) => setNewQuestion(prev => ({ ...prev, difficulty: e.target.value }))}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            >
                              <option value="easy">Easy</option>
                              <option value="medium">Medium</option>
                              <option value="hard">Hard</option>
                            </select>
                          </div>
                        </div>

                        {/* Options for MCQ */}
                        {(newQuestion.type === 'mcq' || newQuestion.type === 'matching') && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Options (Mark correct answer with ✓)
                            </label>
                            <div className="space-y-2">
                              {newQuestion.options.map((option, index) => (
                                <div key={index} className="flex items-center gap-2">
                                  <input
                                    type="text"
                                    value={option}
                                    onChange={(e) => handleOptionChange(index, e.target.value)}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    placeholder={`Option ${index + 1}`}
                                  />
                                  <button
                                    type="button"
                                    onClick={() => setNewQuestion(prev => ({ ...prev, correctAnswer: option }))}
                                    className={`p-2 rounded ${
                                      newQuestion.correctAnswer === option
                                        ? 'bg-emerald-100 text-emerald-600'
                                        : 'bg-gray-100 text-gray-600'
                                    }`}
                                  >
                                    <AiOutlineCheckCircle size={20} />
                                  </button>
                                  {newQuestion.options.length > 2 && (
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveOption(index)}
                                      className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
                                    >
                                      <FiTrash2 size={16} />
                                    </button>
                                  )}
                                </div>
                              ))}
                              <button
                                type="button"
                                onClick={handleAddOption}
                                className="mt-2 px-4 py-2 text-emerald-600 hover:text-emerald-700 flex items-center gap-2"
                              >
                                <FiPlus /> Add Option
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Correct Answer for other types */}
                        {newQuestion.type !== 'mcq' && newQuestion.type !== 'matching' && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Correct Answer/Expected Response
                            </label>
                            <input
                              type="text"
                              value={newQuestion.correctAnswer}
                              onChange={(e) => setNewQuestion(prev => ({ ...prev, correctAnswer: e.target.value }))}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                              placeholder="Enter correct answer..."
                            />
                          </div>
                        )}

                        <button
                          type="button"
                          onClick={handleAddQuestion}
                          disabled={!newQuestion.text.trim()}
                          className="w-full py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <AiOutlinePlusCircle className="inline mr-2" />
                          Add Question
                        </button>
                      </div>
                    </div>

                    {/* Questions List */}
                    {questions.length > 0 ? (
                      <div>
                        <h3 className="font-bold text-gray-900 mb-4">Added Questions</h3>
                        <div className="space-y-4">
                          {questions.map((q, index) => (
                            <div key={q.id} className="bg-white border border-gray-200 rounded-lg p-4">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <div className="font-medium">
                                    Q{index + 1}. {q.text}
                                  </div>
                                  <div className="flex items-center gap-3 mt-2">
                                    <span className="text-sm px-2 py-1 bg-gray-100 text-gray-700 rounded">
                                      {q.type.toUpperCase()}
                                    </span>
                                    <span className="text-sm px-2 py-1 bg-blue-100 text-blue-700 rounded">
                                      {q.marks} mark{q.marks !== 1 ? 's' : ''}
                                    </span>
                                    <span className="text-sm px-2 py-1 bg-purple-100 text-purple-700 rounded">
                                      {q.difficulty}
                                    </span>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveQuestion(q.id)}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                                >
                                  <FiTrash2 />
                                </button>
                              </div>
                              {q.options.length > 0 && (
                                <div className="mt-3">
                                  <div className="text-sm text-gray-500 mb-1">Options:</div>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {q.options.map((opt, optIndex) => (
                                      <div
                                        key={optIndex}
                                        className={`px-3 py-2 rounded ${
                                          opt === q.correctAnswer
                                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                            : 'bg-gray-50 text-gray-700'
                                        }`}
                                      >
                                        {opt}
                                        {opt === q.correctAnswer && (
                                          <span className="ml-2 text-emerald-500">✓</span>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <AiOutlineQuestionCircle className="text-4xl mx-auto mb-3 text-gray-300" />
                        <p>No questions added yet. Start by adding your first question above.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 mt-6 border-t">
                {activeSection !== 'basic' && (
                  <button
                    type="button"
                    onClick={() => {
                      const currentIndex = formSections.findIndex(s => s.id === activeSection);
                      if (currentIndex > 0) setActiveSection(formSections[currentIndex - 1].id);
                    }}
                    className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
                  >
                    Previous
                  </button>
                )}

                <div className="ml-auto flex gap-4">
                  {activeSection !== 'instructions' ? (
                    <button
                      type="button"
                      onClick={() => {
                        const currentIndex = formSections.findIndex(s => s.id === activeSection);
                        if (currentIndex < formSections.length - 1) {
                          setActiveSection(formSections[currentIndex + 1].id);
                        }
                      }}
                      className="px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700"
                    >
                      Next Section
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-8 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 flex items-center gap-2"
                    >
                      <FiSave /> Create Exam
                    </button>
                  )}
                </div>
              </div>
            </motion.form>
          </div>

          {/* Right Column - Preview & Instructions */}
          <div className="lg:col-span-1 space-y-6">
            {/* Preview Toggle */}
            <div className="bg-white rounded-xl shadow-lg p-4">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">Preview Mode</span>
                <button
                  onClick={() => setPreviewMode(!previewMode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    previewMode ? 'bg-emerald-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      previewMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Preview */}
            {previewMode && <ExamPreview />}

            {/* Instructions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <FiEye className="mr-2" /> Quick Tips
              </h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2">•</span>
                  Use clear and specific question wording
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2">•</span>
                  Set appropriate time limits for question complexity
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2">•</span>
                  Add tags for better organization and filtering
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2">•</span>
                  Preview exam before final submission
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2">•</span>
                  Balance difficulty across different question types
                </li>
              </ul>

              {/* Stats */}
              <div className="mt-6 pt-6 border-t">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600">{questions.length}</div>
                    <div className="text-xs text-gray-500">Questions Added</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600">
                      {questions.reduce((sum, q) => sum + parseInt(q.marks || 1), 0)}
                    </div>
                    <div className="text-xs text-gray-500">Total Marks</div>
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="mt-6 pt-6 border-t">
                <h4 className="font-medium text-gray-900 mb-3">Form Progress</h4>
                <div className="space-y-2">
                  {formSections.map(section => (
                    <div key={section.id} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">{section.label}</span>
                      <span className={`h-2 w-2 rounded-full ${
                        activeSection === section.id ? 'bg-emerald-500' : 'bg-gray-300'
                      }`}></span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateExam;