const express = require("express");
const { protect, adminOnly } = require("../middlewares/authMiddleware");

const router = express.Router();

//Task Management routes 
router.get("/dashboard-data", protect, getDashboardData);
router.get("/user-dashboard-data", protect, getUserDashboardData);
router.get("/", protect, getTasks);// Get all Tasks (admin: all, User: assigned)
router.get("/:id", protect, getTaskById);
router.post("/", protect, adminOnly, createTask);//Create Task By Admin
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, adminOnly, deleteTask);
router.put("/:id/status", protect, updateTaskStatus);
router.put("/:id/todo", protect, updateTaskChecklist);

module.exports = router;