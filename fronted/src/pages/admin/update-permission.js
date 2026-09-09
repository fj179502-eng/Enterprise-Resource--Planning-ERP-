import React,{useState,useEffect} from "react";
import "../style/style.css";
import { useNavigate,useParams } from "react-router-dom";

const UpdatePermission=()=>{
    const{id}=useParams();
    const[permissionName,setPermissionName]=useState("");
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState(null);
    const navigate=useNavigate();
    const[formData,setFormData]=useState({permission_name:""});

    useEffect(()=>{
        const fetchPermission=async()=>{
            try{
                const token=localStorage.getItem("token");
               const result=await fetch(`http://localhost:4000/api/permission/${id}`,{
                headers:{Authorization:`Bearer ${token}`},
            })
                const data=await result.json();
                if(!result.ok){
                    throw new Error(data.message||"Faild to fetch permission");
                }
                setFormData({
                    permission_name:data.permission_name||"",
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
        fetchPermission();
    },[id]);

    const handleEditChange=async(e)=>{
        const{name,value}=e.target;
        setFormData(prev=>({...prev,[name]:value}));
    }

    const UpdatePermission=async(e)=>{
        e.preventDefault();
        setLoading(true);
        setError(null);
        try{
            const token=localStorage.getItem("token");
            const result=await fetch(`http://localhost:4000/api/permission/${id}`,{
                method:"PUT",
                headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`},
                body:JSON.stringify(formData),
            })
            const data=await result.json();
            if(!result.ok){
                throw new Error(data.message||"Permission Update Faild");
            }
            alert("✅ Permission Update Succesfully");
            navigate("/admin/view-permission");
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
                <h3 className="title">Update Permission</h3>
                <form onSubmit={UpdatePermission}>
                    <div className="form-group">
                        <label htmlFor="permission_name">Permission Name *</label>
                        <input type="text" name="permission_name" required value={formData.permission_name} onChange={handleEditChange} />
                    </div>
                    <br/>
                    <button type="submit" className="btn1"> Update</button>
                </form>
            </div>
        </div>
        </>
    )
}
export default UpdatePermission;