const express = require("express");
let router = express.Router();
const validation = require('../validation/schema');
const validation2 = require('../validation/studentvalidation');
const { studentsaveall, studentgetall, studentdelete, studentupdate } = require('../controller/studentcon');
//create a student..
router.post("/savestudent", validation, studentsaveall);

router.get("/", studentgetall);

router.delete("/delete/:id",studentdelete);

router.patch("/update/:id",validation2,studentupdate);
module.exports = router;