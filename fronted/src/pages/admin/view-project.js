import React,{useState,useEffect} from "react";
import "../style/style.css";
import { Link } from 'react-router-dom';
const ViewProject=()=>{
    const[project,setProject]=useState([]);
    const[manager,setManager]=useState([]);
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState(null);

      useEffect(()=>{
        const fetchProject=async()=>{
            try{
           const token=localStorage.getItem("token");
            const result=await fetch(`http://localhost:4000/api/project`,{
                headers:{Authorization:`Bearer ${token}`},
            })
            const data=await result.json();
            if(!result.ok){
                throw new Error(data.message||"Faild to fetch Project");
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
            console.error(err.message);
        }
        finally{
            setLoading(false);
        }
        }
        fetchProject();
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

        const deleteProject=async(id)=>{
        if(!window.confirm("Are you sure you went to delete the Project")) return;
        try{
            const token=localStorage.getItem("token");
            const result=await fetch(`http://localhost:4000/api/project/${id}`,{
                method:"DELETE",
                headers:{Authorization:`Bearer ${token}`},
            })
            const data=await result.json();
            if(!result.ok){
                throw new Error(data.message||"Project delete faild");
            }
            alert("✅ Project delete successfully");
            setProject(prev=>prev.filter(p=>String(p.project_id) !==String(id)));
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
                <h3 className="title">View Project</h3>
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>Sno#</th>
                            <th>Project Name</th>
                            <th>Description</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Status</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {project.length===0 ? (
                            <tr>
                                <td colSpan="8" align="center">Data is not found</td>
                            </tr>
                        ):(
                            project.map((p,index)=>{
                                return(
                                    <tr key={p.project}>
                                        <td>{index+1}</td>
                                        <td>{p.project_name}</td>
                                        <td>{p.description}</td>
                                        <td>{p.start_date}</td>
                                        <td>{p.end_date}</td>
                                        <td>{p.status}</td>
                                        <td>{
                                            manager.find(m=>m.user_id===p.manager_id)?.username||"N/a"
                                        }
                                    </td>
                                      <td>
                                        <Link to={`/admin/update-project/${p.project_id}`} className="btn btn-success">Edit</Link> &nbsp;
                                        <button onClick={()=>deleteProject(p.project_id)} className="btn btn-danger">Delete</button>
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

export default ViewProject;