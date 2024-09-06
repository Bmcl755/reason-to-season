import { TabPanel } from "@mui/lab";
import {
  Box,
  Button,
  List,
  ListItem,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { AppContext } from "../../contexts/AppContextProvider";

export const AxialTiltComment = () => {
  const { commentMessage, createCommentMessage, userName } =
    useContext(AppContext);
  const theme = useTheme();

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <TabPanel
        value="1"
        sx={{
          p: 3,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#f5f5f5",
          overflow: "hidden",
          borderRadius: "50px",
        }}
      >
        <Box
          sx={{
            p: 2,
            mb: 2,
            backgroundColor: theme.palette.primary.main,
            color: "white",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          {/* TODO add the axial question here */}
          <Typography variant="h6">
            What would happen if the Earth was knocked on to a different tilt?
          </Typography>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            mb: 2,
            p: 2,
            backgroundColor: "#f5f5f5",
            borderRadius: "10px",
          }}
        >
          <List sx={{ width: "100%" }}>
            {commentMessage.map((msg, index) => (
              <ListItem
                key={index}
                sx={{
                  alignItems: "flex-start",
                  mb: 2,
                }}
              >
                <Paper
                  sx={{
                    p: 2,
                    backgroundColor:
                      msg.sender === `${userName} (You)`
                        ? theme.palette.primary.light
                        : theme.palette.secondary.light,
                    color:
                      msg.sender === `${userName} (You)` ? "white" : "black",
                    borderRadius: "10px",
                    width: "100%",
                  }}
                >
                  <Typography
                    variant="body2"
                    component="p"
                    sx={{ fontWeight: "bold", fontSize: "1rem" }}
                  >
                    {msg.sender}
                  </Typography>
                  <Typography
                    variant="body1"
                    component="p"
                    sx={{ fontSize: "0.875rem", mt: 0.5 }}
                  >
                    {msg.message}
                  </Typography>
                </Paper>
              </ListItem>
            ))}
          </List>
        </Box>
      </TabPanel>
    </Box>
  );
};

export default AxialTiltComment;
