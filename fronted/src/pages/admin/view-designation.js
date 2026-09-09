import React,{useState,useEffect} from "react";
import "../style/style.css";
import {Link} from "react-router-dom";
const ViewDesignation=()=>{
    const[department,setDepartment]=useState([]);
    const[designation,setDesignation]=useState([]);
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState(null);
  
    useEffect(()=>{
        const fetchDesignation=async()=>{
            try{
                const token=localStorage.getItem("token");
                const result=await fetch(`http://localhost:4000/api/designation`,{
                    headers:{Authorization:`Bearer ${token}`},
                })
                const data=await result.json();
                if(!result.ok){
                    throw new Error(data.message||"Faild to fetch Designation");
                }
                if(Array.isArray(data)){
                    setDesignation(data);
                }
                else if(Array.isArray(data.data)){
                    setDesignation(data.data);
                }
                else{
                    setDesignation([]);
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
        fetchDesignation();
    },[])
    

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
    },[]);


    const deleteDesignation=async(id)=>{
    if(!window.confirm("Are you sure you went to delete the designation")) return;

    try{
        const token=localStorage.getItem("token");
        const result=await fetch(`http://localhost:4000/api/designation/${id}`,{
                method:"DELETE",
                headers:{Authorization:`Bearer ${token}`,},
            }
        );
        const data=await result.json();
        if(!result.ok){
            throw new Error(data.message || "designation delete failed");
        }
        alert("✅ Designation delete successfully");
        // Deleted designation ko immediately UI se remove karo
        setDesignation(prev =>prev.filter(de => String(de.designation_id) !== String(id)));
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
                <h3 className="title">View Designation</h3>
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>Sno#</th>
                            <th>Designation</th>
                            <th>Department</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {designation.length===0 ? (
                        <tr>
                            <td colSpan="7" align="center">Data is not found</td>
                        </tr>
                    ):(
                        designation.map((de,index)=>{
                            return(
                                <tr key={de.designation_id}>
                                    <td>{index+1}</td>
                                    <td>{de.designation_name}</td>
                                    <td>{
                                        department.find(d=>d.department_id===de.department_id)?.department_name||"N/A"
                                        }
                                    </td>
                                    <td>
                                        <Link to={`/admin/update-designation/${de.designation_id}`} className="btn btn-success">Update</Link>&nbsp;
                                        <button onClick={()=>deleteDesignation(de.designation_id)} className="btn btn-danger">Delete</button>
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
export default ViewDesignation;