import { alpha, Box, colors, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../contexts/AppContextProvider";
import { SEASON_COLOR } from "../../constants/colors";
import { toTitleCase } from "../../utils/toTitleCase";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Season } from "../../types/Enum";
import SeasonPopup from "../card-popup/SeasonPopup";

export const SeasonCard = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const {
    currentSeason,
    isFoundationCompleted,
    completeSpring,
    completeSummer,
    completeAutumn,
    completeWinter,
  } = useContext(AppContext);

  const handlePopup = () => {
    // TODO Move this if condition to the Season Popup, rn the pop up is a bit buggy and if
    // we we do not remove this to season popup, when user click on season card it will auto
    // completed without user to clicked on got it
    if (currentSeason === Season.Spring) {
      completeSpring();
    } else if (currentSeason === Season.Summer) {
      completeSummer();
    } else if (currentSeason === Season.Autumn) {
      completeAutumn();
    } else if (currentSeason === Season.Winter) {
      completeWinter();
    }
    setPopupOpen((prev) => !prev);
  };

  const isSeasonComplete = () => {
    switch (currentSeason) {
      case Season.Spring:
        return isFoundationCompleted.isSeasonCompleted.isSpring;
      case Season.Summer:
        return isFoundationCompleted.isSeasonCompleted.isSummer;
      case Season.Autumn:
        return isFoundationCompleted.isSeasonCompleted.isAutumn;
      case Season.Winter:
        return isFoundationCompleted.isSeasonCompleted.isWinter;
      default:
        return false;
    }
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
          backgroundColor: SEASON_COLOR[currentSeason],
          borderRadius: "50px",
          position: "relative",
          overflow: "hidden",
          transition: "background-color 0.3s, transform 0.3s",
          "&:hover": {
            cursor: isSeasonComplete() ? "arrow" : "pointer",
            "& .lockIcon": {
              transform: "scale(0)",
              transition: "transform 0.3s, color 0.3s",
            },
            "& .lockOpenIcon": {
              transform: isSeasonComplete()
                ? "translate(-50%, -50%) scale(0)"
                : "translate(-50%, -50%) scale(1)",
              visibility: isSeasonComplete() ? "hidden" : "visible",
              transition: "transform 0.3s, color 0.3s, visibility 0s linear 0s", // Adjust visibility transition timing
            },
          },
        }}
        onClick={() => setPopupOpen(true)}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "30px",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
            color: isSeasonComplete()
              ? "rgba(0, 0, 0, 1)"
              : "rgba(0, 0, 0, 0.3)",
          }}
        >
          {toTitleCase(currentSeason)}
        </Typography>
        {!isSeasonComplete() && (
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
      <SeasonPopup
        open={isPopupOpen}
        onClose={handlePopup}
        season={currentSeason}
      />
    </Box>
  );
};
