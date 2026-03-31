const Task = require("../models/Task");
const User = require("../models/User");
const excelJS = require("exceljs");

//@desc Export all tasks as an Excel file
//@route GET/api/reports/export/tasks
//@access Private (Admin)
const exportTaskReport = async (req, res) => {
    try {
        const tasks = await Task.find().populate("assignedTo", "name email");

        const workbook = new excelJS.Workbook();
        const worksheet = workbook.addWorksheet("Tasks Report");

        worksheet.columns = [
            { header: "Task ID", key: "_id", width: 25 },
            { header: "Title", key: "title", width: 30 },
            { header: "Description", key: "description", width: 50 },
            { header: "Priority", key: "priority", width: 15 },
            { header: "Status", key: "status", width: 20 },
            { header: "Due Date", key: "dueDate", width: 20 },
            { header: "Assigned To", key: "assignedTo", width: 30 },
        ];

        // 🔥 Style header
        worksheet.getRow(1).font = { bold: true };
        worksheet.getRow(1).alignment = { vertical: "middle", horizontal: "center" };

        tasks.forEach((task) => {
            const assignedTo =
                task.assignedTo && task.assignedTo.length > 0
                    ? task.assignedTo
                          .map((user) => `${user.name} (${user.email})`)
                          .join(", ")
                    : "Unassigned";

            worksheet.addRow({
                _id: task._id.toString(),
                title: task.title,
                description: task.description,
                priority: task.priority,
                status: task.status,
                dueDate: task.dueDate
                    ? task.dueDate.toISOString().split("T")[0]
                    : "N/A",
                assignedTo,
            });
        });

        // 🔥 Add filter
        worksheet.autoFilter = {
            from: "A1",
            to: "G1",
        };

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            'attachment; filename="tasks_report.xlsx"'
        );

        await workbook.xlsx.write(res);
        res.end();

    } catch (error) {
        res.status(500).json({
            message: "Error exporting tasks",
            error: error.message,
        });
    }
};

//@desc Export user-task as an Excel file
//@route GET/api/reports/export/users
//@access Private (Admin)
const exportUserReport = async (req, res) => {
    try {
        const users = await User.find().select("name email _id").lean();
        const userTasks = await Task.find().populate(
            "assignedTo",
            "name email _id"
        );

        const userTaskMap = {};

        // Initialize users
        users.forEach((user) => {
            userTaskMap[user._id.toString()] = {
                name: user.name,
                email: user.email,
                taskCount: 0,
                pendingTasks: 0,
                inProgressTasks: 0,
                completedTasks: 0,
            };
        });

        // Count tasks
        userTasks.forEach((task) => {
            if (task.assignedTo && task.assignedTo.length > 0) {
                task.assignedTo.forEach((assignedUser) => {
                    const userId = assignedUser._id.toString();

                    if (userTaskMap[userId]) {
                        userTaskMap[userId].taskCount += 1;

                        if (task.status === "Pending") {
                            userTaskMap[userId].pendingTasks += 1;
                        } else if (task.status === "In Progress") {
                            userTaskMap[userId].inProgressTasks += 1;
                        } else if (task.status === "Completed") {
                            userTaskMap[userId].completedTasks += 1;
                        }
                    }
                });
            }
        });

        const workbook = new excelJS.Workbook();
        const worksheet = workbook.addWorksheet("User Task Report");

        worksheet.columns = [
            { header: "User Name", key: "name", width: 30 },
            { header: "Email", key: "email", width: 40 },
            { header: "Total Assigned Tasks", key: "taskCount", width: 25 },
            { header: "Pending Tasks", key: "pendingTasks", width: 20 },
            { header: "In Progress Tasks", key: "inProgressTasks", width: 25 },
            { header: "Completed Tasks", key: "completedTasks", width: 25 },
        ];

        // 🔥 Style header
        worksheet.getRow(1).font = { bold: true };
        worksheet.getRow(1).alignment = { vertical: "middle", horizontal: "center" };

        Object.values(userTaskMap).forEach((user) => {
            worksheet.addRow(user);
        });

        // 🔥 Add filter
        worksheet.autoFilter = {
            from: "A1",
            to: "F1",
        };

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );

        res.setHeader(
            "Content-Disposition",
            'attachment; filename="users_report.xlsx"'
        );

        await workbook.xlsx.write(res);
        res.end();

    } catch (error) {
        res.status(500).json({
            message: "Error exporting users",
            error: error.message,
        });
    }
};

module.exports = {
    exportTaskReport,
    exportUserReport,
};