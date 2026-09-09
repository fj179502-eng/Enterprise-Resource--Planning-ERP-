import pool from "../config/db.js";

export const addPayroll=async(req,res)=>{
    try{
        const {employee_id,basic_salary,bonus,deduction,net_salary,month,year}=req.body;
        if(!employee_id || !basic_salary || !bonus || !deduction || !net_salary || !month || !year){
            return res.status(400).json({message:"All fields are required"});
        }
        const result=await pool.query(`INSERT INTO payroll(employee_id,basic_salary,bonus,deduction,net_salary,month,year)VALUES($1,$2,$3,$4,$5,$6,$7)RETURNING *`,[employee_id,basic_salary,bonus,deduction,net_salary,month,year]);
        return res.status(200).json({message:"Payroll add successfully",data:result.rows[0]});
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message:"Database Error"});
    }
}

export const getAllPayroll=async(req,res)=>{
    try{
        const result=await pool.query(`SELECT * FROM payroll`);
        return res.status(200).json(result.rows);
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message:"Database Error"});
    }
}

export const getPayroll=async(req,res)=>{
    try{
        const{id}=req.params;
        const result=await pool.query(`SELECT * FROM payroll WHERE payroll_id=$1`,[id]);
        if(result.rows.length===0){
            return res.status(404).json({message:"Data is not found"});
        }
        return res.status(200).json(result.rows[0]);
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message:"Database Error"});
    }
}

export const updatePayroll=async(req,res)=>{
    try{
        const{id}=req.params;
        const {employee_id,basic_salary,bonus,deduction,net_salary,month,year}=req.body;
        if(!employee_id || !basic_salary || !bonus || !deduction || !net_salary || !month || !year){
            return res.status(400).json({message:"All fields are required"});
        }
        const result=await pool.query(`UPDATE payroll SET employee_id=$1,basic_salary=$2,bonus=$3,deduction=$4,net_salary=$5,month=$6,year=$7 WHERE payroll_id=$8 RETURNING *`,[employee_id,basic_salary,bonus,deduction,net_salary,month,year,id]);
        if(result.rows.length===0){
            return res.status(404).josn({mesage:"Data is not found"});
        }
        return res.status(200).json({message:"Payroll Updae successfully",data:result.rows[0]});
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message:"Database Error"});
    }
}

export const deletePayroll=async(req,res)=>{
    try{
        const{id}=req.params;
        const result=await pool.query(`DELETE FROM payroll WHERE payroll_id=$1 RETURNING *`,[id]);
        if(result.rows.length===0){
            return res.status(404).json({message:"Data is not found"});
        }
        return res.status(200).json({message:"Payroll delete successfully",data:result.rows[0]});
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message:"Database Error"});
    }
}