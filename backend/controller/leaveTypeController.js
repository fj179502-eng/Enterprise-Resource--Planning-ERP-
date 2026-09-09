import pool from "../config/db.js";

export const addLeaveType=async(req,res)=>{
    try{
        const{leave_name}=req.body;
        if(!leave_name){
            return res.status(400).json({message:"All Fields are required"})
        }
        const result=await pool.query(`INSERT INTO leave_types(leave_name)VALUES($1)RETURNING *`,[leave_name]);
        return res.status(200).json({message:"Leave type add successfully",data:result.rows[0]});
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message:"Database Error"});
    }
}

export const getAllLeaveType=async(req,res)=>{
    try{
        const result=await pool.query(`SELECT * FROM leave_types`);
        return res.status(200).json(result.rows);
    }
    catch(err){
        console.error(err);
        return ress.status(500).json({message:"Database error"});
    }
}

export const getLeaveType=async(req,res)=>{
    try{
        const{id}=req.params;
        const result=await pool.query(`SELECT * FROM leave_types WHERE leave_type_id=$1`,[id]);
        if(result.rows.length===0){
            return res.status(404).json({message:"Data is not found"});
        }
        return res.status(200).json(result.rows[0]);
    }
    catch(err){
        console.error(err);
        return ress.status(500).json({message:"Database error"});
    }
}

export const  updateLeaveType=async(req,res)=>{
    try{
        const{id}=req.params;
        const{leave_name}=req.body;
        if(!leave_name){
            return res.status(400).json({message:"All Fields are required"})
        }
        const result=await pool.query(`UPDATE leave_types SET leave_name=$1 WHERE leave_type_id=$2 RETURNING *`,[leave_name,id]);
        if(result.rows.length===0){
            return res.status(404).json({message:"Data is not found"});
        }
        return res.status(200).json({message:"Leave type update successfully",data:result.rows[0]});
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message:"Database Error"});
    }
}


export const deleteLeaveType=async(req,res)=>{
    try{
        const{id}=req.params;
        const result=await pool.query(`DELETE FROM leave_types WHERE leave_type_id=$1 RETURNING *`,[id]);
        if(result.rows.length===0){
            return res.status(404).json({message:"Data is not found"});
        }
        return res.status(200).json({message:"Leave Type Delete succesfully", data:result.rows[0]});
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message:"Database error"});
    }
}