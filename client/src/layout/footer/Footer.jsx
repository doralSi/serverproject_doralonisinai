
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesDict";
import { useCurrentUser } from "../../users/providers/UserProvider";
import "./Footer.css";
import { useTheme } from "../../providers/CustomThemeProvider";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CreditCardIcon from "@mui/icons-material/CreditCard";


function Footer() {
  const navigate = useNavigate();
  const { user } = useCurrentUser();
  const { isDark } = useTheme();

  // Only show on mobile
  // Guest: Home, About
  // Logged in: Home, About, My Cards, Favorites
  return (
    <nav
      className="mobile-footer"
      style={{
        background: isDark ? "#222" : "#1976d2",
        color: isDark ? "#fff" : "#fff",
      }}
    >
      <div
        className="mobile-footer__item"
        style={{ color: isDark ? "#fff" : "#fff" }}
        onClick={() => navigate(user ? ROUTES.cards : ROUTES.root)}
      >
        <HomeIcon className="mobile-footer__icon" />
        Home
      </div>
      <div
        className="mobile-footer__item"
        style={{ color: isDark ? "#fff" : "#fff" }}
        onClick={() => navigate(ROUTES.about)}
      >
        <InfoIcon className="mobile-footer__icon" />
        About
      </div>
      {user && (
        <>
          <div
            className="mobile-footer__item"
            style={{ color: isDark ? "#fff" : "#fff" }}
            onClick={() => navigate(ROUTES.myCards)}
          >
            <CreditCardIcon className="mobile-footer__icon" />
            My Cards
          </div>
          <div
            className="mobile-footer__item"
            style={{ color: isDark ? "#fff" : "#fff" }}
            onClick={() => navigate(ROUTES.favorite)}
          >
            <FavoriteIcon className="mobile-footer__icon" />
            Favorites
          </div>
        </>
      )}
    </nav>
  );
}

export default Footer;
