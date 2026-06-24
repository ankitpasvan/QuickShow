import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";

const app = express();
const port = process.env.PORT || 3000;

// =======================
// DB CONNECT
// =======================
connectDB();

// =======================
// MIDDLEWARE
// =======================
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

// =======================
// HEALTH CHECK ROUTE
// =======================
app.get("/", (req, res) => {
  res.status(200).send("Server is Live 🚀");
});

// =======================
// INNGEST ROUTE (V3 SAFE)
// =======================
app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions,
  }),
);

// =======================
// ERROR HANDLER
// =======================
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// =======================
// LOCAL SERVER ONLY
// =======================
if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

// =======================
// VERCEL EXPORT
// =======================
export default app;
