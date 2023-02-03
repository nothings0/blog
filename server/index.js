const express = require("express");
const bodyParse = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParse.json({ limit: "50mb" }));
app.use(express.json({}));

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

require("./connect/dbConnect");

const blogRoute = require("./routes/blogRoute");
const categoryRoute = require("./routes/categoryRoute");
app.use("/api/blog", blogRoute);
app.use("/api/category", categoryRoute);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
