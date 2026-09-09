import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AuthProvider from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
//admin
import Login from "./pages/admin/login";
import Registration from "./pages/admin/registration";
import AdminDashboard from "./pages/admin/adminDashboard";
import AdminSidebar from "./pages/admin/adminSidebar";
import ViewUser from "./pages/admin/view-user";
import AddDepartment from "./pages/admin/add-department";
import ViewDepartment from "./pages/admin/view-department";
import UpdateDepartment from "./pages/admin/update-department";
import AddDesignation from "./pages/admin/add-designation";
import ViewDesignation from "./pages/admin/view-designation";
import UpdateDesignation from "./pages/admin/update-designation";
import AddEmployee from "./pages/admin/add-employee";
import ViewEmployee from "./pages/admin/view-employee";
import UpdateEmployee from "./pages/admin/update-employee";
import AddAttendance from "./pages/admin/add-atendance";
import ViewAttendance from "./pages/admin/view-attendance";
import UpdateAttendnace from "./pages/admin/update-attendance";
import AddLeaveType from "./pages/admin/add-leaveType";
import ViewLeaveType from "./pages/admin/view-leaveType";
import UpdateLeaveType from "./pages/admin/update-leaveType";
import AddLeave from "./pages/admin/add-leave";
import ViewLeave from "./pages/admin/view-leave";
import UpdateLeave from "./pages/admin/update-leave";
import AddPayroll from "./pages/admin/add-payroll";
import ViewPayroll from "./pages/admin/view-payroll";
import UpdatePayroll from "./pages/admin/update-payroll";
import AddProject from "./pages/admin/add-project";
import ViewProject from "./pages/admin/view-project";
import UpdateProject from "./pages/admin/update-project";
import AddTask from "./pages/admin/add-task";
import ViewTask from "./pages/admin/view-task";
import UpdateTask from "./pages/admin/update-task";
import AddNotification from "./pages/admin/add-notification";
import ViewNotification from "./pages/admin/view-notification";
import UpdateNotification from "./pages/admin/update-notification";
import AddPermission from "./pages/admin/add-permission";
import ViewPermission from "./pages/admin/view-permission";
import UpdatePermission from "./pages/admin/update-permission";
import AddPermissionRole from "./pages/admin/add-permissionRole";
import ViewPermissionRole from "./pages/admin/view-permissionRole";
import UpdatePermissionRole from "./pages/admin/update-permissionRole";

//user
import UserDashboard from "./pages/user/userDashboard";
import UserSidebar from "./pages/user/userSidebar";
import ViewEmployee1 from "./pages/user/view-employee";
import UpdateEmployee1 from "./pages/user/update-employee";
import ViewAttendance1 from "./pages/user/view-atendance";
import ViewLeaveType1 from "./pages/user/view-leaveType";
import AddLeave1 from "./pages/user/add-leave";
import ViewLeave1 from "./pages/user/view-leave";
import UpdateLeave1 from "./pages/user/update-leave";
import ViewProject1 from "./pages/user/view-project";
import ViewPayroll1 from "./pages/user/view-payroll";
import ViewTask1 from "./pages/user/view-task";
import ViewNotification1 from "./pages/user/view-notification";
import ViewPermission1 from "./pages/user/view-permission";
import ViewPermissionRole1 from "./pages/user/view-permissionRole";



