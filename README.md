# Business Cards Application - BCards

## תיאור הפרויקט
אפליקציית Business Cards המאפשרת ליצור, לנהל ולשתף כרטיסי ביקור דיגיטליים.
- שרת Node.js + Express + MongoDB
- קליינט React + Vite

## טכנולוגיות עיקריות
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs, Joi
- **Frontend:** React, Vite, Material-UI, Axios

## התקנה והרצה

**דרישות מקדימות:** Node.js v20+, MongoDB, Git

```bash
# שיבוט הפרויקט
git clone https://github.com/doralSi/serverproject_doralonisinai.git
cd serverproject_doralonisinai

# התקנת תלויות
cd server && npm install
cd ../client && npm install

# יצירת משתמש אדמין
cd ../server
node createAdminGmail.js

# הרצת השרת (טרמינל 1)
node server.js

# הרצת הקליינט (טרמינל 2)
cd ../client
npm run dev
```

**משתמש אדמין:**
- Email: admin@gmail.com
- Password: Abc!123Abc

## API Endpoints

**Users:**
- `POST /api/users` - הרשמה
- `POST /api/users/login` - התחברות
- `GET /api/users/:id` - פרטי משתמש
- `GET /api/users` - כל המשתמשים (Admin)
- `PUT /api/users/:id` - עדכון פרופיל
- `PATCH /api/users/:id` - שינוי הרשאות (Admin)
- `DELETE /api/users/:id` - מחיקת משתמש (Admin)

**Cards:**
- `GET /api/cards` - כל הכרטיסים
- `GET /api/cards/my-cards` - הכרטיסים שלי
- `GET /api/cards/:id` - כרטיס לפי ID
- `POST /api/cards` - יצירת כרטיס (Business)
- `PUT /api/cards/:id` - עדכון כרטיס (Owner)
- `PATCH /api/cards/:id` - לייק/ביטול לייק
- `DELETE /api/cards/:id` - מחיקת כרטיס (Owner/Admin)

**אימות:** Header `x-auth-token` עם JWT token

## סוגי משתמשים
- **Regular User:** צפייה, לייק, עדכון פרופיל
- **Business User:** יצירת כרטיסים + כל הרשאות משתמש רגיל
- **Admin:** ניהול משתמשים + כל ההרשאות

## מפתח
דור אלוני סיני - [GitHub](https://github.com/doralSi/serverproject_doralonisinai)

---

**פרויקט מסכם מודול Node.js + MongoDB - HackerU**
