import React,{useState,useEffect} from "react";
import "../style/style.css";
import { useNavigate, useParams } from "react-router-dom";
const UpdateNotification=()=>{
    const{id}=useParams();
    const[userId,setUserId]=useState("");
    const[user,setUser]=useState([]);
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState(null);
    const navigate=useNavigate();
    const[formData,setFormData]=useState({title:"",message:"",user_id:""});

     useEffect(()=>{
           const fetchNotification=async()=>{
               try{
                   const token=localStorage.getItem("token");
                   const result=await fetch(`http://localhost:4000/api/notification/${id}`,{
                       headers:{Authorization:`Bearer ${token}`},
                   })
                   const data=await result.json();
                   if(!result.ok){
                       throw new Error(data.message||"Faild to fetch notification");
                   }
                   setFormData({
                    title:data.title||"",
                    message:data.message||"",
                    user_id:data.user_id||"",
                   })
               }
               catch(err){
                   console.error(err);
                   setError(err.message);
               }
               finally{
                   setLoading(false);
               }
           }
           fetchNotification(id);
       },[id]);

       const handleEditChange=async(e)=>{
        const{name,value}=e.target;
        setFormData(prev=>({...prev,[name]:value}));
       }

       const updateNotification=async(e)=>{
        e.preventDefault();
        setLoading(true);
        setError(null);
        try{
            const token=localStorage.getItem("token");
            const result=await fetch(`http://localhost:4000/api/notification/${id}`,{
                method:"PUT",
                headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`},
                body:JSON.stringify(formData),
            })
            const data=await result.json();
            if(!result.ok){
                throw new Error(data.message||"Notification update successfully");
            }
            alert("Notification Update successfully");
            navigate("/admin/view-notification");
        }
        catch(err){
            console.error(err);
            setError(err.message);
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
   

    return(
        <>
        <br/><br/>
        <div className="container">
            <div className="home">
                {error && <p className="error">{error}</p>}
                <h3 className="title">Update Notification</h3>

                <form onSubmit={updateNotification}>

                    <div className="form-group">
                        <label htmlFor="title"> Title *</label>
                        <input type="text" name="title"  required value={formData.title} onChange={handleEditChange}></input>
                    </div>

                    <div className="form-group">
                        <label htmlFor="message"> Message *</label>
                        <textarea name="message" required value={formData.message} onChange={handleEditChange}></textarea>
                    </div>

                     <div className="form-group">
                        <label htmlFor="user_id">User *</label>
                        <select name="user_id" id="user_id" required value={formData.user_id} onChange={handleEditChange}>
                            <option value="">Select</option>
                            {user.length>0 ? (
                                user.map((e)=>(
                                    <option key={e.user_id} value={e.user_id}>{e.username}</option>
                                ))
                            ):(
                                <option disabled>User Not Found</option>
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
export default UpdateNotification;