function AppContent() {
 const[sidebarOpen,setSidebarOpen]=React.useState(false);
 const location=useLocation();
 const hideSidebarPath=["/","/admin/login","/admin/registration"];
   const isShouldHideSidebar = hideSidebarPath.includes(location.pathname.toLocaleLowerCase());
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isUserRoute = location.pathname.startsWith("/user");
  
  return (
    <AuthProvider>
      {!isShouldHideSidebar && isAdminRoute && (<AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />)}
      {!isShouldHideSidebar && isUserRoute && (<UserSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />)}

      <Routes>
        {/* admin */}
        <Route path="/" element={<Login />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/registration" element={<Registration />} />
        <Route path="/admin/adminDashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/view-user" element={<ProtectedRoute><ViewUser /></ProtectedRoute>} />
        <Route path="/admin/add-department" element={<ProtectedRoute><AddDepartment /></ProtectedRoute>} />
        <Route path="/admin/view-department" element={<ProtectedRoute><ViewDepartment /></ProtectedRoute>} />
        <Route path="/admin/update-department/:id" element={<ProtectedRoute><UpdateDepartment /></ProtectedRoute>} />
        <Route path="/admin/add-designation" element={<ProtectedRoute><AddDesignation /></ProtectedRoute>} />
        <Route path="/admin/view-designation" element={<ProtectedRoute><ViewDesignation /></ProtectedRoute>} />
        <Route path="/admin/update-designation/:id" element={<ProtectedRoute><UpdateDesignation /></ProtectedRoute>} />
        <Route path="/admin/add-employee" element={<ProtectedRoute><AddEmployee /></ProtectedRoute>} />
        <Route path="/admin/view-employee" element={<ProtectedRoute><ViewEmployee /></ProtectedRoute>} />
        <Route path="/admin/update-employee/:id" element={<ProtectedRoute><UpdateEmployee /></ProtectedRoute>} />
        <Route path="/admin/add-attendance" element={<ProtectedRoute><AddAttendance /></ProtectedRoute>} />
        <Route path="/admin/view-attendance" element={<ProtectedRoute><ViewAttendance /></ProtectedRoute>} />
        <Route path="/admin/update-attendance/:id" element={<ProtectedRoute><UpdateAttendnace /></ProtectedRoute>} />
        <Route path="/admin/add-leaveType" element={<ProtectedRoute><AddLeaveType/></ProtectedRoute>} />
        <Route path="/admin/view-leaveType" element={<ProtectedRoute><ViewLeaveType /></ProtectedRoute>} />
        <Route path="/admin/update-leaveType/:id" element={<ProtectedRoute><UpdateLeaveType /></ProtectedRoute>} />
        <Route path="/admin/add-leave" element={<ProtectedRoute><AddLeave/></ProtectedRoute>} />
        <Route path="/admin/view-leave" element={<ProtectedRoute><ViewLeave /></ProtectedRoute>} />
        <Route path="/admin/update-leave/:id" element={<ProtectedRoute><UpdateLeave /></ProtectedRoute>} />
        <Route path="/admin/add-payroll" element={<ProtectedRoute><AddPayroll/></ProtectedRoute>} />
        <Route path="/admin/view-payroll" element={<ProtectedRoute><ViewPayroll /></ProtectedRoute>} />
        <Route path="/admin/update-payroll/:id" element={<ProtectedRoute><UpdatePayroll /></ProtectedRoute>} />
        <Route path="/admin/add-project" element={<ProtectedRoute><AddProject/></ProtectedRoute>} />
        <Route path="/admin/view-project" element={<ProtectedRoute><ViewProject /></ProtectedRoute>} />
        <Route path="/admin/update-project/:id" element={<ProtectedRoute><UpdateProject /></ProtectedRoute>} />
        <Route path="/admin/add-task" element={<ProtectedRoute><AddTask/></ProtectedRoute>} />
        <Route path="/admin/view-task" element={<ProtectedRoute><ViewTask /></ProtectedRoute>} />
        <Route path="/admin/update-task/:id" element={<ProtectedRoute><UpdateTask /></ProtectedRoute>} />
         <Route path="/admin/add-notification" element={<ProtectedRoute><AddNotification/></ProtectedRoute>} />
        <Route path="/admin/view-notification" element={<ProtectedRoute><ViewNotification /></ProtectedRoute>} />
        <Route path="/admin/update-notification/:id" element={<ProtectedRoute><UpdateNotification /></ProtectedRoute>} />
         <Route path="/admin/add-permission" element={<ProtectedRoute><AddPermission/></ProtectedRoute>} />
        <Route path="/admin/view-permission" element={<ProtectedRoute><ViewPermission /></ProtectedRoute>} />
        <Route path="/admin/update-permission/:id" element={<ProtectedRoute><UpdatePermission /></ProtectedRoute>} />
        <Route path="/admin/add-permissionRole" element= {<ProtectedRoute><AddPermissionRole/></ProtectedRoute>} />
        <Route path="/admin/view-permissionRole" element={<ProtectedRoute><ViewPermissionRole /></ProtectedRoute>} />
        <Route path="/admin/update-permissionRole/:id" element={<ProtectedRoute><UpdatePermissionRole /></ProtectedRoute>} />

        {/* user */}
        <Route path="/user/userDashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
        <Route path="/user/view-employee" element={<ProtectedRoute><ViewEmployee1 /></ProtectedRoute>} />
        <Route path="/user/update-employee/:id" element={<ProtectedRoute><UpdateEmployee1 /></ProtectedRoute>} />
        <Route path="/user/view-attendance" element={<ProtectedRoute><ViewAttendance1 /></ProtectedRoute>} />
        <Route path="/user/view-leaveType" element={<ProtectedRoute><ViewLeaveType1 /></ProtectedRoute>} />
         <Route path="/user/add-leave" element={<ProtectedRoute><AddLeave1/></ProtectedRoute>} />
        <Route path="/user/view-leave" element={<ProtectedRoute><ViewLeave1 /></ProtectedRoute>} />
        <Route path="/user/update-leave/:id" element={<ProtectedRoute><UpdateLeave1 /></ProtectedRoute>} />
        <Route path="/user/view-project" element={<ProtectedRoute><ViewProject1 /></ProtectedRoute>} />
        <Route path="/user/view-payroll" element={<ProtectedRoute><ViewPayroll1 /></ProtectedRoute>} />
        <Route path="/user/view-task" element={<ProtectedRoute><ViewTask1 /></ProtectedRoute>} />
        <Route path="/user/view-notification" element={<ProtectedRoute><ViewNotification1 /></ProtectedRoute>} />
        <Route path="/user/view-permission" element={<ProtectedRoute><ViewPermission1 /></ProtectedRoute>} />
        <Route path="/user/view-permissionRole" element={<ProtectedRoute><ViewPermissionRole1 /></ProtectedRoute>} />


      </Routes>
    </AuthProvider>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}
export default App;

