import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    let user = null;
    try {
        user = userStr ? JSON.parse(userStr) : null;
    } catch (e) {
        console.error("Error parsing user state:", e);
    }

    if (!token) {
        return <Navigate to="/admin/login" replace />;
    }

    if (role && user && user.role && user.role.toLowerCase() !== role.toLowerCase()) {
        if (user.role.toLowerCase() === "admin") {
            return <Navigate to="/admin/adminDashboard" replace />;
        } else {
            return <Navigate to="/user/userDashboard" replace />;
        }
    }

    return children;
};

export default ProtectedRoute;