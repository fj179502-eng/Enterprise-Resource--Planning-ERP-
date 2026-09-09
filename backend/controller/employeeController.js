import pool from "../config/db.js";
export const addEmployee=async(req,res)=>{
    try{
        const {user_id,department_id,designation_id,joining_date,salary,address,cnic}=req.body;
        if(!user_id || !department_id || !designation_id || !joining_date || !salary || !address || !cnic){
            return res.status(400).json({message:"All fields are required"});
        }
        const result=await pool.query(`INSERT INTO employees(user_id,department_id,designation_id,joining_date,salary,address,cnic)VALUES($1,$2,$3,$4,$5,$6,$7)RETURNING *`,[user_id,department_id,designation_id,joining_date,salary,address,cnic]);
        return res.status(200).json({message:"Employee Add successfully",data:result.rows[0]});
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message:"Database Error"});
    }
}

export const getAllEmployee=async(req,res)=>{
    try{
        const result=await pool.query(`SELECT * FROM employees`);
        return res.status(200).json(result.rows);
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message:"Database Error"});
    }
}

export const getEmployee=async(req,res)=>{
    try{
        const {id}=req.params;
        const result=await pool.query(`SELECT * FROM employees WHERE employee_id=$1`,[id]);
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

export const updateEmployee=async(req,res)=>{
    try{
        const{id}=req.params;
        const {user_id,department_id,designation_id,joining_date,salary,address,cnic}=req.body;
        if(!user_id || !department_id || !designation_id || !joining_date || !salary || !address || !cnic){
            return res.status(400).json({message:"All fields are required"});
        }
        const result=await pool.query(`UPDATE employees SET user_id=$1,department_id=$2,designation_id=$3,joining_date=$4,salary=$5,address=$6,cnic=$7 WHERE employee_id=$8   RETURNING *`,[user_id,department_id,designation_id,joining_date,salary,address,cnic,id]);
        if(result.rows.length===0){
            return res.status(404).json({message:"Data is not found"});
        }
        return res.status(200).json({message:"Employee Update successfully",data:result.rows[0]});
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message:"Database Error"});
    }
}

export const deleteEmployee=async(req,res)=>{
    try{
        const {id}=req.params;
        const result=await pool.query(`DELETE  FROM employees WHERE employee_id=$1 RETURNING *`,[id]);
        if(result.rows.length===0){
            return res.status(404).json({message:"Data is not found"});
        }
        return res.status(200).json({message:"Employee Delete Successfully",data:result.rows[0]});
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message:"Database Error"});
    }
}