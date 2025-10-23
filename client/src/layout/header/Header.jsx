import {
  AppBar,
  Box,
  Button,
  TextField,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun, faUser } from "@fortawesome/free-solid-svg-icons";
import MenuIcon from "@mui/icons-material/Menu";
import HeaderLink from "./HeaderLink";
import HeaderDrawer from "./HeaderDrawer";
import ROUTES from "../../routes/routesDict";
import { useTheme } from "../../providers/CustomThemeProvider";
import { useCurrentUser } from "../../users/providers/UserProvider";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

function Header() {
  const { toggleMode, isDark } = useTheme();
  const { userFullDetails, setUser, setToken, setUserFullDetails } = useCurrentUser();
  const [query, setQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isLoggedIn = !!userFullDetails;
  const isBusiness = userFullDetails?.isBusiness;
  const isAdmin = userFullDetails?.isAdmin;

  useEffect(() => {
    setSearchParams({ q: query });
  }, [query]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    setUserFullDetails(null);
    navigate(ROUTES.root);
    setDrawerOpen(false);
  };

  // כל הלינקים של התפריט
  const menuLinks = [
    { to: isLoggedIn ? ROUTES.cards : ROUTES.root, label: "Home" },
    { to: ROUTES.about, label: "About" },
    ...(isLoggedIn ? [
      { to: ROUTES.favorite, label: "Favorite Cards" }
    ] : []),
    ...((isBusiness || isAdmin)
      ? [
          { to: ROUTES.myCards, label: "My Cards" },
          // { to: ROUTES.createCard, label: "Create Card" }, // removed, now floating button
        ]
      : []),
    ...(isAdmin ? [{ to: ROUTES.crm, label: "CRM" }] : []),
  ];

  return (
    <AppBar position="sticky" color="primary" elevation={10}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Desktop menu */}
        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 1 }}>
          {menuLinks.map((link) => (
            <Button
              key={link.label}
              onClick={() => navigate(link.to)}
              sx={{ color: "white" }}
            >
              {link.label}
            </Button>
          ))}
        </Box>

        {/* Hamburger icon for mobile */}
        <IconButton
          sx={{ display: { xs: "flex", md: "none" }, color: "white" }}
          onClick={() => setDrawerOpen(true)}
          edge="start"
        >
          <MenuIcon />
        </IconButton>

        {/* Actions */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {isLoggedIn && (
            <Typography sx={{ display: { xs: "none", sm: "block" } }}>
              Hello {userFullDetails?.name?.first || ""}
            </Typography>
          )}

          {isLoggedIn && (
            <TextField
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              size="small"
              sx={{
                backgroundColor: "white",
                borderRadius: 1,
                minWidth: { xs: 80, sm: 120 },
                display: { xs: "none", sm: "block" },
              }}
            />
          )}

          {!isLoggedIn ? (
            <>
              <HeaderLink to={ROUTES.register} label="Register" />
              <HeaderLink to={ROUTES.login} label="Login" />
            </>
          ) : (
            <Button onClick={handleLogout} sx={{ color: "white" }}>
              Logout
            </Button>
          )}

          {/* כפתור פרופיל משתמש */}
          {isLoggedIn && (
            <IconButton
              onClick={() => navigate(ROUTES.userProfile)}
              sx={{ color: "white" }}
              aria-label="user profile"
            >
              <FontAwesomeIcon icon={faUser} />
            </IconButton>
          )}
          <IconButton onClick={toggleMode} sx={{ color: "white" }} aria-label="toggle dark/light mode">
            {isDark ? (
              <FontAwesomeIcon icon={faSun} />
            ) : (
              <FontAwesomeIcon icon={faMoon} />
            )}
          </IconButton>
        </Box>
      </Toolbar>

      {/* Drawer for mobile menu */}
      <HeaderDrawer
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        menuLinks={menuLinks}
        isLoggedIn={isLoggedIn}
        userFullDetails={userFullDetails}
        query={query}
        setQuery={setQuery}
        handleLogout={handleLogout}
        toggleMode={toggleMode}
        isDark={isDark}
        navigate={navigate}
        ROUTES={ROUTES}
      />
    </AppBar>
  );
}

export default Header;