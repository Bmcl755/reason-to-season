import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Box,
  Tab,
  Typography,
  TextField,
  Button,
  useTheme,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import React, { useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import { AxialTiltComment } from "./AxialTiltComment";

export const Comment = () => {
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
    alignItems: "center", // Change to 'flex-start' for a uniform top alignment
    textTransform: "none",
    justifyContent: "flex-start",
    paddingLeft: theme.spacing(3),
    gap: theme.spacing(2), // Ensure sufficient space between icon and text

    "& .MuiTab-wrapper": {
      // Target the internal wrapper for icon and text
      flexDirection: "row",
      justifyContent: "center",
      textAlign: "left",
      alignItems: "center",
      width: "100%",
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
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
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
              iconPosition="start"
              label="Axial tilt"
              value="1"
              sx={tabProps}
            />
            {/* The following tab are hard coded */}
            <Tab
              icon={<LockIcon />}
              disabled
              iconPosition="start"
              label="Farming"
              value="2"
              sx={tabProps}
            />
            <Tab
              icon={<LockIcon />}
              disabled
              iconPosition="start"
              label="Animal"
              value="3"
              sx={tabProps}
            />
          </TabList>
        </Box>
        <AxialTiltComment />
      </TabContext>
    </Box>
  );
};

export default Comment;
