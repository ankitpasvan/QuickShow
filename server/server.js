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
// DB CONNECT (SAFE)
// =======================
connectDB();

// =======================
// MIDDLEWARE
// =======================
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

// =======================
// HEALTH CHECK
// =======================
app.get("/", (req, res) => {
  res.status(200).send("Server is Live 🚀");
});

// =======================
// INNGEST ROUTE
// =======================
app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions,
  }),
);

// =======================
// ERROR HANDLING (IMPORTANT)
// =======================
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

// =======================
// LOCAL ONLY SERVER
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
