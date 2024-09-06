import { TabPanel } from "@mui/lab";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import LockIcon from "@mui/icons-material/Lock";
import { Expert } from "../../assets";
import { BadgeData, BadgeTemplateProps } from "../../types/Types";

export const BadgeTemplate = ({ badgeData }: BadgeTemplateProps) => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          p: 2,
          width: "100%",
          borderBottom: "1px solid black",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: 200,
            height: 200,
            overflow: "hidden",
            marginRight: 3,
          }}
        >
          {badgeData.isCompleted ? (
            <Box
              sx={{
                position: "relative",
                width: 200, // You might need to adjust this size
                height: 200, // You might need to adjust this size
                overflow: "hidden",
              }}
            >
              <Box
                component="img"
                src={badgeData.image}
                alt={`${badgeData.title} Badge`}
                sx={{
                  width: "100%",
                  height: "100%",
                  transition:
                    "transform 0.3s ease-in-out, filter 0.3s ease-in-out",
                  filter: "brightness(1)",
                }}
              />
            </Box>
          ) : (
            <Box
              sx={{
                position: "relative",
                width: 200, // You might need to adjust this size
                height: 200, // You might need to adjust this size
                overflow: "hidden",
              }}
            >
              <Box
                component="img"
                src={badgeData.image}
                alt={`${badgeData.title} Badge`}
                sx={{
                  width: "100%",
                  height: "100%",
                  transition:
                    "transform 0.3s ease-in-out, filter 0.3s ease-in-out",
                  filter: "brightness(0.7) blur(1px)",
                }}
              />
              <LockIcon
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "rgba(0, 0, 0, 0.5)",
                  fontSize: "4rem",
                }}
              />
            </Box>
          )}
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: "#2c387e" }}
          >
            {badgeData.title}
          </Typography>
          <Typography sx={{ color: "#4a5568" }}>
            {badgeData.description}
          </Typography>
          {/* Progress bar container */}
          <Box sx={{ width: "100%", mt: 2 }}>
            <Box
              sx={{
                backgroundColor: "#e0e0e0",
                borderRadius: "4px",
                height: "20px",
                position: "relative", // Ensure relative positioning for absolute child
              }}
            >
              <Box
                sx={{
                  width: `${
                    (badgeData.numberOfCompletedTasks /
                      badgeData.numberOfTasks) *
                    100
                  }%`, // Correctly calculate width as a percentage
                  backgroundColor: "#4caf50", // Vivid green color for the progress
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
                {badgeData.numberOfCompletedTasks}/{badgeData.numberOfTasks}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          mt: 2,
          height: "300px", // Increase height to show more content
          overflowY: "auto",
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: 2,
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        {badgeData.tasks.map((task, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start", // Changed to 'start' for better alignment
              p: 2,
              m: 1,
              borderRadius: "8px",
              backgroundColor: task.isCompleted
                ? index % 2 === 0
                  ? "#f0f4f8"
                  : "#e7f8f1"
                : "#e0e0e0", // Grey out if not completed
              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)",
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.02)",
                backgroundColor: task.isCompleted ? "#d1eaff" : "#d0d0d0", // Darker grey when hovered if not completed
              },
            }}
          >
            <Box
              component="img"
              src={task.image} // Dynamic path based on index
              alt={`${task.name} mini badge`}
              sx={{
                width: 50, // Example size, adjust as needed
                height: 50, // Example size, adjust as needed
                marginRight: 2, // Margin right for spacing
                filter: task.isCompleted
                  ? "none"
                  : "grayscale(100%) brightness(50%)", // Apply grayscale and darken if not completed
              }}
            />
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: "16px",
                  color: task.isCompleted ? "#333" : "#666", // Darken text if not completed
                }}
              >
                {task.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: task.isCompleted ? "#333" : "#666", // Darken text if not completed
                }}
              >
                {task.description}
              </Typography>
            </Box>

            <Button
              disabled
              variant="contained"
              sx={{
                backgroundColor: task.isCompleted ? "#4caf50" : "#93219e", // Grey out the button if not completed
                "&:hover": {
                  backgroundColor: task.isCompleted ? "#388e3c" : "#bdbdbd", // Darken button on hover if not completed
                },
              }}
            >
              {task.isCompleted ? (
                <Typography>Completed</Typography>
              ) : (
                <Typography>Incompleted</Typography>
              )}
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
