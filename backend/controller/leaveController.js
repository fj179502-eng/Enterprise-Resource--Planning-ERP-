import pool from "../config/db.js";

export const addLeave=async(req,res)=>{
    try{
        const {employee_id,leave_type_id,start_date,end_date,reason,status}=req.body;
        if(!employee_id || !leave_type_id ||!start_date || !end_date || !reason || !status){
            return res.status(400).json({message:"All fields are required"});
        }
        const result=await pool.query(`INSERT INTO leaves(employee_id,leave_type_id,start_date,end_date,reason,status)VALUES($1,$2,$3,$4,$5,$6)RETURNING *`,[employee_id,leave_type_id,start_date,end_date,reason,status]);
        return res.status(200).json({message:"Leave Add Successfully",data:result.rows[0]});
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message:"Database Error"});
    }
}

export const getAllLeave=async(req,res)=>{
    try{
        const result=await pool.query(`SELECT * FROM leaves`);
        return res.status(200).json(result.rows);
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message:"Database Error"});
    }
}

export const getLeave=async(req,res)=>{
    try{
        const{id}=req.params;
        const result=await pool.query(`SELECT * FROM leaves WHERE leave_id=$1`,[id]);
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

export const updateLeave=async(req,res)=>{
    try{
        const{id}=req.params;
        const {employee_id,leave_type_id,start_date,end_date,reason,status}=req.body;
        if(!employee_id || !leave_type_id ||!start_date || !end_date || !reason || !status){
            return res.status(400).json({message:"All fields are required"});
        }
        const result=await pool.query(`UPDATE leaves SET employee_id=$1,leave_type_id=$2,start_date=$3,end_date=$4,reason=$5,status=$6 WHERE leave_id=$7 RETURNING *`,[employee_id,leave_type_id,start_date,end_date,reason,status,id]);
        if(result.rows.length===0){
            return res.status(404).json({message:"Data is not found"});
        }
        return res.status(200).json({message:"Leave Update Successfully",data:result.rows[0]});
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message:"Database Error"});
    }
}

export const deleteLeave=async(req,res)=>{
    try{
        const{id}=req.params;
        const result=await pool.query(`DELETE  FROM leaves WHERE leave_id=$1 RETURNING *`,[id]);
        if(result.rows.length===0){
            return res.status(404).json({message:"Data is not found"});
        }
        return res.status(200).json({message:"Leave Delete Successfully", data:result.rows[0]});
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message:"Database Error"});
    }
}