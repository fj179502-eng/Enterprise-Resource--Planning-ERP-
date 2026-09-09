import React,{useState,useEffect} from "react";
import "../style/style.css";
import { Link } from 'react-router-dom';
const ViewDepartment=()=>{
    const[department,setDepartment]=useState([]);
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState(null);
   

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
    
    const deleteDepartment=async(id)=>{
        if(!window.confirm("Are you sure you went to delete the department")) return ;
        try{
            const token=localStorage.getItem("token");
            const result=await fetch(`http://localhost:4000/api/department/${id}`,{
                method:"DELETE",
                headers:{Authorization:`Bearer ${token}`},
            })
            const data=await result.json();
            if(!result.ok){
                throw new Error(data.message||"department delete faild");
            }
            alert("✅ Department delete successfully");
            setDepartment(prev=>prev.filter(d=>String(d.department_id) !==String(id)));
        }
        catch(err){
            console.error(err);
            setError(err.message);
        }
    }

    return(
        <>
        <br/><br/><br/>
        <div className="container">
            <div className="home1">
                {error && <p className="error">{error}</p>}
                <h3 className="title">View Department</h3>
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>Sno#</th>
                            <th>Department Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {department.length===0 ? (
                            <tr>
                                <td colSpan="7" align="center">Data is not found</td>
                            </tr>
                        ):(
                            department.map((d,index)=>{
                                return(
                                    <tr key={d.department_id}>
                                        <td>{index+1}</td>
                                        <td>{d.department_name}</td>
                                        <td>
                                            <Link to={`/admin/update-department/${d.department_id}`} className="btn btn-success">Edit</Link> &nbsp;
                                            <button onClick={()=>deleteDepartment(d.department_id)} className="btn btn-danger">Delete</button>
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
export default ViewDepartment;