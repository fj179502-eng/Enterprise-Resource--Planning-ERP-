import React, { useState, useContext } from "react";
import "../style/style.css";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
import logo from "../image/images.png";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const onSubmitForm = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const body = { email, password };

            const result = await fetch(`http://localhost:4000/api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
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
                if (data.user?.role === "admin") {
                    navigate("/admin/adminDashboard");
                }
                else if (data.user?.role === "user") {
                    navigate("/user/userDashboard")
                }
                else {
                    navigate("/");
                }

            }
            else {
                setError(typeof data === "string" ? data : data.message || "Login Failed please try again");
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
                    <h3 className="title">Welcome To Login System</h3>
                    <form onSubmit={onSubmitForm} >
                        <div className="form-group">
                            <label htmlFor="email"> Email *</label>
                            <input type="email" name="email" required placeholder="Eg:abc@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="passowrd"> Password *</label>
                            <input type="password" name="password" required placeholder="Enter..." value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <div className="hero-card1">
                            <div><input type="checkbox" /><span> Remember Me</span></div>
                            <Link to="/forget-password">
                                Forgot Password?</Link></div>
                        <br />
                        <button type="submit" className="btn1">Sign In</button><br />
                        <p align="center">_________Or Container_________</p>

                        <div className="google-grid">
                            <button type="button" className="google-btn">
                                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />  Google
                            </button>
                            <Link to="/admin/registration" className="signup-box"> Sign Up</Link>
                        </div><p><br /></p>

                        {error && <p className="error">{error}</p>}
                    </form>
                </div><p><br /></p>
            </div>
            <p><br /></p>
        </section>


    )
}
export default Login;