export const allowRoles = (...roles) => {
    return (req, res, next) => {
        console.log("Allowd Roles", roles);
        console.log("User Role:", req.user?.role);
        if (!req.user || !req.user.role) {
            return res.status(403).json({ message: "Access Denied" });
        }
        const userRole = req.user.role.toLowerCase();
        const allowRoles = roles.map(role => role.toLowerCase());
        if (!allowRoles.includes(userRole)) {
            console.log("Access Denied:Role Mismatch");
            return res.status(403).json({ message: "Access Denied" });
        }
        next();
    }
}
