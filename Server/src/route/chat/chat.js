const router = require("express").Router();
const { chat } = require("../../controller/chat");

router.route("/").post( chat);

module.exports = router;