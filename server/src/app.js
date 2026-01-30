const express = require("express");
const cors = require("cors");

const { CLIENT_URL } = require("./config/env");

const authRoutes = require("./modules/auth/auth.routes");
const userRoutes = require("./modules/user/user.routes");
const adminRoutes = require("./modules/admin/admin.routes");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("✅ Hackathon Auth API Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

module.exports = app;
