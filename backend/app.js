const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xssclean = require("xss-clean");
const cors = require("cors");
const codeRouter = require("./routes/codeRoute");

const app = express();

app.use(cors()); // ✅ Allow all origins (for testing)
app.use(express.json());

app.use(helmet());
app.use(express.json({ limit: "10kB" }));

//Data Sanitization againt NoSQL query injection
app.use(mongoSanitize());

//Data Sanitization againt XSS
app.use(xssclean());

//3rd pary Middleware
app.use(morgan("dev"));

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP,please try again later in an hour!",
});
app.use("/api", limiter);

//ROUTE
app.use("/api/code", codeRouter);

//SERVER
const port = 3000;
//SERVER START
const server = app.listen(3000, () => {
  console.log(`App running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.error("UNHANDLED REJECTION! Shutting down...");
  server.close(() => process.exit(1));
});

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.error(" UNCAUGHT EXCEPTION! Shutting down...");
  server.close(() => process.exit(1));
});
