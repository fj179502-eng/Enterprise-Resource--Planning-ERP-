import React, { useEffect, useState } from "react"
import "../style/style.css";
import { Link } from "react-router-dom";
const ViewLeaveType=()=>{
    const[leaveType,setLeaveType]=useState([]);
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState(null);

    useEffect(()=>{
        const fetchLeaveType=async()=>{
            try{
                const token=localStorage.getItem("token");
                const result=await fetch(`http://localhost:4000/api/leaveType`,{
                headers:{Authorization:`Bearer ${token}`},
            })
                const data=await result.json();
                if(!result.ok){
                    throw new Error(data.message||"Faild to fetch leave type");
                }
                if(Array.isArray(data)){
                    setLeaveType(data);
                }
                else if(Array.isArray(data.data)){
                    setLeaveType(data.data);
                }
                else{
                    setLeaveType([]);
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

     const deleteLeaveType=async(id)=>{
        if(!window.confirm("Are you sure you went to delete the leave type")) return ;
        try{
            const token=localStorage.getItem("token");
            const result=await fetch(`http://localhost:4000/api/leaveType/${id}`,{
                method:"DELETE",
                headers:{Authorization:`Bearer ${token}`},
            })
            const data=await result.json();
            if(!result.ok){
                throw new Error(data.message||"leave delete faild");
            }
            alert("✅ leave type delete successfully");
            setLeaveType(prev=>prev.filter(it=>String(it.leave_type_id) !==String(id)));
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
                <h3 className="title">View Leave Type</h3>
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>Sno#</th>
                            <th>Leave Name</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                          {leaveType.length===0 ? (
                            <tr>
                                <td colSpan="8" align="center">Data is not found</td>
                            </tr>
                          ):(
                            leaveType.map((it,index)=>{
                                return(
                                    <tr key={it.leave_type_id}>
                                        <td>{index+1}</td>
                                        <td>{it.leave_name}</td>
                                        <td>
                                            <Link to={`/admin/update-leaveType/${it.leave_type_id}`} className="btn btn-success" >Edit</Link> &nbsp;
                                            <button onClick={() => deleteLeaveType(it.leave_type_id)} className="btn btn-danger">Delete</button>
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
export default ViewLeaveType;