import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Container, Grid, TextField, Box, Paper } from "@mui/material";
import { useSnack } from "../../providers/SnackbarProvider";
import { getCardById, updateCard, deleteCard } from "../services/cardsApiService";
import { useCurrentUser } from "../../users/providers/UserProvider";
import ROUTES from "../../routes/routesDict";
import useForm from "../../hooks/useForm";
import Form from "../../components/Form";
import FormButton from "../../components/FormButton";
import cardSchema from "../models/cardSchema";
import cardFormFields from "../helpers/cardFormFields";

function EditCardPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const setSnack = useSnack();
  const { token, userFullDetails } = useCurrentUser();
  const [cardUserId, setCardUserId] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const doSubmit = async (formData) => {
    try {
      console.log("Starting update for card:", id);
      console.log("Form data:", formData);
      
      const updateData = {
        title: formData.title,
        subtitle: formData.subtitle,
        description: formData.description,
        phone: formData.phone,
        email: formData.email,
        web: formData.web,
        image: {
          url: formData.image,
          alt: formData.alt,
        },
        address: {
          city: formData.city,
          street: formData.street,
          houseNumber: parseInt(formData.houseNumber) || 0, // המרה למספר
          state: "",
          country: "Israel",
          zip: 0
        },
      };
      
      console.log("Update data being sent:", updateData);
      
      const response = await updateCard(id, updateData, token);
      console.log("Update response:", response.data);
      
      setSnack("success", "Card updated successfully!");
      navigate(ROUTES.myCards);
    } catch (err) {
      console.error("Update failed:", err);
      console.error("Error response:", err.response?.data);
      setSnack("error", "Failed to update card: " + (err.response?.data || err.message));
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this card?")) return;

    try {
      await deleteCard(id, token);
      setSnack("success", "Card deleted successfully!");
      navigate(ROUTES.myCards);
    } catch (err) {
      console.error("Delete failed:", err);
      setSnack("error", "Failed to delete card");
    }
  };

  const {
    formDetails,
    errors,
    setFormDetails,
    handleChange,
    handleSubmit,
  } = useForm({}, cardSchema, doSubmit);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const { data } = await getCardById(id);
        setFormDetails({
          title: data.title,
          subtitle: data.subtitle,
          description: data.description || "",
          phone: data.phone,
          email: data.email,
          web: data.web || "",
          image: data.image.url,
          alt: data.image.alt || "",
          city: data.address.city,
          street: data.address.street,
          houseNumber: data.address.houseNumber.toString(),
        });
        setCardUserId(data.user_id);
        setLoaded(true);
      } catch (err) {
        console.error(err);
        setSnack("error", "Failed to load card data");
      }
    };
    fetchCard();
  }, [id, setFormDetails, setSnack]);

  // הרשאת גישה: רק בעל הכרטיס או אדמין
  useEffect(() => {
    if (!loaded || !userFullDetails || !cardUserId) return;
    const isAdmin = userFullDetails.isAdmin;
    const isOwner = userFullDetails._id === cardUserId;
    if (!isAdmin && !isOwner) {
      setSnack("error", "You are not authorized to edit this card");
      navigate(ROUTES.cards);
    }
  }, [loaded, userFullDetails, cardUserId, setSnack, navigate]);

  if (!loaded) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="sm" sx={{ mt: 6, mb: 6, display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Paper elevation={4} sx={{ p: { xs: 2, sm: 4 }, width: "100%" }}>
        <Box mb={3}>
          <Typography
            variant="h4"
            align="center"
            sx={{
              color: "primary.main",
              fontWeight: 700,
              letterSpacing: 1,
              mb: 1,
            }}
          >
            Edit Business Card
          </Typography>
        </Box>
        <form onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }} noValidate>
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
              <Box mt={2} display="flex" justifyContent="center" gap={2}>
                <button type="submit" style={{
                  padding: "10px 32px",
                  background: "#1976d2",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  fontWeight: 600,
                  fontSize: "1.1rem",
                  cursor: "pointer"
                }}>
                  Save Changes
                </button>
                <button type="button" onClick={handleDelete} style={{
                  padding: "10px 32px",
                  background: "#d32f2f",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  fontWeight: 600,
                  fontSize: "1.1rem",
                  cursor: "pointer"
                }}>
                  Delete Card
                </button>
              </Box>
            </Box>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}

export default EditCardPage;
