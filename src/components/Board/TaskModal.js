import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTask, updateTask } from "../../store/slices/boardSlice";
import {
  XMarkIcon,
  ShieldCheckIcon,
  CalendarIcon,
  UserIcon,
  TagIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

const TaskModal = ({
  isOpen,
  onClose,
  task = null,
  initialStatus = "draft",
}) => {
  const dispatch = useDispatch();
  const isEditing = !!task;

  const [formData, setFormData] = useState({
    title: "",
    severity: "Medium",
    source: "Hypejab",
    score: 5.0,
    status: initialStatus,
    assignee: "",
    description: "",
    verified: false,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        severity: task.severity || "Medium",
        source: task.source || "Hypejab",
        score: task.score || 5.0,
        status: task.status || "draft",
        assignee: task.assignee || "",
        description: task.description || "",
        verified: task.verified || false,
      });
    } else {
      setFormData({
        title: "",
        severity: "Medium",
        source: "Hypejab",
        score: 5.0,
        status: initialStatus,
        assignee: "",
        description: "",
        verified: false,
      });
    }
    setErrors({});
  }, [task, initialStatus, isOpen]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.trim().length < 5) {
      newErrors.title = "Title must be at least 5 characters";
    }

    if (!formData.assignee.trim()) {
      newErrors.assignee = "Assignee is required";
    }

    if (formData.score < 0 || formData.score > 10) {
      newErrors.score = "Score must be between 0 and 10";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (isEditing) {
      dispatch(
        updateTask({
          id: task.id,
          ...formData,
        })
      );
    } else {
      dispatch(addTask(formData));
    }

    onClose();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const severityOptions = ["Critical", "High", "Medium", "Low"];
  const sourceOptions = ["Hypejab", "Source Code", "Getastra"];
  const statusOptions = [
    { value: "draft", label: "Draft" },
    { value: "unsolved", label: "Unsolved" },
    { value: "under-review", label: "Under Review" },
    { value: "solved", label: "Solved" },
    { value: "needs-info", label: "Needs Info" },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <ShieldCheckIcon className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {isEditing ? "Edit Vulnerability" : "Create New Vulnerability"}
              </h2>
              <p className="text-sm text-gray-500">
                {isEditing
                  ? `Update ${task.id}`
                  : "Add a new security vulnerability"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XMarkIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <TagIcon className="w-4 h-4 inline mr-1" />
              Vulnerability Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`input-field ${
                errors.title
                  ? "border-error-300 focus:border-error-500 focus:ring-error-500"
                  : ""
              }`}
              placeholder="e.g., SQL Injection in Login Form"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-error-600">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="input-field resize-none"
              placeholder="Detailed description of the vulnerability..."
            />
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Severity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <ChartBarIcon className="w-4 h-4 inline mr-1" />
                Severity *
              </label>
              <select
                name="severity"
                value={formData.severity}
                onChange={handleChange}
                className="select-field"
              >
                {severityOptions.map((severity) => (
                  <option key={severity} value={severity}>
                    {severity}
                  </option>
                ))}
              </select>
            </div>

            {/* Source */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Source *
              </label>
              <select
                name="source"
                value={formData.source}
                onChange={handleChange}
                className="select-field"
              >
                {sourceOptions.map((source) => (
                  <option key={source} value={source}>
                    {source}
                  </option>
                ))}
              </select>
            </div>

            {/* Score */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CVSS Score *
              </label>
              <input
                type="number"
                name="score"
                value={formData.score}
                onChange={handleChange}
                step="0.1"
                min="0"
                max="10"
                className={`input-field ${
                  errors.score
                    ? "border-error-300 focus:border-error-500 focus:ring-error-500"
                    : ""
                }`}
              />
              {errors.score && (
                <p className="mt-1 text-sm text-error-600">{errors.score}</p>
              )}
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status *
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="select-field"
              >
                {statusOptions.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Assignee */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <UserIcon className="w-4 h-4 inline mr-1" />
              Assignee *
            </label>
            <input
              type="text"
              name="assignee"
              value={formData.assignee}
              onChange={handleChange}
              className={`input-field ${
                errors.assignee
                  ? "border-error-300 focus:border-error-500 focus:ring-error-500"
                  : ""
              }`}
              placeholder="e.g., John Doe"
            />
            {errors.assignee && (
              <p className="mt-1 text-sm text-error-600">{errors.assignee}</p>
            )}
          </div>

          {/* Verified Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="verified"
              id="verified"
              checked={formData.verified}
              onChange={handleChange}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label
              htmlFor="verified"
              className="ml-2 block text-sm text-gray-900"
            >
              Mark as verified by security team
            </label>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {isEditing ? "Update Vulnerability" : "Create Vulnerability"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
