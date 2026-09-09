import React,{useState,useEffect} from "react";
import "../style/style.css";
import { useNavigate } from "react-router-dom";
const AddNotification=()=>{
    const[title,setTitle]=useState("");
    const[message,setMessage]=useState("");
    const[userId,setUserId]=useState("");
    const[user,setUser]=useState([]);
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState(null);
    const navigate=useNavigate();

    const onSubmitForm=async(e)=>{
        e.preventDefault();
        setLoading(true);
        setError(null);
        try{
            const body={title:title,message:message,user_id:userId};
            const token=localStorage.getItem("token");
            const result=await fetch(`http://localhost:4000/api/notification`,{
                method:"POST",
                headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`},
                body:JSON.stringify(body),
            })
            const data=await result.json();
            if(!result.ok){
                throw new Error(data.message||"Faild to fetch notification");
            }
            alert("✅ Notification Add Succesfully");
            navigate("/admin/view-notification");
        }
        catch(err){
            console.error(err);
            setError(err.messsage);
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
   

    return(
        <>
        <br/><br/>
        <div className="container">
            <div className="home">
                {error && <p className="error">{error}</p>}
                <h3 className="title">Add Notification</h3>

                <form onSubmit={onSubmitForm}>

                    <div className="form-group">
                        <label htmlFor="title"> Title *</label>
                        <input type="text" name="title" placeholder="Enter..." required value={title} onChange={(e)=>setTitle(e.target.value)}></input>
                    </div>

                    <div className="form-group">
                        <label htmlFor="message"> Message *</label>
                        <textarea name="message" placeholder="Enter..." required value={message} onChange={(e)=>setMessage(e.target.value)}></textarea>
                    </div>

                     <div className="form-group">
                        <label htmlFor="userId">User *</label>
                        <select name="userId" id="userId" required value={userId} onChange={(e)=>setUserId(e.target.value)}>
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
export default AddNotification;