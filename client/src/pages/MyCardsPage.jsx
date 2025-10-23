import { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import BCards from "../cards/components/BCards";
import { useSnack } from "../providers/SnackbarProvider";
import { useCurrentUser } from "../users/providers/UserProvider";
import { getAllCards, deleteCard } from "../cards/services/cardsApiService";

function MyCardsPage() {
  const [myCards, setMyCards] = useState([]);
  const setSnack = useSnack();
  const { user, token } = useCurrentUser();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        console.log("user in MyCardsPage:", user);
        console.log("token in MyCardsPage:", token);
        const response = await getAllCards(token);
        console.log("cards from server:", response.data);
        if (response.data.length > 0) {
          console.log("first card object:", response.data[0]);
        }
        const filtered = response.data.filter(
          (card) => String(card.user_id) === String(user?._id)
        );
        // Sort by creation date descending if available, fallback to _id
        const sorted = filtered.sort((a, b) => {
          if (a.createdAt && b.createdAt) {
            return new Date(b.createdAt) - new Date(a.createdAt);
          }
          // fallback: sort by _id (MongoDB ObjectId is time-based)
          return b._id.localeCompare(a._id);
        });
        setMyCards(sorted);
        setSnack("success", "Your cards loaded successfully");
      } catch (err) {
        console.error("Error loading cards:", err);
        setSnack("error", "Failed to load your cards");
      }
    };

    if (user) fetchCards();
  }, [user, setSnack]);

  const handleDelete = async (cardId) => {
    try {
      await deleteCard(cardId, token);
      setMyCards((prev) => prev.filter((card) => card._id !== cardId));
      setSnack("success", "Card deleted successfully");
    } catch (err) {
      console.error(err);
      setSnack("error", "Failed to delete card");
    }
  };

  return (
    <Container maxWidth="lg">
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
          My Business Cards
        </Typography>
      </div>
      <BCards cards={myCards} toggleLike={null} onDelete={handleDelete} />
    </Container>
  );
}

export default MyCardsPage;