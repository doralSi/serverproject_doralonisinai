const ROUTES = {
  root: "/",
  cards: "/cards",
  about: "/about-page",
  favorite: "/like-cards",
  myCards: "/my-cards",
  login: "/login",
  register: "/register",
  createCard: "/create-card",        // 🆕 למשתמשים עסקיים
  editCard: "/cards/edit/:id",       // אופציונלי לשימוש בקוד
  crm: "/crm",                       // 🆕 למשתמשים מסוג Admin
  userProfile: "/user-profile",      // עמוד פרטי משתמש
  editUserProfile: "/edit-user-profile", // עמוד עריכת פרטי משתמש
};

export default ROUTES;
