import express from "express";
import path from "path";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { fileURLToPath } from "url";
import process from "process";
import router from "./server/routes/app.js";
import contactsRouter from "./server/routes/contacts.js";
import documentsRouter from "./server/routes/documents.js";
import messagesRouter from "./server/routes/messages.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ROUTES
const index = router;
const contactRoutes = contactsRouter;
const documentRoutes = documentsRouter;
const messageRoutes = messagesRouter;

// Tell express to use the following parsers for POST data
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
app.use(cookieParser());

app.use(logger("dev")); // Tell express to use the Morgan logger

// Add support for CORS // There's a "cors" package for that...
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS",
  );
  next();
});

// Tell express to use the specified director as the
// root directory for your web site
// console.log(__dirname);
app.use(express.static(path.join(__dirname, "dist/cms/browser")));

// Tell express to map the default route ('/') to the index route
app.use("/", index);

// ... ADD YOUR CODE TO MAP YOUR URL'S TO ROUTING FILES HERE ...
app.use("/api/contacts", contactRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/messages", messageRoutes);

// Tell express to map all other non-defined routes back to the index page
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/cms/browser/index.html"));
});

mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.error("Connection to database failed:", err);
  });

// Define the port address and tell express to use this port
const port = process.env.PORT || "3000";
app.set("port", port);

// Create HTTP server.
const server = http.createServer(app);

// Tell the server to start listening on the provided port
server.listen(port, () => {
  if (process.env.ENVIRONMENT === "development") {
    console.log("API running on: http://localhost:" + port + "/");
  } else {
    console.log(`API running on: https://${process.env.DOMAIN}/`);
  }
});
