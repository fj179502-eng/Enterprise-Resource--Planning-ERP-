import pool from "../config/db.js";

export const addRolePermission=async(req,res)=>{
    try{
        const{user_id,permission_id}=req.body;
        if(!user_id || !permission_id){
            return res.status(404).json({message:"All fileds are required"});
        }
        const result=await pool.query(`INSERT INTO role_permissions(user_id,permission_id)VALUES($1,$2) RETURNING *`,[user_id,permission_id]);
        return res.status(200).json({message:"Role Permission add succesfully",data:result.rows[0]});
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message:"Database Error"});
    }
}

export const getAllRolePermission=async(req,res)=>{
    try{
        const result=await pool.query(`SELECT * FROM role_permissions`);
        return res.status(200).json(result.rows);
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message:"Databe Error"});
    }
}

export const getRolePermission = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(`SELECT * FROM role_permissions WHERE role_permission_id=$1`,[id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Data is not found"});
        }

        return res.status(200).json(result.rows[0]);
    }
    catch (err) {
        console.error(err);

        return res.status(500).json({
            message: "Database Error"
        });
    }
};

export const updateRolePermission=async(req,res)=>{
    try{
        const{id}=req.params;
        const{user_id,permission_id}=req.body;
        if(!user_id || !permission_id){
            return res.status(404).json({message:"All fileds are required"});
        }
        const result=await pool.query(`UPDATE role_permissions SET user_id=$1,permission_id=$2 WHERE role_permission_id=$3 RETURNING *`,[user_id,permission_id,id]);
        if(result.rows.length===0){
            return res.status(404).json({message:"Data is not found"});
        }
        return res.status(200).json({message:"Role Permission update succesfully",data:result.rows[0]});
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message:"Database Error"});
    }
}


export const deleteRolePermission=async(req,res)=>{
    try{
        const{id}=req.params;
        const result=await pool.query(`DELETE FROM role_permissions WHERE role_permission_id=$1 RETURNING *`,[id]);
        if(result.rows.length===0){
            return res.status(404).json({message:"Data is not found"});
        }
        return res.status(200).json({message:"Role Permission delete successfully",data:result.rows[0]});
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message:"Database Error"});
    }
}