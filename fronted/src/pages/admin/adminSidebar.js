import React,{useState,useContext} from "react";
import "../style/style.css";
import {FaTachometerAlt ,FaUser,FaSignOutAlt,FaBuilding,FaUserShield, FaRegCircle,FaIdBadge,FaRegUserCircle,FaCalendarCheck,FaListAlt,FaCalendarAlt, FaFolderMinus,FaMoneyCheckAlt,FaFolderOpen,FaBell,FaPersonBooth } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
const AdminSidebar=({sidebarOpen,setSidebarOpen})=>{
       const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const closeSidebar=()=>{
        setSidebarOpen && setSidebarOpen(false);
    }


        const handleLogout = () => {
        closeSidebar();
        logout();
        navigate("/admin/login");
    };

    const[departmentOpen,setDepartmentOpen]=useState("");
    const[designationOpen,setDesignationOpen]=useState("");
    const[employeeOpen,setEmployeeOpen]=useState("");
    const[attendanceOpen,setAttendanceOpen]=useState("");
    const[leavesTypeOpen,setLeavesTypeOpen]=useState("");
    const[leavesOpen,setLeavesOpen]=useState("");
    const[payrollOpen,setPayrollOpen]=useState("");
    const[projectOpen,setProjectOpen]=useState("");
    const[taskOpen,setTaskOpen]=useState("");
    const[permissionOpen,setPermissionOpen]=useState("");
     const[permissionRoleOpen,setPermissionRoleOpen]=useState("");
    const[notificationOpen,setNotificationOpen]=useState("");

    const toggleDepartment=()=>{
        setDepartmentOpen(!departmentOpen);
        setPermissionOpen(false);
        setDesignationOpen(false);
        setEmployeeOpen(false);
        setAttendanceOpen(false);
        setLeavesTypeOpen(false);
        setLeavesOpen(false);
        setPayrollOpen(false);
        setProjectOpen(false);
        setTaskOpen(false);
        setNotificationOpen(false);
        setPermissionRoleOpen(false);
    }

    const togglePermission=()=>{
        setPermissionOpen(!permissionOpen);
        setDepartmentOpen(false);
        setDesignationOpen(false);
        setEmployeeOpen(false);
        setAttendanceOpen(false);
         setLeavesTypeOpen(false);
        setLeavesOpen(false);
         setPayrollOpen(false);
         setProjectOpen(false);
        setTaskOpen(false);
        setNotificationOpen(false);
        setPermissionRoleOpen(false);
    }
        const toggledesignation=()=>{
        setDesignationOpen(!designationOpen);
        setDepartmentOpen(false);
        setPermissionOpen(false);
        setEmployeeOpen(false);
        setAttendanceOpen(false);
         setLeavesTypeOpen(false);
        setLeavesOpen(false);
         setPayrollOpen(false);
         setProjectOpen(false);
        setTaskOpen(false);
        setNotificationOpen(false);
        setPermissionRoleOpen(false);

    }


    const toggleEmployee=()=>{
        setEmployeeOpen(!employeeOpen);
        setDepartmentOpen(false);
        setPermissionOpen(false);
        setDesignationOpen(false);
        setAttendanceOpen(false);
         setLeavesTypeOpen(false);
        setLeavesOpen(false);
         setPayrollOpen(false);
         setProjectOpen(false);
        setTaskOpen(false);
        setNotificationOpen(false);
        setPermissionRoleOpen(false);
    }
     const toggleAttendance=()=>{
        setAttendanceOpen(!attendanceOpen);
        setDepartmentOpen(false);
        setPermissionOpen(false);
        setDesignationOpen(false);
        setEmployeeOpen(false);
        setLeavesTypeOpen(false);
        setLeavesOpen(false);
         setPayrollOpen(false);
         setProjectOpen(false);
        setTaskOpen(false);
        setNotificationOpen(false);
        setPermissionRoleOpen(false);
    }

     const toggleLeavesTypeOpen=()=>{
        setLeavesTypeOpen(!leavesTypeOpen);
        setDepartmentOpen(false);
        setPermissionOpen(false);
        setDesignationOpen(false);
        setEmployeeOpen(false);
        setAttendanceOpen(false);
        setLeavesOpen(false);
         setPayrollOpen(false);
         setProjectOpen(false);
        setTaskOpen(false);
        setNotificationOpen(false);
        setPermissionRoleOpen(false);
    }

       const toggleLeavesOpen=()=>{
        setLeavesOpen(!leavesOpen);
        setDepartmentOpen(false);
        setPermissionOpen(false);
        setDesignationOpen(false);
        setEmployeeOpen(false);
        setAttendanceOpen(false);
        setLeavesTypeOpen(false);
         setPayrollOpen(false);
         setProjectOpen(false);
        setTaskOpen(false);
        setNotificationOpen(false);
        setPermissionRoleOpen(false);
    }

     const togglePayrollOpen=()=>{
        setPayrollOpen(!payrollOpen);
        setDepartmentOpen(false);
        setPermissionOpen(false);
        setDesignationOpen(false);
        setEmployeeOpen(false);
        setAttendanceOpen(false);
        setLeavesTypeOpen(false);
        setLeavesOpen(false);
        setProjectOpen(false);
        setTaskOpen(false);
        setNotificationOpen(false);
        setPermissionRoleOpen(false);
    }

      const toggleProjectOpen=()=>{
        setProjectOpen(!projectOpen);
        setDepartmentOpen(false);
        setPermissionOpen(false);
        setDesignationOpen(false);
        setEmployeeOpen(false);
        setAttendanceOpen(false);
        setLeavesTypeOpen(false);
        setLeavesOpen(false);
        setPayrollOpen(false);
        setTaskOpen(false);
        setNotificationOpen(false);
        setPermissionRoleOpen(false);
    }

        const toggleTaskOpen=()=>{
        setTaskOpen(!taskOpen);
        setDepartmentOpen(false);
        setPermissionOpen(false);
        setDesignationOpen(false);
        setEmployeeOpen(false);
        setAttendanceOpen(false);
        setLeavesTypeOpen(false);
        setLeavesOpen(false);
        setPayrollOpen(false);
        setProjectOpen(false);
        setNotificationOpen(false);
        setPermissionRoleOpen(false);
    }
       const toggleNotificationOpen=()=>{
        setNotificationOpen(!notificationOpen);
        setDepartmentOpen(false);
        setPermissionOpen(false);
        setDesignationOpen(false);
        setEmployeeOpen(false);
        setAttendanceOpen(false);
        setLeavesTypeOpen(false);
        setLeavesOpen(false);
        setPayrollOpen(false);
        setProjectOpen(false);
        setTaskOpen(false);
        setPermissionRoleOpen(false);
    }

         const togglePermissionRoleOpen=()=>{
        setPermissionRoleOpen(!permissionRoleOpen);
        setDepartmentOpen(false);
        setPermissionOpen(false);
        setDesignationOpen(false);
        setEmployeeOpen(false);
        setAttendanceOpen(false);
        setLeavesTypeOpen(false);
        setLeavesOpen(false);
        setPayrollOpen(false);
        setProjectOpen(false);
        setTaskOpen(false);
        setNotificationOpen(false);
    }

    return(
        <>
        {/* <div className="menu-item" style={{background:"white",padding:"10px",boxShadow:"rgb(0,0,0, 0.4) 0px 4px 8px"}}>
                <button onClick={handleLogout} className="btn btn-danger" style={{ width: "10%", marginLeft:"90%"}}><FaSignOutAlt /> Logout</button>
          </div> */}
        
        {sidebarOpen && <div className="sidebar-overlay"></div>}
        <div className={`sidebar ${sidebarOpen ? "Opren" : "close"}`}> 
             
             
            <div className="sidebar-menu">
               
                 <div className="menu-item">
                        <Link to="/admin/adminDashboard" onClick={closeSidebar}><span className="icon"><FaTachometerAlt /></span> Dashboard</Link>
                    </div>

                  <div className="menu-item">
                        <Link to="/admin/view-user" onClick={closeSidebar}><span className="icon"><FaUser /></span> User</Link>
                    </div>

                
                  <div className="menu-item dropdown-toggle" onClick={toggleDepartment}>
                    <Link to="#" onClick={closeSidebar}><span className="icon"><FaBuilding/></span> Department Operation</Link>
                </div>
                {departmentOpen && (
                    <div className="dropdown-context open">
                        <div className="dropdown-item">
                            <Link to={`/admin/add-department`} onClick={closeSidebar}><span className="icon"><FaRegCircle/> </span> Add Department</Link>
                        </div>

                         <div className="dropdown-item">
                            <Link to={`/admin/view-department`} onClick={closeSidebar}><span className="icon"><FaRegCircle/> </span> View Department</Link>
                        </div>
                    </div>
                )}

                
                <div className="menu-item dropdown-toggle" onClick={toggledesignation}>
                    <Link to="#" onClick={closeSidebar}><span className="icon"><FaIdBadge/></span> Designation Operation</Link>
                </div>
                {designationOpen && (
                    <div className="dropdown-context open">
                        <div className="dropdown-item">
                            <Link to={`/admin/add-designation`} onClick={closeSidebar}><span className="icon"><FaRegCircle/> </span> Add Designation</Link>
                        </div>

                         <div className="dropdown-item">
                            <Link to={`/admin/view-designation`} onClick={closeSidebar}><span className="icon"><FaRegCircle/> </span> View Designation</Link>
                        </div>
                    </div>
                )}

                 <div className="menu-item dropdown-toggle" onClick={toggleEmployee}>
                    <Link to="#" onClick={closeSidebar}><span className="icon"><FaRegUserCircle/></span> Employee Operation</Link>
                </div>
                {employeeOpen && (
                    <div className="dropdown-context open">
                        <div className="dropdown-item">
                            <Link to={`/admin/add-employee`} onClick={closeSidebar}><span className="icon"><FaRegCircle/> </span> Add Employee</Link>
                        </div>

                         <div className="dropdown-item">
                            <Link to={`/admin/view-employee`} onClick={closeSidebar}><span className="icon"><FaRegCircle/> </span> View Designation</Link>
                        </div>
                    </div> 
                )}

                <div className="menu-item dropdown-toggle" onClick={toggleAttendance}>
                    <Link to="#" onClick={closeSidebar}><span className="icon"><FaCalendarCheck/></span> Attenance Operation</Link>
                </div>
                {attendanceOpen && (
                    <div className="dropdown-context open">
                        <div className="dropdown-item">
                            <Link to={`/admin/add-attendance`} onClick={closeSidebar}><span className="icon"><FaRegCircle/> </span> Add Employee</Link>
                        </div>

                         <div className="dropdown-item">
                            <Link to={`/admin/view-attendance`} onClick={closeSidebar}><span className="icon"><FaRegCircle/> </span> View Attendance</Link>
                        </div>
                    </div>
                )}


                 <div className="menu-item dropdown-toggle" onClick={toggleLeavesTypeOpen}>
                    <Link to="#" onClick={closeSidebar}><span className="icon"><FaListAlt/></span> Leave Type Operation</Link>
                </div>
                {leavesTypeOpen && (
                    <div className="dropdown-context open">
                        <div className="dropdown-item">
                            <Link to={`/admin/add-leaveType`} onClick={closeSidebar}><span className="icon"><FaRegCircle/> </span> Add Leave Type</Link>
                        </div>

                         <div className="dropdown-item">
                            <Link to={`/admin/view-leaveType`} onClick={closeSidebar}><span className="icon"><FaRegCircle/> </span> View Leaveype</Link>
                        </div>
                    </div>
                )}

                 

                 <div className="menu-item dropdown-toggle" onClick={toggleLeavesOpen}>
                    <Link to="#" onClick={closeSidebar}><span className="icon"><FaCalendarAlt/></span> Leave Operation</Link>
                </div>
                {leavesOpen && (
                    <div className="dropdown-context open">
                        <div className="dropdown-item">
                            <Link to={`/admin/add-leave`} onClick={closeSidebar}><span className="icon"><FaRegCircle/> </span> Add Leave </Link>
                        </div>

                         <div className="dropdown-item">
                            <Link to={`/admin/view-leave`} onClick={closeSidebar}><span className="icon"><FaRegCircle/> </span> View Leave</Link>
                        </div>
                    </div>
                )}


                 <div className="menu-item dropdown-toggle" onClick={togglePayrollOpen}>
                    <Link to="#" onClick={closeSidebar}><span className="icon"><FaMoneyCheckAlt/></span>Payroll Operation</Link>
                </div>
                {payrollOpen && (
                    <div className="dropdown-context open">
                        <div className="dropdown-item">
                            <Link to={`/admin/add-payroll`} onClick={closeSidebar}><span className="icon"><FaRegCircle/> </span> Add Payroll</Link>
                        </div>

                         <div className="dropdown-item">
                            <Link to={`/admin/view-payroll`} onClick={closeSidebar}><span className="icon"><FaRegCircle/> </span> View Payroll</Link>
                        </div>
                    </div>
                )}

                  <div className="menu-item dropdown-toggle" onClick={toggleProjectOpen}>
                    <Link to="#" onClick={closeSidebar}><span className="icon"><FaFolderOpen/></span> Project Operation</Link>
                </div>
                {projectOpen && (
                    <div className="dropdown-context open">
                        <div className="dropdown-item">
                            <Link to={`/admin/add-project`} onClick={closeSidebar}><span className="icon"><FaRegCircle/> </span> Add Project </Link>
                        </div>

                         <div className="dropdown-item">
                            <Link to={`/admin/view-project`} onClick={closeSidebar}><span className="icon"><FaRegCircle/> </span> View Project</Link>
                        </div>
                    </div>
                )}

                 

                 <div className="menu-item dropdown-toggle" onClick={toggleTaskOpen}>
                    <Link to="#" onClick={closeSidebar}><span className="icon"><FaCalendarAlt/></span> Task Operation</Link>
                </div>
                {taskOpen && (
                    <div className="dropdown-context open">
                        <div className="dropdown-item">
                            <Link to={`/admin/add-task`} onClick={closeSidebar}><span className="icon"><FaRegCircle/> </span> Add Task </Link>
                        </div>

                         <div className="dropdown-item">
                            <Link to={`/admin/view-task`} onClick={closeSidebar}><span className="icon"><FaRegCircle/> </span> View Task</Link>
                        </div>
                    </div>
                )}
                
               
                 <div className="menu-item dropdown-toggle" onClick={toggleNotificationOpen}>
                    <Link to="#" onClick={closeSidebar}><span className="icon"><FaBell/></span> Notification Operation</Link>
                </div>
                {notificationOpen && (
                    <div className="dropdown-context open">
                        <div className="dropdown-item">
                            <Link to={`/admin/add-notification`} onClick={closeSidebar}><span className="icon"><FaRegCircle/> </span> Add Notification</Link>
                        </div>

                         <div className="dropdown-item">
                            <Link to={`/admin/view-notification`} onClick={closeSidebar}><span className="icon"><FaRegCircle/> </span> View Notification</Link>
                        </div>
                    </div>
                )}

                 <div className="menu-item dropdown-toggle" onClick={togglePermission}>
                    <Link to="#" onClick={closeSidebar}><span className="icon"><FaUserShield/></span> permission Operation</Link>
                </div>
                {permissionOpen && (
                    <div className="dropdown-context open">
                        <div className="dropdown-item">
                            <Link to={`/admin/add-permission`} onClick={closeSidebar}><span className="icon"><FaRegCircle/> </span> Add Permission</Link>
                        </div>

                         <div className="dropdown-item">
                            <Link to={`/admin/view-permission`} onClick={closeSidebar}><span className="icon"><FaRegCircle/> </span> View Permission</Link>
                        </div>
                    </div>
                )}

                 <div className="menu-item dropdown-toggle" onClick={togglePermissionRoleOpen}>
                    <Link to="#" onClick={closeSidebar}><span className="icon"><FaPersonBooth/></span> Permission Role Operation</Link>
                </div>
                {permissionRoleOpen && (
                    <div className="dropdown-context open">
                        <div className="dropdown-item">
                            <Link to={`/admin/add-permissionRole`} onClick={closeSidebar}><span className="icon"><FaRegCircle/> </span> Add Permission Role</Link>
                        </div>

                         <div className="dropdown-item">
                            <Link to={`/admin/view-permissionRole`} onClick={closeSidebar}><span className="icon"><FaRegCircle/> </span> View Permission Role</Link>
                        </div>
                    </div>
                )}


                
            

            </div>
        </div>

        
        </>
        
    )
}
export default AdminSidebar;