import LoginForm from "../users/components/LoginForm";
import { Typography, Box } from "@mui/material";

function LoginPage() {
  return (
    <Box sx={{ minHeight: '100vh', background: '#e3f1fa', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', pt: { xs: 4, sm: 8 } }}>
      <Typography variant="h3" align="center" sx={{ fontWeight: 500, mb: 3, color: 'primary.main' }}>
        Login
      </Typography>
      <LoginForm />
    </Box>
  );
}

export default LoginPage;
