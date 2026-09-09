import React,{useState,useEffect} from "react";
import "../style/style.css";
import {useNavigate} from "react-router-dom";
const AddEmployee=()=>{
    const[user,setUser]=useState([]);
    const[userId,setUserId]=useState("");
    const[department,setDepartment]=useState([]);
    const[departmentId,setDepartmentId]=useState("");
    const[designation,setDesignation]=useState([]);
    const[designationId,setDesignationId]=useState("");
    const[joiningDate,setJoiningDate]=useState("");
    const[salary,setSalary]=useState("");
    const[address,setAddress]=useState("");
    const[cnic,setCnic]=useState("");
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState(null);
    const navigate=useNavigate();
    const onSubmitForm=async(e)=>{
        e.preventDefault();
        setLoading(true);
        setError(null);
        try{
            const body={user_id:userId,designation_id:designationId,department_id:departmentId,joining_date:joiningDate,salary:salary,address:address,cnic:cnic};
            const token=localStorage.getItem("token");
            const result=await fetch(`http://localhost:4000/api/employee`,{
                method:"POST",
                headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`},
                body:JSON.stringify(body),
            })
            const data=await result.json();
            if(!result.ok){
                throw new Error(data.message||"Faild to fetch employee");
            }
            alert("✅ Employee Add Successfully");
            navigate("/admin/view-employee");
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
       },[])

    return(
        <>
        <br/><br/>
        <div className="container">
            <div className="home">
                {error && <p className="error">{error}</p>}
                <h3 className="title">Add Employee</h3>
                <form onSubmit={onSubmitForm}>
                    <div className="form-group">
                        <label htmlFor="userId">User *</label>
                        <select id="userId" name="userId" required value={userId} onChange={(e)=>setUserId(e.target.value)}>
                            <option value="">Select</option>
                            {user.length>0 ? (
                                user.map((u)=>(
                                    <option key={u.user_id} value={u.user_id} >{u.username}</option>
                                ))
                            ):(
                                <option disabled>No User Available</option>
                            )}
                        </select>
                    </div>

                       <div className="form-group">
                        <label htmlFor="departmentId">Department *</label>
                        <select id="departmentId" name="departmentId" required value={departmentId} onChange={(e)=>setDepartmentId(e.target.value)}>
                            <option value="">Select</option>
                            {department.length>0 ? (
                                department.map((d)=>(
                                    <option key={d.department_id} value={d.department_id} >{d.department_name}</option>
                                ))
                            ):(
                                <option disabled>No Department Available</option>
                            )}
                        </select>
                    </div>

                     <div className="form-group">
                        <label htmlFor="designationId">Designation *</label>
                        <select id="designationId" name="designationId" required value={designationId} onChange={(e)=>setDesignationId(e.target.value)}>
                            <option value="">Select</option>
                            {designation.length>0 ? (
                                designation.map((d)=>(
                                    <option key={d.designation_id} value={d.designation_id} >{d.designation_name}</option> 
                                ))
                            ):(
                                <option disabled>No Designation Available</option>
                            )}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="joiningDate">Joining Date *</label>
                        <input type="date" name="joiningDate" required value={joiningDate} onChange={(e)=>setJoiningDate(e.target.value)}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="salary">Salary *</label>
                        <input type="number" name="salary" placeholder="Enter..." required value={salary} onChange={(e)=>setSalary(e.target.value)}/>
                    </div>

                     <div className="form-group">
                        <label htmlFor="address">Address *</label>
                        <textarea name="address" placeholder="Enter..." required value={address} onChange={(e)=>setAddress(e.target.value)}></textarea>
                    </div>

                     <div className="form-group">
                        <label htmlFor="cnic">CNIC *</label>
                        <input type="text" name="cnic" required value={cnic} placeholder="Enter..." onChange={(e)=>setCnic(e.target.value)}/>
                    </div>
                    <br/>
                    <button type="submit" className="btn1">Add</button>


                </form>
            </div>
        </div>
        </>
    )
}
export default AddEmployee;