const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["student", "admin", "worker"],
        default: "student"
    },

    department: {
        type: String,
        default: ""
    },

    year: {
        type: Number,
        default: 1
    }
},
{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema);