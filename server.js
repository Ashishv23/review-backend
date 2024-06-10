import express from "express"
import cors from "cors"
import reviews from "./api/reviews.route.js"

const app = express();

// Use CORS middleware
app.use(cors());

// Use JSON parsing middleware
app.use(express.json());

// define end point route
app.use("/api/v1/reviews", reviews);

// Error message when URL not found
app.use("*", (req, res) => res.status(404).json({error: "Not Found"}));

// Export app as module
export default app;