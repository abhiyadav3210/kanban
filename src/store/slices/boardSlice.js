import { createSlice } from "@reduxjs/toolkit";

const TASK_STATUSES = {
  DRAFT: "draft",
  UNSOLVED: "unsolved",
  UNDER_REVIEW: "under-review",
  SOLVED: "solved",
  NEEDS_INFO: "needs-info",
};

const SEVERITY_LEVELS = {
  CRITICAL: "Critical",
  HIGH: "High",
  MEDIUM: "Medium",
  LOW: "Low",
};

const initialState = {
  columns: [
    {
      id: TASK_STATUSES.DRAFT,
      title: "Draft",
      count: 2,
      color: "gray",
    },
    {
      id: TASK_STATUSES.UNSOLVED,
      title: "Unsolved",
      count: 1,
      color: "blue",
    },
    {
      id: TASK_STATUSES.UNDER_REVIEW,
      title: "Under Review",
      count: 2,
      color: "yellow",
    },
    {
      id: TASK_STATUSES.SOLVED,
      title: "Solved",
      count: 6,
      color: "green",
    },
    {
      id: TASK_STATUSES.NEEDS_INFO,
      title: "Needs Info",
      count: 1,
      color: "purple",
    },
  ],
  tasks: [
    {
      id: "#8793",
      title: "Server Side Template Injection (Blind)",
      severity: SEVERITY_LEVELS.CRITICAL,
      source: "Hypejab",
      score: 8.8,
      status: TASK_STATUSES.DRAFT,
      date: "3 Jan, 4:35 PM",
      verified: false,
      assignee: "John Doe",
    },
    {
      id: "#8794",
      title: "svn/entries Found",
      severity: SEVERITY_LEVELS.LOW,
      source: "Hypejab",
      score: 2.3,
      status: TASK_STATUSES.UNSOLVED,
      date: "3 Jan, 4:35 PM",
      verified: false,
      assignee: "Jane Smith",
    },
    {
      id: "#8795",
      title: "Q Web Key Set Disclosed",
      severity: SEVERITY_LEVELS.HIGH,
      source: "Source Code",
      score: 6.5,
      status: TASK_STATUSES.UNDER_REVIEW,
      date: "3 Jan, 4:35 PM",
      verified: true,
      assignee: "Mike Johnson",
    },
    {
      id: "#8796",
      title: "WordPress Database Backup File Found",
      severity: SEVERITY_LEVELS.MEDIUM,
      source: "Getastra",
      score: 6.5,
      status: TASK_STATUSES.UNDER_REVIEW,
      date: "3 Jan, 4:35 PM",
      verified: false,
      assignee: "Sarah Wilson",
    },
    {
      id: "#8797",
      title: "Phpmyadmin Information Schema Disclosure",
      severity: SEVERITY_LEVELS.CRITICAL,
      source: "Hypejab",
      score: 6.5,
      status: TASK_STATUSES.SOLVED,
      date: "3 Jan, 4:35 PM",
      verified: false,
      assignee: "Tom Brown",
    },
    {
      id: "#8798",
      title: "Server Side Template Injection (Blind)",
      severity: SEVERITY_LEVELS.CRITICAL,
      source: "Source Code",
      score: 6.5,
      status: TASK_STATUSES.SOLVED,
      date: "3 Jan, 4:35 PM",
      verified: true,
      assignee: "Lisa Davis",
    },
    {
      id: "#8799",
      title: "PII Disclosure",
      severity: SEVERITY_LEVELS.CRITICAL,
      source: "Getastra",
      score: 6.5,
      status: TASK_STATUSES.SOLVED,
      date: "3 Jan, 4:35 PM",
      verified: false,
      assignee: "Chris Lee",
    },
    {
      id: "#8800",
      title: ".svn/entries Found",
      severity: SEVERITY_LEVELS.MEDIUM,
      source: "Getastra",
      score: 6.5,
      status: TASK_STATUSES.SOLVED,
      date: "3 Jan, 4:35 PM",
      verified: false,
      assignee: "Alex Johnson",
    },
    {
      id: "#8801",
      title: "JSON Web Key Set Disclosed",
      severity: SEVERITY_LEVELS.LOW,
      source: "Hypejab",
      score: 6.5,
      status: TASK_STATUSES.SOLVED,
      date: "3 Jan, 4:35 PM",
      verified: false,
      assignee: "Emma Wilson",
    },
    {
      id: "#8802",
      title: "WordPress Configuration File Found",
      severity: SEVERITY_LEVELS.LOW,
      source: "Getastra",
      score: 6.5,
      status: TASK_STATUSES.NEEDS_INFO,
      date: "3 Jan, 4:35 PM",
      verified: false,
      assignee: "Ryan Martinez",
    },
  ],
  filters: {
    searchTerm: "",
    selectedSeverity: "",
    selectedSource: "",
    sortBy: "date",
  },
  view: "board",
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    // Task Management
    moveTask: (state, action) => {
      const { taskId, newStatus, oldStatus } = action.payload;
      const task = state.tasks.find((t) => t.id === taskId);

      if (task && task.status !== newStatus) {
        task.status = newStatus;

        // Update column counts
        const oldColumn = state.columns.find((c) => c.id === oldStatus);
        const newColumn = state.columns.find((c) => c.id === newStatus);

        if (oldColumn && oldColumn.count > 0) {
          oldColumn.count--;
        }
        if (newColumn) {
          newColumn.count++;
        }
      }
    },

    addTask: (state, action) => {
      const newTask = {
        ...action.payload,
        id: `#${Date.now()}`,
        date: new Date().toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
      };

      state.tasks.push(newTask);

      const column = state.columns.find((c) => c.id === newTask.status);
      if (column) {
        column.count++;
      }
    },

    updateTask: (state, action) => {
      const { id, ...updates } = action.payload;
      const taskIndex = state.tasks.findIndex((t) => t.id === id);

      if (taskIndex !== -1) {
        const oldStatus = state.tasks[taskIndex].status;
        state.tasks[taskIndex] = { ...state.tasks[taskIndex], ...updates };

        if (updates.status && updates.status !== oldStatus) {
          const oldColumn = state.columns.find((c) => c.id === oldStatus);
          const newColumn = state.columns.find((c) => c.id === updates.status);

          if (oldColumn && oldColumn.count > 0) {
            oldColumn.count--;
          }
          if (newColumn) {
            newColumn.count++;
          }
        }
      }
    },

    deleteTask: (state, action) => {
      const taskId = action.payload;
      const task = state.tasks.find((t) => t.id === taskId);

      if (task) {
        const column = state.columns.find((c) => c.id === task.status);
        if (column && column.count > 0) {
          column.count--;
        }

        state.tasks = state.tasks.filter((t) => t.id !== taskId);
      }
    },

    // Filtering and Search
    setSearchTerm: (state, action) => {
      state.filters.searchTerm = action.payload;
    },

    setFilter: (state, action) => {
      const { type, value } = action.payload;
      state.filters[type] = value;
    },

    clearFilters: (state) => {
      state.filters = {
        searchTerm: "",
        selectedSeverity: "",
        selectedSource: "",
        sortBy: "date",
      };
    },

    // Sorting
    setSortBy: (state, action) => {
      state.filters.sortBy = action.payload;
    },

    // View Management
    setView: (state, action) => {
      state.view = action.payload;
    },
  },
});

