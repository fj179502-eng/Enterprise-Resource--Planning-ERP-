import React,{useState,useEffect} from "react";
import "../style/style.css";
import {useNavigate} from "react-router-dom"
const AddPayroll=()=>{
    const[employeeId,setEmployeeId]=useState("");
    const[employee,setEmployee]=useState([]);
    const[basicSalary,setBasicSalary]=useState("");
    const[bonus,setBonus]=useState("");
    const[deduction,setDeduction]=useState("");
    const[netSalary,setNetSalary]=useState("");
    const[month,setMonth]=useState("");
    const[year,setYear]=useState("");
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState(null);
    const navigate=useNavigate();
    const onSubmitForm=async(e)=>{
        e.preventDefault();
        setLoading(true);
        setError(null);
        try{
            const body={employee_id:employeeId,basic_salary:basicSalary,bonus:bonus,deduction:deduction,net_salary:netSalary,month:month,year:year};
            const token=localStorage.getItem("token");
            const result=await fetch(`http://localhost:4000/api/payroll`,{
                method:"POST",
                headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`},
                body:JSON.stringify(body),
            })
            const data=await result.json();
            if(!result.ok){
                throw new Error(data.message||"Faild to fetch payroll");
            }
            alert("✅ Payroll add successfully");
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
    },[])

    return(
        <>
        <br/><br/>
        <div className="container">
            <div className="home">
                 {error && <p className="error">{error}</p>}
                <h3 className="title">Add Payroll</h3>
                <form onSubmit={onSubmitForm}>
                    <div className="form-group">
                        <label htmlFor="employeeId">Employee *</label>
                        <select id="employeId" name="employeeId" required value={employeeId} onChange={(e)=>setEmployeeId(e.target.value)}>
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
                        <label htmlFor="basicSalary">Basic Salary *</label>
                        <input type="number" name="basicSalary" required placeholder="Enter..." value={basicSalary} onChange={(e)=>setBasicSalary(e.target.value)}/>
                    </div>

                    
                    <div className="form-group">
                        <label htmlFor="bonus">Bonus *</label>
                        <input type="number" name="bonus" required placeholder="Enter..." value={bonus} onChange={(e)=>setBonus(e.target.value)}/>
                    </div>

                    
                    <div className="form-group">
                        <label htmlFor="deduction">Deduction *</label>
                        <input type="number" name="deduction" required placeholder="Enter..." value={deduction} onChange={(e)=>setDeduction(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="netSalary">Net Salary *</label>
                        <input type="number" name="netSalary" required placeholder="Enter..." value={netSalary} onChange={(e)=>setNetSalary(e.target.value)}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="month">Month *</label>
                        <input type="text" name="month" required placeholder="Enter..." value={month} onChange={(e)=>setMonth(e.target.value)}/>
                    </div>

                     <div className="form-group">
                        <label htmlFor="year">Year *</label>
                        <input type="text" name="year" required placeholder="Enter..." value={year} onChange={(e)=>setYear(e.target.value)}/>
                    </div>

                    <br/>
                    <button type="submit" className="btn1">Add</button>


                </form>
            </div>
        </div>
        </>
    )
}
export default AddPayroll