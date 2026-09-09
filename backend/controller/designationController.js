import pool from "../config/db.js";

export const addDesignation=async(req,res)=>{
    try{
        const {designation_name,department_id}=req.body;
        if(!designation_name || !department_id){
            return res.status(400).json({message:"All fields are required"});
        }
        const result=await pool.query(`INSERT INTO designations (designation_name,department_id)VALUES($1,$2) RETURNING *`,[designation_name,department_id]);
        return res.status(200).json({message:"designation add successfully",data:result.rows[0]});
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message:"Database Error"});
    }
}

export const getAllDesignation=async(req,res)=>{
    try{
        const result=await pool.query(`SELECT * FROM designations`);
        return res.status(200).json(result.rows);
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message:"Database Error"});
    }
}

export const getDesignation=async(req,res)=>{
    try{
        const {id}=req.params;
        const result=await pool.query(`SELECT * FROM designations WHERE designation_id=$1`,[id]);
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



export const updateDesignation=async(req,res)=>{
    try{
        const{id}=req.params;
        const {designation_name,department_id}=req.body;
        if(!designation_name || !department_id){
            return res.status(400).json({message:"All fields are required"});
        }
        const result=await pool.query(`UPDATE designations SET designation_name=$1,department_id=$2 WHERE designation_id=$3 RETURNING *`,[designation_name,department_id,id]);
        if(result.rows.length===0){
            return res.status(404).json({message:"Data is not found"});
        }
        return res.status(200).json({message:"designation update successfully",data:result.rows[0]});
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message:"Database Error"});
    }
}


export const deleteDesignation=async(req,res)=>{
    try{
        const {id}=req.params;
        const result=await pool.query(`DELETE FROM designations WHERE designation_id=$1 RETURNING *`,[id]);
        if(result.rows.length===0){
            return res.status(404).json({message:"Data is not found"});
        }
        return res.status(200).json({message:"Designation Delete Successfully",data:result.rows[0]});
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message:"Database Error"});
    }
}