export const {
  moveTask,
  addTask,
  updateTask,
  deleteTask,
  setSearchTerm,
  setFilter,
  clearFilters,
  setSortBy,
  setView,
} = boardSlice.actions;

export default boardSlice.reducer;

// Selectors
export const selectFilteredAndSortedTasks = (state) => {
  const { tasks, filters } = state.board;

  let filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      !filters.searchTerm ||
      task.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      task.id.toLowerCase().includes(filters.searchTerm.toLowerCase());

    const matchesSeverity =
      !filters.selectedSeverity || task.severity === filters.selectedSeverity;
    const matchesSource =
      !filters.selectedSource || task.source === filters.selectedSource;

    return matchesSearch && matchesSeverity && matchesSource;
  });

  // Sort tasks
  filteredTasks.sort((a, b) => {
    switch (filters.sortBy) {
      case "date":
        return new Date(b.date) - new Date(a.date);
      case "severity":
        const severityOrder = { Critical: 4, High: 3, Medium: 2, Low: 1 };
        return severityOrder[b.severity] - severityOrder[a.severity];
      case "score":
        return b.score - a.score;
      default:
        return 0;
    }
  });

  return filteredTasks;
};

export const selectTasksByStatus = (status) => (state) => {
  const filteredTasks = selectFilteredAndSortedTasks(state);
  return filteredTasks.filter((task) => task.status === status);
};
