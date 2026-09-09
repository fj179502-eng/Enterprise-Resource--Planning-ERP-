import React,{useState,useEffect} from "react";
import "../style/style.css";
import { useNavigate, useParams } from 'react-router-dom';
const UpdateProject=()=>{
    const{id}=useParams();
    const[manager,setManager]=useState([]);
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState(null);
    const navigate=useNavigate();
    const[formData,setFormData]=useState({project_name:"",description:"",start_date:"",end_date:"",status:"",manager_id:""});

 useEffect(()=>{

    const fetchProject=async()=>{
        try{
            const token=localStorage.getItem("token");
            const result=await fetch(`http://localhost:4000/api/project/${id}`,{
                headers:{Authorization:`Bearer ${token}`}
            })
            const data=await result.json();
            if(!result.ok){
                throw new Error(data.message||"Faild to fetch project");
            }
            setFormData({
                project_name:data.project_name||"",
                description:data.description||"",
                start_date: data.start_date?.split("T")[0] || "",
                 end_date: data.end_date?.split("T")[0] || "",
                status:data.status||"",
                manager_id:data.manager_id||"",
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
    fetchProject();
 },[id]);
 
const handleEditChange = (e) => {
     const { name, value } = e.target;
     setFormData(prev => ({...prev,[name]: value}));
};

 const updateProject=async(e)=>{
    e.preventDefault();
    setLoading(true);
    setError(null);
    try{
        const token=localStorage.getItem("token");
        const result=await fetch(`http://localhost:4000/api/project/${id}`,{
            method:"PUT",
            headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`},
            body:JSON.stringify(formData), 
        })
        const data=await result.json();
        if(!result.ok){
            throw new Error(data.message||"Project Update faild");
        }
        alert("✅ Project Update Successfully");
        navigate("/admin/view-project");
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
                throw new Error(data.message||"Faild to fetch Manager");
            }
            if(Array.isArray(data)){
                setManager(data);
            }
            else if(Array.isArray(data.data)){
                setManager(data.data);
            }
            else{
                setManager([]);
            }
        }
        catch(err){
            console.error(err.message);
        }
        finally{
            setLoading(false);
        }
        }
        fetchEmployee();
    },[]);

    return(
        <>
        <br/><br/>
        <div className="container">
            <div className="home">
                 {error && <p className="error">{error}</p>}
                <h3 className="title">Update Project</h3>
                <form onSubmit={updateProject}>
                    <div className="form-group">
                        <label htmlFor="project_name"> Project Name *</label>
                        <input type="text" name="project_name" required value={formData.project_name} onChange={handleEditChange} />
                    </div>

                     <div className="form-group">
                        <label htmlFor="description"> Description *</label>
                        <input type="text" name="description" required  value={formData.description} onChange={handleEditChange} />
                    </div>

                     <div className="form-group">
                        <label htmlFor="start_date"> Start Date *</label>
                        <input type="date" name="start_date" required  value={formData.start_date} onChange={handleEditChange} />
                    </div>

                     <div className="form-group">
                        <label htmlFor="end_date"> End Date *</label>
                        <input type="date" name="end_date" required  value={formData.end_date} onChange={handleEditChange} />
                    </div>

                     <div className="form-group">
                        <label htmlFor="status"> Status *</label>
                        <input type="text" name="status" placeholder="Enter..." required  value={formData.status} onChange={handleEditChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="manager_id"> Manager *</label>
                        <select id="manager_id" name="manager_id" required value={formData.manager_id} onChange={handleEditChange}>
                            <option value="">Select</option>
                            {manager.length>0 ? (
                                manager.map((m)=>(
                                    <option key={m.user_id} value={m.user_id}>{m.username}</option>
                                ))
                            ):(
                                <option>No Manager is Available</option>
                            )}                            
                        </select>
                    </div>
                    <br/>
                    <button type="submit" className="btn1">Update</button>



                </form>
            </div>
        </div>
        </>
    )
}

export default UpdateProject;