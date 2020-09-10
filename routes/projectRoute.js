const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const authMiddleware = require("../middleware/authMiddleware");
const { check } = require("express-validator");

router.post(
  "/",
  authMiddleware,
  [check("name", "name is required").not().isEmpty()],
  projectController.createProject
);

router.get("/", authMiddleware, projectController.getProject);

router.put(
    "/:id", 
    authMiddleware,
    [check("name", "name is required").not().isEmpty()],
    projectController.updateProject
);
router.delete("/:id", authMiddleware, projectController.deleteProject);


module.exports = router;
