require("dotenv").config();
const express = require("express");
const app = express();
require("./db/conn")
const cors = require("cors");
const router = require("./Routes/router");
const PORT = process.env.PORT || 6010; 

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("./uploads"));
app.use(router); 

app.use("/files", express.static("./public/files"));

// Basic route for testing
app.get("/", (req, res) => {
    res.status(201).json("Server started successfully");
});

// Starting the server
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
