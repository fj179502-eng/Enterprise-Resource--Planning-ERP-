import React,{useState,useEffect} from "react";
import "../style/style.css";
import { useNavigate } from 'react-router-dom';
const AddProject=()=>{
    const[projectName,setProjectName]=useState("");
    const[description,setDescription]=useState("");
    const[startDate,setStartDate]=useState("");
    const[endDate,setEndDate]=useState("");
    const[status,setStatus]=useState("");
    const[managerId,setManagerId]=useState("");
    const[manager,setManager]=useState([]);
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState(null);
    const navigate=useNavigate();

    const onSubmitForm=async(e)=>{
        e.preventDefault();
        setLoading(true);
        setError(null);
        try{
            const body={project_name:projectName,description:description,start_date:startDate,end_date:endDate,status:status,manager_id:managerId};
            const token=localStorage.getItem("token");
            const result=await fetch(`http://localhost:4000/api/project`,{
                method:"POST",
                 headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`},
                body:JSON.stringify(body),
            });
            const data=await result.json();
            if(!result.ok){
                throw new Error(data.message||"Faild to fetch project");
            }
            alert("✅ Project Add Sucesfully");
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
                <h3 className="title">Add Project</h3>
                <form onSubmit={onSubmitForm}>
                    <div className="form-group">
                        <label htmlFor="projectName"> Project Name *</label>
                        <input type="text" name="projectName" required placeholder="Enter..." value={projectName} onChange={(e)=>setProjectName(e.target.value)} />
                    </div>

                     <div className="form-group">
                        <label htmlFor="description"> Description *</label>
                        <textArea name="description" required placeholder="Enter..." value={description} onChange={(e)=>setDescription(e.target.value)} ></textArea>
                    </div>

                     <div className="form-group">
                        <label htmlFor="startDate"> Start Date *</label>
                        <input type="date" name="startDate" required  value={startDate} onChange={(e)=>setStartDate(e.target.value)} />
                    </div>

                     <div className="form-group">
                        <label htmlFor="endDate"> End Date *</label>
                        <input type="date" name="endDate" required  value={endDate} onChange={(e)=>setEndDate(e.target.value)} />
                    </div>

                     <div className="form-group">
                        <label htmlFor="status"> Status *</label>
                        <input type="text" name="status" placeholder="Enter..." required  value={status} onChange={(e)=>setStatus(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="managerId"> Manager *</label>
                        <select id="managerId" name="managerId" required value={managerId} onChange={(e)=>setManagerId(e.target.value)}>
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
                    <button type="submit" className="btn1">Add</button>



                </form>
            </div>
        </div>
        </>
    )
}

export default AddProject;