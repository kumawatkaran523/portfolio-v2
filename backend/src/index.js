import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import compression from "compression";
import morgan from "morgan";
import adminRouter from "./routes/admin.route.js";
import blogRoute from "./routes/blog.route.js";
import projectRoute from "./routes/project.route.js";
import contactRoute from "./routes/contact.route.js";
import { errorHandler } from "./middlewares/error.middleware.js";

dotenv.config();

const app = express();

// --- HEALTH CHECK FIRST (no middleware) ---
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
  });
});

// Security
app.use(helmet());

// Logging
app.use(morgan("dev"));

// Body parser
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Compression
app.use(compression());

// CORS - allow UptimeRobot + Render
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,
      "https://uptimerobot.com",
      "https://stats.uptimerobot.com",
      "http://localhost:3000",
    ].filter(Boolean),
    credentials: true,
  })
);

// Rate limiting (api only)
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 200,
});
app.use("/api/", limiter);

// Routes
app.use("/api/admin", adminRouter);
app.use("/api/blogs", blogRoute);
app.use("/api/projects", projectRoute);
app.use("/api/contact", contactRoute);

// Proper Express 404 fallback
app.use("/{*any}", (req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
