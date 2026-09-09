import React,{useState,useEffect} from "react";
import "../style/style.css";
import { Link} from "react-router-dom";
const ViewPermissionRole1=()=>{
    const[permissionRole,setPermissionRole]=useState([]);
    const[user,setUser]=useState([]);
    const[permission,setPermission]=useState([]);
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState(null);
 

    useEffect(()=>{
           const fetchPermissionRole=async()=>{
               try{
                   const token=localStorage.getItem("token");
                   const result=await fetch(`http://localhost:4000/api/rolePermission`,{
                       headers:{Authorization:`Bearer ${token}`},
                   })
                   const data=await result.json();
                   if(!result.ok){
                       throw new Error(data.message||"Faild to fetch role permission");
                   }
                   if(Array.isArray(data)){
                       setPermissionRole(data);
                   }
                   else if(Array.isArray(data.data)){
                       setPermissionRole(data.data);
                   }
                   else{
                       setPermissionRole([])
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
           fetchPermissionRole();
       },[]);

    
 useEffect(()=>{
           const fetchUser=async()=>{
               try{
                   const token=localStorage.getItem("token");
                   const result=await fetch(`http://localhost:4000/api/users`,{
                       headers:{Authorization:`Bearer ${token}`},
                   })
                   const data=await result.json();
                   if(!result.ok){
                       throw new Error(data.message||"Faild to fetch User");
                   }
                   if(Array.isArray(data)){
                       setUser(data);
                   }
                   else if(Array.isArray(data.data)){
                       setUser(data.data);
                   }
                   else{
                       setUser([])
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
           fetchUser();
       },[]);

       useEffect(()=>{
                 const fetchPermission=async()=>{
                     try{
                         const token=localStorage.getItem("token");
                         const result=await fetch(`http://localhost:4000/api/permission`,{
                             headers:{Authorization:`Bearer ${token}`},
                         })
                         const data=await result.json();
                         if(!result.ok){
                             throw new Error(data.message||"Faild to fetch permission");
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
             
const deleteRolePermission=async(id)=>{
    if(!window.confirm("Are you sure you went to delete the role permission")) return;

    try{
        const token=localStorage.getItem("token");
        const result=await fetch(`http://localhost:4000/api/rolePermission/${id}`,{
                method:"DELETE",
                headers:{Authorization:`Bearer ${token}`,},
            }
        );
        const data=await result.json();
        if(!result.ok){
            throw new Error(data.message || "Role Permissin Faild delete failed");
        }
        alert("✅ Role Permission delete successfully");
        // Deleted designation ko immediately UI se remove karo
        setPermissionRole(prev =>prev.filter(rp => String(rp.role_permission_id) !== String(id)));
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
                <h3 className="title">View Permission Role</h3>
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>Sno#</th>
                            <th>User</th>
                            <th>Permission</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {permissionRole.length===0 ? (
                            <tr>
                                <td colSpan="8" align="center">Data is not found</td>
                            </tr>
                        ):(
                            permissionRole.map((rp,index)=>{
                                return(
                                    <tr key={rp.role_permission_id}>
                                        <td>{index+1}</td>
                                        <td>
                                            {
                                                user.find(u=>u.user_id===rp.user_id)?.role||"N/A"
                                            }
                                        </td>

                                         <td>
                                            {
                                                permission.find(p=>p.permission_id===rp.permission_id)?.permission_name||"N/A"
                                            }
                                        </td>
                                        <td>
                                            
                                            <button onClick={()=>deleteRolePermission(rp.role_permission_id)} className="btn btn-danger">Delete</button>
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
export default ViewPermissionRole1