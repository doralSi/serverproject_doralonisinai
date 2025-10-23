
import { Grid, Typography, Box } from "@mui/material";
import BCard from "./BCard";
import { useCurrentUser } from "../../users/providers/UserProvider";

function BCards({ cards, toggleLike, onDelete }) {
  const { user } = useCurrentUser();


  if (cards.length === 0) {
    return (
      <Box sx={{ py: 4, textAlign: "center" }}>
        <Typography>No cards to display</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        px: { xs: 1, sm: 2, md: 4 },
        py: { xs: 2, sm: 4 },
        width: "100%",
        overflowX: "auto",
      }}
    >
      <Grid container spacing={3} justifyContent="center">
        {cards.map((card) => (
          <Grid item key={card._id}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "stretch",
              }}
            >
              <BCard
                card={card}
                toggleLike={toggleLike}
                user={user}
                onDelete={onDelete}
              />
            </Box>
          </Grid>
        ))}
      </Grid>

  {/* Pagination הוסרה - הפאגינציה מתבצעת ברמת העמוד בלבד */}
    </Box>
  );
}

export default BCards;