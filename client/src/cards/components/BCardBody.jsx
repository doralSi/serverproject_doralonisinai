import { CardContent, Divider, Typography, Box } from "@mui/material";
import PropTypes from "prop-types";

import { useTheme } from "../../providers/CustomThemeProvider";

function BCardBody({ title, subtitle, phone, city, bizNumber }) {
  const { isDark } = useTheme();
  return (
    <CardContent
      sx={{
        px: { xs: 1, sm: 2 },
        py: { xs: 1, sm: 2 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" fontWeight={600} noWrap sx={{ color: "#111" }}>
          {title}
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{ fontSize: { xs: "1rem", sm: "1.1rem" }, color: "#111" }}
          noWrap
        >
          {subtitle}
        </Typography>

        <Divider sx={{ my: 1 }} />

        <Typography variant="body2" sx={{ color: "#111" }}>
          <b>Phone:</b> {phone}
        </Typography>

        <Typography variant="body2" sx={{ color: "#111" }}>
          <b>City:</b> {city}
        </Typography>

        <Typography variant="body2" sx={{ color: "#111" }}>
          <b>Card #:</b> {bizNumber}
        </Typography>
      </Box>
    </CardContent>
  );
}

BCardBody.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  bizNumber: PropTypes.string.isRequired,
};

export default BCardBody;