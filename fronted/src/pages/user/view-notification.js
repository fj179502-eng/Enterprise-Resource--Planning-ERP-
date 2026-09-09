import React,{useState,useEffect} from "react";
import "../style/style.css";
import { Link } from "react-router-dom";
const ViewNotification1=()=>{
    const[notification,setNotification]=useState([]);
    const[user,setUser]=useState([]);
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState(null);


    useEffect(()=>{
           const fetchNotification=async()=>{
               try{
                   const token=localStorage.getItem("token");
                   const result=await fetch(`http://localhost:4000/api/notification`,{
                       headers:{Authorization:`Bearer ${token}`},
                   })
                   const data=await result.json();
                   if(!result.ok){
                       throw new Error(data.message||"Faild to fetch Notification");
                   }
                   if(Array.isArray(data)){
                       setNotification(data);
                   }
                   else if(Array.isArray(data.data)){
                       setNotification(data.data);
                   }
                   else{
                       setNotification([])
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
           fetchNotification();
       },[]);

       
     const deleteNotification=async(id)=>{
        if(!window.confirm("Are you sure you went to delete the notification")) return ;
        try{
            const token=localStorage.getItem("token");
            const result=await fetch(`http://localhost:4000/api/notification/${id}`,{
                method:"DELETE",
                headers:{Authorization:`Bearer ${token}`},
            })
            const data=await result.json();
            if(!result.ok){
                throw new Error(data.message||"notification delete faild");
            }
            alert("✅ Notification delete successfully");
            setNotification(prev=>prev.filter(n=>String(n.notification_id) !==String(id)));
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
            <div className="home1">
                {error && <p className="error">{error}</p>}
                <h3 className="title">View Notification</h3>
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>Sno#</th>
                            <th>Title</th>
                            <th>Message</th>
                            <th>User</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notification.length===0 ? (
                            <tr>
                                <td colSpan="8" align="center">Data is not found</td>
                            </tr>
                        ):(
                            notification.map((n,index)=>{
                                return(
                                    <tr key={n.notification_id}>
                                        <td>{index+1}</td>
                                        <td>{n.title}</td>
                                        <td>{n.message}</td>
                                        <td>{
                                            user.find(u=>u.user_id===n.user_id)?.username||"N/A"
                                            }
                                            </td>
                                            <td>
                                                <button onClick={()=>deleteNotification(n.notification_id)} className="btn btn-danger">Delete</button>
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
export default ViewNotification1;