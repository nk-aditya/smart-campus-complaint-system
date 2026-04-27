const express = require("express");
const router = express.Router();

const {
  createComplaint,
  getMyComplaints,
  getAllComplaints
} = require("../controllers/complaintController");

const auth = require("../middleware/auth");

router.post("/create", auth, createComplaint);
router.get("/my", auth, getMyComplaints);
router.get("/all", auth, getAllComplaints);

module.exports = router;