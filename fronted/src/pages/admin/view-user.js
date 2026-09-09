import React, { useState,useEffect } from "react";
import "../style/style.css";
import { Link } from "react-router-dom";
const ViewUser=()=>{
    const[user,setUser]=useState([]);
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState(null);

    useEffect(()=>{
        const fetchUser=async()=>{
            try{
                const token=localStorage.getItem("token");
                const reuslt=await fetch(`http://localhost:4000/api/users`,{
                    headers:{Authorization:`Bearer ${token}`},
                })
                const data=await reuslt.json();
                if(!reuslt.ok){
                    throw new Error(data.message||"Faild to fetch User");
                }
                if(Array.isArray(data)){
                    setUser(data);
                }
                else if(Array.isArray(data.data)){
                    setUser(data.data);
                }
                else{
                    setUser([]);
                }
            }
            catch(err){
                console.error(err);
                setError(err.message);
            }
        }
        fetchUser();
    },[])

    return(
        <>
        <br/><br/><br/>
        <div className="container">
            <div className="home1">
                {error && <p className="error">{error}</p>}
                <h3 className="title">View User</h3>
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>Sno#</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Gender</th>
                            <th>Dob</th>
                            <th>Image</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                    {user.length===0 ? (
                        <tr>
                            <td colSpan="8" align="center">
                                Data is not found
                            </td>
                        </tr>
                    ):(
                        user.map((u,index)=>{
                            return(
                                <tr key={u.user_id}>
                                    <td>{index+1}</td>
                                    <td>{u.username}</td>
                                    <td>{u.email}</td>
                                    <td>{u.phone}</td>
                                    <td>{u.dob}</td>
                                    <td>{u.gender}</td>
                                      <td>
                                            <img src={`http://localhost:4000/uploads/${u.profile_image}`} alt="profile" style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "50%" }} />
                                        </td>
                                    <td>{u.role}</td>
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
export default ViewUser