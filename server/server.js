import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";

const app = express();
const port = process.env.PORT || 3000;

// DB CONNECT (safe for Vercel)
connectDB().catch((err) => {
  console.log("DB Error:", err.message);
});

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

// HEALTH CHECK
app.get("/", (req, res) => {
  res.status(200).send("Server is Live 🚀");
});
// console.log("INNGEST FUNCTIONS:", functions);
// INNGEST ROUTE (v3 safe)
app.use("/api/inngest", (req, res, next) => {
  return serve({
    client: inngest,
    functions,
  })(req, res, next);
});

// ERROR HANDLER
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

// LOCAL SERVER ONLY
if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

// VERCEL EXPORT
export default app;
