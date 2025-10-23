import React from "react";


import { useEffect, useState } from "react";

const getResponsiveSize = () => {
  if (typeof window !== "undefined") {
    if (window.innerWidth <= 480) return 64;
    if (window.innerWidth <= 768) return 80;
  }
  return 96;
};

const PlusCreateIcon = ({ size, color = "#1976d2", textColor = "#fff" }) => {
  const [responsiveSize, setResponsiveSize] = useState(size || getResponsiveSize());

  useEffect(() => {
    const handleResize = () => {
      setResponsiveSize(size || getResponsiveSize());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [size]);

  return (
    <div
      style={{
        width: responsiveSize,
        height: responsiveSize,
        borderRadius: "50%",
        background: color,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
        cursor: "pointer",
        position: "relative",
        zIndex: 1200,
        fontFamily: "Roboto, Arial, sans-serif",
        padding: 0,
        overflow: "hidden",
        border: `3px solid #fff`,
      }}
    >
      <span style={{
        fontSize: responsiveSize * 0.38,
        color: textColor,
        fontWeight: 700,
        lineHeight: 1,
        fontFamily: "Roboto, Arial, sans-serif",
        marginBottom: 2,
        letterSpacing: 0.5,
      }}>
        +
      </span>
      <span style={{
        fontSize: responsiveSize * 0.18,
        color: textColor,
        fontWeight: 500,
        marginTop: 0,
        letterSpacing: 1,
        fontFamily: "Roboto, Arial, sans-serif",
        whiteSpace: "nowrap",
        textAlign: "center",
        width: "100%",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}>
        CREATE
      </span>
    </div>
  );
};

export default PlusCreateIcon;
