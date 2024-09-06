import React from "react";
import Box from "@mui/material/Box";
import { Tooltip } from "@mui/material";

type EventProperties = {
  imagePath: string;
  eventText: string;
  tooltipText: string;
};

export const Event = ({
  imagePath,
  eventText,
  tooltipText,
}: EventProperties) => {
  return (
    <Tooltip title={tooltipText} placement="left" arrow>
      <Box
        className="EventCard"
        style={{
          width: "100%",
          height: "10vh",
          background: "linear-gradient(145deg, #000000 50%, #444444 50%)",
          margin: "auto",
          display: "flex",
          borderRadius: "1vw",
          overflow: "auto",
        }}
      >
        <Box
          className="EventImage"
          component="img"
          sx={{
            margin: "auto",
            width: "37%",
            maxHeight: "100%",
          }}
          alt="Test"
          src={imagePath}
        ></Box>
        <Box
          className="EventDescription"
          style={{
            width: "63%",
            maxHeight: "100%",
            padding: "5%",
          }}
        >
          <Box
            sx={{
              height: "90%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <p style={{ fontSize: "0.75em" }}>{eventText}</p>
          </Box>
        </Box>
      </Box>
    </Tooltip>
  );
};
