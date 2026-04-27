const User = require("../models/User");
const Complaint = require("../models/Complaint");

const createComplaint = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "Please fill all required fields"
      });
    }

    const complaint = await Complaint.create({
      title,
      description,
      category,
      createdBy: req.user.id
    });

    res.status(201).json({
      message: "Complaint submitted successfully",
      complaint
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error"
    });
  }
};

const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({
      createdBy: req.user.id
    }).sort({ createdAt: -1 });

    res.status(200).json({
      count: complaints.length,
      complaints
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error"
    });
  }
};

const getAllComplaints = async (req, res) => {
  try {

    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied"
      });
    }

    const complaints = await Complaint.find()
      .populate("createdBy", "name email role")
      .populate("assignedTo", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: complaints.length,
      complaints
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error"
    });
  }
};

const updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (
      req.user.role !== "admin" &&
      req.user.role !== "worker"
    ) {
      return res.status(403).json({
        message: "Access denied"
      });
    }

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found"
      });
    }

    complaint.status = status;

    await complaint.save();

    res.status(200).json({
      message: "Complaint status updated",
      complaint
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error"
    });
  }
};

const assignWorker = async (req, res) => {
  try {
    const { workerId } = req.body;

    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Only admin can assign workers"
      });
    }

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found"
      });
    }

    const worker = await User.findById(workerId);

    if (!worker || worker.role !== "worker") {
      return res.status(400).json({
        message: "Valid worker not found"
      });
    }

    complaint.assignedTo = workerId;
    complaint.status = "Assigned";

    await complaint.save();

    res.status(200).json({
      message: "Worker assigned successfully",
      complaint
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message
    });
  }
};

const getWorkerComplaints = async (req, res) => {
  try {
    // only worker allowed
    if (req.user.role !== "worker") {
      return res.status(403).json({
        message: "Access denied"
      });
    }

    const complaints = await Complaint.find({
      assignedTo: req.user.id
    }).populate("createdBy", "name email");

    res.status(200).json({
      count: complaints.length,
      complaints
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error"
    });
  }
};

module.exports = {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  updateComplaintStatus,
  assignWorker,
  getWorkerComplaints
};
