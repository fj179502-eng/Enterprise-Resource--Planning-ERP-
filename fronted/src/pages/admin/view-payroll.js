import React,{useState,useEffect} from "react";
import "../style/style.css";
import {Link} from "react-router-dom"
const ViewPayroll=()=>{
    const[payroll,setPayroll]=useState([]);
    const[employee,setEmployee]=useState([]);
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState(null);

     useEffect(()=>{
        const fetchPayroll=async()=>{
            try{
                const token=localStorage.getItem("token");
                const result=await fetch(`http://localhost:4000/api/payroll`,{
                    headers:{Authorization:`Bearer ${token}`},
                })
                const data=await result.json();
                if(!result.ok){
                    throw new Error(data.message||"Faild to fetch payroll");
                }
                if(Array.isArray(data)){
                    setPayroll(data);
                }
                else if(Array.isArray(data.data)){
                    setPayroll(data.data);
                }
                else{
                    setPayroll([]);
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
        fetchPayroll();
    },[])

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


    
    const deletePayroll=async(id)=>{
        if(!window.confirm("Are you sure you went to delete the payroll")) return;
        try{
            const token=localStorage.getItem("token");
            const result=await fetch(`http://localhost:4000/api/payroll/${id}`,{
                method:"DELETE",
                headers:{Authorization:`Bearer ${token}`},
            })
            const data=await result.json();
            if(!result.ok){
                throw new Error(data.message||"Payroll delete faild");
            }
            alert("✅ Payroll delete successfully");
            setPayroll(prev=>prev.filter(p=>String(p.payroll_id) !==String(id)));
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
                <h3 className="title">View Payroll</h3>

                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>Sno#</th>
                            <th>Employee</th>
                            <th>Basic Salary</th>
                            <th>Bonus</th>
                            <th>Deduction</th>
                            <th>Net salary</th>
                            <th>Month</th>
                            <th>Year</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {payroll.length===0 ? (
                        <tr>
                            <td colSpan="8" align="center">Data is not found</td>
                        </tr>
                    ):(
                        payroll.map((p,index)=>{
                            return(
                                <tr key={p.payroll_id}>
                                    <td>{index+1}</td>
                                    <td>{
                                        employee.find(e=>e.user_id===p.employee_id)?.username||"N/a"
                                        }
                                    </td>
                                    
                                    <td>{p.basic_salary}</td>
                                    <td>{p.bonus}</td>
                                    <td>{p.deduction}</td>
                                    <td>{p.net_salary}</td>
                                    <td>{p.month}</td>
                                    <td>{p.year}</td>
                                    <td>
                                        <Link to={`/admin/update-payroll/${p.payroll_id}`} className="btn btn-success">Edit</Link>&nbsp;
                                        <button onClick={()=>deletePayroll(p.payroll_id)} className="btn btn-danger">Delete</button>
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
export default ViewPayroll