import React from "react";
import { TextField, Container, Paper, Box, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../users/providers/UserProvider";
import { useSnack } from "../providers/SnackbarProvider";
import { createCard } from "../cards/services/cardsApiService";
import ROUTES from "../routes/routesDict";
import Form from "../components/Form";
import useForm from "../hooks/useForm";
import cardFormFields from "../cards/helpers/cardFormFields";
import cardSchema from "../cards/models/cardSchema";

const initialForm = {
  title: "",
  subtitle: "",
  description: "",
  phone: "",
  email: "",
  web: "",
  image: "",
  alt: "",
  city: "",
  street: "",
  houseNumber: "",
};

function CreateCardPage() {
  const { token } = useCurrentUser();
  const setSnack = useSnack();
  const navigate = useNavigate();

  const doSubmit = async (formData) => {
    const normalized = {
      title: formData.title,
      subtitle: formData.subtitle,
      description: formData.description,
      phone: formData.phone,
      email: formData.email,
      web: formData.web || "",
      image: {
        url: formData.image || "https://via.placeholder.com/400x200?text=Business+Card",
        alt: formData.alt || "Business card image",
      },
      address: {
        state: "",
        country: "Israel",
        city: formData.city,
        street: formData.street,
        houseNumber: parseInt(formData.houseNumber) || 1,
        zip: 0,
      },
    };

    try {
      const res = await createCard(normalized, token);
      console.log("createCard response:", res.data);
      setSnack("success", "Card created successfully!");
      navigate(ROUTES.myCards);
    } catch (err) {
      console.error("Create card error:", err);
      setSnack("error", "Failed to create card");
    }
  };

  const {
    formDetails,
    errors,
    handleChange,
    handleSubmit,
  } = useForm(initialForm, cardSchema, doSubmit);

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 2, sm: 6 } }}>
      <div style={{ marginTop: 48, marginBottom: 32 }}>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{
            color: "primary.main",
            fontWeight: 700,
            letterSpacing: 1,
            mb: 2,
          }}
        >
          Create New Business Card
        </Typography>
      </div>
      <Paper elevation={4} sx={{ p: { xs: 2, sm: 4 }, width: "100%", boxSizing: "border-box" }}>
        <Form
          onSubmit={handleSubmit}
          title="Create New Business Card"
        >
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ width: { xs: '100%', md: 1050 }, maxWidth: '100%' }}>
              {cardFormFields.map((field) => (
                <TextField
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  type={field.type || "text"}
                  value={formDetails[field.name]}
                  onChange={handleChange}
                  required={field.required}
                  fullWidth
                  multiline={field.multiline}
                  rows={field.rows}
                  error={Boolean(errors[field.name])}
                  helperText={errors[field.name]}
                  sx={{ mb: 2 }}
                />
              ))}
            </Box>
          </Box>
        </Form>
      </Paper>
    </Container>
  );
}

export default CreateCardPage;