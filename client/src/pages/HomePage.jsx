import { Container, Typography, Box } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import BCards from "../cards/components/BCards";
import { getAllCards, toggleCardLike } from "../cards/services/cardsApiService";
import { useCurrentUser } from "../users/providers/UserProvider";
import { useSnack } from "../providers/SnackbarProvider";

function HomePage() {
  const [homeCards, setHomeCards] = useState([]);
  const { token, user } = useCurrentUser();
  const setSnack = useSnack();

  const fetchCards = useCallback(async () => {
    try {
      const { data } = await getAllCards();
      setHomeCards(data.slice(0, 3)); // Show only the first three cards
    } catch (err) {
      console.error(err);
      setSnack("error", "Failed to load cards for homepage");
    }
  }, [setSnack]);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  const toggleLike = async (cardId) => {
    if (!user) return;
    try {
      const { data: updatedCard } = await toggleCardLike(cardId, token);

      setHomeCards((prevCards) =>
        prevCards.map((card) =>
          card._id === updatedCard._id ? updatedCard : card
        )
      );

      setSnack("success", "Like updated successfully");
    } catch (error) {
      console.error(error);
      setSnack("error", "Failed to update like");
    }
  };

  return (
    <Container maxWidth="lg">
      <Box mt={6} mb={4}>
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
          Welcome to BCards
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 2 }}>
          The best place to find and share professional business cards
        </Typography>
      </Box>

      <BCards
        cards={homeCards}
        toggleLike={user ? toggleLike : undefined}
      />
    </Container>
  );
}

export default HomePage;