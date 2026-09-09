import React, { useState } from "react"
import "../style/style.css";
import { useNavigate } from "react-router-dom";
const AddLeaveType=()=>{
    const[leaveName,setLeaveName]=useState("");
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState(null);
    const navigate=useNavigate();

    const onSubmitForm=async(e)=>{
         e.preventDefault();
        setLoading(true);
        setError(null);
        try{
            const token=localStorage.getItem("token");
            const body={leave_name:leaveName};
            const result=await fetch(`http://localhost:4000/api/leaveType`,{
                method:"POST",
                headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`},
                body:JSON.stringify(body),
            })                           
            const data=await result.json();
            if(!result.ok){
                throw new Error(data.message||"Faild to fetch leave type");
            }
            alert("✅ Leave Type add successfully");
            navigate("/admin/view-leaveType");
        }
        catch(err){
            console.error(err);
            setError(err.message);
        }
        finally{
            setLoading(false);
        }
    }

    return(
        <>
        <br/><br/>
        <div className="container">
            <div className="home">
                {error && <p className="error">{error}</p>}
                <h3 className="title">Add Leave Type</h3>
                <form onSubmit={onSubmitForm}>
                    <div className="form-group">
                        <label htmlFor="leaveName">Leave Name *</label>
                        <input type="text" name="leaveType" required placeholder="Enter..." value={leaveName} onChange={(e)=>setLeaveName(e.target.value)} />
                    </div>
                    <br/>
                    <button type="submit" className="btn1">Add</button>
                </form>
            </div>
        </div>
        </>
    )
}
export default AddLeaveType;