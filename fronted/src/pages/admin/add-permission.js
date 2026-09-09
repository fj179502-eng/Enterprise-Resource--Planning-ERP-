import React,{useState,useEffect} from "react";
import "../style/style.css";
import { useNavigate } from "react-router-dom";

const AddPermission=()=>{
    const[permissionName,setPermissionName]=useState("");
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState(null);
    const navigate=useNavigate();

    const onSubmitForm=async(e)=>{
        e.preventDefault();
        setLoading(true);
        setError(null);
        try{
            const body={permission_name:permissionName};
            const token=localStorage.getItem("token");
            const result=await fetch(`http://localhost:4000/api/permission`,{
                method:"POST",
                headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`},
                body:JSON.stringify(body),
            })
            const data=await result.json();
            if(!result.ok){
                throw new Error(data.message||"Faild to fetch permission");
            }
            alert("✅ Permission Add Succesfully");
            navigate("/admin/view-permission");
        }
        catch(err){
            console.error(err);
            setError(err.mesage);
        }
    }

    return(
        <>
        <br/><br/>
        <div className="container">
            <div className="home">
                {error && <p className="error">{error}</p>}
                <h3 className="title">Add Permission</h3>
                <form onSubmit={onSubmitForm}>
                    <div className="form-group">
                        <label htmlFor="permissionName">Permission Name *</label>
                        <input type="text" name="permissionName" required placeholder="Enter..." value={permissionName} onChange={(e)=>setPermissionName(e.target.value)} />
                    </div>
                    <br/>
                    <button type="submit" className="btn1"> Add</button>
                </form>
            </div>
        </div>
        </>
    )
}
export default AddPermission;