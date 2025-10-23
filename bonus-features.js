// Advanced features that can be added to the project

export const BONUS_FEATURES = {
  
  // 1. Real-time notifications
  REAL_TIME_NOTIFICATIONS: {
    status: "NOT_IMPLEMENTED",
    description: "WebSocket notifications for new likes, comments etc.",
    difficulty: "Medium"
  },

  // 2. File upload for images
  FILE_UPLOAD: {
    status: "NOT_IMPLEMENTED", 
    description: "Upload images instead of URLs using multer",
    difficulty: "Medium"
  },

  // 3. Export to PDF/QR
  EXPORT_FEATURES: {
    status: "NOT_IMPLEMENTED",
    description: "Export business cards to PDF or generate QR codes",
    difficulty: "Hard"
  },

  // 4. Email invitations
  EMAIL_SYSTEM: {
    status: "NOT_IMPLEMENTED",
    description: "Send email invitations with nodemailer",
    difficulty: "Medium"
  },

  // 5. Rate limiting
  RATE_LIMITING: {
    status: "NOT_IMPLEMENTED",
    description: "API rate limiting with express-rate-limit",
    difficulty: "Easy"
  },

  // 6. Data analytics
  ANALYTICS: {
    status: "NOT_IMPLEMENTED",
    description: "Analytics dashboard for card views, likes etc.",
    difficulty: "Hard"
  },

  // 7. Social sharing
  SOCIAL_SHARING: {
    status: "NOT_IMPLEMENTED",
    description: "Share cards on social media",
    difficulty: "Easy"
  },

  // 8. Advanced search/filtering
  ADVANCED_SEARCH: {
    status: "PARTIAL",
    description: "Search by category, location, advanced filters",
    difficulty: "Medium"
  },

  // 9. Card templates
  CARD_TEMPLATES: {
    status: "NOT_IMPLEMENTED",
    description: "Multiple card design templates",
    difficulty: "Hard"
  },

  // 10. Two-factor authentication
  TWO_FACTOR_AUTH: {
    status: "NOT_IMPLEMENTED",
    description: "2FA with SMS or email verification",
    difficulty: "Hard"
  }
};

// Features already implemented
export const IMPLEMENTED_FEATURES = {
  DARK_MODE: "✅ Dark/Light theme toggle",
  RESPONSIVE_DESIGN: "✅ Mobile-first responsive design", 
  MATERIAL_UI: "✅ Professional UI with Material-UI",
  SEARCH: "✅ Basic search functionality",
  FLOATING_BUTTON: "✅ Floating action button",
  CRM_DASHBOARD: "✅ Admin CRM panel",
  ERROR_HANDLING: "✅ Comprehensive error handling",
  NOTIFICATIONS: "✅ Snackbar notification system",
  CUSTOM_HOOKS: "✅ Custom React hooks",
  VALIDATION: "✅ Client and server validation",
  JWT_AUTH: "✅ JWT authentication",
  ROLE_MANAGEMENT: "✅ User role management",
  CRUD_OPERATIONS: "✅ Full CRUD for cards and users",
  LIKES_SYSTEM: "✅ Like/unlike functionality",
  PROFILE_MANAGEMENT: "✅ User profile editing"
};