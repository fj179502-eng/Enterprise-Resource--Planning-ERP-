import pool from "../config/db.js";

export const addTask=async(req,res)=>{
    try{
        const {project_id,employee_id,title,description,deadline,status}=req.body;
        if(!project_id || !employee_id || !title || !description || !deadline || !status){
            return res.status(400).json({message:"All Fields are required"});
        }
        const result=await pool.query(`INSERT INTO tasks (project_id,employee_id,title,description,deadline,status)VALUES($1,$2,$3,$4,$5,$6) RETURNING *`,[project_id,employee_id,title,description,deadline,status]);
        return res.status(200).json({message:"Task add successfully",data:result.rows[0]});
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message:"Database Error"});
    }
}


export const getAllTask=async(req,res)=>{
    try{
        const result=await pool.query(`SELECT * FROM tasks`);
        return res.status(200).json(result.rows);
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message:"Database Error"});
    }
}

export const getTask=async(req,res)=>{
    try{
        const {id}=req.params;
        const result=await pool.query(`SELECT * FROM tasks WHERE task_id=$1`,[id]);
        if(result.rows.length===0){
            return res.json(404).json({message:"Data is not Found"});
        }
        return res.status(200).json(result.rows[0]);
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message:"Database Error"});
    }
}

export const updateTask=async(req,res)=>{
    try{
        const{id}=req.params;
        const {project_id,employee_id,title,description,deadline,status}=req.body;
        if(!project_id || !employee_id || !title || !description || !deadline || !status){
            return res.status(400).json({message:"All Fields are required"});
        }
        const result=await pool.query(`UPDATE tasks SET project_id=$1,employee_id=$2,title=$3,description=$4,deadline=$5,status=$6 WHERE task_id=$7 RETURNING *`,[project_id,employee_id,title,description,deadline,status,id]);
        if(result.rows.length===0){
            return res.status(404).json({message:"Data is not found"});
        }
        return res.status(200).json({message:"Task Update successfully",data:result.rows[0]});
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message:"Database Error"});
    }
}

export const deleteTask=async(req,res)=>{
    try{
        const {id}=req.params;
        const result=await pool.query(`DELETE FROM tasks WHERE task_id=$1 RETURNING *`,[id]);
        if(result.rows.length===0){
            return res.json(404).json({message:"Data is not Found"});
        }
        return res.status(200).json({message:"Task delete successfully",data:result.rows[0]});
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message:"Database Error"});
    }
}