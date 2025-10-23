import { useEffect, useState, useCallback } from "react";
import { Container, Typography, Pagination, Box } from "@mui/material";
import BCards from "../cards/components/BCards";
import { getAllCards, toggleCardLike } from "../cards/services/cardsApiService";
import { useCurrentUser } from "../users/providers/UserProvider";
import { useSnack } from "../providers/SnackbarProvider";
import { useSearchParams } from "react-router-dom";

function CardsPage() {
  const [cards, setCards] = useState([]);
  const setSnack = useSnack();
  const { user, token } = useCurrentUser();
  const [searchParams] = useSearchParams();
  // Pagination state
  const [page, setPage] = useState(1);
  const cardsPerPage = 12;

  const getCardsFromServer = useCallback(async () => {
    try {
      const response = await getAllCards();
      console.log("getAllCards response:", response.data); // Debug: check what the server returns
      setCards(response.data);
      setSnack("success", "Cards loaded successfully");
    } catch (err) {
      setSnack("error", "Failed to load cards");
    }
  }, [setSnack]);

  useEffect(() => {
    getCardsFromServer();
  }, [getCardsFromServer]);


  // Search
  const q = searchParams.get("q");
  const filteredCards = !q
    ? cards
    : cards.filter(
        (c) =>
          c.title.toLowerCase().includes(q.toLowerCase()) ||
          c.subtitle.toLowerCase().includes(q.toLowerCase())
      );

  // Pagination logic
  const count = Math.ceil(filteredCards.length / cardsPerPage);
  const paginatedCards = filteredCards.slice(
    (page - 1) * cardsPerPage,
    page * cardsPerPage
  );

  // Reset page to 1 only when search query changes
  useEffect(() => {
    setPage(1);
  }, [q]);

  const handleToggleLike = async (cardId) => {
    try {
      await toggleCardLike(cardId, token);
      await getCardsFromServer();
      setSnack("success", "Card updated successfully");
    } catch (error) {
      setSnack("error", "Failed to update like");
    }
  };

  return (
  <Container maxWidth="lg" sx={{ pb: 10 }}>
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          color: "primary.main",
          fontWeight: 700,
          letterSpacing: 1,
          textAlign: "center",
          mt: 3,
          mb: 4,
        }}
      >
        All Business Cards
      </Typography>
      <BCards cards={paginatedCards} toggleLike={handleToggleLike} />
      {count > 1 && (
        <Box display="flex" justifyContent="center" mt={4} mb={2}>
          <Pagination
            count={count}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
            shape="rounded"
            showFirstButton
            showLastButton
          />
        </Box>
      )}
    </Container>
  );
}

export default CardsPage;