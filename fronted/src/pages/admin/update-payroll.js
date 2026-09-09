import React,{useState,useEffect} from "react";
import "../style/style.css";
import {useNavigate, useParams} from "react-router-dom"
const UpdatePayroll=()=>{
    const{id}=useParams();
    const[employeeId,setEmployeeId]=useState("");
    const[employee,setEmployee]=useState([]);
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState(null);
    const navigate=useNavigate();
    const [formData,setFormData]=useState({employee_id:"",basic_salary:"",bonus:"",deduction:"",net_salary:"",month:"",year:""});
   useEffect(()=>{
        const fetchPayroll=async()=>{
            try{
                const token=localStorage.getItem("token");
                const result=await fetch(`http://localhost:4000/api/payroll/${id}`,{
                    headers:{Authorization:`Bearer ${token}`},
                })
                const data=await result.json();
                if(!result.ok){
                    throw new Error(data.message||"Faild to fetch payroll");
                }
                setFormData({
                    employee_id:data.employee_id||"",
                    basic_salary:data.basic_salary||"",
                    bonus:data.bonus||"",
                    deduction:data.deduction||"",
                    net_salary:data.net_salary||"",
                    month:data.month||"",
                    year:data.year||"",

                })
              
            }
            catch(err){
                console.error(err);
                setError(err.messsage);
            }
            finally{
                setLoading(false);
            }
        }
        fetchPayroll();
    },[id]);


    const handleEditChange=async(e)=>{
        const{name,value}=e.target;
        setFormData(prev=>({...prev,[name]:value}));
    }

    const UpdatePayroll=async(e)=>{
        e.preventDefault();
        setLoading(true);
        setError(null);
        try{
            const token=localStorage.getItem("token");
            const result=await fetch(`http://localhost:4000/api/payroll/${id}`,{
                method:"PUT",
                headers:{"content-Type":"application/json",Authorization:`Bearer ${token}`},
                body:JSON.stringify(formData),
            })
            const data=await result.json();

            if(!result.ok){
                throw new Error(data.message||"Payroll update faild");
            }
            alert("✅ Payroll update succesfully");
            navigate("/admin/view-payroll");
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
        const fetchEmployee=async()=>{
            try{
                const token=localStorage.getItem("token");
                const result=await fetch(`http://localhost:4000/api/users`,{
                    headers:{Authorization:`Bearer ${token}`},
                })
                const data=await result.json();
                if(!result.ok){
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
                setError(err.messsage);
            }
            finally{
                setLoading(false);
            }
        }
        fetchEmployee();
    },[]);

    return(
        <>
        <br/><br/>
        <div className="container">
            <div className="home">
                 {error && <p className="error">{error}</p>}
                <h3 className="title">Update Payroll</h3>
                <form onSubmit={UpdatePayroll}>
                    <div className="form-group">
                        <label htmlFor="employee_id">Employee *</label>
                        <select id="employee_id" name="employee_id" required value={formData.employee_id} onChange={handleEditChange}>
                            <option value="">Select</option>
                            {employee.length? (
                                employee.map((e)=>(
                                    <option key={e.user_id} value={e.user_id}>{e.username}</option>
                                ))
                            ):(
                                <option disabled>No Employee Available</option>
                            )}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="basic_salary">Basic Salary *</label>
                        <input type="number" name="basic_salary" required value={formData.basic_salary} onChange={handleEditChange}/>
                    </div>

                    
                    <div className="form-group">
                        <label htmlFor="bonus">Bonus *</label>
                        <input type="number" name="bonus" required placeholder="Enter..." value={formData.bonus} onChange={handleEditChange}/>
                    </div>

                    
                    <div className="form-group">
                        <label htmlFor="deduction">Deduction *</label>
                        <input type="number" name="deduction" required  value={formData.deduction} onChange={handleEditChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="net_salary">Net Salary *</label>
                        <input type="number" name="net_salary" required  value={formData.net_salary} onChange={handleEditChange}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="month">Month *</label>
                        <input type="text" name="month" required  value={formData.month} onChange={handleEditChange}/>
                    </div>

                     <div className="form-group">
                        <label htmlFor="year">Year *</label>
                        <input type="text" name="year" required  value={formData.year} onChange={handleEditChange}/>
                    </div>

                    <br/>
                    <button type="submit" className="btn1">Update</button>


                </form>
            </div>
        </div>
        </>
    )
}
export default UpdatePayroll