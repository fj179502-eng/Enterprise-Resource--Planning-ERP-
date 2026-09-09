import React, { useState, useEffect } from "react";
import "../style/style.css";
import { useNavigate, useParams } from "react-router-dom";

const UpdateLeaveType = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({leave_name: ""});

    const navigate = useNavigate();

    useEffect(() => {
        const fetchLeaveType = async () => {
            try {
                const token = localStorage.getItem("token");
                const result = await fetch(`http://localhost:4000/api/leaveType/${id}`,{
                    headers: {Authorization: `Bearer ${token}`}
                });
                const data = await result.json();
                if (!result.ok) {
                    throw new Error(data.message || "Failed to fetch leave type");
                }

                setFormData({
                    leave_name: data.leave_name || ""
                });
            } 
            catch (err) {
                console.error(err);
                setError(err.message);
            } 
            finally {
                setLoading(false);
            }
        };

        fetchLeaveType();
    }, [id]);

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev,[name]: value}));
    };

    const handleUpdateLeaveType = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem("token");
            const result = await fetch(`http://localhost:4000/api/leaveType/${id}`,{
                method: "PUT",
                headers: {"Content-Type": "application/json",Authorization: `Bearer ${token}`},
                body: JSON.stringify(formData)
            });
            const data = await result.json();
            if (!result.ok) {
                throw new Error(data.message || "Leave Type Update Failed");
            }
            alert("✅ Leave Type Updated Successfully");
            navigate("/admin/view-leaveType");
        } 
        catch (err) {
            console.error(err);
            setError(err.message);
        } 
        finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <>
        <br /><br />
            <div className="container">
                <div className="home">
                    {error && <p className="error">{error}</p>}
                    <h3 className="title">
                        Update Leave Type
                    </h3>
                    <form onSubmit={handleUpdateLeaveType}>
                        <div className="form-group">
                            <label htmlFor="leave_name"> Leave Name *</label>
                            <input type="text" id="leave_name" name="leave_name" required value={formData.leave_name}  onChange={handleEditChange}/>
                        </div>
                        <br />
                        <button type="submit" className="btn1" disabled={loading}>{loading ? "Updating..." : "Update"}</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default UpdateLeaveType;