import express from "express";
import { createNewUser, login } from "../services/usersService.js";
import { getUserByIdFromDb, getAllUsersFromDb, updateUserInDb, deleteUserInDb } from "../services/usersDataService.js";
import { auth } from "../../auth/services/authService.js";

const router = express.Router();

// POST /api/users - הרשמה
router.post("/", async (req, res) => {
  try {
    const newUser = req.body;
    const user = await createNewUser(newUser);
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// POST /api/users/login - התחברות
router.post("/login", async (req, res) => {
  try {
    const { password, email } = req.body;
    const token = await login(email, password);
    res.send(token);
  } catch (error) {
    res.status(401).send("invalid email or password");
  }
});

// GET /api/users/:id - שליפת משתמש לפי מזהה
router.get("/:id", async (req, res) => {
  try {
    const user = await getUserByIdFromDb(req.params.id);
    if (!user) return res.status(404).send("User not found");
    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// PUT /api/users/:id - עדכון פרטי משתמש (רק המשתמש עצמו)
router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const userData = req.body;
    
    // וידוא שהמשתמש מעדכן את עצמו בלבד (אלא אם הוא אדמין)
    if (req.user._id !== id && !req.user.isAdmin) {
      return res.status(403).send("Access denied - You can only edit your own profile");
    }
    
    // מניעת שינוי שדות רגישים
    delete userData.password;
    delete userData.isAdmin;
    delete userData.isBusiness;
    delete userData._id;
    
    const updatedUser = await updateUserInDb(id, userData);
    if (updatedUser) {
      res.send(updatedUser);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// GET /api/users - שליפת כל המשתמשים (רק לאדמין)
router.get("/", auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).send("Access denied - Admin only");
    }
    
    const users = await getAllUsersFromDb();
    if (users) {
      res.send(users);
    } else {
      res.status(500).send("Failed to get users");
    }
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// PATCH /api/users/:id - עדכון הרשאות משתמש (רק לאדמין)
router.patch("/:id", auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).send("Access denied - Admin only");
    }
    
    const { id } = req.params;
    const { isBusiness } = req.body;
    
    const updatedUser = await updateUserInDb(id, { isBusiness });
    if (updatedUser) {
      res.send(updatedUser);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// DELETE /api/users/:id - מחיקת משתמש (רק לאדמין)
router.delete("/:id", auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).send("Access denied - Admin only");
    }
    
    const { id } = req.params;
    
    // וידוא שלא מוחקים אדמין
    const userToDelete = await getUserByIdFromDb(id);
    if (!userToDelete) {
      return res.status(404).send("User not found");
    }
    
    if (userToDelete.isAdmin) {
      return res.status(403).send("Cannot delete admin user");
    }
    
    const deletedUserId = await deleteUserInDb(id);
    if (deletedUserId) {
      res.send("User deleted successfully");
    } else {
      res.status(500).send("Failed to delete user");
    }
  } catch (error) {
    res.status(500).send("Server error");
  }
});

export default router;
