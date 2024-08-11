import dotenv from "dotenv";
import connectDB from "./db/index.js";
import express from "express";
import cors from "cors";

dotenv.config({
  path: "./.env",
});

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(
  express.json({
    limit: "16kb",
  })
);
app.use(express.static("public"));

connectDB().then(() => {
  app.on("error", (err) => {
    console.log("error", err);
    throw err;
  });
});

//authrouters
import authRoute from "./routes/authRoutes.js";
app.use("/api", authRoute);

//admin route
import adminRoute from "./routes/adminRoutes.js";
app.use("/api/admin", adminRoute);

app.listen(process.env.PORT, () => {
  console.log(`listening on ${process.env.PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello, world ssss!");
});
