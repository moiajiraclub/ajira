const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB Atlas
mongoose.connect("mongodb+srv://ajiraUser:ajira5638@ajira-cluster.tgibeq7.mongodb.net/?retryWrites=true&w=majority&appName=ajira-cluster")
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Define the schema and model
const Member = mongoose.model("Member", {
  name: String,
  email: String,
});

// ✅ POST endpoint to add new member
app.post("/add-member", async (req, res) => {
  try {
    const member = new Member(req.body);
    await member.save();
    res.send("✅ Member added!");
  } catch (error) {
    console.error("❌ Error adding member:", error);
    res.status(500).send("❌ Failed to add member");
  }
});

// ✅ Start the server
app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
