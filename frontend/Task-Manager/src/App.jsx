import React from "react";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";
import CreateTask from "./pages/Admin/CreateTask";
import ManageTasks from "./pages/Admin/ManageTasks";
import ManageUsers from "./pages/Admin/ManageUsers";
import Login from "./pages/Auth/login";
import SignUp from "./pages/Auth/signUp";
import MyTasks from "./pages/User/MyTasks";
import UserDashboard from "./pages/User/UserDashboard";
import ViewTaskDetails from "./pages/User/ViewTaskDetails";
import PrivateRoute from "./routes/PrivateRoute";


const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/signUp" element={<SignUp />}/>

          {/*Admin Routes*/}
          <Route element={<PrivateRoute allowedRoles={["Admin"]}/>}>
          <Route path="/Admin/Dashboard" element={<Dashboard />}/>
          <Route path="/Admin/CreateTask" element={<CreateTask />}/>
          <Route path="/Admin/ManageTasks" element={<ManageTasks />}/>
          <Route path="/Admin/ManageUsers" element={<ManageUsers />}/>
          </Route>

          {/*User Routes*/}
          <Route element={<PrivateRoute allowedRoles={["User"]}/>}>
          <Route path="/User/UserDashboard" element={<UserDashboard />}/>
          <Route path="/User/MyTasks" element={<MyTasks />}/>
          <Route path="/User/ViewTaskDetails" element={<ViewTaskDetails />}/>
          </Route>
        </Routes>
      </Router>
      </div>
  );
};

export default App