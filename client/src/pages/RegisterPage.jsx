import React from "react";
import RegisterForm from "../users/components/RegisterForm";
import { Typography, Box } from "@mui/material";

function RegisterPage() {
  return (
    <Box sx={{ minHeight: '100vh', background: '#e3f1fa', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', pt: { xs: 4, sm: 8 } }}>
      <Typography variant="h3" align="center" sx={{ fontWeight: 500, mb: 3, color: 'primary.main' }}>
        Register
      </Typography>
      <RegisterForm />
    </Box>
  );
}

export default RegisterPage;
