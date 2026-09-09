import pool from "../config/db.js";

export const addAttendance=async(req,res)=>{
    try{
        const{employee_id,date,check_in,check_out,status}=req.body;
        if(!employee_id || !date || !check_in || !check_out || !status){
            return res.status(500).json({message:"All fields are required"});
        }
        const result=await pool.query(`INSERT INTO attendances(employee_id,date,check_in,check_out,status)VALUES($1,$2,$3,$4,$5) RETURNING *`,[employee_id,date,check_in,check_out,status]);
        return res.status(200).json({message:"Attendance add Succesfully",data:result.rows[0]});
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message:"Database Error"});
    }
}

export const getAllAttendance=async(req,res)=>{
    try{
        const result=await pool.query(`SELECT * FROM attendances`);
        return res.status(200).json(result.rows);
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message:"Database Error"});
    }
}

export const getAttendance=async(req,res)=>{
    try{
        const{id}=req.params;
        const result=await pool.query(`SELECT * FROM attendances WHERE attendance_id=$1`,[id]);
        if(result.rows.length===0){
            return res.status(404).josn({message:"data is not found"})
        }
        return res.status(200).json(result.rows[0]);
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message:"Database Error"});
    }
}

export const updateAttendance=async(req,res)=>{
    try{
        const {id}=req.params;
        const{employee_id,date,check_in,check_out,status}=req.body;
        if(!employee_id || !date || !check_in || !check_out || !status){
            return res.status(500).json({message:"All fields are required"});
        }
        const result=await pool.query(`UPDATE attendances SET employee_id=$1,date=$2,check_in=$3,check_out=$4,status=$5 WHERE attendance_id=$6 RETURNING *`,[employee_id,date,check_in,check_out,status,id]);
        if(result.rows.length===0){
            return res.status(404).json({message:"Data is not found"});
        }
        return res.status(200).json({message:"Attendance Update Succesfully",data:result.rows[0]});
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message:"Database Error"});
    }
}

export const deleteAttendance=async(req,res)=>{
    try{
        const{id}=req.params;
        const result=await pool.query(`DELETE FROM attendances WHERE attendance_id=$1 RETURNING *`,[id]);
        if(result.rows.length===0){
            return res.status(404).josn({message:"data is not found"})
        }
        return res.status(200).json({message:"Attendance delete successfully",data:result.rows[0]});
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message:"Database Error"});
    }
}