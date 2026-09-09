import React, { useState, useContext } from "react";
import "../style/style.css";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
import logo from "../image/images.png";

const Registration = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [dob, setDOB] = useState("");
    const [gender, setGender] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const [role, setRole] = useState("");
    const { login } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const onSubmitForm = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const formData = new FormData();
            formData.append("username", userName);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("phone", phone);
            formData.append("gender", gender);
            formData.append("dob", dob);
            formData.append("role", role);
            if (profileImage) { formData.append("profile_image", profileImage); }

            const result = await fetch(`http://localhost:4000/api/register`, {
                method: "POST",
                body: formData,
            })
            const data = await result.json();
            if (result.ok) {
                localStorage.setItem("token", data.token);
                const userData = {
                    user_id: data.user?.user_id || "",
                    username: data.user?.username || "",
                    email: data.user?.email || "",
                    password: data.user?.password || "",
                    phone: data.user?.phone || "",
                    dob: data.user?.dob || "",
                    profile_image: data.user?.profile_image || "",
                    roll: data.user?.roll || "",
                };
                login(userData);
                alert("✅ Your registration is successfully");
                navigate("/admin/login")

            }
            else {
                setError(typeof data === "string" ? data : data.message || "Registration Failed please try again");
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

    return (
        <section className="hero">
            <br />
            <div className="container">
                <div className="home">
                    <img src={logo} alt="ERP Logo" className="logo" align="center" />
                    <h3 className="title">Registration</h3>
                    <form onSubmit={onSubmitForm}>
                        <div className="form-group">
                            <label htmlFor="userName"> Username *</label>
                            <input type="text" name="userName" required placeholder="Enter..." value={userName} onChange={(e) => setUserName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email"> Email *</label>
                            <input type="email" name="email" required placeholder="Eg:abc@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="passowrd"> Password *</label>
                            <input type="password" name="password" required placeholder="Enter..." value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone"> Phone *</label>
                            <input type="text" name="phone" required placeholder="Enter..." value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="dob"> Date Of Birth *</label>
                            <input type="date" name="dob" required value={dob} onChange={(e) => setDOB(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="gender"> Gender *</label>
                            <select id="gender" name="gender" required value={gender} onChange={(e) => setGender(e.target.value)}>
                                <option value="">Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="profileImage"> Profile Image * </label>
                            <input type="file" id="profileImage" name="profile_image" accept="image/*" required onChange={(e) => setProfileImage(e.target.files[0])} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="role"> Role *</label>
                            <input type="text" name="role" required placeholder="Enter..." value={role} onChange={(e) => setRole(e.target.value)} />
                        </div>




                        <br />
                        <button type="submit" className="btn1">Sign Up</button><br />
                        <p>have you already an account please ?<Link to="/admin/login"> Login</Link></p>

                        <p><br /></p>

                        {error && <p className="error">{error}</p>}
                    </form>
                </div><p><br /></p>
            </div>
            <p><br /></p>
        </section>


    )
}
export default Registration;