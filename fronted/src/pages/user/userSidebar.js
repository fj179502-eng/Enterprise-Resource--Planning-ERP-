import React,{useState,useContext} from "react";
import "../style/style.css";
import {FaTachometerAlt ,FaRegUserCircle,FaCalendarCheck,FaListAlt,FaCalendarAlt,FaRegCircle,FaMoneyCheckAlt,FaFolderOpen,FaBell,FaUserShield,FaPersonBooth} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
const UserSidebar=({sidebarOpen,setSidebarOpen})=>{
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
    
     const[leavesOpen,setLeavesOpen]=useState("");

        const toggleLeavesOpen=()=>{
        setLeavesOpen(!leavesOpen);
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
                        <Link to="/user/userDashboard" onClick={closeSidebar}><span className="icon"><FaTachometerAlt /></span> Dashboard</Link>
                    </div>

                  <div className="menu-item">
                    <Link to="/user/view-employee" onClick={closeSidebar}><span className="icon"><FaRegUserCircle /></span> User</Link>
                </div>
                 <div className="menu-item">
                    <Link to="/user/view-attendance" onClick={closeSidebar}><span className="icon"><FaCalendarCheck /></span> Attendance</Link>
                </div>
                 <div className="menu-item">
                    <Link to="/user/view-leaveType" onClick={closeSidebar}><span className="icon"><FaListAlt /></span> Leave Type</Link>
                </div>

                 <div className="menu-item dropdown-toggle" onClick={toggleLeavesOpen}>
                                    <Link to="#" onClick={closeSidebar}><span className="icon"><FaCalendarAlt/></span> Leave Operation</Link>
                                </div>
                                {leavesOpen && (
                                    <div className="dropdown-context open">
                                        <div className="dropdown-item">
                                            <Link to={`/user/add-leave`} onClick={closeSidebar}><span className="icon"><FaRegCircle/> </span> Add Leave </Link>
                                        </div>
                
                                         <div className="dropdown-item">
                                            <Link to={`/user/view-leave`} onClick={closeSidebar}><span className="icon"><FaRegCircle/> </span> View Leave</Link>
                                        </div>
                                    </div>
                                )}

                              <div className="menu-item">
                                <Link to="/user/view-payroll" onClick={closeSidebar}><span className="icon"><FaMoneyCheckAlt /></span> PayRoll</Link>
                            </div>

                              <div className="menu-item">
                                <Link to="/user/view-project" onClick={closeSidebar}><span className="icon"><FaFolderOpen /></span> Project</Link>
                            </div>
                             <div className="menu-item">
                                <Link to="/user/view-notification" onClick={closeSidebar}><span className="icon"><FaBell /></span> Notification</Link>
                            </div>
                            <div className="menu-item">
                                <Link to="/user/view-permission" onClick={closeSidebar}><span className="icon"><FaUserShield/></span> Permission</Link>
                            </div>

                              <div className="menu-item">
                                <Link to="/user/view-permissionRole" onClick={closeSidebar}><span className="icon"><FaPersonBooth/></span> Permission Role</Link>
                            </div>

                
                 

            </div>
        </div>

        
        </>
        
    )
}
export default UserSidebar;