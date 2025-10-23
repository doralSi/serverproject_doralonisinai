import mongoose from "mongoose";
import Card from "./cards/models/Card.js";
import User from "./users/models/User.js";
import { generateBizNumber } from "./cards/helpers/generateBizNumber.js";

// חיבור למסד הנתונים
mongoose.connect("mongodb://127.0.0.1:27017/business_card_app")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("MongoDB connection error:", err));

const createSampleCards = async () => {
  try {
    // מוצא את משתמש האדמין
    const adminUser = await User.findOne({ email: "admin@bcards.com" });
    if (!adminUser) {
      console.log("Admin user not found. Please run createAdmin.js first.");
      return;
    }

    // בדיקה אם יש כבר כרטיסים
    const existingCards = await Card.countDocuments();
    if (existingCards > 0) {
      console.log(`${existingCards} cards already exist in database`);
      return;
    }

    // יצירת כרטיסי דמו
    const sampleCards = [
      {
        title: "Tech Solutions Ltd",
        subtitle: "Software Development Company", 
        description: "We provide cutting-edge software solutions for businesses of all sizes. Our expert team specializes in web development, mobile apps, and cloud solutions.",
        phone: "03-1234567",
        email: "info@techsolutions.com",
        web: "https://www.techsolutions.com",
        image: {
          url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400",
          alt: "Tech office"
        },
        address: {
          state: "",
          country: "Israel",
          city: "Tel Aviv",
          street: "Rothschild Blvd",
          houseNumber: 45,
          zip: 65784
        },
        bizNumber: await generateBizNumber(),
        likes: [],
        user_id: adminUser._id
      },
      {
        title: "Green Garden Cafe",
        subtitle: "Organic Coffee & Fresh Food",
        description: "Enjoy fresh organic coffee and healthy meals in our cozy garden setting. We source all ingredients locally and support sustainable farming.",
        phone: "02-9876543",
        email: "hello@greengarden.co.il",
        web: "https://www.greengarden.co.il",
        image: {
          url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400",
          alt: "Garden cafe"
        },
        address: {
          state: "",
          country: "Israel", 
          city: "Jerusalem",
          street: "Jaffa Street",
          houseNumber: 123,
          zip: 94142
        },
        bizNumber: await generateBizNumber(),
        likes: [],
        user_id: adminUser._id
      },
      {
        title: "Dr. Sarah Cohen",
        subtitle: "Family Medicine Specialist",
        description: "Experienced family doctor providing comprehensive healthcare services. Specialized in preventive medicine and chronic disease management.",
        phone: "04-5555555",
        email: "dr.cohen@healthclinic.co.il",
        web: "https://www.drcohen-clinic.com",
        image: {
          url: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400",
          alt: "Medical clinic"
        },
        address: {
          state: "",
          country: "Israel",
          city: "Haifa",
          street: "Ben Gurion Ave",
          houseNumber: 78,
          zip: 33442
        },
        bizNumber: await generateBizNumber(),
        likes: [],
        user_id: adminUser._id
      }
    ];

    // שמירת הכרטיסים למסד הנתונים
    for (const cardData of sampleCards) {
      const card = new Card(cardData);
      await card.save();
      console.log(`Created card: ${cardData.title}`);
    }

    console.log("Sample cards created successfully!");
    
  } catch (error) {
    console.error("Error creating sample cards:", error);
  } finally {
    mongoose.connection.close();
  }
};

createSampleCards();