import express from "express";
import {
  createNewCard,
  deleteCard,
  getAllCards,
  getCardById,
  updateCard,
} from "../services/cardsService.js";
import { auth } from "../../auth/services/authService.js";
import { getCardByIdFromDb } from "../services/cardsDataService.js";

const router = express.Router();

// בדיקת GET כללי
router.get("/test", (req, res) => {
  res.send({ ok: true, msg: "GET /api/cards/test works" });
});

router.patch("/test", (req, res) => {
  res.send({ ok: true, msg: "PATCH /api/cards/test works" });
});

// GET /api/cards - קבלת כל הכרטיסים
router.get("/", async (req, res) => {
  try {
    const allCards = await getAllCards();
    if (allCards) {
      res.send(allCards);
    } else {
      res.status(500).send("something went wrong with get all cards");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const card = await getCardById(id);
    if (card) {
      res.send(card);
    } else {
      res.status(404).send("Card not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.post("/", auth, async (req, res) => {
  try {
    
    const cardData = req.body;
    const userId = req.user._id;
    const newCard = await createNewCard(cardData, userId);
    
    if (newCard) {
      res.status(201).send(newCard);
    } else {
      res.status(400).send("Failed to create card - validation error");
    }
  } catch (error) {
    console.error("Error in POST /api/cards:", error);
    res.status(500).send("Server error");
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const newCard = req.body;
    const user = req.user;
    
    
    // בדיקה אם המשתמש הוא בעלים של הכרטיס או אדמין
    const card = await getCardByIdFromDb(id);
    if (!card) {
      return res.status(404).send("Card not found");
    }
    
    
    if (!user.isAdmin && card.user_id !== user._id) {
      return res.status(403).send("Only Admin or owner can edit this card");
    }
    
    const modifiedCard = await updateCard(id, newCard);
    if (modifiedCard) {
      res.send(modifiedCard);
    } else {
      res.status(400).send("something went wrong with card edit");
    }
  } catch (error) {
    console.error("❌ Server error in PUT /cards/:id:", error);
    res.status(500).send("Server error");
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;
    
    // בדיקה אם המשתמש הוא אדמין או הבעלים של הכרטיס
    const card = await getCardByIdFromDb(id);
    if (!card) {
      return res.status(404).send("Card not found");
    }

    if (!user.isAdmin && card.user_id !== user._id) {
      return res.status(403).send("Only Admin user Or owner of card can delete it");
    }

    const idOfDeletedCard = await deleteCard(id);
    if (idOfDeletedCard) {
      res.send("Card deleted successfully");
    } else {
      res.status(400).send("something went wrong with card delete");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const card = await getCardByIdFromDb(id);
    if (!card) {
      return res.status(404).send("Card not found");
    }
    // שינוי bizNumber ע"י אדמין בלבד
    if (req.body.bizNumber && req.user.isAdmin) {
      const newBizNumber = req.body.bizNumber;
      // בדוק אם המספר החדש כבר קיים בכרטיס אחר
      const existing = await getAllCards();
      if (existing.some(c => c.bizNumber === newBizNumber)) {
        return res.status(400).send("bizNumber already exists");
      }
      card.bizNumber = newBizNumber;
      await card.save();
      return res.send(card);
    }
    // לייק רגיל
    const likes = card.likes || [];
    const index = likes.indexOf(userId);
    if (index === -1) {
      likes.push(userId);
    } else {
      likes.splice(index, 1);
    }
    card.likes = likes;
    await card.save();
    res.send(card);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

export default router;
