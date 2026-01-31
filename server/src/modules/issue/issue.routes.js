const express = require("express");
const router = express.Router();
const { blockIfBanned } = require("./issueBan.guard");
const auth = require("../../middleware/auth.middleware");
const upload = require("../../middleware/upload.middleware");

const {
  createIssue,
  getIssues,
} = require("./issue.controller");

router.post(
  "/",
  auth,
  upload.single("image"), // 🔥 key = image
  createIssue
);
router.post(
  "/",
  auth,
  blockIfBanned,
  upload.single("image"),
  createIssue
);
router.get("/", getIssues);

module.exports = router;
