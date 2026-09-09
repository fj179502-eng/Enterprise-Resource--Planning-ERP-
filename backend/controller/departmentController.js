import pool from "../config/db.js";

export const addDepartment = async (req, res) => {
    try {
        const { department_name } = req.body;
        if (!department_name) {
            return res.status(400).json({ message: "All Fields are required" });
        }
        const result = await pool.query(`INSERT INTO departments(department_name)VALUES($1) RETURNING *`, [department_name]);
        return res.status(200).json({ message: "Department Add Successfully", data: result.rows[0] });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Database Error" });
    }
}

export const getAllDepartment = async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM departments`)
        return res.status(200).json(result.rows);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Database Error" });
    }
}


export const getDepartment = async (req, res) => {
    try {
        const { id } = req.params
        const result = await pool.query(`SELECT * FROM departments WHERE department_id=$1`, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Data is not found" });
        }
        return res.status(200).json(result.rows[0]);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Database Error" });
    }
}


export const updateDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const { department_name } = req.body;
        if (!department_name) {
            return res.status(400).json({ message: "All Fields are required" });
        }
        const result = await pool.query(`UPDATE departments SET department_name=$1 WHERE department_id=$2 RETURNING *`, [department_name, id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Data is not found" });
        }
        return res.status(200).json({ message: "Department Update Successfully", data: result.rows[0] });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Database Error" });
    }
}

export const deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params
        const result = await pool.query(`DELETE FROM departments WHERE department_id=$1 RETURNING *`, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Data is not found" });
        }
        return res.status(200).json({ message: "Department delete successfully", data: result.rows[0] });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Database Error" });
    }
}