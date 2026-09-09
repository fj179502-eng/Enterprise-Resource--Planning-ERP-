import React,{useState,useEffect} from "react";
import "../style/style.css";
import {Link} from "react-router-dom";
const ViewEmployee1=()=>{
    const[user,setUser]=useState([]);
    const[employee,setEmployee]=useState([]);
    const[department,setDepartment]=useState([]);
    const[designation,setDesignation]=useState([]);
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState(null);

    useEffect(()=>{
             const fetchEmployee=async()=>{
                 try{
                     const token=localStorage.getItem("token");
                     const reuslt=await fetch(`http://localhost:4000/api/employee`,{
                         headers:{Authorization:`Bearer ${token}`},
                     })
                     const data=await reuslt.json();
                     if(!reuslt.ok){
                         throw new Error(data.message||"Faild to fetch employee");
                     }
                     if(Array.isArray(data)){
                         setEmployee(data);
                     }
                     else if(Array.isArray(data.data)){
                         setEmployee(data.data);
                     }
                     else{
                         setEmployee([]);
                     }
                 }
                 catch(err){
                     console.error(err);
                     setError(err.message);
                 }
             }
             fetchEmployee();
         },[])
    
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
       },[]);

        const deleteEmployee=async(id)=>{
    if(!window.confirm("Are you sure you went to delete the Employee")) return;

    try{
        const token=localStorage.getItem("token");
        const result=await fetch(`http://localhost:4000/api/employee/${id}`,{
                method:"DELETE",
                headers:{Authorization:`Bearer ${token}`,},
            }
        );
        const data=await result.json();
        if(!result.ok){
            throw new Error(data.message || "Employee delete failed");
        }
        alert("✅ Employee delete successfully");
        // Deleted designation ko immediately UI se remove karo
        setEmployee(prev =>prev.filter(e => String(e.employee_id) !== String(id)));
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
                <h3 className="title">View Employee</h3>

                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>Sno#</th>
                            <th>User</th>
                            <th>Department</th>
                            <th>Designation</th>
                            <th>Joining Date</th>
                            <th>Salary</th>
                            <th>Address</th>
                            <th>CNIC</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employee.length===0 ? (
                            <tr>
                                <td colSpan="8" align="center">Data is not found</td>
                            </tr>
                        ):(
                            employee.map((e,index)=>{
                                return(
                                    <tr key={e.employee_id}>
                                        <td>{index+1}</td>
                                        <td>{
                                            user.find(u=>u.user_id===e.user_id)?.username||"N/A"
                                            }
                                        </td>
                                          <td>{
                                            department.find(d=>d.department_id===e.department_id)?.department_name||"N/A"
                                            }
                                        </td>
                                          <td>{
                                            designation.find(de=>de.designation_id===e.designation_id)?.designation_name||"N/A"
                                            }
                                        </td>
                                        <td>{e.joining_date}</td>
                                        <td>{e.salary}</td>
                                        <td>{e.address}</td>
                                        <td>{e.cnic}</td>
                                        <td>
                                            <Link to={`/user/update-employee/${e.employee_id}`} className="btn btn-success">Edit</Link>
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
export default ViewEmployee1;