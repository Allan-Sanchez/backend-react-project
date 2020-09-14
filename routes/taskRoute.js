const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const taskController = require("../controllers/taskController");
const { check } = require("express-validator");

// route.get()
router.post(
  "/",
  authMiddleware,
  [
    check("name", "name is required").not().isEmpty(),
    check("projectId", "Id project is required").not().isEmpty(),
  ],
  taskController.createTask
);

router.get("/", authMiddleware, taskController.getTask);

router.put(
  "/:id",
  authMiddleware,
  [
    check("projectId", "Id project is required").not().isEmpty(),
  ],
  taskController.updateTask
);

router.delete("/:id",authMiddleware,taskController.deleteTask);

module.exports = router;
