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
app.use("/contacts", contactRoutes);
app.use("/documents", documentRoutes);
app.use("/messages", messageRoutes);

// ... ADD YOUR CODE TO MAP YOUR URL'S TO ROUTING FILES HERE ...

// Tell express to map all other non-defined routes back to the index page
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/cms/browser/index.html"));
});

// Define the port address and tell express to use this port
const port = process.env.PORT || "3000";
app.set("port", port);

// Create HTTP server.
const server = http.createServer(app);

// Tell the server to start listening on the provided port
server.listen(port, function () {
  console.log("API running on: http://localhost:" + port + "/");
});
