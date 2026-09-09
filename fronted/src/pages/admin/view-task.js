import React,{useState,useEffect} from "react"
import "../style/style.css";
import { Link } from "react-router-dom";
const ViewTask=()=>{
    const[task,setTask]=useState([]);
    const[employee,setEmployee]=useState([]);
    const[project,setProject]=useState([]);
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState(null);

     useEffect(()=>{
        const fetchTask=async()=>{
            try{
                const token=localStorage.getItem("token");
                const result=await fetch(`http://localhost:4000/api/task`,{
                    headers:{Authorization:`Bearer ${token}`},
                })
                const data=await result.json();
                if(!result.ok){
                    throw new Error(data.message||"Faild to fetch Task");
                }
                if(Array.isArray(data)){
                    setTask(data);
                }
                else if(Array.isArray(data.data)){
                    setTask(data.data);
                }
                else{
                    setTask([]);
                }
            }
            catch(err){
                console.error(err);
                setError(err.message);
            }
        }
        fetchTask();
    },[]);

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

     const deleteTask=async(id)=>{
        if(!window.confirm("Are you sure you went to delete the task")) return;
        try{
            const token=localStorage.getItem("token");
            const result=await fetch(`http://localhost:4000/api/task/${id}`,{
                method:"DELETE",
                headers:{Authorization:`Bearer ${token}`},
            })
            const data=await result.json();
            if(!result.ok){
                throw new Error(data.message||"Task delete faild");
            }
            alert("✅ Task delete successfully");
            setTask(prev=>prev.filter(t=>String(t.task_id) !==String(id)));
        }
        catch(err){
            console.error(err);
            setError(err.message);
        }
    }


    return(
        <>
        <br/><br/>
        <div className="container">
            <div className="home1">
                {error && <p className="error">{error}</p>}
                <h3 className="title">View Task</h3>
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>Sno#</th>
                            <th>Employee</th>
                            <th>Project</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Deadline</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {task.length===0 ? (
                        <tr>
                            <td colSpan="7" align="center">Data is not found</td>
                        </tr>
                    ):(
                        task.map((t,index)=>{
                            return(
                                <tr key={t.task_id}>
                                    <td>{index+1}</td>
                                    <td>
                                        {
                                            employee.find(u=>u.user_id===t.employee_id)?.username||"N/A"
                                        }
                                    </td>
                                     <td>
                                        {
                                        project.find(p=>p.project_id===t.project_id)?.project_name||"N/A"
                                        }
                                    </td>
                                    <td>{t.title}</td>
                                    <td>{t.description}</td>
                                    <td>{t.deadline}</td>
                                    <td>{t.status}</td>
                                    <td>
                                        <Link to={`/admin/update-task/${t.task_id}`} className="btn btn-success">Edit</Link>&nbsp;
                                        <button onClick={()=>deleteTask(t.task_id)} className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    )}
                    </tbody>
                </table>
                
            </div>
            
        </div>

        </>
    )
}
export default ViewTask