import { Container, Typography, Box, Divider } from "@mui/material";

import { useTheme } from "../providers/CustomThemeProvider";

function AboutPage() {
  const { isDark } = useTheme();
  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <Box>
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            color: isDark ? "#fff" : "primary.main",
            fontWeight: 700,
            letterSpacing: 1,
            textAlign: "center",
            mb: 2,
          }}
        >
          About BCards
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography
          variant="body1"
          paragraph
          sx={{ color: isDark ? "#fff" : "#111" }}
        >
          <strong>BCards</strong> is a simple, user-friendly platform that allows business users to create, manage, and share professional digital business cards.
        </Typography>

        <Typography
          variant="body1"
          paragraph
          sx={{ color: isDark ? "#fff" : "#111" }}
        >
          Whether you're a small business owner, a freelancer, or part of a larger organization — BizCards helps you maintain a sleek, up-to-date digital presence, and makes it easy for others to find and contact you.
        </Typography>

        <Typography
          variant="body1"
          paragraph
          sx={{ color: isDark ? "#fff" : "#111" }}
        >
          Registered users can like cards, manage their own business profiles, and explore other businesses. Admin users have additional capabilities for managing platform users.
        </Typography>

        <Typography
          variant="body1"
          paragraph
          sx={{ color: isDark ? "#fff" : "#111" }}
        >
          This site was built as part of a React course final project, with a focus on routing, state management, API integration, authentication, and responsive design using Material UI.
        </Typography>

        <Typography
          variant="body2"
          sx={{ mt: 5, textAlign: "center", color: isDark ? "#ccc" : "text.secondary" }}
        >
          Developed by Dor Aloni Sinai – 2025.
        </Typography>
      </Box>
    </Container>
  );
}

export default AboutPage;