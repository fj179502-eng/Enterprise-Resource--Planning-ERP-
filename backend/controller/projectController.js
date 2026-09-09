import pool from "../config/db.js";

export const addProject=async(req,res)=>{
    try{
        const{project_name,description,start_date,end_date,status,manager_id}=req.body;
        if(!project_name || !description || !start_date || !end_date || !status || !manager_id){
            return res.status(400).json({message:"All fields are required"});
        }
        const result=await pool.query(`INSERT INTO projects(project_name,description,start_date,end_date,status,manager_id)VALUES($1,$2,$3,$4,$5,$6) RETURNING *`,[project_name,description,start_date,end_date,status,manager_id]);
        return res.status(200).json({message:"Project Add Successfully",data:result.rows[0]});
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message:"Database Error"});
    }
}

export const getAllProject=async(req,res)=>{
    try{
        const reuslt=await pool.query(`SELECT * FROM projects`);
        return res.status(200).json(reuslt.rows);
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message:"Database Error"})
    }

}

export const getProject=async(req,res)=>{
    try{
        const{id}=req.params;
        const result=await pool.query(`SELECT * FROM projects WHERE project_id=$1`,[id]);
        if(result.rows.length===0){
            return res.status(404).json({messsage:"Data is not found"});
        }
       return res.status(200).json(result.rows[0]);
    }
    catch(err){
        console.error(err);
        return res.status(500).josn({message:"Database Error"})
    }
}

export const updateProject=async(req,res)=>{
    try{
        const { id } = req.params;
        const{project_name,description,start_date,end_date,status,manager_id}=req.body;
        if(!project_name || !description || !start_date || !end_date || !status || !manager_id){
            return res.status(400).json({message:"All fields are required"});
        }
        const result=await pool.query(`UPDATE projects SET project_name=$1,description=$2,start_date=$3,end_date=$4,status=$5,manager_id=$6 WHERE project_id=$7 RETURNING *`,[project_name,description,start_date,end_date,status,manager_id,id]);
        if(result.rows.length===0){
            return res.status(404).json({message:"Data is not found"});
        }
        return res.status(200).json({message:"Project Update Successfully",data:result.rows[0]});
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message:"Database Error"});
    }
}


export const deleteProject=async(req,res)=>{
    try{
        const{id}=req.params;
        const result=await pool.query(`DELETE FROM projects WHERE project_id=$1 RETURNING *`,[id]);
        if(result.rows.length===0){
            return res.status(404).json({message:"Data is not found"});
        }
        return res.status(200).json({message:"Project delete successfully",data:result.rows[0]});
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message:"Database Error"});
    }
}