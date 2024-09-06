import React, { useContext } from "react";
import { AppContext } from "../../contexts/AppContextProvider";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";

type OtherEventCardTemplateProps = {
  cardName: string;
  cardColour: string;
};

export const OtherEventCardTemplate = ({
  cardName,
  cardColour,
}: OtherEventCardTemplateProps) => {
  return (
    <Box>
      <Box
        width="100%"
        height="10vh"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: cardColour,
          borderRadius: "50px",
          position: "relative",
          overflow: "hidden",
          transition: "background-color 0.3s, transform 0.3s",
          "&:hover": {
            cursor: "pointer",
            "& .lockIcon": {
              transform: "scale(0)",
              transition: "transform 0.3s, color 0.3s",
            },
            "& .lockOpenIcon": {
              transform: "translate(-50%, -50%) scale(1)",
              visibility: "visible",
              transition: "transform 0.3s, color 0.3s, visibility 0s linear 0s", // Adjust visibility transition timing
            },
          },
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "30px",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
            color: "rgba(0, 0, 0, 0.3)",
          }}
        >
          {cardName}
        </Typography>

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
      </Box>
    </Box>
  );
};
