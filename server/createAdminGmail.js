import mongoose from "mongoose";
import User from "./users/models/User.js";
import { generatePassword } from "./users/helpers/bcrypt.js";

// חיבור למסד הנתונים
mongoose.connect("mongodb://127.0.0.1:27017/business_card_app")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("MongoDB connection error:", err));

const createAdminUser = async () => {
  try {
    // בדיקה אם יש כבר אדמין עם האימייל הזה
    const existingAdmin = await User.findOne({ email: "admin@gmail.com" });
    if (existingAdmin) {
      console.log("Admin user already exists:", existingAdmin.email);
      return;
    }

    // יצירת משתמש אדמין חדש
    const adminUser = new User({
      name: {
        first: "Admin",
        middle: "",
        last: "User"
      },
      phone: "050-1234567",
      email: "admin@gmail.com",
      password: generatePassword("Abc!123Abc"), // סיסמה: Abc!123Abc
      image: {
        url: "https://via.placeholder.com/150",
        alt: "Admin profile picture"
      },
      address: {
        state: "",
        country: "Israel",
        city: "Tel Aviv",
        street: "Main Street",
        houseNumber: 1,
        zip: 12345
      },
      isAdmin: true,
      isBusiness: true
    });

    await adminUser.save();
    console.log("Admin user created successfully!");
    console.log("Email: admin@gmail.com");
    console.log("Password: Abc!123Abc");
    
  } catch (error) {
    console.error("Error creating admin user:", error);
  } finally {
    mongoose.connection.close();
  }
};

createAdminUser();
