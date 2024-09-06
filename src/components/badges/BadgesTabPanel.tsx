import React, { useState } from "react";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import PetsIcon from "@mui/icons-material/Pets";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import LockIcon from "@mui/icons-material/Lock";
import SchoolIcon from "@mui/icons-material/School";

import { Expert, Animal } from "../../assets";
import { Box, Button, Tab, Typography, useTheme } from "@mui/material";
import { SeasonFoundationBadge } from "./SeasonFoundationBadge";
import { WeatherBadge } from "./WeatherBadge";
import { FarmingBadge } from "./FarmingBadge";
import { AnimalBadge } from "./AnimalBadge";
export const BadgesTabPanel = () => {
  const theme = useTheme();

  const [selectedTab, setSelectedTab] = useState("1");
  const handleSelectedTab = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: string
  ) => {
    setSelectedTab(newValue);
  };

  const tabProps = {
    width: "100%",
    alignItems: "flex-start", // Change to 'flex-start' for a uniform top alignment
    textTransform: "none",
    justifyContent: "flex-start",
    paddingLeft: theme.spacing(3),
    gap: theme.spacing(2), // Ensure sufficient space between icon and text
    "& .MuiTab-wrapper": {
      // Target the internal wrapper for icon and text
      flexDirection: "row",
      justifyContent: "flex-start",
      textAlign: "left",
      alignItems: "center", // Ensures vertical centering of text with icon
    },
    "& .MuiSvgIcon-root": {
      // Additional styling for icons
      marginBottom: "0 !important", // Remove any default bottom margin from Mui icons
    },
    "&.Mui-selected": {
      backgroundColor: theme.palette.action.selected,
      color: theme.palette.primary.main, // Highlight text color when selected
    },
    "&.Mui-focusVisible": {
      backgroundColor: "transparent",
    },
  };
  return (
    <Box sx={{ display: "flex", height: "100%", flexGrow: 2 }}>
      <TabContext value={selectedTab}>
        <Box
          sx={{
            width: "300px",
            borderRight: 1,
            borderColor: "divider",
            mr: 2,
          }}
        >
          <TabList
            onChange={handleSelectedTab}
            orientation="vertical"
            sx={{ width: "100%" }}
          >
            <Tab
              icon={<Brightness4Icon />}
              iconPosition="start"
              label="Season Foundation"
              value="1"
              sx={tabProps}
            />
            <Tab
              icon={<WbSunnyIcon />}
              iconPosition="start"
              label="Weather"
              value="2"
              sx={tabProps}
            />
            <Tab
              icon={<AgricultureIcon />}
              iconPosition="start"
              label="Farming"
              value="3"
              sx={tabProps}
            />
            <Tab
              icon={<PetsIcon />}
              iconPosition="start"
              label="Animal"
              value="4"
              sx={tabProps}
            />
          </TabList>
        </Box>
        <Box sx={{ flexGrow: 1, width: "100%" }}>
          <TabPanel value="1" sx={{ p: 3 }}>
            <SeasonFoundationBadge />
          </TabPanel>

          <TabPanel value="2" sx={{ p: 3 }}>
            <WeatherBadge />
          </TabPanel>
          <TabPanel value="3" sx={{ p: 3 }}>
            <FarmingBadge />{" "}
          </TabPanel>
          <TabPanel value="4" sx={{ p: 3 }}>
            <AnimalBadge />
          </TabPanel>
        </Box>
      </TabContext>
    </Box>
  );
};
