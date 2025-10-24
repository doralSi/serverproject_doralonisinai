import React, { useState } from "react";
import "./EditUserProfilePage.css";
import { useCurrentUser } from "../users/providers/UserProvider";
import { useNavigate } from "react-router-dom";
import { Grid, TextField, Typography, Box } from "@mui/material";
import Form from "../components/Form";
import { updateUserProfile } from "../users/services/usersApiService";
import { useSnack } from "../providers/SnackbarProvider";

const EditUserProfilePage = () => {
  const { userFullDetails: user, setUserFullDetails, token } = useCurrentUser();
  const navigate = useNavigate();
  const setSnack = useSnack();
  if (!user) return <div style={{textAlign: "center", marginTop: 80}}>User not found</div>;

  // initial form state from user
  const [form, setForm] = useState({
    firstName: user.name?.first || "",
    middleName: user.name?.middle || "",
    lastName: user.name?.last || "",
    phone: user.phone || "",
    imageUrl: user.image?.url || "",
    imageAlt: user.image?.alt || "",
    state: user.state || user.address?.state || "",
    country: user.country || user.address?.country || "",
    city: user.city || user.address?.city || "",
    street: user.address?.street || "",
    houseNumber: user.address?.houseNumber || "",
    zip: user.address?.zip || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update user object structure
      const updatedUser = {
        name: {
          first: form.firstName,
          middle: form.middleName,
          last: form.lastName,
        },
        phone: form.phone,
        image: {
          url: form.imageUrl,
          alt: form.imageAlt,
        },
        address: {
          street: form.street,
          houseNumber: form.houseNumber,
          zip: form.zip,
          city: form.city,
          country: form.country,
          state: form.state,
        },
      };
      
      // Save to server
      const response = await updateUserProfile(user._id, updatedUser, token);
      setUserFullDetails(response.data);
      setSnack("success", "Profile updated successfully");
      navigate("/user-profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      setSnack("error", "Failed to update profile");
    }
  };

  return (
    <Form
      title="EDIT PROFILE"
      onSubmit={handleSubmit}
      to="/user-profile"
      isFormValid={() => true}
    >
      <Box sx={{ maxWidth: 1050, mx: 'auto', width: '100%' }}>
        <Grid container spacing={2} sx={{ mb: 2, width: '100%' }} wrap="wrap" justifyContent="center">
          <Grid item xs={12} md={4} lg={4}>
            <TextField label="First Name" name="firstName" value={form.firstName} onChange={handleChange} fullWidth variant="outlined" sx={{ m: 0, minWidth: 320 }} />
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <TextField label="Middle Name" name="middleName" value={form.middleName} onChange={handleChange} fullWidth variant="outlined" sx={{ m: 0, minWidth: 320 }} />
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <TextField label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} fullWidth variant="outlined" sx={{ m: 0, minWidth: 320 }} />
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <TextField label="Phone" name="phone" value={form.phone} onChange={handleChange} fullWidth variant="outlined" sx={{ m: 0, minWidth: 320 }} />
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <TextField label="Image URL" name="imageUrl" value={form.imageUrl} onChange={handleChange} fullWidth variant="outlined" sx={{ m: 0, minWidth: 320 }} />
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <TextField label="Image Alt" name="imageAlt" value={form.imageAlt} onChange={handleChange} fullWidth variant="outlined" sx={{ m: 0, minWidth: 320 }} />
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <TextField label="State" name="state" value={form.state} onChange={handleChange} fullWidth variant="outlined" sx={{ m: 0, minWidth: 320 }} />
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <TextField label="Country" name="country" value={form.country} onChange={handleChange} fullWidth variant="outlined" sx={{ m: 0, minWidth: 320 }} />
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <TextField label="City" name="city" value={form.city} onChange={handleChange} fullWidth variant="outlined" sx={{ m: 0, minWidth: 320 }} />
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <TextField label="Street" name="street" value={form.street} onChange={handleChange} fullWidth variant="outlined" sx={{ m: 0, minWidth: 320 }} />
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <TextField label="House Number" name="houseNumber" value={form.houseNumber} onChange={handleChange} fullWidth variant="outlined" sx={{ m: 0, minWidth: 320 }} />
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <TextField label="Zip" name="zip" value={form.zip} onChange={handleChange} fullWidth variant="outlined" sx={{ m: 0, minWidth: 320 }} />
          </Grid>
        </Grid>
      </Box>
    </Form>
  );
};

export default EditUserProfilePage;
