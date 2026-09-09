import pool from "../config/db.js";

export const addNotification = async (req, res) => {
    try {
        const { title, message, user_id } = req.body;

        if (!title || !message || !user_id) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const result = await pool.query(
            `INSERT INTO notifications (title, message, user_id)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [title, message, user_id]
        );

        return res.status(201).json({
            message: "Notification Add Successfully",
            data: result.rows[0]
        });

    } catch (err) {
        console.error("Add Notification Error:", err);

        return res.status(500).json({
            message: "Database Error",
            error: err.message
        });
    }
};


export const getAllNotification = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT * FROM notifications ORDER BY notification_id DESC`
        );

        return res.status(200).json(result.rows);

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: "Database Error"
        });
    }
};


export const getNotification = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            `SELECT * FROM notifications WHERE notification_id = $1`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Data is not found"
            });
        }

        return res.status(200).json(result.rows[0]);

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: "Database Error"
        });
    }
};


export const updateNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, message, user_id } = req.body;

        if (!title || !message || !user_id) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const result = await pool.query(
            `UPDATE notifications
             SET title = $1, message = $2, user_id = $3
             WHERE notification_id = $4
             RETURNING *`,
            [title, message, user_id, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Data is not found"
            });
        }

        return res.status(200).json({
            message: "Notification Update Successfully",
            data: result.rows[0]
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: "Database Error"
        });
    }
};


export const deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            `DELETE FROM notifications
             WHERE notification_id = $1
             RETURNING *`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Data is not found"
            });
        }

        return res.status(200).json({
            message: "Notification delete successfully",
            data: result.rows[0]
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: "Database Error"
        });
    }
};