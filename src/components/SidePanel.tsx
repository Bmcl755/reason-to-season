import {
  Alert,
  Box,
  Button,
  Grid,
  IconButton,
  Snackbar,
  useTheme,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Event } from "./Event";
import { SeasonCard } from "./event-cards/SeasonCard";
import { NorthSouthHemisphereCard } from "./event-cards/NorthSouthHemisphereCard";
import { AppContext } from "../contexts/AppContextProvider";
import { Season } from "../types/Enum";
import { BadgesButton } from "./badges/BadgesButton";
import { EquinoxCard } from "./event-cards/EquinoxCard";
import { OtherEventCardTemplate } from "./event-cards/OtherEventCardTemplate";
import CloseIcon from "@mui/icons-material/Close";

export const SidePanel = () => {
  const theme = useTheme();
  const { isFoundationCompleted, essences } = useContext(AppContext);
  const [openEssencesSneakBar, setOpenEssencesSneakBar] = useState(false);

  const isSeasonComplete = (): boolean => {
    return (
      isFoundationCompleted.isSeasonCompleted.isSpring &&
      isFoundationCompleted.isSeasonCompleted.isSummer &&
      isFoundationCompleted.isSeasonCompleted.isAutumn &&
      isFoundationCompleted.isSeasonCompleted.isWinter
    );
  };

  const checkFoundationCompleted = (): boolean => {
    return (
      isSeasonComplete() &&
      isFoundationCompleted.isAxialTilt &&
      isFoundationCompleted.isSolstice
    );
  };

  const handleEssencesSneakBar = () => {
    setOpenEssencesSneakBar((prev) => !prev);
  };

  useEffect(() => {
    if (essences > 0) {
      setOpenEssencesSneakBar(true);
    }
  }, [essences]);

  return (
    <Box
      alignItems="center"
      borderRadius={20}
      display="flex"
      flexDirection="column"
      gap={1}
      sx={{
        width: "20%",
        margin: 5,
        padding: 5,
        backgroundColor: theme.palette.primary.dark,
      }}
    >
      <Box sx={{ overflowY: "auto", flexGrow: 1, width: "100%" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {isSeasonComplete() ? <NorthSouthHemisphereCard /> : <SeasonCard />}
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                width: "100%", // Ensures the Box fills the Grid item
                borderBottom: "2px solid #ccc", // Adjust the thickness, style, and color as needed
              }}
            ></Box>
          </Grid>
          <Grid item xs={12}>
            {isFoundationCompleted.isAxialTilt && <EquinoxCard />}
          </Grid>
          {checkFoundationCompleted() && (
            <>
              <Grid item xs={12}>
                <OtherEventCardTemplate
                  cardName="Farming"
                  cardColour="#dbd6af"
                />
              </Grid>
              <Grid item xs={12}>
                <OtherEventCardTemplate
                  cardName="Weather"
                  cardColour="#87CEEB"
                />
              </Grid>
              <Grid item xs={12}>
                <OtherEventCardTemplate
                  cardName="Animal"
                  cardColour="#7a6961"
                />
              </Grid>
            </>
          )}
        </Grid>
      </Box>
      <Box sx={{ flexGrow: 1 }} />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <BadgesButton />
        </Grid>
      </Grid>
      <Snackbar
        open={openEssencesSneakBar}
        autoHideDuration={6000}
        onClose={handleEssencesSneakBar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleEssencesSneakBar}
          severity="info"
          sx={{
            width: "100%",
            padding: "20px",
            fontSize: "1.25rem",
            fontWeight: "bold",
            boxShadow: 3,
          }}
        >
          {`You have ${essences} essences, help Dr. Breeze to get his memory back`}
        </Alert>
      </Snackbar>
    </Box>
  );
};
