import React, { useContext, useEffect, useState } from "react";
import { Box, useTheme, Slider, Badge } from "@mui/material";
import { SidePanel } from "../components/SidePanel";
import { AppContext } from "../contexts/AppContextProvider";
import { calculateSeason } from "../utils/calculateSeason";
import EarthSunSimulation from "../components/EarthSunSimulation.tsx";
import FaceIcon from "@mui/icons-material/Face";
import { Scientist } from "../components/card-popup/story/Scientist.tsx";
import commentIcon from "@mui/icons-material/comment";
import { Chat } from "@mui/icons-material";
import { CommentPopup } from "../components/card-popup/CommentPopup.tsx";

const Orbit: React.FC = () => {
  const {
    currentSeason,
    earthPosition,
    setEarthPosition,
    setCurrentSeason,
    essences,
    isFoundationCompleted,
  } = useContext(AppContext);
  const [earthAxialTilt, setEarthAxialTilt] = useState(23.44);
  const [isScientistPopup, setScientistPopup] = useState<boolean>(false);
  const [isCommentPopup, setCommentPopup] = useState<boolean>(false);
  const [hasShownCommentPopup, setHasShownCommentPopup] =
    useState<boolean>(false);

  function updateAxialTilt(event: Event, value: number | number[]) {
    if (typeof value === "number") {
      setEarthAxialTilt(value);
    }
  }

  const handleScientistPopup = () => {
    setScientistPopup((prev) => !prev);
  };

  const handleCommentPopup = () => {
    setCommentPopup((prev) => !prev);
  };

  useEffect(() => {
    if (isFoundationCompleted.isAxialTilt && !hasShownCommentPopup) {
      setCommentPopup(true);
      setHasShownCommentPopup(true);
    }
  }, [isFoundationCompleted.isAxialTilt]);

  useEffect(() => {
    setCommentPopup(false);
  }, [isFoundationCompleted.isSolstice]);
  return (
    <div
      style={{
        textAlign: "center",
        width: "100vw",
        height: "100vh",
        display: "flex",
      }}
    >
      <Box sx={{ width: "75%" }}>
        <EarthSunSimulation earthAxialTilt={earthAxialTilt} />
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: "70%",
          left: "5%",
          transform: "translateX(-50%)",
          width: "100%",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Badge
          badgeContent={essences}
          color="primary"
          onClick={handleScientistPopup}
          sx={{
            "& .MuiBadge-badge": {
              backgroundColor: "red", // Change badge color to red
              color: "white", // Change text color to white
              fontSize: "1rem", // Increase font size
              minWidth: "24px", // Increase min width
              height: "24px", // Increase height
              borderRadius: "12px", // Adjust border radius for a circular badge
            },
          }}
        >
          <FaceIcon color="action" style={{ fontSize: 100, color: "white" }} />
        </Badge>
        {isFoundationCompleted.isAxialTilt ? (
          <Badge
            badgeContent={0}
            color="primary"
            onClick={handleCommentPopup}
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: "red", // Change badge color to red
                color: "white", // Change text color to white
                fontSize: "1rem", // Increase font size
                minWidth: "24px", // Increase min width
                height: "24px", // Increase height
                borderRadius: "12px", // Adjust border radius for a circular badge
              },
            }}
          >
            <Chat color="action" style={{ fontSize: 100, color: "white" }} />
          </Badge>
        ) : (
          <Box></Box>
        )}
      </Box>
      <SidePanel />
      <Scientist open={isScientistPopup} onClose={handleScientistPopup} />
      <CommentPopup open={isCommentPopup} onClose={handleCommentPopup} />
    </div>
  );
};

export default Orbit;
