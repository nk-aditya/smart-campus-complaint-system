const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getWorkers
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/workers", getWorkers);

module.exports = router;