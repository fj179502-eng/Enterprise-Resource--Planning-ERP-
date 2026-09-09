import React, { useState, useEffect } from "react";
import "../style/style.css";
import { useNavigate, useParams } from "react-router-dom";
const UpdateDesignation = () => {
    const { id } = useParams();
    const [department, setDepartment] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ designation_name: "", department_id: "" });
    useEffect(() => {
        const fetchDesignation = async () => {
            try {
                const token = localStorage.getItem("token");
                const result = await fetch(`http://localhost:4000/api/designation/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                const data = await result.json();
                if (!result.ok) {
                    throw new Error(data.message || "Faild to fetch Designation");
                }
                setFormData({
                    designation_name: data.designation_name || "",
                    department_id: data.department_id || "",
                })
            }
            catch (err) {
                console.error(err);
                setError(err.message);
            }
            finally {
                setLoading(false);
            }
        }
        fetchDesignation();
    }, [id]);

    const handleEditChange = async (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }
    const updateDesgination = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem("token");
            const result = await fetch(`http://localhost:4000/api/designation/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify(formData),
            });
            const data = await result.json();
            if (!result.ok) {
                throw new Error(data.message || "Designation update faild");
            }
            alert("✅ designation update sccessfully");
            navigate("/admin/view-designation");
        }
        catch (err) {
            console.error(err);
            setError(err.message);
        }
    }

    useEffect(() => {
        const fetchDepartment = async () => {
            try {
                const token = localStorage.getItem("token");
                const result = await fetch(`http://localhost:4000/api/department`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                const data = await result.json();
                if (!result.ok) {
                    throw new Error(data.message || "Faild to fetch Department");
                }
                if (Array.isArray(data)) {
                    setDepartment(data);
                }
                else if (Array.isArray(data.data)) {
                    setDepartment(data.data);
                }
                else {
                    setDepartment([]);
                }
            }
            catch (err) {
                console.error(err);
                setError(err.message);
            }
            finally {
                setLoading(false);
            }
        }
        fetchDepartment();
    }, [])


    return (
        <>
            <br /><br />
            <div className="container">
                <div className="home">
                    {error && <p className="error">{error}</p>}
                    <h3 className="title">Update Designation</h3>
                    <form onSubmit={updateDesgination}>
                        <div className="form-group">
                            <label htmlFor="desgination_name">Designation Name *</label>
                            <input type="text" name="designation_name" required value={formData.designation_name} onChange={handleEditChange} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="department_id">Department *</label>
                            <select id="depatment_id" name="department_id" value={formData.department_id} onChange={handleEditChange}>
                                <option value="">Select</option>
                                {department.length > 0 ? (
                                    department.map((d) => (
                                        <option key={d.department_id} value={d.department_id}>{d.department_name}</option>
                                    ))
                                ) : (
                                    <option disabled>No Department Available</option>
                                )}
                            </select>
                        </div>
                        <br />
                        <button type="submit" className="btn1">Update</button>

                    </form>
                </div>
            </div>
        </>
    )
}
export default UpdateDesignation;