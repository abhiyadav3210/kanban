import React, { useState } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import { store } from "./store";
import { logout } from "./store/slices/authSlice";
import LoginForm from "./components/Auth/LoginForm";
import SignupForm from "./components/Auth/SignupForm";
import KanbanBoard from "./components/Board/KanbanBoard";
import "./index.css";

const AuthWrapper = () => {
  const [showLogin, setShowLogin] = useState(true);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return <KanbanBoard />;
  }

  return showLogin ? (
    <LoginForm onToggleForm={() => setShowLogin(false)} />
  ) : (
    <SignupForm onToggleForm={() => setShowLogin(true)} />
  );
};

function App() {
  return (
    <Provider store={store}>
      <AuthWrapper />
    </Provider>
  );
}

export default App;
