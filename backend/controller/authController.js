import bcrypt from "bcryptjs";
import pool from "../config/db.js";
import { generateToken } from "../utils/generateToken.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { username, email, password, phone, dob, gender, role } = req.body;
        const profile_image = req.file ? req.file.filename : null;

        if (!username || !email || !password || !phone || !dob || !gender || !profile_image || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            `INSERT INTO users (username, email, password, phone, dob, gender, role, profile_image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)RETURNING *`, [username, email, hashedPassword, phone, dob, gender, role, profile_image]
        );
        return res.status(201).json({
            message: "Registration successful", token: generateToken(result.rows[0]), user: {
                user_id: result.rows[0].user_id,
                username: result.rows[0].username,
                email: result.rows[0].email,
                phone: result.rows[0].phone,
                dob: result.rows[0].dob,
                gender: result.rows[0].gender,
                role: result.rows[0].role,
                profile_image: result.rows[0].profile_image,
            }
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Database Error", error: err.message });
    }
}

export const getAllUser = async (req, res) => {
    try {
        const result = await pool.query(`SELECT user_id,username,email,password,phone,dob,gender,profile_image,role FROM users`);
        return res.status(200).json(result.rows);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Database Error" });
    }
}

export const getUser = async (req, res) => {
    try {
        const user_id = req.user.user_id
        const result = await pool.query(`SELECT user_id,username,email,password,phone,dob,gender,profile_image,role FROM users WHERE user_id=$1`, [user_id]);
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

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [email]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Data is not found" });
        }
        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid Email or Password" });
        }
        const token = jwt.sign(
            { user_id: user.user_id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "15d" },
        )
        return res.status(200).json({
            message: "Login Successfully", token, user: {
                user_id: user.user_id,
                username: user.username,
                email: user.email,
                phone: user.phone,
                dob: user.dob,
                gender: user.gender,
                role: user.role,
                profile_image: user.profile_image,
            }
        })
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Database Error", error: err.message });
    }
}