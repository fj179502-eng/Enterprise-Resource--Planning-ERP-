import React,{useState,useEffect} from "react";
import "../style/style.css";
import {useNavigate,useParams} from "react-router-dom";
const UpdateAttendance=()=>{
    const{id}=useParams();
    const[employee,setEmployee]=useState([]);
    const[employeeId,setEmployeeId]=useState("");
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState(null);
    const[formData,setFormData]=useState({employee_id:"",date:"",check_in:"",chechk_out:"",status:""});
    const navigate=useNavigate();

   useEffect(()=>{
    const fetchAttendance=async()=>{
        try{
            const token=localStorage.getItem("token");
            const reuslt=await fetch(`http://localhost:4000/api/attendance/${id}`,{
                headers:{Authorization:`Bearer ${token}`},
            })
            const data=await reuslt.json();
            if(!reuslt.ok){
                throw new Error(data.message||"Faild to fetch Attendance");
            }
            setFormData({
                employee_id:data.employee_id||"",
                date: data.date?.split("T")[0] || "",
                check_in:data.check_in||"",
                check_out:data.check_out||"",
                status:data.status||""
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
    fetchAttendance();
   },[id]);

   const handleEditChange=async(e)=>{
    const{name,value}=e.target;
    setFormData(prev=>({...prev,[name]:value}));
   }

   const UpdateAttendance = async (e) => {
    e.preventDefault();

    try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token");

        const result = await fetch(`http://localhost:4000/api/attendance/${id}`,{
                method: "PUT",
                headers: {"Content-Type": "application/json",Authorization: `Bearer ${token}`,},
                body: JSON.stringify(formData),
            });
        const data = await result.json();

        if (!result.ok) {
            throw new Error(
                data.message || "Attendance update failed"
            );
        }

        alert("✅ Attendance Updated Successfully");
        navigate("/admin/view-attendance");

    } catch (err) {
        console.error(err);
        setError(err.message);
    } finally {
        setLoading(false);
    }
};
    

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
    },[]);

    return(
        <>
        <br/><br/>
        <div className="container">
            <div className="home">
                 {error && <p className="error">{error}</p>}
                <h3 className="title">Update Attendance</h3>
                <form onSubmit={UpdateAttendance}>
                       <div className="form-group">
                            <label htmlFor="employee_id">Employee *</label>
                            <select id="employee_id" name="employee_id" required value={formData.employee_id} onChange={handleEditChange}>
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
                        <input type="date" name="date" required value={formData.date} onChange={handleEditChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="check_in">Check In *</label>
                        <input type="time" name="check_in" required value={formData.check_in} onChange={handleEditChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="check_out">Check Out *</label>
                        <input type="time" name="check_out" required value={formData.check_out} onChange={handleEditChange} />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="status">Status *</label>
                        <input type="text" name="status" required value={formData.status} onChange={handleEditChange} />
                    </div>
                    <br/>
                    <button type="submit"  className="btn1">Update</button>

                    

                </form>
            </div>
        </div>
        </>
    )
}
export default UpdateAttendance;