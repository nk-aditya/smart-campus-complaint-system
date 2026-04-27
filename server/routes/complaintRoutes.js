const express = require("express");
const router = express.Router();

const { createComplaint } = require("../controllers/complaintController");
const auth = require("../middleware/auth");

router.post("/create", auth, createComplaint);

module.exports = router;