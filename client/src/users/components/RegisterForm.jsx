const fieldDefs = [
  { name: "first", label: "First Name", required: true },
  { name: "middle", label: "Middle Name" },
  { name: "last", label: "Last Name", required: true },
  { name: "phone", label: "Phone", required: true, type: "tel" },
  { name: "email", label: "Email", required: true, type: "email" },
  { name: "password", label: "Password", required: true, type: "password" },
  { name: "url", label: "Image url" },
  { name: "alt", label: "Image alt" },
  { name: "state", label: "State" },
  { name: "country", label: "Country", required: true },
  { name: "city", label: "City", required: true },
  { name: "street", label: "Street", required: true },
  { name: "houseNumber", label: "House number", required: true, type: "number" },
  { name: "zip", label: "Zip" },
];
import {
  FormControlLabel,
  Checkbox,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useForm from "../../hooks/useForm";
import Form from "../../components/Form";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import signupSchema from "../models/signupSchema";
import initialSignupForm from "../helpers/initialForms/initialSignupForm";
import normalizeUser from "../helpers/normalization/normalizeUser";
import { useSnack } from "../../providers/SnackbarProvider";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesDict";
import { useState } from "react";

import { Container, Paper, Box, useMediaQuery, useTheme } from "@mui/material";

function RegisterForm() {
  const setSnack = useSnack();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // Responsive: detect mobile
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSignup = async (userDetails) => {
    const userDetailsForServer = normalizeUser(userDetails);
    try {
      await axios.post(
        `${API_BASE_URL}/users`,
        userDetailsForServer
      );
      setSnack("success", "User registered successfully!");
      navigate(ROUTES.login);
    } catch (error) {
      if (error.response?.data) {
        setSnack("error", error.response.data);
      } else {
        setSnack("error", "Registration failed. Please try again.");
      }
    }
  };

  const {
    formDetails,
    errors,
    handleChange,
    handleSubmit,
    resetForm,
    setFormDetails,
  } = useForm(initialSignupForm, signupSchema, handleSignup);

  const handleChangeCheckBox = (e) => {
    const { name, checked } = e.target;
    setFormDetails((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };
// ...existing code...


  const getFieldProps = (field) => {
    const isPassword = field.name === "password";
    // הגנה: אם value לא קיים, החזר מחרוזת ריקה
    // המרה ל-string עבור שדות מספריים
    const value = (field.name === "houseNumber" || field.name === "zip")
      ? String(formDetails[field.name] ?? "")
      : formDetails[field.name] ?? "";
    return {
      sx: isMobile ? { width: "100%" } : { flex: 1 },
      name: field.name,
      label: field.label,
      type: isPassword ? (showPassword ? "text" : "password") : field.type || "text",
      value,
      onChange: handleChange,
      error: !!errors[field.name],
      helperText:
        errors[field.name] ||
        (field.required ? "Required" : undefined) ||
        (field.name === "password" ? "Must be at least 8 characters" : undefined),
      required: !!field.required,
      fullWidth: true,
      margin: "normal",
      ...(isPassword
        ? {
            InputProps: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword((s) => !s)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }
        : {}),
    };
  };

  // חלוקה רספונסיבית: במסך קטן כל שדה בשורה, במסך רחב בזוגות
  const fieldRows = [];
  if (isMobile) {
    for (let i = 0; i < fieldDefs.length; i++) {
      fieldRows.push([fieldDefs[i], null]);
    }
  } else {
    for (let i = 0; i < fieldDefs.length; i += 2) {
      fieldRows.push([fieldDefs[i], fieldDefs[i + 1] || null]);
    }
  }

  return (
    <Container sx={{ py: { xs: 2, sm: 6 }, width: '100vw', display: 'flex', justifyContent: 'center' }}>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, boxSizing: "border-box", maxWidth: 1400, width: "100%", mx: "auto" }}>
        <Form
          onSubmit={handleSubmit}
          onReset={resetForm}
          title="Sign Up"
        >
          {fieldRows.map(([field1, field2], idx) => (
            <Box
              key={idx}
              display={isMobile ? "block" : "flex"}
              gap={2}
              mb={0.3}
            >
              <TextField {...getFieldProps(field1)} />
              {field2 && !isMobile ? (
                <TextField {...getFieldProps(field2)} />
              ) : !isMobile ? (
                <Box sx={{ flex: 1 }} />
              ) : null}
            </Box>
          ))}
          <Box display="flex" gap={2} mb={0.3}>
            <Box sx={{ flex: 1 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="isBusiness"
                    checked={formDetails.isBusiness}
                    onChange={handleChangeCheckBox}
                    color="primary"
                  />
                }
                label="Sign up as business"
              />
            </Box>
            <Box sx={{ flex: 1 }} />
          </Box>
        </Form>
      </Paper>
    </Container>
  );

}

export default RegisterForm;
