import React,{useState,useEffect} from "react";
import "../style/style.css";
import { Link } from "react-router-dom";


const ViewPermission=()=>{
    const[permission,setPermission]=useState([]);
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState(null);


     useEffect(()=>{
               const fetchPermission=async()=>{
                   try{
                       const token=localStorage.getItem("token");
                       const result=await fetch(`http://localhost:4000/api/permission`,{
                           headers:{Authorization:`Bearer ${token}`},
                       })
                       const data=await result.json();
                       if(!result.ok){
                           throw new Error(data.message||"Faild to fetch Permission");
                       }
                       if(Array.isArray(data)){
                           setPermission(data);
                       }
                       else if(Array.isArray(data.data)){
                           setPermission(data.data);
                       }
                       else{
                           setPermission([])
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
               fetchPermission();
           },[]);

    const deletePermission=async(id)=>{
        if(!window.confirm("Are you sure you went to delete the permission")) return ;
        try{
            const token=localStorage.getItem("token");
            const result=await fetch(`http://localhost:4000/api/permission/${id}`,{
                method:"DELETE",
                headers:{Authorization:`Bearer ${token}`},
            })
            const data=await result.json();
            if(!result.ok){
                throw new Error(data.message||"ppermission delete faild");
            }
            alert("✅ Notification delete successfully");
            setPermission(prev=>prev.filter(p=>String(p.permission_id) !==String(id)));
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
                <h3 className="title">View Permission</h3>

                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>Sno#</th>
                            <th>Permission Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {permission.length===0 ? (
                            <tr>
                                <td colSpan="8" align="center">Data is not found</td>
                            </tr>
                        ):(
                            permission.map((p,index)=>{
                                return(
                                    <tr key={p.permission_id}>
                                        <td>{index+1}</td>
                                        <td>{p.permission_name}</td>
                                        <td>
                                            <Link to={`/admin/update-permission/${p.permission_id}`} className="btn btn-success">Edit</Link> &nbsp;
                                            <button onClick={()=>deletePermission(p.permission_id)} className="btn btn-danger">Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        ) }
                    </tbody>
                </table>
               
            </div>
        </div>
        </>
    )
}
export default ViewPermission;