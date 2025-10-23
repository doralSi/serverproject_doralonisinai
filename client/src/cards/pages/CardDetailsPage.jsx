import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  Divider,
  Button,
  Stack,
} from "@mui/material";
import { useSnack } from "../../providers/SnackbarProvider";
import {
  deleteCard,
  getCardById,
} from "../services/cardsApiService";
import { useCurrentUser } from "../../users/providers/UserProvider";
import ROUTES from "../../routes/routesDict";

function CardDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const setSnack = useSnack();
  const { user, token } = useCurrentUser();
  const [card, setCard] = useState(null);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const { data } = await getCardById(id);
        setCard(data);
      } catch (err) {
        console.error(err);
        setSnack("error", "Failed to load card details");
      }
    };

    fetchCard();
  }, [id, setSnack]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this card?")) return;

    try {
      await deleteCard(id, token);
      setSnack("success", "Card deleted successfully!");
      navigate(ROUTES.cards);
    } catch (err) {
      console.error("Delete failed:", err);
      setSnack("error", "Failed to delete card");
    }
  };

  const handleEdit = () => {
    navigate(`/cards/edit/${id}`);
  };

  const canEditOrDelete =
    user &&
    (user._id === card?.user_id || user.isAdmin);

  if (!card) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4, mb: 4 }}>
      <Card>
        <CardMedia
          component="img"
          height="250"
          image={card.image?.url}
          alt={card.image?.alt}
        />
        <CardContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="h4">{card.title}</Typography>
            <Typography variant="h6" color="text.secondary">
              {card.subtitle}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography>
              <strong>Description:</strong> {card.description}
            </Typography>
            <Typography>
              <strong>Phone:</strong> {card.phone}
            </Typography>
            <Typography>
              <strong>Email:</strong> {card.email}
            </Typography>
            <Typography>
              <strong>Address:</strong>{" "}
              {card.address.city}, {card.address.street}{" "}
              {card.address.houseNumber}
            </Typography>
            <Typography>
              <strong>Biz Number:</strong> {card.bizNumber}
            </Typography>
            {card.web && (
              <Typography>
                <strong>Website:</strong>{" "}
                <a href={card.web} target="_blank" rel="noreferrer">
                  {card.web}
                </a>
              </Typography>
            )}
          </Box>
        </CardContent>

        {card.address && (
          <Box sx={{ px: 2, pb: 2 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Location:
            </Typography>
            <iframe
              title="business-location"
              width="100%"
              height="250"
              style={{ border: 0, borderRadius: 8 }}
              loading="lazy"
              allowFullScreen
              src={`https://www.openstreetmap.org/export/embed.html?search=${encodeURIComponent(
                `${card.address.street} ${card.address.houseNumber}, ${card.address.city}`
              )}`}
            />
          </Box>
        )}

        {canEditOrDelete && (
          <Box sx={{ px: 2, pb: 2 }}>
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                onClick={handleEdit}
              >
                Edit Card
              </Button>
              <Button
                variant="outlined"
                color="error"
                fullWidth
                onClick={handleDelete}
              >
                Delete Card
              </Button>
            </Stack>
          </Box>
        )}
      </Card>
    </Box>
  );
}

export default CardDetailsPage;
