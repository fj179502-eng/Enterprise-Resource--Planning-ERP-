import React,{useState,useEffect} from "react";
import "../style/style.css";
import { useNavigate, useParams } from 'react-router-dom';
const UpdateLeave1=()=>{
    const{id}=useParams();
    const[employeeId,setEmployeeId]=useState("");
    const[employee,setEmployee]=useState([]);
    const[leaveTypeId,setLeaveTypeId]=useState("");
    const[leaveType,setLeaveType]=useState([]);
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState(null);
    const navigate=useNavigate();
    const[formData,setFormData]=useState({employee_id:"",leave_type_id:"",start_date:"",end_date:"",reason:"",status:""});

    useEffect(()=>{
        const fetchLeave=async()=>{
            try{
                const token=localStorage.getItem("token");
                const result=await fetch(`http://localhost:4000/api/leave/${id}`,{
                    headers:{Authorization:`Bearer ${token}`},
                })
                const data=await result.json();
                if(!result.ok){
                    throw new Error(data.message||"Faild to fetch leave");
                }
                setFormData({
                    employee_id:data.employee_id||"",
                    leave_type_id:data.leave_type_id||"",
                    start_date: data.start_date?.split("T")[0] || "",
                    end_date: data.end_date?.split("T")[0] || "",
                    reason:data.reason||"",
                    status:data.status||"",
                })
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
    },[id]);

    const handleEditChange=async(e)=>{
        const{name,value}=e.target;
        setFormData(prev=>({...prev,[name]:value}));
    }
    const UpdateLeave=async(e)=>{
        e.preventDefault();
        setLoading(true);
        setError(null);
        try{
            const token=localStorage.getItem("token");
            const result=await fetch(`http://localhost:4000/api/leave/${id}`,{
                method:"PUT",
                headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`},
                body:JSON.stringify(formData),
            })
            const data=await result.json();
            if(!result.ok){
                throw new Error(data.message||"Leave Update faild");
            }
            alert("✅ Leave Update Successfully");
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
                <h3 className="title">Update Leave</h3>

                <form onSubmit={UpdateLeave}>
                    <div className="form-group">
                        <label htmlFor="employee_id">Employee *</label>
                        <select name="employee_id" id="employee_id" required value={formData.employee_id} onChange={handleEditChange}>
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
                        <label htmlFor="leave_type_id">Leave Type *</label>
                        <select name="leave_type_id" id="leave_type_id" required value={formData.leave_type_id} onChange={handleEditChange}>
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
                        <label htmlFor="start_date"> Start Date *</label>
                        <input type="date" name="start_date" required value={formData.start_date} onChange={handleEditChange} />
                    </div>

                     <div className="form-group">
                        <label htmlFor="end_date"> End Date *</label>
                        <input type="date" name="end_date" required value={formData.end_date} onChange={handleEditChange} />
                    </div>

                     <div className="form-group">
                        <label htmlFor="reason"> Reason *</label>
                        <textarea name="reason" placeholder="Enter..." required value={formData.reason} onChange={handleEditChange}></textarea>
                    </div>

                     <div className="form-group">
                        <label htmlFor="status"> Status *</label>
                        <input type="text" name="status" placeholder="Enter..." required value={formData.status} onChange={handleEditChange} />
                    </div>
                    <br/>
                    <button type="submit" className="btn1">Update</button>

                </form>

            </div>
        </div>
        </>
    )
}
export default UpdateLeave1;