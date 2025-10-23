import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CallIcon from "@mui/icons-material/Call";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box, CardActions, IconButton } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toggleCardLike } from "../services/cardsApiService";
import { useCurrentUser } from "../../users/providers/UserProvider";

function BCardFooter({ toggleLike, cardId, cardPhone, likes, user, cardUserId, onDelete }) {
  const navigate = useNavigate();
  const { token } = useCurrentUser();
  const [isLike, setIsLike] = useState(likes.includes(user?._id));

  const handleLikeClick = async () => {
    if (!user) {
      console.log("❌ No user - cannot like");
      return;
    }
    
    console.log("💖 Like button clicked for card:", cardId);
    console.log("💖 Current user:", user._id);
    console.log("💖 Current likes:", likes);
    console.log("💖 Is currently liked:", isLike);
    console.log("💖 Has toggleLike function:", !!toggleLike);
    
    try {
      if (toggleLike) {
        console.log("💖 Using parent toggleLike function");
        await toggleLike(cardId);
      } else {
        console.log("💖 Using direct API call");
        const response = await toggleCardLike(cardId, token);
        console.log("💖 API response:", response.data);
        setIsLike((prev) => !prev);
      }
    } catch (err) {
      console.error("❌ Failed to toggle like", err);
      console.error("❌ Error response:", err.response?.data);
    }
  };

  const canEditOrDelete = user && (user._id === cardUserId || user.isAdmin);

  return (
    <CardActions
      sx={{
        display: "flex",
        justifyContent: "space-between",
        px: 1,
        py: 0.5,
      }}
      disableSpacing
    >
      <Box sx={{ display: "flex", gap: { xs: 1, sm: 1.5 } }}>
        <IconButton onClick={() => navigate(`/cards/${cardId}`)} size="large">
          <VisibilityIcon fontSize="inherit" />
        </IconButton>

        {canEditOrDelete && (
          <>
            <IconButton onClick={() => navigate(`/cards/edit/${cardId}`)} size="large">
              <EditIcon fontSize="inherit" />
            </IconButton>
            <IconButton onClick={() => onDelete(cardId)} size="large">
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </>
        )}
      </Box>

      <Box sx={{ display: "flex", gap: { xs: 1, sm: 1.5 } }}>
        <IconButton component="a" href={`tel:${cardPhone}`} size="large">
          <CallIcon fontSize="inherit" />
        </IconButton>

        {user && (
          <IconButton onClick={handleLikeClick} size="large">
            <FavoriteIcon color={isLike ? "error" : ""} fontSize="inherit" />
          </IconButton>
        )}
      </Box>
    </CardActions>
  );
}

export default BCardFooter;