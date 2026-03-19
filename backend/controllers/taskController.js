const Task = require("../models/Task");

//@desc Get all tasks (Admin: all, User: only assigned tasks)
//@route Get/api/tasks
//@access Private   
const getTasks = async (req, res) => {
    try {
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

//@desc Get tasks by id
//@route Get/api/tasks/:id
//@access Private   
const getTaskById = async (req, res) => {
    try {
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

//@desc create a new task (admin only)
//@route Post/api/tasks/
//@access Private (Admin)
const createTask = async (req, res) => {
    try {
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

//@desc Update task details
//@route put/api/tasks/:id
//@access Private   
const updateTask = async (req, res) => {
    try {
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};