const Complaint = require("../models/Complaint");
const User = require("../models/User");

const getAdminStats = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied"
      });
    }

    const totalComplaints = await Complaint.countDocuments();

    const pending = await Complaint.countDocuments({
      status: "Pending"
    });

    const assigned = await Complaint.countDocuments({
      status: "Assigned"
    });

    const resolved = await Complaint.countDocuments({
      status: "Resolved"
    });

    const students = await User.countDocuments({
      role: "student"
    });

    const workers = await User.countDocuments({
      role: "worker"
    });

    const admins = await User.countDocuments({
      role: "admin"
    });

    res.status(200).json({
      totalComplaints,
      pending,
      assigned,
      resolved,
      students,
      workers,
      admins
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error"
    });
  }
};

module.exports = { getAdminStats };