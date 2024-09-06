import { Box, colors, Typography } from "@mui/material";
import React, { useState } from "react";
import CardPopup from "../card-popup/CardPopup";
import { BadgesPopup } from "../card-popup/BadgesPopup";

export const BadgesButton = () => {
  const [isBadgesPopup, setBadgesPopup] = useState(false);

  const handleBadgesPopup = () => {
    setBadgesPopup((prev) => !prev);
  };

  return (
    <Box>
      <Box
        width="100%"
        height="10vh"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.red[200],
          borderRadius: "50px",
          position: "relative",
          overflow: "hidden",
          transition: "background-color 0.3s, transform 0.3s",
          "&:hover": {
            backgroundColor: colors.red[300],
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            transform: "scale(1.05)",
          },
        }}
        onClick={() => handleBadgesPopup()}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "30px",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
            color: "rgba(0, 0, 0, 1)",
          }}
        >
          Badges
        </Typography>
      </Box>
      <BadgesPopup open={isBadgesPopup} onClose={handleBadgesPopup} />
    </Box>
  );
};
