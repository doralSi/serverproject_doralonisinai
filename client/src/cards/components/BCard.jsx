import { Card, CardMedia, Box } from "@mui/material";
import BCardBody from "./BCardBody";
import BCardFooter from "./BCardFooter";

function BCard({ card, toggleLike, user, onDelete }) {
  return (
    <Card
      sx={{
        width: "100%",
        minWidth: { xs: "90vw", sm: 260, md: 280 },
        maxWidth: 350,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: 3,
        boxShadow: 3,
        backgroundColor: "grey.100",
        transition: "0.3s",
        m: "auto",
        ":hover": {
          boxShadow: 8,
        },
      }}
    >
      <Box sx={{ width: "100%", height: 140, overflow: "hidden" }}>
        <CardMedia
          component="img"
          image={card.image.url}
          alt={card.title}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>

      <BCardBody
        title={card.title}
        subtitle={card.subtitle}
        bizNumber={card.bizNumber}
        phone={card.phone}
        city={card.address.city}
      />

      <BCardFooter
        toggleLike={toggleLike}
        cardId={card._id}
        cardPhone={card.phone}
        likes={card.likes}
        user={user}
        cardUserId={card.user_id}
        onDelete={onDelete}
      />
    </Card>
  );
}

export default BCard;