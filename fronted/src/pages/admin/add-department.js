import React,{useState} from "react";
import "../style/style.css";
import { useNavigate } from 'react-router-dom';
const AddDepartment=()=>{
    const[departmentName,setDepartmentName]=useState("");
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState(null);
    const navigate=useNavigate();
    const onSubmitForm=async(e)=>{
        e.preventDefault();
        setLoading(true);
        setError(null);
        try{
            const body={department_name:departmentName};
            const token=localStorage.getItem("token");
            const reuslt=await fetch(`http://localhost:4000/api/department`,{
                method:"POST",
                headers:{"Content-Type":"application/json",Authorization: `Bearer ${token}`},
                body:JSON.stringify(body),
            })
            const data=await reuslt.json();
            if(!reuslt.ok){
                throw new Error(data.message||"Faild to fetch department");
            }
            alert("✅ Add Department Succesfully");
            navigate("/admin/view-department");
        }
        catch(err){
            console.error(err);
            setError(err.message);
        }
        finally{
            setLoading(false)
        }
    }
    return(
        <>
        <br/><br/><br/>
        <div className="container">
            <div className="home">
                {error && <p className="error">{error}</p>}
                <h3 className="title">Add Department</h3>
                <form onSubmit={onSubmitForm}>
                    <div className="form-group">
                        <label htmlFor="departmentName">Department Name *</label>
                        <input type="text" name="departmentName" required placeholder="Enter..." value={departmentName} onChange={(e)=>setDepartmentName(e.target.value)}/>
                    </div>
                    <br/>
                    <button type="submit" className="btn1">Add</button>
                </form>
            </div>
        </div>
        </>
    )
}
export default AddDepartment;