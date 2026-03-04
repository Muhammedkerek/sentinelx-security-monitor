const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const connectDB = require("./config/db");
const checkBan = require("./middleware/checkBan");
const rateLimiter = require("./middleware/rateLimiter");
require("./config/redis");

const cors = require("cors");
require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(checkBan, rateLimiter);

app.get("/", (req, res) => {
  res.send("Testing endpoint is working");
});

const authRoutes = require("./routes/authRoute");
const adminRoutes = require("./routes/adminRoutes");

app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;

connectDB();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
// Make io available in controllers

app.set("io", io);

io.on("connection", (socket) => {
  console.log("A user connected: " + socket.id);
  socket.on("disconnect", () => {
    console.log("A user disconnected: " + socket.id);
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
