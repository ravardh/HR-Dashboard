import express from "express";
import connectDB from "./src/config/db.js";
import Authrouter from "./src/routes/authRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import Userrouter from "./src/routes/userRoutes.js";



const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json())
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/auth", Authrouter)
app.use("/user", Userrouter)


app.get("/", (req, res) => {
    res.status(200).json({ message: "server working" });
})

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log("Server Started at Port", port);
    connectDB();
})