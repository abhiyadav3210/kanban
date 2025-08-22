import React from "react";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { moveTask } from "../../store/slices/boardSlice";
import TaskCard from "./TaskCard";
import { PlusIcon } from "@heroicons/react/24/outline";

const Column = ({
  column,
  tasks,
  onCreateTask,
  onCardClick,
  isMobile = false,
}) => {
  const dispatch = useDispatch();

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "TASK",
    drop: (item) => {
      if (item.status !== column.id) {
        dispatch(
          moveTask({
            taskId: item.id,
            newStatus: column.id,
            oldStatus: item.status,
          })
        );
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const getStatusColor = (color) => {
    const colors = {
      gray: "bg-gray-400",
      blue: "bg-blue-500",
      yellow: "bg-warning-500",
      green: "bg-success-500",
      purple: "bg-purple-500",
    };
    return colors[color] || "bg-gray-400";
  };

  const dropZoneStyle =
    isOver && canDrop
      ? "border-primary-300 bg-primary-50 border-2 border-dashed"
      : "";

  const handleAddTask = () => {
    onCreateTask(column.id);
  };

  // Mobile styles
  const columnClasses = isMobile
    ? `w-full bg-gray-50 rounded-lg border border-gray-200 ${dropZoneStyle} transition-colors duration-200`
    : `flex-shrink-0 w-80 bg-gray-50 rounded-lg border border-gray-200 ${dropZoneStyle} transition-colors duration-200`;

  const tasksContainerClasses = isMobile
    ? "p-4 space-y-3 max-h-96 overflow-y-auto scrollbar-thin"
    : "p-4 space-y-3 max-h-[calc(100vh-240px)] overflow-y-auto scrollbar-thin";

  return (
    <div ref={drop} className={columnClasses}>
      {/* Column Header */}
      <div className="p-4 border-b border-gray-200 bg-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div
              className={`w-3 h-3 rounded-full ${getStatusColor(column.color)}`}
            ></div>
            <h3 className="font-semibold text-gray-900">{column.title}</h3>
            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm font-medium">
              {tasks.length}
            </span>
          </div>
          <button
            onClick={handleAddTask}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            title="Add vulnerability"
          >
            <PlusIcon className="w-4 h-4 text-gray-400 hover:text-gray-600" />
          </button>
        </div>
      </div>

      {/* Tasks Container */}
      <div className={tasksContainerClasses}>
        {tasks.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <div className="w-12 h-12 mx-auto mb-2 bg-gray-200 rounded-lg flex items-center justify-center">
              <PlusIcon className="w-6 h-6" />
            </div>
            <p className="text-sm">No vulnerabilities</p>
            <button
              onClick={handleAddTask}
              className="text-xs text-primary-600 hover:text-primary-700 mt-1"
            >
              Add one now
            </button>
          </div>
        ) : (
          <div
            className={
              isMobile ? "grid grid-cols-1 sm:grid-cols-2 gap-3" : "space-y-3"
            }
          >
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onCardClick={onCardClick}
                isMobile={isMobile}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Column;
