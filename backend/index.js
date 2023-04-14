const express = require("express");
const cors = require("cors");
const connectToDb = require("./db/dbConfig");

const app = express();

const port = process.env.PORT || 5000;

// dotenv
require("dotenv").config();

// connect to db
connectToDb();

// cors config
app.use(
  cors({
    origin: process.env.DOMAIN,
    credentials: "include",
  })
);

// to access json from backend
app.use(express.json());

app.use("/api/tasks", require("./routes/taskRoutes"));

app.listen(port, () => console.log(`server started at port: ${port}`));
