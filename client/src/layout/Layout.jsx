import React from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import Main from "./main/Main";
import { useCurrentUser } from "../users/providers/UserProvider";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/routesDict";
import PlusCreateIcon from "../components/PlusCreateIcon";
import { useTheme } from "../providers/CustomThemeProvider";


function Layout({ children }) {
  const { userFullDetails } = useCurrentUser();
  const navigate = useNavigate();
  const { isDark } = useTheme ? useTheme() : { isDark: false };

  // Show button for business users and admin users (from full details)
  const showCreateBtn = userFullDetails && (userFullDetails.isBusiness || userFullDetails.biz || userFullDetails.isAdmin);

  return (
    <>
      <Header />
      <Main>{children}</Main>
  {showCreateBtn && (
        <div
          style={{
            position: "fixed",
            bottom: 90, // above footer
            right: 24,
            zIndex: 1200,
            background: "none",
            pointerEvents: "none", // let children handle pointer events
          }}
        >
          <div
            style={{ pointerEvents: "auto" }}
            onClick={() => navigate(ROUTES.createCard)}
            tabIndex={0}
            aria-label="Create Card"
          >
            <PlusCreateIcon
              color={isDark ? "#222" : "#1976d2"}
              textColor="#fff"
            />
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default Layout;
