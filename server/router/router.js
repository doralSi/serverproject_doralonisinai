import express from "express";
import cardController from "../cards/routes/cardsController.js";
import usersController from "../users/routes/usersController.js";

const router = express.Router();
router.use((req, res, next) => {
  console.log("[ROUTER] Incoming request:", req.method, req.originalUrl);
  next();
});

router.use("/api/cards", cardController);
router.use("/api/users", usersController);

router.use((req, res) => {
  res.status(404).send("Path not found");
});

export default router;
