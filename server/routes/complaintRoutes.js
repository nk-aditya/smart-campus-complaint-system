const express = require("express");
const router = express.Router();

const {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  updateComplaintStatus,
  assignWorker,
  getWorkerComplaints
} = require("../controllers/complaintController");

const auth = require("../middleware/auth");

router.post("/create", auth, createComplaint);
router.get("/my", auth, getMyComplaints);
router.get("/all", auth, getAllComplaints);
router.put("/assign/:id", auth, assignWorker);
router.put("/status/:id", auth, updateComplaintStatus);
router.get("/worker", auth, getWorkerComplaints);

module.exports = router;