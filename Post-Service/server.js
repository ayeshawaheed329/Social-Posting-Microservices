import express from "express";
import dotenv from "dotenv";
import cors from "cors";


// routes
import Routes from "./routes/index.js";

// Load environment variables from .env file
dotenv.config();
const app = express();
const PORT = process.env.PORT;


// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// register routes
app.use(Routes);

app.listen(PORT, () => console.log(`Server is running ${PORT}`));