import React from "react";
import { Grid, TextField, Container, Paper, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Form from "../../components/Form";
import useForm from "../../hooks/useForm";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import loginSchema from "../models/loginSchema";
import initialLoginForm from "../helpers/initialForms/initialLoginForm";
import {
  getUser,
  setTokenInLocalStorage,
} from "../services/localStorageService";
import { useCurrentUser } from "../providers/UserProvider";
import { useNavigate } from "react-router-dom";
import { useSnack } from "../../providers/SnackbarProvider";
import ROUTES from "../../routes/routesDict";

function LoginForm() {
  const { setToken, setUser } = useCurrentUser();
  const navigate = useNavigate();
  const setSnack = useSnack();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleLogin = async (user) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/users/login`,
        user
      );
      setTokenInLocalStorage(response.data);
      setToken(response.data);
      setUser(getUser());
      setSnack("success", "Login successful!");
      navigate(ROUTES.cards);
    } catch {
      setSnack("error", "Login failed. Please check your credentials.");
    }
  };

  const { formDetails, errors, handleChange, handleSubmit, resetForm } = useForm(
    initialLoginForm,
    loginSchema,
    handleLogin
  );

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 2, sm: 6 } }}>
  <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, maxWidth: 600, width: "100%", mx: "auto", boxSizing: "border-box" }}>
        <Form
          onSubmit={handleSubmit}
          onReset={resetForm}
          title="Sign In"
        >
          <TextField
            name="email"
            label="Email"
            type="email"
            value={formDetails.email}
            onChange={handleChange}
            required
            fullWidth
            error={!!errors.email}
            helperText={errors.email || "Required"}
            sx={{ mb: 2 }}
          />
          <TextField
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            value={formDetails.password}
            onChange={handleChange}
            required
            fullWidth
            error={!!errors.password}
            helperText={errors.password || "Required"}
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((show) => !show)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Form>
      </Paper>
    </Container>
  );
}

export default LoginForm;
