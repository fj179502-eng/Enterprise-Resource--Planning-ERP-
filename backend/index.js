import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./route/authRoute.js";
import departmentRoute from "./route/departmentRoute.js";
import designationRoute from "./route/designationRoute.js";
import employeeRoute from "./route/employeeRoute.js";
import attendanceRoute from "./route/attendanceRoute.js";
import leaveTypeRoute from "./route/leaveTypeRoute.js";
import leaveRoute from "./route/leaveRoute.js";
import payrollRoute from "./route/payrollRoute.js";
import projectRoute from "./route/projectRoute.js";
import taskRoute from "./route/taskRoute.js";
import notificationRoute from "./route/notificationRoute.js";
import permissionRoute from "./route/permissionRoute.js";
import rolePermissionRoute from "./route/rolePermissionRoute.js";


dotenv.config();
const port = process.env.PORT || "4000";
const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use("/uploads", express.static("uploads"));
app.use("/api", authRoute);
app.use("/api/department", departmentRoute);
app.use("/api/designation", designationRoute);
app.use("/api/employee", employeeRoute);
app.use("/api/attendance", attendanceRoute);
app.use("/api/leaveType", leaveTypeRoute);
app.use("/api/leave", leaveRoute);
app.use("/api/payroll", payrollRoute);
app.use("/api/project", projectRoute);
app.use("/api/task", taskRoute);
app.use("/api/notification", notificationRoute);
app.use("/api/permission", permissionRoute);
app.use("/api/rolePermission", rolePermissionRoute);


app.listen(port, () => {
    console.log(`Server is running on the port http://localhost:${port}`);
});