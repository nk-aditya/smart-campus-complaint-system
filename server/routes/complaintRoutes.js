const express = require("express");
const router = express.Router();

const {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  updateComplaintStatus
} = require("../controllers/complaintController");

const auth = require("../middleware/auth");

router.post("/create", auth, createComplaint);
router.get("/my", auth, getMyComplaints);
router.get("/all", auth, getAllComplaints);
router.put("/status/:id", auth, updateComplaintStatus);

module.exports = router;