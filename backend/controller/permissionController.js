import pool from "../config/db.js";

export const addPermission=async(req,res)=>{
    try{
        const{permission_name}=req.body;
        if(!permission_name){
            return res.status(400).json({message:"All fields are required"});
        }
        const result=await pool.query(`INSERT INTO permissions(permission_name)VALUES($1) RETURNING *`,[permission_name]);
        return res.status(200).json({message:"Permission Add Successfully",data:result.rows[0]});
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message:"Database Error"});
    }
}

export const getAllPermission=async(req,res)=>{
    try{
        const result=await pool.query(`SELECT * FROM permissions`);
        return res.status(200).json(result.rows)
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message:"Database Error"});
    }
}

export const getPermission=async(req,res)=>{
    try{
        const{id}=req.params
        const result=await pool.query(`SELECT * FROM permissions WHERE permission_id=$1`,[id]);
        if(result.rows.length===0){
            return res.status(404).json({messae:"Data is not found"});
        }
        return res.status(200).json(result.rows[0])
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message:"Database Error"});
    }
}
export const updatePermission=async(req,res)=>{
    try{
        const{id}=req.params;
        const{permission_name}=req.body;
        if(!permission_name){
            return res.status(400).json({message:"All fields are required"});
        }
        const result=await pool.query(`UPDATE permissions SET permission_name=$1 WHERE permission_id=$2 RETURNING *`,[permission_name,id]);
        if(result.rows.length===0){
            return res.status(404).json({message:"Data is not found"});
        }
        return res.status(200).json({message:"Permission Update Successfully",data:result.rows[0]});
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message:"Database Error"});
    }
}

export const deletePermission=async(req,res)=>{
    try{
        const{id}=req.params
        const result=await pool.query(`DELETE FROM permissions WHERE permission_id=$1 RETURNING *`,[id]);
        if(result.rows.length===0){
            return res.status(404).json({messae:"Data is not found"});
        }
        return res.status(200).json({message:"Permission delete successfully",data:result.rows[0]})
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message:"Database Error"});
    }
}