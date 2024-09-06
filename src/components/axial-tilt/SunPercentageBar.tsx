import { Box, Typography } from "@mui/material";
import React from "react";

interface SunPercentageBarProps {
  northHemisphereSunPercentage: number;
  southHemisphereSunPercentage: number;
}

const SunPercentageBar: React.FC<SunPercentageBarProps> = ({
  northHemisphereSunPercentage,
  southHemisphereSunPercentage,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography sx={{ marginBottom: "15px", fontWeight: "bold" }}>
        Amount of Sun
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <Typography sx={{ marginRight: "15px" }}>
          Northern Hemisphere:
        </Typography>
        {/* Progress bar container */}
        <Box sx={{ width: "300px" }}>
          <Box
            sx={{
              backgroundColor: "#000066",
              borderRadius: "4px",
              height: "30px",
              position: "relative", // Ensure relative positioning for absolute child
            }}
          >
            <Box
              sx={{
                width: `${northHemisphereSunPercentage}%`,
                backgroundColor: "#FFB800",
                height: "100%",
                borderRadius: "4px",
              }}
            />
            <Typography
              sx={{
                position: "absolute", // Absolute positioning to center it in the parent Box
                top: 0, // Align top
                left: 0, // Align left
                width: "100%", // Full width to allow centering
                height: "100%", // Full height to align vertically
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "0.875rem",
                fontWeight: "bold",
              }}
            >
              {Math.round(northHemisphereSunPercentage)}%
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Typography sx={{ marginRight: "15px" }}>
          Southern Hemisphere:
        </Typography>
        <Box sx={{ width: "300px" }}>
          <Box
            sx={{
              backgroundColor: "#000066",
              borderRadius: "4px",
              height: "30px",
              position: "relative", // Ensure relative positioning for absolute child
            }}
          >
            <Box
              sx={{
                width: `${southHemisphereSunPercentage}%`,
                backgroundColor: "#FFB800",
                height: "100%",
                borderRadius: "4px",
              }}
            />
            <Typography
              sx={{
                position: "absolute", // Absolute positioning to center it in the parent Box
                top: 0, // Align top
                left: 0, // Align left
                width: "100%", // Full width to allow centering
                height: "100%", // Full height to align vertically
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "0.875rem",
                fontWeight: "bold",
              }}
            >
              {Math.round(southHemisphereSunPercentage)}%
            </Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default SunPercentageBar;
