import React from "react";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../../store/slices/boardSlice";
import {
  XMarkIcon,
  ShieldCheckIcon,
  CalendarIcon,
  UserIcon,
  TagIcon,
  ChartBarIcon,
  PencilIcon,
  TrashIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";

const TaskDetailsModal = ({ isOpen, onClose, task, onEdit }) => {
  const dispatch = useDispatch();

  if (!isOpen || !task) return null;

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this vulnerability?")) {
      dispatch(deleteTask(task.id));
      onClose();
    }
  };

  const toggleVerified = () => {
    dispatch(
      updateTask({
        id: task.id,
        verified: !task.verified,
      })
    );
  };

  const getSeverityStyle = (severity) => {
    const styles = {
      Critical: "bg-error-100 text-error-700 border-error-200",
      High: "bg-orange-100 text-orange-700 border-orange-200",
      Medium: "bg-warning-100 text-warning-700 border-warning-200",
      Low: "bg-green-100 text-green-700 border-green-200",
    };
    return styles[severity] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  const getScoreColor = (score) => {
    if (score >= 9) return "text-error-600";
    if (score >= 7) return "text-orange-600";
    if (score >= 4) return "text-warning-600";
    return "text-green-600";
  };

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
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-semibold text-gray-900">
                  {task.id}
                </h2>
                {task.verified && (
                  <CheckBadgeIcon className="w-5 h-5 text-blue-500" />
                )}
              </div>
              <p className="text-sm text-gray-500">Vulnerability Details</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                onEdit(task);
                onClose();
              }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Edit"
            >
              <PencilIcon className="w-5 h-5 text-gray-500" />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 hover:bg-error-50 rounded-lg transition-colors"
              title="Delete"
            >
              <TrashIcon className="w-5 h-5 text-error-500" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <XMarkIcon className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Title */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {task.title}
            </h3>
            {task.description && (
              <p className="text-gray-600 leading-relaxed">
                {task.description}
              </p>
            )}
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-1">
                <ChartBarIcon className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-500">
                  Severity
                </span>
              </div>
              <span
                className={`inline-flex px-2 py-1 rounded-full text-sm font-medium border ${getSeverityStyle(
                  task.severity
                )}`}
              >
                {task.severity}
              </span>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-1">
                <TagIcon className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-500">
                  Source
                </span>
              </div>
              <span className="text-sm font-semibold text-gray-900">
                {task.source}
              </span>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-1">
                <div className="w-4 h-4 bg-orange-400 rounded-full"></div>
                <span className="text-sm font-medium text-gray-500">
                  CVSS Score
                </span>
              </div>
              <span
                className={`text-lg font-bold ${getScoreColor(task.score)}`}
              >
                {task.score}
              </span>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-1">
                <UserIcon className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-500">
                  Assignee
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-white">
                    {task.assignee?.charAt(0) || "U"}
                  </span>
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  {task.assignee || "Unassigned"}
                </span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <CalendarIcon className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-500">
                Timeline
              </span>
            </div>
            <div className="text-sm text-gray-700">
              <span className="font-medium">Created:</span> {task.date}
            </div>
          </div>

          {/* Status and Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-500">Status:</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium capitalize">
                {task.status.replace("-", " ")}
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={toggleVerified}
                className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  task.verified
                    ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <CheckBadgeIcon className="w-4 h-4 mr-1" />
                {task.verified ? "Verified" : "Mark Verified"}
              </button>

              <button
                onClick={() => {
                  onEdit(task);
                  onClose();
                }}
                className="btn-primary"
              >
                <PencilIcon className="w-4 h-4 mr-1" />
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsModal;
