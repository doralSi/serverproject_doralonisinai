import { Alert, Snackbar } from "@mui/material";
import React, { createContext, useContext, useCallback, useState } from "react";

const SnackbarContext = createContext();

export default function SnackbarProvider({ children }) {
  const [isSnackOpen, setOpenSnack] = useState(false);
  const [snackColor, setSnackColor] = useState("success");
  const [snackVariant, setSnackVariant] = useState("filled");
  const [snackMessage, setSnackMessage] = useState("in snackbar");

  const setSnack = useCallback((color, message, variant = "filled") => {
    setOpenSnack(true);
    setSnackColor(color);
    setSnackVariant(variant);
    setSnackMessage(message);
  }, []);

  return (
    <>
      <SnackbarContext.Provider value={setSnack}>
        {children}
      </SnackbarContext.Provider>

      <Snackbar
        anchorOrigin={{
          vertical: snackColor === "error" ? "top" : "bottom",
          horizontal: "right",
        }}
        open={isSnackOpen}
        onClose={() => {
          setOpenSnack(false);
        }}
        autoHideDuration={5000}
      >
        <Alert severity={snackColor} variant={snackVariant}>
          {snackMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export const useSnack = () => {
  const context = useContext(SnackbarContext);
  if (!context) throw Error("useSnack must be used within a SnackbarProvider");
  return context;
};
