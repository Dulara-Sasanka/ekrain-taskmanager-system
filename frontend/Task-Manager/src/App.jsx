import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Admin Pages
import Dashboard from "./pages/Admin/Dashboard";
import CreateTask from "./pages/Admin/CreateTask";
import ManageTasks from "./pages/Admin/ManageTasks";
import ManageUsers from "./pages/Admin/ManageUsers";

// User Pages
import UserDashboard from "./pages/User/UserDashboard";
import MyTasks from "./pages/User/MyTasks";
import ViewTaskDetails from "./pages/User/ViewTaskDetails";

// Auth Pages
import Login from "./pages/Auth/login";
import SignUp from "./pages/Auth/signUp";

// Routes
import PrivateRoute from "./routes/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Default redirect to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Admin Routes */}
        <Route element={<PrivateRoute allowedRoles={["Admin"]} />}>
          <Route path="/admin">
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="createtask" element={<CreateTask />} />
            <Route path="managetasks" element={<ManageTasks />} />
            <Route path="manageusers" element={<ManageUsers />} />
          </Route>
        </Route>

        {/* User Routes */}
        <Route element={<PrivateRoute allowedRoles={["User"]} />}>
          <Route path="/user">
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="mytasks" element={<MyTasks />} />
            <Route path="viewtaskdetails" element={<ViewTaskDetails />} />
          </Route>
        </Route>

        {/* Catch-all redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;