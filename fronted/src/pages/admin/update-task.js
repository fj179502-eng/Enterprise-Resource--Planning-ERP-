import React,{useState,useEffect} from "react"
import "../style/style.css";
import { useNavigate,useParams } from "react-router-dom";
const UpdateTask=()=>{
    const{id}=useParams();
    const[employee,setEmployee]=useState([]);
    const[project,setProject]=useState([]);
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState(null);
    const navigate=useNavigate();
    const[formData,setFormData]=useState({employee_id:"",project_id:"",description:"",title:"",deadline:"",status:""});

    useEffect(()=>{
        const fetchTask=async()=>{
            try{
                const token=localStorage.getItem("token");
               const result=await fetch(`http://localhost:4000/api/task/${id}`,{
                    headers:{Authorization:`Bearer ${token}`},
                })
                const data=await result.json();
                if(!result.ok){
                    throw new Error(data.message||"Faild to fetch task");
                }
                setFormData({
                    employee_id:data.employee_id||"",
                    project_id:data.project_id||"",
                    title:data.title||"",
                    description:data.description||"",
                    deadline: data.deadline?.split("T")[0] || "",
                    status:data.status||""
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
        fetchTask();
    },[id]);

    const handleEditChange=async(e)=>{
        const{name,value}=e.target;
        setFormData(prev=>({...prev,[name]:value}));
    }

    const updateTask=async(e)=>{
        e.preventDefault();
        setLoading(true);
        setError(null);
        try{
            const token=localStorage.getItem("token");
            const result=await fetch(`http://localhost:4000/api/task/${id}`,{
                method:"PUT",
                headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`},
                body:JSON.stringify(formData),
            })
            const data=await result.json();
            if(!result.ok){
                throw new Error(data.message||"Task update Faild");
            }
            alert("✅ Task Update Successfully");
            navigate("/admin/view-task");
        }
        catch(err){
            console.error(err);
            setError(err.message);
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
                    throw new Error(data.message||"Faild to fetch employee");
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
        fetchEmployee();
    },[]);


       useEffect(()=>{
        const fetchProject=async()=>{
            try{
                const token=localStorage.getItem("token");
                const result=await fetch(`http://localhost:4000/api/project`,{
                    headers:{Authorization:`Bearer ${token}`},
                })
                const data=await result.json();
                if(!result.ok){
                    throw new Error(data.message||"Faild to fetch project");
                }
                if(Array.isArray(data)){
                    setProject(data);
                }
                else if(Array.isArray(data.data)){
                    setProject(data.data);
                }
                else{
                    setProject([]);
                }
            }
            catch(err){
                console.error(err);
                setError(err.message);
            }
            setLoading(false);
        }
        fetchProject();
    },[]);

    return(
        <>
        <br/><br/>
        <div className="container">
            <div className="home">
                {error && <p className="error">{error}</p>}
                <h3 className="title">Update Task</h3>
                <form onSubmit={updateTask}>
                    <div className="form-group">
                        <label htmlFor="employee_id">Employee *</label>
                        <select id="employee_id" name="employee_id" required value={formData.employee_id} onChange={handleEditChange}>
                            <option value="">Select</option>
                            {employee.length>0 ?(
                                employee.map((e)=>(
                                    <option key={e.user_id} value={e.user_id}>{e.username}</option>
                                ))
                            ):(
                                <option disabled>No Employee Available</option>
                            )}
                        </select>
                    </div>

                      <div className="form-group">
                        <label htmlFor="project_id">Project *</label>
                        <select id="project_id" name="project_id" required value={formData.project_id} onChange={handleEditChange}>
                            <option value="">Select</option>
                            {project.length>0 ?(
                                project.map((p)=>(
                                    <option key={p.project_id} value={p.project_id}>{p.project_name}</option>
                                ))
                            ):(
                                <option disabled>No Project Available</option>
                            )}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title"  value={formData.title} onChange={handleEditChange}/>
                    </div>

                      <div className="form-group">
                        <label htmlFor="description">Description *</label>
                        <input type="text" name="description" required value={formData.description} onChange={handleEditChange}/>
                    </div>

                      <div className="form-group">
                        <label htmlFor="deadline">DeadLine *</label>
                        <input type="date" name="deadline" required value={formData.deadline} onChange={handleEditChange}/>
                    </div>

                      <div className="form-group">
                        <label htmlFor="Status">Status *</label>
                        <input type="text" name="Status" required placeholder="Enter..." value={formData.status} onChange={handleEditChange}/>
                    </div>
                    <br/>
                    <button type="submit" className="btn1">Update</button>

                </form>
            </div>
            
        </div>
        <p><br/></p>
        </>
    )
}
export default UpdateTask