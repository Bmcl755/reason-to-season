import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../contexts/AppContextProvider";
import { SEASON_COLOR } from "../../constants/colors";
import { toTitleCase } from "../../utils/toTitleCase";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Box, colors, styled, Typography } from "@mui/material";
import { getSouthHemisphereSeason } from "../../utils/getSouthHemisphereSeason";
import { useNavigate } from "react-router-dom";

const StyledTypography = styled(Typography)(({ theme }) => ({
  position: "absolute",
  padding: theme.spacing(1),
  zIndex: 2,
  fontSize: "20px",
  color: "#000000",
  fontWeight: "bold",
}));

export const NorthSouthHemisphereCard = () => {
  const { currentSeason, isFoundationCompleted } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "50px",
        position: "relative",
        overflow: "hidden",
        transition: "background-color 0.3s, transform 0.3s",
        width: "100%",
        height: "10vh",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `linear-gradient(to top left, ${
            SEASON_COLOR[getSouthHemisphereSeason(currentSeason)]
          } 50%,${SEASON_COLOR[currentSeason]}  50%)`,
        },
        "&:hover": {
          cursor: isFoundationCompleted.isAxialTilt ? "arrow" : "pointer",
          "& .lockIcon": {
            transform: "scale(0)",
            transition: "transform 0.3s, color 0.3s",
          },
          "& .lockOpenIcon": {
            transform: "translate(-20%, -25%) scale(1)",
            visibility: isFoundationCompleted.isAxialTilt
              ? "hidden"
              : "visible",
            transition: "transform 0.3s, visibility 0s 0s, color 0.3s",
          },
        },
      }}
      onClick={() => navigate("../axial-tilt")}
    >
      <StyledTypography
        sx={{
          top: "10%",
          left: "10%",
        }}
      >
        {toTitleCase(currentSeason)}
      </StyledTypography>
      <StyledTypography
        sx={{
          bottom: "10%",
          right: "10%",
          color: isFoundationCompleted.isAxialTilt
            ? "rgba(0, 0, 0, 1)"
            : "rgba(0, 0, 0, 0.3)",
        }}
      >
        {toTitleCase(getSouthHemisphereSeason(currentSeason))}
      </StyledTypography>
      <LockIcon
        className="lockIcon"
        sx={{
          position: "absolute",
          fontSize: "3rem",
          bottom: "-15%",
          right: "10%",
          transform: "translate(-50%, -50%) scale(1)",
          zIndex: 3,
          color: "rgba(0, 0, 0, 1)",
          visibility: isFoundationCompleted.isAxialTilt ? "hidden" : "visible", // Changes here
        }}
      />
      <LockOpenIcon
        className="lockOpenIcon"
        sx={{
          position: "absolute",
          fontSize: "4rem",
          bottom: "-15%",
          right: "10%",
          transform: "translate(-50%, -50%) scale(0)",
          zIndex: 3,
          color: "white",
          visibility: "hidden",
        }}
      />
    </Box>
  );
};
