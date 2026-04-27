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

module.exports = {
  createComplaint,
  getMyComplaints
};
