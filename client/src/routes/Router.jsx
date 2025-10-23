import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./../pages/HomePage";
import CardsPage from "./../pages/CardsPage";
import FavoriteCardsPage from "./../pages/FavoriteCardsPage";
import MyCardsPage from "./../pages/MyCardsPage";
import AboutPage from "./../pages/AboutPage";
import LoginPage from "./../pages/LoginPage";
import RegisterPage from "./../pages/RegisterPage";
import ErrorPage from "../pages/ErrorPage";
import CardDetailsPage from "../cards/pages/CardDetailsPage";
import EditCardPage from "../cards/pages/EditCardPage";
import CreateCardPage from "../pages/CreateCardPage";
import ROUTES from "./routesDict";
import CRMPage from "../pages/CRMPage";
import UserProfilePage from "../pages/UserProfilePage";
import EditUserProfilePage from "../pages/EditUserProfilePage";
import { useCurrentUser } from "../users/providers/UserProvider";

function Router() {
  const { userFullDetails } = useCurrentUser();

  const isLoggedIn = !!userFullDetails;
  const isBusiness = userFullDetails?.isBusiness;
  const isAdmin = userFullDetails?.isAdmin;

  return (
    <Routes>
      <Route path={ROUTES.root} element={<HomePage />} />
      <Route path={ROUTES.about} element={<AboutPage />} />
      <Route path={ROUTES.login} element={<LoginPage />} />
      <Route path={ROUTES.register} element={<RegisterPage />} />
      <Route path="/cards/:id" element={<CardDetailsPage />} />

      {/* רק למשתמשים מחוברים */}
  {isLoggedIn && <Route path={ROUTES.cards} element={<CardsPage />} />}
  {isLoggedIn && <Route path={ROUTES.favorite} element={<FavoriteCardsPage />} />}
  {isLoggedIn && <Route path={ROUTES.userProfile} element={<UserProfilePage />} />}
  {isLoggedIn && <Route path={ROUTES.editUserProfile} element={<EditUserProfilePage />} />}

      {/* לעסקיים או אדמין */}
      {(isBusiness || isAdmin) && <Route path={ROUTES.myCards} element={<MyCardsPage />} />}
      {(isBusiness || isAdmin) && <Route path={ROUTES.createCard} element={<CreateCardPage />} />}
      {(isBusiness || isAdmin) && <Route path="/cards/edit/:id" element={<EditCardPage />} />}

      {/* רק לאדמין */}
      {isAdmin && <Route path={ROUTES.crm} element={<CRMPage />} />}

      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
}

export default Router;