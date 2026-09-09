import React,{useState,useEffect} from "react";
import "../style/style.css";
import { useNavigate } from 'react-router-dom';
const AddLeave1=()=>{
    const[employeeId,setEmployeeId]=useState("");
    const[employee,setEmployee]=useState([]);
    const[leaveTypeId,setLeaveTypeId]=useState("");
    const[leaveType,setLeaveType]=useState([]);
    const[startDate,setStartDate]=useState("");
    const[endDate,setEndDate]=useState("");
    const[reason,setReason]=useState("");
    const[status,setStatus]=useState("");
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState(null);
    const navigate=useNavigate();

    const onSubmitForm=async(e)=>{
        e.preventDefault();
        setLoading(true);
        setError(null);
        try{
            const token=localStorage.getItem("token");
            const body={employee_id:employeeId,leave_type_id:leaveTypeId,start_date:startDate,end_date:endDate,reason:reason,status:status};
            const result=await fetch(`http://localhost:4000/api/leave`,{
                method:"POST",
                headers:{"Content-Type": "application/json",Authorization:`Bearer ${token}`},
                body:JSON.stringify(body),
            })
            const data=await result.json();
            if(!result.ok){
                throw new Error(data.message||"Faild to fetch leave");
            }
            alert("✅ Add Leave Successfully");
            navigate("/user/view-leave");
        }
        catch(err){ 
            console.error(err);
            setError(err.message);
        }
        finally{
            setLoading(false);
        }
    }

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

    return(
        <>
        <br/><br/>
        <div className="container">
            <div className="home">
                {error && <p className="error">{error}</p>}
                <h3 className="title">Add Leave</h3>

                <form onSubmit={onSubmitForm}>
                    <div className="form-group">
                        <label htmlFor="employeeId">Employee *</label>
                        <select name="employeeId" id="employeeId" required value={employeeId} onChange={(e)=>setEmployeeId(e.target.value)}>
                            <option value="">Select</option>
                            {employee.length>0 ? (
                                employee.map((e)=>(
                                    <option key={e.user_id} value={e.user_id}>{e.username}</option>
                                ))
                            ):(
                                <option disabled>Employee Not Found</option>
                            )}
                        </select>
                    </div>

                       <div className="form-group">
                        <label htmlFor="leavetypeId">Leave Type *</label>
                        <select name="leaveTypeId" id="leaveTypeId" required value={leaveTypeId} onChange={(e)=>setLeaveTypeId(e.target.value)}>
                            <option value="">Select</option>
                            {leaveType.length>0 ? (
                                leaveType.map((lt)=>(
                                    <option key={lt.leave_type_id} value={lt.leave_type_id}>{lt.leave_name}</option>
                                ))
                            ):(
                                <option disabled>Leave Type Not Found</option>
                            )}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="startDate"> Start Date *</label>
                        <input type="date" name="startdate" required value={startDate} onChange={(e)=>setStartDate(e.target.value)} />
                    </div>

                     <div className="form-group">
                        <label htmlFor="endDate"> End Date *</label>
                        <input type="date" name="enddate" required value={endDate} onChange={(e)=>setEndDate(e.target.value)} />
                    </div>

                     <div className="form-group">
                        <label htmlFor="reason"> Reason *</label>
                        <textarea name="reason" placeholder="Enter..." required value={reason} onChange={(e)=>setReason(e.target.value)}></textarea>
                    </div>

                     <div className="form-group">
                        <label htmlFor="status"> Status *</label>
                        <input type="text" name="status" placeholder="Enter..." required value={status} onChange={(e)=>setStatus(e.target.value)} />
                    </div>
                    <br/>
                    <button type="submit" className="btn1">Add</button>

                </form>

            </div>
        </div>
        </>
    )
}
export default AddLeave1;