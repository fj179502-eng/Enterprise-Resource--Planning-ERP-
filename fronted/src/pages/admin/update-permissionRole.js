import React,{useState,useEffect} from "react";
import "../style/style.css";
import { useNavigate,useParams } from "react-router-dom";
const UpdatePermissionRole=()=>{
    const{id}=useParams();
    const[userId,setUserId]=useState("");
    const[user,setUser]=useState([]);
    const[permissionId,setPermissionId]=useState("");
    const[permission,setPermission]=useState([]);
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState(null);
    const navigate=useNavigate();
    const[formData,setFormData]=useState({user_id:"",permission_id:""});

   useEffect(() => {
    const fetchRolePermission = async () => {
        try {
            const token = localStorage.getItem("token");

            const result = await fetch(
                `http://localhost:4000/api/rolePermission/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                }
            );

            const data = await result.json();

            if (!result.ok) {
                throw new Error(
                    data.message || "Failed to fetch role permission"
                );
            }

            setFormData({
                user_id: data.user_id || "",
                permission_id: data.permission_id || ""
            });
        }
        catch (err) {
            console.error(err);
            setError(err.message);
        }
        finally {
            setLoading(false);
        }
    };

    fetchRolePermission();
}, [id]);

         const handleEditChange=async(e)=>{
        const{name,value}=e.target;
        setFormData(prev=>({...prev,[name]:value}));
    }

    const updateRolePermission=async(e)=>{
        e.preventDefault();
        setLoading(true);
        setError(null);
        try{
            const token=localStorage.getItem("token");
            const result=await fetch(`http://localhost:4000/api/rolePermission/${id}`,{
                method:"PUT",
                headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`},
                body:JSON.stringify(formData),
            })
            const data=await result.json();
            if(!result.ok){
                throw new Error(data.message||"Role Permission Update Faild");
            }
            alert("✅ Role Permission Update Successfully");
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
                <h3 className="title">Update Permission Role</h3>

                <form onSubmit={updateRolePermission}>
                      <div className="form-group">
                        <label htmlFor="user_id">User *</label>
                        <select name="user_id" id="user_id" required value={formData.user_id} onChange={handleEditChange}>
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
                        <label htmlFor="permission_id">Permission *</label>
                        <select name="permission_id" id="permission_id" required value={formData.permission_id} onChange={handleEditChange}>
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
                    <button type="submit" className="btn1">Update</button>

                </form>

            </div>
        </div>
        </>
    )
}
export default UpdatePermissionRole