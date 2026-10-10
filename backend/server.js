const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Portfolio backend is running!");
});

app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "Hello from the portfolio backend!",
  });
});

// Test the MariaDB connection
app.get("/api/db-test", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT DATABASE() AS databaseName");

    res.json({
      success: true,
      message: "MariaDB connected successfully!",
      database: rows[0].databaseName,
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);

    res.status(500).json({
      success: false,
      message: "Database connection failed. Check your backend configuration.",
    });
  }
});
app.get("/api/projects", async (req, res) => {
  try {
    const [projects] = await pool.query(
      "SELECT * FROM projects ORDER BY created_at DESC"
    );

    res.json({
      success: true,
      projects: projects,
    });
  } catch (error) {
    console.error("Error fetching projects:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
    });
  }
});
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !message.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and message are required.",
      });
    }

    if (
      name.trim().length > 100 ||
      email.trim().length > 150 ||
      (subject && (typeof subject !== "string" || subject.trim().length > 200)) ||
      message.trim().length > 5000
    ) {
      return res.status(400).json({
        success: false,
        message: "One or more fields exceed the allowed length.",
      });
    }

    const emailAddress = email.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    await pool.execute(
      `INSERT INTO contact_messages (name, email, subject, message)
       VALUES (?, ?, ?, ?)`,
      [
        name.trim(),
        emailAddress,
        subject ? subject.trim() : null,
        message.trim(),
      ]
    );

    res.status(201).json({
      success: true,
      message: "Your message has been sent successfully!",
    });
  } catch (error) {
    console.error("Error saving contact message:", error.message);

    res.status(500).json({
      success: false,
      message: "Unable to send your message right now.",
    });
  }
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});