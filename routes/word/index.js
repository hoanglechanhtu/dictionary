const express = require("express");
const controller = require("./word.controller");
const {model} = require("mongoose");

const router = express.Router();

router.get("/", controller.index);
router.get("/:id", controller.show);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.patch("/:id", controller.update);
router.delete("/:id", controller.delete);

module.exports = router;