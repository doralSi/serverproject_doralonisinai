import { useEffect, useContext, useState, createContext } from "react";
import { getToken, getUser } from "../services/localStorageService";
import axios from "axios";
import { API_BASE_URL } from "../../config";

const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState(getUser());
  const [token, setToken] = useState(getToken());
  const [userFullDetails, setUserFullDetails] = useState();

  useEffect(() => {

    // נוודא שיש user, token ו-id תקין לפני שליפת פרטי משתמש
    if (!user || !token || !user._id) {
      setUserFullDetails(null); // ✅ איפוס פרטי משתמש בעת logout
      return;
    }

    const updateUserFullDetails = async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}/users/` + user._id,
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );

        setUserFullDetails(res.data);
      } catch (err) {
        console.error("Failed to fetch user full details:", err);
        setUserFullDetails(null); // במקרה של שגיאה – ננקה גם
      }
    };

    updateUserFullDetails();
  }, [user, token]);

  return (
    <UserContext.Provider
      value={{ user, setUser, token, setToken, userFullDetails, setUserFullDetails }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useCurrentUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useCurrentUser must be used within provider");
  }
  return context;
};
