import React,{useState,useEffect} from "react";
import "../style/style.css";
import {useNavigate,useParams} from "react-router-dom";
const UpdateEmployee=()=>{
    const{id}=useParams();
    const[user,setUser]=useState([]);
    const[userId,setUserId]=useState("");
    const[department,setDepartment]=useState([]);
    const[departmentId,setDepartmentId]=useState("");
    const[designation,setDesignation]=useState([]);
    const[designationId,setDesignationId]=useState("");
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState(null);
    const navigate=useNavigate();
    const[formData,setFormData]=useState({user_id:"",department_id:"",designation_id:"",joining_data:"",salary:"",address:"",cnic:""});

    useEffect(()=>{
        const fetchEmployee=async()=>{
            try{
                const token=localStorage.getItem("token");
                const result=await fetch(`http://localhost:4000/api/employee/${id}`,{
                    headers:{Authorization:`Bearer ${token}`},
                })
                const data=await result.json();
                if(!result.ok){
                    throw new Error(data.message||"Faild to Fetch Error");
                }
                setFormData({
                    user_id:data.user_id||"",
                    department_id:data.department_id||"",
                    designation_id:data.designation_id||"",
                    joining_date: data.joining_date?.split("T")[0] || "",
                    salary:data.salary||"",
                    address:data.address||"",
                    cnic:data.cnic||"",
                })
            }
            catch(err){
                console.error(err);
                setError(err.message);
            }
        }
        fetchEmployee();
    },[id]);

    const handleEditChange=async(e)=>{
        const{name,value}=e.target;
        setFormData(prev=>({...prev,[name]:value}));
    }

    const UpdateEmployee=async(e)=>{
        e.preventDefault();
        setLoading(true);
        setError(null);
        try{
            const token=localStorage.getItem("token");
            const result=await fetch(`http://localhost:4000/api/employee/${id}`,{
                method:"PUT",
                headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`},
                body:JSON.stringify(formData),
            })
            const data=await result.json();
            if(!result.ok){
                throw new Error(data.message||"Employee Update faild");
            }
            alert("✅ Employee Update Successfully");
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
                <h3 className="title">Update Employee</h3>
                <form onSubmit={UpdateEmployee}>
                    <div className="form-group">
                        <label htmlFor="user_id">User *</label>
                        <select id="user_id" name="user_id" required value={formData.user_id} onChange={handleEditChange}>
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
                        <label htmlFor="department_id">Department *</label>
                        <select id="department_id" name="department_id" required value={formData.department_id} onChange={handleEditChange}>
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
                        <label htmlFor="designation_id">Designation *</label>
                        <select id="designation_id" name="designation_id" required value={formData.designation_id} onChange={handleEditChange}>
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
                        <label htmlFor="joining_date">Joining Date *</label>
                        <input type="date" name="joining_date" required value={formData.joining_date} onChange={handleEditChange}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="salary">Salary *</label>
                        <input type="number" name="salary" required value={formData.salary} onChange={handleEditChange}/>
                    </div>

                     <div className="form-group">
                        <label htmlFor="address">Address *</label>
                        <textarea name="address" placeholder="Enter..." required value={formData.address} onChange={handleEditChange}></textarea>
                    </div>

                     <div className="form-group">
                        <label htmlFor="cnic">CNIC *</label>
                        <input type="text" name="cnic" required value={formData.cnic}  onChange={handleEditChange}/>
                    </div>
                    <br/>
                    <button type="submit" className="btn1">Update</button>


                </form>
            </div>
        </div>
        </>
    )
}
export default UpdateEmployee;