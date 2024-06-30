import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
// const browserPath = path.join();
const __dirname = path.resolve(path.dirname(__filename), "../../");
// console.log("app.js", __dirname);

const router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
  // console.log(browserPath);
  res.sendFile(path.join(__dirname, "/dist/cms/browser/index.html"));
});

export default router;
