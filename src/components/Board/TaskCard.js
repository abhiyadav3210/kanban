import React from "react";
import { useDrag } from "react-dnd";
import {
  EllipsisHorizontalIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

const TaskCard = ({ task, onCardClick, isMobile = false }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { id: task.id, status: task.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const getSeverityStyle = (severity) => {
    const styles = {
      Critical: "bg-error-100 text-error-700 border-error-200",
      High: "bg-orange-100 text-orange-700 border-orange-200",
      Medium: "bg-warning-100 text-warning-700 border-warning-200",
      Low: "bg-green-100 text-green-700 border-green-200",
    };
    return styles[severity] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  const getSourceStyle = (source) => {
    const styles = {
      Hypejab: "bg-purple-100 text-purple-700",
      "Source Code": "bg-blue-100 text-blue-700",
      Getastra: "bg-indigo-100 text-indigo-700",
    };
    return styles[source] || "bg-gray-100 text-gray-700";
  };

  const handleCardClick = (e) => {
    if (e.target.closest("button")) return;
    onCardClick(task);
  };

  const cardClasses = isMobile
    ? `bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-md transition-all duration-200 ${
        isDragging ? "opacity-50" : ""
      }`
    : `bg-white border border-gray-200 rounded-lg p-4 cursor-move hover:shadow-md transition-shadow duration-200 ${
        isDragging ? "opacity-50 rotate-2" : ""
      }`;

  return (
    <div
      ref={!isMobile ? drag : null}
      onClick={handleCardClick}
      className={cardClasses}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <span className="text-sm font-medium text-gray-500">{task.id}</span>
        <div className="flex items-center space-x-2">
          {task.verified && (
            <ShieldCheckIcon className="w-4 h-4 text-blue-500" />
          )}
          <button
            className="p-1 hover:bg-gray-100 rounded"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <EllipsisHorizontalIcon className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Title */}
      <h4 className="font-medium text-gray-900 mb-3 leading-tight text-sm">
        {task.title}
      </h4>

      {/* Labels and Score - Responsive Layout */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
        <div className="flex items-center space-x-2 flex-wrap gap-1">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityStyle(
              task.severity
            )}`}
          >
            {task.severity}
          </span>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getSourceStyle(
              task.source
            )}`}
          >
            {task.source}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
          <span className="text-sm font-semibold text-gray-900">
            {task.score}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span className="truncate">{task.date}</span>
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-medium text-white">
              {task.assignee?.charAt(0) || "U"}
            </span>
          </div>
          <CheckCircleIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
        </div>
      </div>

      {/* Mobile drag handle */}
      {isMobile && (
        <div ref={drag} className="mt-2 flex justify-center">
          <div className="w-12 h-1 bg-gray-300 rounded-full cursor-move"></div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
