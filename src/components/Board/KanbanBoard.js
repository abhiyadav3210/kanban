import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { useSelector } from "react-redux";
import Column from "./Column";
import Header from "../Common/Header";
import TaskModal from "./TaskModal";
import TaskDetailsModal from "./TaskDetailsModal";
import { selectFilteredAndSortedTasks } from "../../store/slices/boardSlice";

const KanbanBoard = () => {
  const { columns } = useSelector((state) => state.board);
  const filteredTasks = useSelector(selectFilteredAndSortedTasks);

  // Detect touch device
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Modal states
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [initialStatus, setInitialStatus] = useState("draft");

  const handleCreateTask = (status) => {
    setSelectedTask(null);
    setInitialStatus(status);
    setIsTaskModalOpen(true);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setIsTaskModalOpen(true);
  };

  const handleCardClick = (task) => {
    setSelectedTask(task);
    setIsDetailsModalOpen(true);
  };

  const handleCloseTaskModal = () => {
    setIsTaskModalOpen(false);
    setSelectedTask(null);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedTask(null);
  };

  return (
    <DndProvider backend={isTouchDevice ? TouchBackend : HTML5Backend}>
      <div className="h-screen bg-gray-50 flex flex-col">
        <Header />

        <div className="flex-1 overflow-hidden">
          <div className="h-full p-3 sm:p-6">
            {/* Mobile View - Single Column Scrollable */}
            <div className="lg:hidden">
              <div className="space-y-6">
                {columns.map((column) => {
                  const columnTasks = filteredTasks.filter(
                    (task) => task.status === column.id
                  );
                  return (
                    <div key={column.id} className="w-full">
                      <Column
                        column={column}
                        tasks={columnTasks}
                        onCreateTask={handleCreateTask}
                        onCardClick={handleCardClick}
                        isMobile={true}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Desktop View - Horizontal Scrolling */}
            <div className="hidden lg:block h-full">
              <div className="flex space-x-6 h-full overflow-x-auto pb-4">
                {columns.map((column) => (
                  <Column
                    key={column.id}
                    column={column}
                    tasks={filteredTasks.filter(
                      (task) => task.status === column.id
                    )}
                    onCreateTask={handleCreateTask}
                    onCardClick={handleCardClick}
                    isMobile={false}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modals */}
        <TaskModal
          isOpen={isTaskModalOpen}
          onClose={handleCloseTaskModal}
          task={selectedTask}
          initialStatus={initialStatus}
        />

        <TaskDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={handleCloseDetailsModal}
          task={selectedTask}
          onEdit={handleEditTask}
        />
      </div>
    </DndProvider>
  );
};

export default KanbanBoard;
