import React,{useState,useEffect} from "react";
import "../style/style.css";
import {useNavigate} from "react-router-dom";
const AddAttendance=()=>{
    const[employee,setEmployee]=useState([]);
    const[employeeId,setEmployeeId]=useState("");
    const[date,setDate]=useState("");
    const[checkIn,setCheckIn]=useState("");
    const[checkOut,setCheckOut]=useState("");
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
            const body={employee_id:employeeId,date:date,check_in:checkIn,check_out:checkOut,status:status};
            const result=await fetch(`http://localhost:4000/api/attendance`,{
                method:"POST",
                headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`},
                body:JSON.stringify(body),
            })
            const data=await result.json();
            if(!result.ok){
                throw new Error(data.message||"Faild to fetch attendance");
            }
            alert("✅ Attendance Add successfully");
            navigate("/admin/view-attendance");
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
        const fetchUser=async()=>{
            try{
                const token=localStorage.getItem("token");
                const result=await fetch(`http://localhost:4000/api/users`,{
                    headers:{Authorization:`Bearer ${token}`},
                    
                })
                const data=await result.json();
                if(!result.ok){
                    throw new Error(data.message||"employee not found");
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
            finally{
                setLoading(false);
            }
        }
        fetchUser();
    },[])

    return(
        <>
        <br/><br/>
        <div className="container">
            <div className="home">
                 {error && <p className="error">{error}</p>}
                <h3 className="title">Add Attendance</h3>
                <form onSubmit={onSubmitForm}>
                       <div className="form-group">
                            <label htmlFor="employeeId">Employee *</label>
                            <select id="employeeId" name="employeeId" required value={employeeId} onChange={(e) =>setEmployeeId(e.target.value)}>
                                <option value="">Select Employee</option>

                                {employee.length > 0 ? (
                                    employee.map((e) => (
                                        <option key={e.user_id} value={e.user_id}>{e.username}</option>))
                                    ) : (
                                    <option disabled>No Employee Available</option>
                                )}
                            </select>
                        </div>

                    <div className="form-group">
                        <label htmlFor="date">Date *</label>
                        <input type="date" name="date" required value={date} onChange={(e)=>setDate(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="checkIn">Check In *</label>
                        <input type="time" name="checkIn" required value={checkIn} onChange={(e)=>setCheckIn(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="checkOut">Check Out *</label>
                        <input type="time" name="checkOut" required value={checkOut} onChange={(e)=>setCheckOut(e.target.value)} />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="status">Status *</label>
                        <input type="text" name="status" placeholder="Enter..." required value={status} onChange={(e)=>setStatus(e.target.value)} />
                    </div>
                    <br/>
                    <button type="submit"  className="btn1">Add</button>

                    

                </form>
            </div>
        </div>
        </>
    )
}
export default AddAttendance;