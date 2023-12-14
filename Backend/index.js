const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(cors());
connectDB();

app.use(express.json({ extended: false }));

app.use("/api/auth", userRoutes);

const PORT = process.env.PORT || 8071;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
