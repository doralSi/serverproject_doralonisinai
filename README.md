# 🎴 Business Cards Application - BCards

## 📋 תיאור הפרויקט
אפליקציית Business Cards מתקדמת המאפשרת ליצור, לנהל ולשתף כרטיסי ביקור דיגיטליים. הפרויקט כולל שרת Node.js עם Express ומסד נתונים MongoDB, יחד עם ממשק משתמש React מודרני.

## 🏗️ מבנה הפרויקט
```
final_server_project/
├── server/                 # Backend - Node.js + Express
│   ├── auth/              # אימות JWT
│   ├── cards/             # ניהול כרטיסי ביקור
│   ├── users/             # ניהול משתמשים
│   ├── middlewares/       # File Logger + Loggers
│   ├── DB/                # חיבור למסד נתונים
│   ├── logs/              # קבצי לוג (נוצר אוטומטית)
│   └── server.js          # נקודת הכניסה לשרת
│
└── client/                # Frontend - React + Vite
    ├── src/
    │   ├── cards/         # קומפוננטות כרטיסים
    │   ├── users/         # קומפוננטות משתמשים
    │   ├── pages/         # דפי האפליקציה
    │   ├── layout/        # Header, Footer, Main
    │   └── routes/        # React Router
    └── package.json
```

## 🚀 טכנולוגיות

### Backend
- **Node.js** v20+ - פלטפורמת הרצה
- **Express.js** v5.1.0 - פריימוורק שרת
- **MongoDB** v8.16.4 - מסד נתונים NoSQL
- **Mongoose** - ODM למונגו
- **JWT** (jsonwebtoken) - אימות משתמשים
- **bcryptjs** - הצפנת סיסמאות
- **Joi** - ולידציה
- **Morgan** + **Custom Loggers** - לוגים

### Frontend
- **React** v19+ - ספריית UI
- **Vite** v6.3.5 - Build tool מהיר
- **React Router** - ניווט
- **Material-UI** - קומפוננטות עיצוב
- **Axios** - בקשות HTTP

## ⚙️ התקנה והרצה

### דרישות מקדימות
- Node.js v20 ומעלה
- MongoDB מותקן ורץ מקומית על פורט 27017
- Git

### שלבי התקנה

1. **שיבוט הפרויקט**
```bash
git clone https://github.com/doralSi/serverproject_doralonisinai.git
cd serverproject_doralonisinai
```

2. **התקנת תלויות השרת**
```bash
cd server
npm install
```

3. **התקנת תלויות הקליינט**
```bash
cd ../client
npm install
```

4. **הגדרת משתני סביבה (אופציונלי)**
צור קובץ `.env` בתיקיית `server`:
```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/business_card_app
JWT_SECRET=your_jwt_secret_key
```

5. **יצירת משתמש אדמין**
```bash
cd server
node createAdminGmail.js
```
יווצר משתמש אדמין:
- **Email:** admin@gmail.com
- **Password:** Abc!123Abc

6. **הרצת השרת**
```bash
cd server
node server.js
```
השרת ירוץ על: http://localhost:3000

7. **הרצת הקליינט** (בטרמינל נפרד)
```bash
cd client
npm run dev
```
הקליינט ירוץ על: http://localhost:5173

## 📚 API Endpoints

### 👤 Users (משתמשים)

| Method | Endpoint | תיאור | אימות |
|--------|----------|-------|-------|
| POST | `/api/users` | הרשמת משתמש חדש | ❌ |
| POST | `/api/users/login` | התחברות | ❌ |
| GET | `/api/users/:id` | שליפת פרטי משתמש | ❌ |
| GET | `/api/users` | שליפת כל המשתמשים | ✅ Admin |
| PUT | `/api/users/:id` | עדכון פרטי משתמש | ✅ User/Admin |
| PATCH | `/api/users/:id` | שינוי הרשאות isBusiness | ✅ Admin |
| DELETE | `/api/users/:id` | מחיקת משתמש | ✅ Admin |

### 🎴 Cards (כרטיסי ביקור)

| Method | Endpoint | תיאור | אימות |
|--------|----------|-------|-------|
| GET | `/api/cards` | שליפת כל הכרטיסים | ❌ |
| GET | `/api/cards/my-cards` | הכרטיסים שלי | ✅ Business |
| GET | `/api/cards/:id` | שליפת כרטיס לפי ID | ❌ |
| POST | `/api/cards` | יצירת כרטיס חדש | ✅ Business |
| PUT | `/api/cards/:id` | עדכון כרטיס | ✅ Owner |
| PATCH | `/api/cards/:id` | לייק/ביטול לייק | ✅ User |
| DELETE | `/api/cards/:id` | מחיקת כרטיס | ✅ Owner/Admin |

### 🔐 Headers לאימות
```json
{
  "x-auth-token": "your_jwt_token_here"
}
```

## 👥 סוגי משתמשים

### 🔵 משתמש רגיל (Regular User)
- צפייה בכרטיסים
- לייק לכרטיסים
- עדכון הפרופיל שלו

