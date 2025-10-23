import React from "react";
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Button,
  Typography,
  TextField
} from "@mui/material";

const HeaderDrawer = ({
  drawerOpen,
  setDrawerOpen,
  menuLinks,
  isLoggedIn,
  userFullDetails,
  query,
  setQuery,
  handleLogout,
  toggleMode,
  isDark,
  navigate,
  ROUTES
}) => (
  <Drawer
    anchor="left"
    open={drawerOpen}
    onClose={() => setDrawerOpen(false)}
    sx={{ display: { xs: "block", md: "none" } }}
  >
    <Box sx={{ width: 220 }} role="presentation" onClick={() => setDrawerOpen(false)}>
      <List>
        {menuLinks.map((link) => (
          <ListItem key={link.label} disablePadding>
            <ListItemButton onClick={() => navigate(link.to)}>
              <ListItemText primary={link.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      {isLoggedIn && (
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="body2">
            Hello {userFullDetails?.name?.first || ""}
          </Typography>
        </Box>
      )}
      {isLoggedIn && (
        <Box sx={{ px: 2, py: 1 }}>
          <TextField
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            size="small"
            sx={{ backgroundColor: "white", borderRadius: 1, width: "100%" }}
          />
        </Box>
      )}
      <Box sx={{ px: 2, py: 1 }}>
        {!isLoggedIn ? (
          <>
            <Button fullWidth onClick={() => navigate(ROUTES.register)}>
              Register
            </Button>
            <Button fullWidth onClick={() => navigate(ROUTES.login)}>
              Login
            </Button>
          </>
        ) : (
          <Button fullWidth onClick={handleLogout}>
            Logout
          </Button>
        )}
        <Button fullWidth onClick={toggleMode}>
          {isDark ? "Light" : "Dark"} Mode
        </Button>
      </Box>
    </Box>
  </Drawer>
);

export default HeaderDrawer;
