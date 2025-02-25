const express = require("express");
const codeController = require("../controller/codeController");

const app = express();
//Middleware
app.use(express.json());

const router = express.Router();

router.route("/get-all-languages").get(codeController.getSupportedLanguages);

router.route("/code-execute").post(codeController.codeExecute);

module.exports = router;
