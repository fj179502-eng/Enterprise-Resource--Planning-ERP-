import React,{useState,useEffect} from "react";
import "../style/style.css";
import {Link} from "react-router-dom";

const ViewAttendance1=()=>{
    const[employee,setEmployee]=useState([]);
    const[attendance,setAttendance]=useState([]);
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState(null);

    useEffect(()=>{
        const fetchAttendance=async()=>{
            try{
                const token=localStorage.getItem("token");
                const result=await fetch(`http://localhost:4000/api/attendance`,{
                    headers:{Authorization:`Bearer ${token}`},
                })
                const data=await result.json();
                if(!result.ok){
                    throw new Error(data.message||"Faild to fetch atendance");
                }
                if(Array.isArray(data)){
                    setAttendance(data);
                }
                else if(Array.isArray(data.data)){
                    setAttendance(data.data);
                }
                else{
                    setAttendance([]);
                }
            }
            catch(err){
                console.error(err);
                setError(err.message);
            }
        }
        fetchAttendance();
    },[]);

     useEffect(()=>{
        const fetchEmployee=async()=>{
            try{
                const token=localStorage.getItem("token");
                const result=await fetch(`http://localhost:4000/api/users`,{
                    headers:{Authorization:`Bearer ${token}`},
                })
                const data=await result.json();
                if(!result.ok){
                    throw new Error(data.message||"Faild to fetch Employee");
                }
                if(Array.isArray(data)){
                    setEmployee(data);
                }
                else if(Array.isArray(data.data)){
                    setEmployee(data.data);
                }
                else{
                    setEmployee([]);
                }
            }
            catch(err){
                console.error(err);
                setError(err.message);
            }
        }
        fetchEmployee();
    },[]);

    const deleteAttendance=async(id)=>{
        if(!window.confirm("Are you sure you went to delete the attendance")) return;
        try{
            const token=localStorage.getItem("token");
            const result=await fetch(`http://localhost:4000/api/attendance/${id}`,{
                method:"DELETE",
                headers:{Authorization:`Bearer ${token}`},
            })
            const data=await result.json();
            if(!result.ok){
                throw new Error(attendance.message||"attendance delete faild");
            }
            alert("✅ Attendance delete successfully");
            setAttendance(prev=>prev.filter(att=>String(att.attendance_id) !==String(id)));
        }
        catch(err){
            console.error(err);
            setError(err.message);
        }
    }

    return(
        <>
        <br/><br/>
        <div className="container">
            <div className="home1">
                {error && <p className="error">{error}</p>}
                <h3 className="title">View Attendance</h3>
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>Sno#</th>
                            <th>Employee</th>
                            <th>Date</th>
                            <th>Check In</th>
                            <th>Check Out</th>
                            <th>Status</th>
                         
                        </tr>
                    </thead>
                    <tbody>
                        {attendance.length===0 ? (
                            <tr>
                                <td colSpan="8" align="center">Data is not found</td>
                            </tr>
                        ):(
                            attendance.map((att,index)=>{
                                return(
                                    <tr key={att.attendance_id}>
                                        <td>{index+1}</td>
                                        <td>{
                                            employee.find(e=>e.user_id===att.employee_id)?.username||"N/a"
                                            }</td>
                                         <td>{att.date}</td>
                                         <td>{att.check_in}</td>
                                         <td>{att.check_out}</td>
                                         <td>{att.status}</td>
                                       

                                    </tr>
                                )
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
}
export default ViewAttendance1;