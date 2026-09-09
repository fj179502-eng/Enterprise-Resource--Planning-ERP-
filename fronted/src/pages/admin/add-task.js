import React,{useState,useEffect} from "react"
import "../style/style.css";
import { useNavigate } from "react-router-dom";
const AddTask=()=>{
    const[employeeId,setEmployeeId]=useState("");
    const[employee,setEmployee]=useState([]);
    const[projectId,setProjectId]=useState("");
    const[project,setProject]=useState([]);
    const[title,setTitle]=useState("");
    const[description,setdescription]=useState("");
    const[deadline,setDeadline]=useState("");
    const[status,setStatus]=useState("");
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState(null);
    const navigate=useNavigate();
    const onSubmitForm=async(e)=>{
        e.preventDefault(e);
        setLoading(true);
        setError(null);
        try{
            const token=localStorage.getItem("token");
            const body={employee_id:employeeId,project_id:projectId,description:description,title:title,deadline:deadline,status:status};
            const result=await fetch(`http://localhost:4000/api/task`,{
                method:"POST",
                headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`},
                body:JSON.stringify(body),
            })
            const data=await result.json();
            if(!result.ok){
                throw new Error(data.message||"Faild to fetch Task");
            }
            alert("✅ Task Add Successfully");
            navigate("/admin/view-task");
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
        }
        fetchProject();
    },[]);

    return(
        <>
        <br/><br/>
        <div className="container">
            <div className="home">
                {error && <p className="error">{error}</p>}
                <h3 className="title">Add Task</h3>
                <form onSubmit={onSubmitForm}>
                    <div className="form-group">
                        <label htmlFor="employeeId">Employee *</label>
                        <select id="employeeId" name="employeeId" required value={employeeId} onChange={(e)=>setEmployeeId(e.target.value)}>
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
                        <label htmlFor="projectId">Project *</label>
                        <select id="projectId" name="projectId" required value={projectId} onChange={(e)=>setProjectId(e.target.value)}>
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
                        <input type="text" name="title" required placeholder="Enter..." value={title} onChange={(e)=>setTitle(e.target.value)}/>
                    </div>

                      <div className="form-group">
                        <label htmlFor="description">Description *</label>
                        <textArea name="description" required placeholder="Enter..." value={description} onChange={(e)=>setdescription(e.target.value)}></textArea>
                    </div>

                      <div className="form-group">
                        <label htmlFor="deadline">DeadLine *</label>
                        <input type="date" name="deadline" required placeholder="Enter..." value={deadline} onChange={(e)=>setDeadline(e.target.value)}/>
                    </div>

                      <div className="form-group">
                        <label htmlFor="Status">Status *</label>
                        <input type="text" name="Status" required placeholder="Enter..." value={status} onChange={(e)=>setStatus(e.target.value)}/>
                    </div>
                    <br/>
                    <button type="submit" className="btn1">Add</button>

                </form>
            </div>
            
        </div>
        <p><br/></p>
        </>
    )
}
export default AddTask