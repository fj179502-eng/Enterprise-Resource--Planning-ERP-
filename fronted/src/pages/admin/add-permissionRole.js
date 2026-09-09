import React,{useState,useEffect} from "react";
import "../style/style.css";
import { useNavigate } from "react-router-dom";
const AddPermissionRole=()=>{
    const[userId,setUserId]=useState("");
    const[user,setUser]=useState([]);
    const[permissionId,setPermissionId]=useState("");
    const[permission,setPermission]=useState([]);
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState(null);
    const navigate=useNavigate();

    const onSubmitForm=async(e)=>{
        e.preventDefault();
        setLoading(true);
        setError(null);
        try{
            const body={user_id:userId,permission_id:permissionId};
            const token=localStorage.getItem("token");
            const result=await fetch(`http://localhost:4000/api/rolePermission`,{
                method:"POST",
                headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`},
                body:JSON.stringify(body),
            })
            const data=await result.json();
            if(!result.ok){
                throw new Error(data.message||"Faild to fetch role permission");
            }
            alert("✅ role permission successfully");
            navigate("/admin/view-permissionRole");
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


    return(
        <>
        <br/><br/>
        <div className="container">
            <div className="home">
                {error && <p className="error">{error}</p>}
                <h3 className="title">Add Permission Role</h3>

                <form onSubmit={onSubmitForm}>
                      <div className="form-group">
                        <label htmlFor="userId">User *</label>
                        <select name="userId" id="userId" required value={userId} onChange={(e)=>setUserId(e.target.value)}>
                            <option value="">Select</option>
                            {user.length>0 ? (
                                user.map((u)=>(
                                    <option key={u.user_id} value={u.user_id}>{u.role}</option>
                                ))
                            ):(
                                <option disabled>User Not Found</option>
                            )}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="userId">Permission *</label>
                        <select name="permissionId" id="permissionId" required value={permissionId} onChange={(e)=>setPermissionId(e.target.value)}>
                            <option value="">Select</option>
                            {permission.length>0 ? (
                                permission.map((p)=>(
                                    <option key={p.permission_id} value={p.permission_id}>{p.permission_name}</option>
                                ))
                            ):(
                                <option disabled>Permssion Not Found</option>
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
export default AddPermissionRole