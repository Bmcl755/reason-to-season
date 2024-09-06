import React, { useContext } from "react";
import { AppContext } from "../../contexts/AppContextProvider";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";

export const EquinoxCard = () => {
  const { isFoundationCompleted } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <Box>
      <Box
        width="100%"
        height="10vh"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FFA500",
          borderRadius: "50px",
          position: "relative",
          overflow: "hidden",
          transition: "background-color 0.3s, transform 0.3s",
          "&:hover": {
            cursor: isFoundationCompleted.isSolstice ? "arrow" : "pointer",
            "& .lockIcon": {
              transform: "scale(0)",
              transition: "transform 0.3s, color 0.3s",
            },
            "& .lockOpenIcon": {
              transform: isFoundationCompleted.isSolstice
                ? "translate(-50%, -50%) scale(0)"
                : "translate(-50%, -50%) scale(1)",
              visibility: isFoundationCompleted.isSolstice
                ? "hidden"
                : "visible",
              transition: "transform 0.3s, color 0.3s, visibility 0s linear 0s", // Adjust visibility transition timing
            },
          },
        }}
        onClick={() => navigate("../solstice")}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "30px",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
            color: isFoundationCompleted.isSolstice
              ? "rgba(0, 0, 0, 1)"
              : "rgba(0, 0, 0, 0.3)",
          }}
        >
          Equinox
        </Typography>
        {!isFoundationCompleted.isSolstice && (
          <Box>
            <LockIcon
              className="lockIcon"
              sx={{
                position: "absolute",
                fontSize: "3rem",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%) scale(1)",
                zIndex: 2,
                color: "rgba(0, 0, 0, 1)",
              }}
            />
            <LockOpenIcon
              className="lockOpenIcon"
              sx={{
                position: "absolute",
                fontSize: "4rem",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%) scale(0)",
                zIndex: 2,
                color: "white",
                visibility: "hidden",
              }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};
