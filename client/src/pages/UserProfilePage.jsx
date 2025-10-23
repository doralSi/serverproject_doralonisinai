import React from "react";
import { useCurrentUser } from "../users/providers/UserProvider";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faIdBadge, faUser, faGlobe, faCity, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { Typography } from "@mui/material";

const UserProfilePage = () => {
  const { userFullDetails: user } = useCurrentUser();
  const navigate = useNavigate();

  if (!user) return <div style={{textAlign: "center", marginTop: 80}}>User not found</div>;

  // fallback for missing fields
  const name = user.name?.first && user.name?.last ? `${user.name.first} ${user.name.last}` : user.name?.first || user.name || "-";
  const email = user.email || "-";
  const phone = user.phone || "-";
  const userId = user._id || "-";
  const country = user.country || user.address?.country || "-";
  const city = user.city || user.address?.city || "-";
  const address = user.address?.street || user.address || "-";
  const profileImg = user.image?.url;

  return (
    <div style={{ minHeight: "100vh", background: "#e3f1fa", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "inherit" }}>
      <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 2px 16px #0001", maxWidth: 600, width: "100%", padding: 32, margin: 16, fontFamily: "inherit" }}>
        <Typography variant="h3" align="center" sx={{ fontWeight: 500, mb: 2, color: 'primary.main' }}>
          User Profile
        </Typography>
        <hr style={{ width: 200, margin: "0 auto 24px auto", border: 0, borderTop: "2px solid #e3f1fa" }} />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 24 }}>
          {profileImg ? (
            <img src={profileImg} alt="Profile" style={{ width: 90, height: 90, borderRadius: "50%", objectFit: "cover", border: "2px solid #e3f1fa" }} />
          ) : (
            <div style={{ width: 90, height: 90, borderRadius: "50%", background: "#e3f1fa", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48, color: "#bbb", border: "2px solid #e3f1fa" }}>
              <FontAwesomeIcon icon={faUser} />
            </div>
          )}
          <Typography variant="h5" align="center" sx={{ fontWeight: 600, mt: 2 }}>
            {name}
          </Typography>
        </div>
        <div style={{ display: "flex", gap: 32, flexWrap: "wrap", justifyContent: "center", marginBottom: 32 }}>
          <div style={{ minWidth: 220, flex: 1, maxWidth: 350 }}>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>Contact Information</div>
            <div style={infoBoxStyle}><FontAwesomeIcon icon={faEnvelope} style={iconStyle}/> <span style={textStyle}>Email</span><span style={valueStyle}>{email}</span></div>
            <div style={infoBoxStyle}><FontAwesomeIcon icon={faPhone} style={iconStyle}/> <span style={textStyle}>Phone</span><span style={valueStyle}>{phone}</span></div>
            <div style={infoBoxStyle}><FontAwesomeIcon icon={faIdBadge} style={iconStyle}/> <span style={textStyle}>User ID</span><span style={valueStyle}>{userId}</span></div>
          </div>
          <div style={{ minWidth: 220, flex: 1, maxWidth: 350 }}>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>Location</div>
            <div style={infoBoxStyle}><FontAwesomeIcon icon={faGlobe} style={iconStyle}/> <span style={textStyle}>Country</span><span style={valueStyle}>{country}</span></div>
            <div style={infoBoxStyle}><FontAwesomeIcon icon={faCity} style={iconStyle}/> <span style={textStyle}>City</span><span style={valueStyle}>{city}</span></div>
            <div style={infoBoxStyle}><FontAwesomeIcon icon={faMapMarkerAlt} style={iconStyle}/> <span style={textStyle}>Address</span><span style={valueStyle}>{address}</span></div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
          <button style={editBtnStyle} onClick={() => navigate("/edit-user-profile")}>EDIT PROFILE</button>
        </div>
      </div>
    </div>
  );
};

const infoBoxStyle = {
  display: "flex",
  alignItems: "center",
  background: "#f6fafd",
  borderRadius: 8,
  padding: "10px 16px",
  marginBottom: 10,
  fontSize: 15,
  gap: 10,
};
const iconStyle = { color: "#2196f3", fontSize: 20, marginRight: 8 };
const textStyle = { minWidth: 60, fontWeight: 500 };
const valueStyle = { marginLeft: "auto", fontWeight: 400, color: "#222" };
const editBtnStyle = {
  padding: "8px 24px",
  borderRadius: 6,
  border: "1px solid #2196f3",
  background: "#fff",
  color: "#2196f3",
  fontWeight: 500,
  cursor: "pointer",
  fontSize: 16,
};
const deleteBtnStyle = {
  padding: "8px 24px",
  borderRadius: 6,
  border: "1px solid #f44336",
  background: "#fff",
  color: "#f44336",
  fontWeight: 500,
  cursor: "pointer",
  fontSize: 16,
};

export default UserProfilePage;
