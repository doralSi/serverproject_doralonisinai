import { useEffect, useState } from "react";
import { Typography, Container } from "@mui/material";
import BCards from "../cards/components/BCards";
import { getAllCards, toggleCardLike } from "../cards/services/cardsApiService";
import { useCurrentUser } from "../users/providers/UserProvider";
import { useSnack } from "../providers/SnackbarProvider";

function FavoriteCardsPage() {
  const [favoriteCards, setFavoriteCards] = useState([]);
  const { user, token } = useCurrentUser(); // שליפת token מה-context
  const setSnack = useSnack();

  const fetchFavoriteCards = async () => {
    try {
      const response = await getAllCards();
      const allCards = response.data;
      const filtered = allCards.filter(card =>
        Array.isArray(card.likes) && card.likes.map(String).includes(String(user._id))
      );
      setFavoriteCards(filtered);
    } catch (error) {
      setSnack("error", "Failed to load favorite cards");
    }
  };

  useEffect(() => {
    if (user) {
      fetchFavoriteCards();
    }
    // eslint-disable-next-line
  }, [user]);

  const handleToggleLike = async (cardId) => {
    try {
      await toggleCardLike(cardId, token); // שימוש נכון ב-token
      setFavoriteCards((prev) => prev.filter((card) => card._id !== cardId));
      setSnack("success", "Card removed from favorites");
    } catch (error) {
      setSnack("error", "Failed to update favorite");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          color: "primary.main",
          fontWeight: 700,
          letterSpacing: 1,
          textAlign: "center",
          mb: 4,
        }}
      >
        Favorite Cards
      </Typography>
      {favoriteCards.length === 0 ? (
        <Typography align="center" color="text.secondary">
          No favorite cards to display.
        </Typography>
      ) : (
        <BCards cards={favoriteCards} toggleLike={handleToggleLike} />
      )}
    </Container>
  );
}

export default FavoriteCardsPage;