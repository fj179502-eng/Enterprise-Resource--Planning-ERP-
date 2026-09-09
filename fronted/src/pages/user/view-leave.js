import React,{useState,useEffect} from "react";
import "../style/style.css";
import {Link} from 'react-router-dom';
const ViewLeave1=()=>{
    const[leave,setLeave]=useState([]);
    const[employee,setEmployee]=useState([]);
    const[leaveType,setLeaveType]=useState([]);
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState(null);

   useEffect(()=>{
    const fetchLeave=async()=>{
        try{
            const token=localStorage.getItem("token");
            const result=await fetch(`http://localhost:4000/api/leave`,{
                headers:{Authorization:`Bearer ${token}`},
            })
            const data=await result.json();
            if(!result.ok){
                throw new Error(data.message||"Faild to fetch leave");
            }
            if(Array.isArray(data)){
                setLeave(data);
            }
            else if(Array.isArray(data.data)){
                setLeave(data.data);
            }
            else{
                setLeave([]);
            }
        }
        catch(err){
            console.error(err);
            setError(err.message);
        }
        finally{
            setLoading(false);
        }
    }
    fetchLeave();
   },[])

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
                    setEmployee([])
                }
            }
            catch(err){
                console.error(err);
                setError(err.message);
            }
            finally{
                setLoading(false);
            }
        }
        fetchEmployee();
    },[]);

     useEffect(()=>{
        const fetchLeaveType=async()=>{
            try{
                const token=localStorage.getItem("token");
                const result=await fetch(`http://localhost:4000/api/leaveType`,{
                    headers:{Authorization:`Bearer ${token}`},
                })
                const data=await result.json();
                if(!result.ok){
                    throw new Error(data.message||"Faild to fetch LeaveType");
                }
                if(Array.isArray(data)){
                    setLeaveType(data);
                }
                else if(Array.isArray(data.data)){
                    setLeaveType(data.data);
                }
                else{
                    setLeaveType([])
                }
            }
            catch(err){
                console.error(err);
                setError(err.message);
            }
            finally{
                setLoading(false);
            }
        }
        fetchLeaveType();
    },[]);

    const deleteLeave=async(id)=>{
        if(!window.confirm("Are you sure you went to delete the leave")) return;
        try{
            const token=localStorage.getItem("token");
            const result=await fetch(`http://localhost:4000/api/leave/${id}`,{
                method:"DELETE",
                headers:{Authorization:`Bearer ${token}`},
            })
            const data=await result.json();
            if(!result.ok){
                throw new Error(data.message||"leave delete faild");
            }
            alert("✅ Leave delete successfully");
            setLeave(prev=>prev.filter(l=>String(l.leave_id) !==String(id)));
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
                <h3 className="title">View Leave</h3>
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>Sno#</th>
                            <th>Employee</th>
                            <th>Leave Type</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Status</th>
                            <th>Reason</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {leave.length===0 ? (
                        <tr>
                            <td colSpan="7" align="center">Data is not found</td>
                        </tr>
                    ):(
                        leave.map((l,index)=>{
                            return(
                                <tr key={l.leave_id}>
                                    <td>{index+1}</td>
                                   <td>{
                                            employee.find(e=>e.user_id===l.employee_id)?.username||"N/a"
                                        }
                                    </td>

                                      <td>{
                                            leaveType.find(lt=>lt.leave_type_id===l.leave_type_id)?.leave_name||"N/a"
                                        }
                                    </td>
                                    <td>{l.start_date}</td>
                                    <td>{l.end_date}</td>
                                    <td>{l.reason}</td>
                                    <td>{l.status}</td>
                                    <td>
                                        <Link to={`/user/update-leave/${l.leave_id}`} className="btn btn-success">Edit</Link> &nbsp;
                                        <button onClick={()=>deleteLeave(l.leave_id)} className="btn btn-danger">Delete</button>
                                    </td>
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
export default ViewLeave1;   