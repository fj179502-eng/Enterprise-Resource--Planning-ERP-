import React,{useState,useEffect} from "react";
import "../style/style.css";
import { useNavigate ,useParams} from 'react-router-dom';
const UpdateDepartment=()=>{
    const{id}=useParams();
    
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState(null);
    const navigate=useNavigate();

    const [formData,setFormData]=useState({department_name:""});

     useEffect(()=>{
            const fetchDepartment=async()=>{
                try{
                    const token=localStorage.getItem("token");
                    const result=await fetch(`http://localhost:4000/api/department/${id}`,{
                        headers:{Authorization:`Bearer ${token}`},
                    })
                    const data=await result.json();
                    if(!result.ok){
                        throw new Error(data.message||"Faild to fetch Department");
                    }
                   setFormData({
                    department_name: data.department_name || ""
                });
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
        },[id]);

        const handleEditChange=async(e)=>{
            const{name,value}=e.target;
            setFormData(prev=>({...prev,[name]:value}));
        }

    const updateDepartment=async(e)=>{
        e.preventDefault();
        setLoading(true);
        setError(null);
        try{

            const token=localStorage.getItem("token");
            const reuslt=await fetch(`http://localhost:4000/api/department/${id}`,{
                method:"PUT",
                headers:{"Content-Type":"application/json",Authorization: `Bearer ${token}`},
                body:JSON.stringify(formData),
            })
            const data=await reuslt.json();
            if(!reuslt.ok){
                throw new Error(data.message||"Faild to fetch department");
            }
            alert("✅ Update Department Succesfully");
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
                <h3 className="title">Update Department</h3>
                <form onSubmit={updateDepartment}>
                    <div className="form-group">
                        <label htmlFor="department_name">Department Name *</label>
                        <input type="text" name="department_name" required value={formData.department_name} onChange={handleEditChange}/>
                    </div>
                    <br/>
                    <button type="submit" className="btn btn-success btn1">Update</button>
                </form>
            </div>
        </div>
        </>
    )
}
export default UpdateDepartment;