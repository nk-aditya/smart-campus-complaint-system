const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
{
  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  category: {
    type: String,
    enum: ["Electricity", "Water", "Internet", "Cleaning", "Furniture", "Other"],
    default: "Other"
  },

  status: {
    type: String,
    enum: ["Pending", "Assigned", "In Progress", "Resolved"],
    default: "Pending"
  },

  remark: {
   type: String,
   default: ""
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  }
},
{ timestamps: true }
);

module.exports = mongoose.model("Complaint", complaintSchema);