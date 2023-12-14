const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
require("dotenv").config();

const app = express();
app.use(cors());
connectDB();

app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 8071;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