### 🟢 משתמש עסקי (Business User)
- כל ההרשאות של משתמש רגיל
- יצירת כרטיסי ביקור
- עריכה ומחיקה של הכרטיסים שלו

### 🔴 מנהל מערכת (Admin)
- כל ההרשאות של משתמש עסקי
- צפייה בכל המשתמשים
- מחיקת משתמשים (למעט אדמינים אחרים)
- שינוי הרשאות משתמשים
- שינוי bizNumber של כרטיסים

## 🎁 Bonus Features (בונוסים)

### ✅ 1. שינוי bizNumber על ידי אדמין
אדמין יכול לשנות את מספר העסק (bizNumber) בעת עריכת כרטיס, בתנאי שהמספר החדש לא תפוס.

**Endpoint:** `PUT /api/cards/:id`
```json
{
  "bizNumber": 1234567
}
```

### ✅ 2. File Logger
כל שגיאה עם סטטוס 400 ומעלה נרשמת אוטומטית לקובץ לוג.

- **תיקייה:** `server/logs/`
- **פורמט שם קובץ:** `YYYY-MM-DD.log`
- **תוכן:** `[תאריך/שעה] Status: 400 Error: הודעת שגיאה`

### ✅ 3. חסימת משתמש אחרי 3 ניסיונות כושלים
משתמש שמנסה להתחבר 3 פעמים עם סיסמה שגויה באותו מייל - נחסם ל-24 שעות.

**שדות במודל User:**
- `failedLoginAttempts` - מונה ניסיונות
- `blockExpires` - תאריך סיום החסימה

## 📊 מבני נתונים

### User Schema
```javascript
{
  name: {
    first: String,
    middle: String,
    last: String
  },
  phone: String,
  email: String (unique),
  password: String (hashed),
  image: {
    url: String,
    alt: String
  },
  address: {
    state: String,
    country: String,
    city: String,
    street: String,
    houseNumber: Number,
    zip: Number
  },
  isAdmin: Boolean,
  isBusiness: Boolean,
  createdAt: Date,
  failedLoginAttempts: Number,
  blockExpires: Date
}
```

### Card Schema
```javascript
{
  title: String,
  subtitle: String,
  description: String,
  phone: String,
  email: String,
  web: String,
  image: {
    url: String,
    alt: String
  },
  address: {
    state: String,
    country: String,
    city: String,
    street: String,
    houseNumber: Number,
    zip: Number
  },
  bizNumber: Number (unique, 7 digits),
  likes: [String],
  user_id: String,
  createdAt: Date
}
```

## 🎨 פונקציונאליות הקליינט

### דפי האפליקציה
- **דף הבית** - הצגת כרטיסים אקראיים
- **כרטיסים** - כל הכרטיסים במערכת
- **אודות** - מידע על האפליקציה
- **הרשמה / התחברות**
- **הכרטיסים שלי** - לבעלי עסק
- **כרטיסים מועדפים** - כרטיסים שעשיתי להם לייק
- **יצירת כרטיס** - לבעלי עסק
- **עריכת כרטיס** - לבעלי הכרטיס
- **CRM** - ניהול משתמשים (אדמינים)
- **פרופיל משתמש** - צפייה ועריכת פרופיל

### פיצ'רים
- 🌓 מצב כהה/בהיר (Dark/Light Mode)
- 🔍 חיפוש כרטיסים
- ❤️ לייק לכרטיסים
- 📱 Responsive Design
- 🔔 התראות (Snackbar)
- 🔐 ניהול אימות (JWT)

## 🛡️ אבטחה

- **הצפנת סיסמאות** - bcryptjs עם salt
- **JWT Tokens** - תוקף של 24 שעות
- **Validation** - Joi לולידציית קלט
- **Authorization** - בדיקת הרשאות בכל endpoint
- **חסימת משתמשים** - אחרי 3 ניסיונות כושלים

## 📝 דרישות הפרויקט

הפרויקט עומד בכל הדרישות:
- ✅ כל ה-REST API endpoints
- ✅ אימות JWT
- ✅ 3 סוגי משתמשים (Regular, Business, Admin)
- ✅ CRUD מלא לכרטיסים ומשתמשים
- ✅ MongoDB + Mongoose
- ✅ ולידציה מלאה
- ✅ React Client מתקדם
- ✅ 3 בונוסים מלאים

## 🐛 Troubleshooting

### השרת לא עולה
```bash
# בדוק שMongoDB רץ
mongod --version

# בדוק את הפורט
netstat -ano | findstr :3000
```

### הקליינט לא מתחבר לשרת
ודא שבקובץ `client/src/config.js` יש:
```javascript
export const API_BASE = "http://localhost:3000/api";
```

### שגיאות JWT
ודא שה-token נשלח בheader:
```javascript
headers: { "x-auth-token": token }
```

## 👨‍💻 מפתח
**דור אלוני סיני**
- GitHub: https://github.com/doralSi/serverproject_doralonisinai

## 📄 רישיון
פרויקט זה פותח כחלק מקורס Full Stack ב-HackerU

---

**הערה:** אל תשכח להריץ `node createAdminGmail.js` ליצירת משתמש אדמין לפני השימוש הראשון!
