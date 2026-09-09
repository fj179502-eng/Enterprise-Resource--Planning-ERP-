import React,{useState,useEffect} from "react";
import "../style/style.css";
import {useNavigate} from "react-router-dom";
const AddDesignation=()=>{
    const[department,setDepartment]=useState([]);
    const[designationName,setrDesignationName]=useState("");
    const[departmentId,setDepartmentId]=useState("");
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState(null);
    const navigate=useNavigate();
    const onSubmitForm=async(e)=>{
        e.preventDefault();
        setLoading(true);
        setError(null);
        try{
            const body={designation_name:designationName,department_id:departmentId};
            const token=localStorage.getItem("token");
            const result=await fetch(`http://localhost:4000/api/designation`,{
                method:"POST",
                headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`},
                body:JSON.stringify(body),
            })
            const data=await result.json();
            if(!result.ok){
                throw new Error(data.message||"Faild to fetch designation");
            }
            alert("✅ Desgination Add Successfully");
            navigate("/admin/view-designation");
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
        const fetchDepartment=async()=>{
            try{
                const token=localStorage.getItem("token");
                const result=await fetch(`http://localhost:4000/api/department`,{
                    headers:{Authorization:`Bearer ${token}`},
                })
                const data=await result.json();
                if(!result.ok){
                    throw new Error(data.message||"Faild to fetch Department");
                }
                if(Array.isArray(data)){
                    setDepartment(data);
                }
                else if(Array.isArray(data.data)){
                    setDepartment(data.data);
                }
                else{
                    setDepartment([]);
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
        fetchDepartment();
    },[])
    

    return(
        <>
        <br/><br/>
        <div className="container">
            <div className="home">
                {error && <p className="error">{error}</p>}
                <h3 className="title">Add Designation</h3>
                <form onSubmit={onSubmitForm}>
                    <div className="form-group">
                        <label htmlFor="desginationName">Designation Name *</label>
                        <input type="text" name="designationName" required placeholder="Enter..." value={designationName} onChange={(e)=>setrDesignationName(e.target.value)}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="departmentId">Department *</label>
                        <select id="depatmentId" name="departmentId" value={departmentId} onChange={(e)=>setDepartmentId(e.target.value)}>
                            <option value="">Select</option>
                            {department.length>0 ? (
                                department.map((d)=>(
                                    <option key={d.department_id} value={d.department_id}>{d.department_name}</option>
                                ))
                            ):(
                              <option disabled>No Department Available</option>
                            )}
                        </select>
                    </div>
                    <br/>
                    <button type="submit" className="btn1">Add</button>
        
                </form>
            </div>
        </div>
        </>
    )
}
export default AddDesignation;