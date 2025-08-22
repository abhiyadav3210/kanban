import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarOpen: false,
  theme: "light",
  notifications: [],
  loading: {
    global: false,
    tasks: false,
    auth: false,
  },
  alerts: [],
  modals: {
    createTask: false,
    editTask: false,
    deleteTask: false,
    bulkActions: false,
  },
  preferences: {
    autoSave: true,
    showNotifications: true,
    compactView: false,
    defaultView: "board",
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    // Sidebar
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },

    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },

    // Theme
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },

    setTheme: (state, action) => {
      state.theme = action.payload;
    },

    // Loading states
    setGlobalLoading: (state, action) => {
      state.loading.global = action.payload;
    },

    setTasksLoading: (state, action) => {
      state.loading.tasks = action.payload;
    },

    setAuthLoading: (state, action) => {
      state.loading.auth = action.payload;
    },

    // Notifications
    addNotification: (state, action) => {
      const notification = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        ...action.payload,
      };
      state.notifications.unshift(notification);
    },

    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },

    clearNotifications: (state) => {
      state.notifications = [];
    },

    markNotificationRead: (state, action) => {
      const notification = state.notifications.find(
        (n) => n.id === action.payload
      );
      if (notification) {
        notification.read = true;
      }
    },

    // Alerts
    addAlert: (state, action) => {
      const alert = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        ...action.payload,
      };
      state.alerts.push(alert);
    },

    removeAlert: (state, action) => {
      state.alerts = state.alerts.filter(
        (alert) => alert.id !== action.payload
      );
    },

    clearAlerts: (state) => {
      state.alerts = [];
    },

    // Modals
    openModal: (state, action) => {
      const { modal, data } = action.payload;
      state.modals[modal] = true;
      if (data) {
        state[`${modal}Data`] = data;
      }
    },

    closeModal: (state, action) => {
      const modal = action.payload;
      state.modals[modal] = false;
      delete state[`${modal}Data`];
    },

    closeAllModals: (state) => {
      Object.keys(state.modals).forEach((modal) => {
        state.modals[modal] = false;
        delete state[`${modal}Data`];
      });
    },

    // Preferences
    updatePreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },

    resetPreferences: (state) => {
      state.preferences = initialState.preferences;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  toggleTheme,
  setTheme,
  setGlobalLoading,
  setTasksLoading,
  setAuthLoading,
  addNotification,
  removeNotification,
  clearNotifications,
  markNotificationRead,
  addAlert,
  removeAlert,
  clearAlerts,
  openModal,
  closeModal,
  closeAllModals,
  updatePreferences,
  resetPreferences,
} = uiSlice.actions;

export default uiSlice.reducer;

// Selectors
export const selectSidebarOpen = (state) => state.ui.sidebarOpen;
export const selectTheme = (state) => state.ui.theme;
export const selectLoading = (state) => state.ui.loading;
export const selectNotifications = (state) => state.ui.notifications;
export const selectUnreadNotifications = (state) =>
  state.ui.notifications.filter((n) => !n.read);
export const selectAlerts = (state) => state.ui.alerts;
export const selectModals = (state) => state.ui.modals;
export const selectPreferences = (state) => state.ui.preferences;
