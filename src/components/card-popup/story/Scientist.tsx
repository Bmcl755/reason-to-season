import { TabPanel } from "@mui/lab";
import {
  Box,
  Button,
  LinearProgress,
  Modal,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  MemoryEssence,
  ScientistOne,
  ScientistThree,
  ScientistTwo,
} from "../../../assets";
import { AppContext } from "../../../contexts/AppContextProvider";

type ScientistProps = {
  open: boolean;
  onClose: () => void;
};
export const Scientist = ({ open, onClose }: ScientistProps) => {
  const theme = useTheme();
  const { essences, usedEssences, useEssences } = useContext(AppContext);
  const [essenceCount, setEssenceCount] = useState<number>(0);

  const getImageSrc = () => {
    if (usedEssences >= 10) {
      return ScientistThree;
    } else if (usedEssences >= 3) {
      return ScientistTwo;
    } else {
      return ScientistOne;
    }
  };

  // Function to increase essence count
  const handleIncrease = () => {
    setEssenceCount((prevCount) => prevCount + 1);
  };

  // Function to decrease essence count
  const handleDecrease = () => {
    setEssenceCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
  };

  const handleEssence = () => {
    useEssences(essenceCount);
    setEssenceCount(0);
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80vw",
          p: 4,
          height: "80vh",
          borderRadius: "16px",
          background: "linear-gradient(to right, #f8e7e7, #e7f8f1)",
          display: "flex",
          flexDirection: "column",
          boxShadow: 24,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginBottom: 2,
            borderBottom: "2px solid",
            borderColor: theme.palette.grey[500],
          }}
        >
          <Typography
            sx={{
              fontSize: "50px",
              textAlign: "center",
              flexGrow: 1,
              color: theme.palette.primary.dark,
            }}
          >
            Dr. Breeze
          </Typography>
          <Button onClick={onClose}>
            <CancelIcon
              sx={{ color: theme.palette.grey[500], fontSize: "4rem" }}
            />
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            flexGrow: 1, // Takes up remaining space
            alignItems: "center", // Vertically align items in the center
            backgroundColor: "#fff", // Light background for the card
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)", // Subtle shadow for depth
            borderRadius: "16px", // Increases border radius for a softer, modern look
            padding: "20px", // Adds space inside the card
            transition: "box-shadow 0.3s", // Smooth transition for hover effect
            "&:hover": {
              boxShadow: "0 8px 16px rgba(0,0,0,0.2)", // Darker shadow on hover for interactive feel
            },
          }}
        >
          <Box
            sx={{
              width: "30%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 4, // Margin bottom to separate from other content
            }}
          >
            <Box
              component="img"
              src={getImageSrc()}
              alt="Scientist"
              sx={{
                width: "100%", // Uses full container width
                height: "auto",
                borderRadius: "8px", // Consistent rounded corners
                mb: 2, // Margin bottom for spacing between the image and the text
              }}
            />
            <Typography
              variant="h6"
              sx={{ mb: 2, fontWeight: "medium", color: "black" }}
            >
              Memory Recovery
            </Typography>
            <Box sx={{ width: "100%", mb: 2 }}>
              <LinearProgress
                variant="determinate"
                value={(usedEssences / 15) * 100}
                // TODO might change this value
                sx={{
                  width: "100%", // Ensures the progress bar fills the width
                  height: "10px", // Slightly thicker progress bar for better visibility
                  borderRadius: "4px", // Rounded corners for the progress bar
                  backgroundColor: "rgba(0,0,0,0.1)", // Subtle background for progress bar
                }}
              />
            </Box>
          </Box>

          <Box
            sx={{
              width: "30%",
              textAlign: "center",
              mb: 4, // Margin bottom to provide space from other components
              backgroundColor: "#f7f7f7", // Adds a subtle background color for contrast
              p: 2, // Adds padding inside the box for better spacing
              borderRadius: "10px", // Softens the corners more
              boxShadow: "0 6px 10px rgba(0,0,0,0.1)", // Enhanced shadow for 3D effect
            }}
          >
            <Typography
              variant="h4"
              sx={{ mb: 3, color: "#4a148c", fontWeight: "bold" }}
            >
              You have {essences} memory essences
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                mt: 2, // Margin top for spacing from the top
                mb: 2, // Margin bottom before the text
              }}
            >
              <Button
                variant="contained"
                sx={{
                  mr: 2, // Margin right for spacing from the image
                  minWidth: "auto", // Minimize width to fit content
                  fontSize: "1.2rem", // Bigger font size for better readability
                  bgcolor: "#78909c", // Cool grey color
                  "&:hover": {
                    bgcolor: "#546e7a", // Darker shade on hover
                  },
                  padding: "10px 20px", // Bigger buttons for better interaction
                }}
                onClick={handleDecrease}
                disabled={essenceCount === 0} // Disables button when essence count is zero
              >
                -
              </Button>

              <Box
                sx={{
                  mx: 2, // Margins on the sides for proper spacing
                  textAlign: "center", // Ensures everything is centered
                }}
              >
                <Box
                  component="img"
                  src={MemoryEssence} // Replace with your actual image path
                  alt="Memory Essence"
                  sx={{
                    width: "90%", // Adjust width as needed
                    height: "auto",
                    borderRadius: "100px",
                    mb: 1, // Margin bottom to space out the image from the count
                  }}
                />
                <Typography
                  sx={{
                    fontSize: "1.5rem",
                    color: "black",
                    display: "block", // Ensures it behaves as a block element
                  }}
                >
                  {essenceCount}
                </Typography>
              </Box>

              <Button
                variant="contained"
                sx={{
                  ml: 2, // Margin left for spacing from the image
                  minWidth: "auto", // Minimize width to fit content
                  fontSize: "1.2rem", // Bigger font size for better readability
                  bgcolor: "#78909c", // Cool grey color
                  "&:hover": {
                    bgcolor: "#546e7a", // Darker shade on hover
                  },
                  padding: "10px 20px", // Bigger buttons for better interaction
                }}
                onClick={handleIncrease}
                disabled={essenceCount >= essences} // Disables button when essence count is zero
              >
                +
              </Button>
            </Box>

            <Typography
              variant="h6"
              sx={{ mb: 2, color: "#37474f", fontWeight: "medium" }}
            >
              Memory Essence
            </Typography>
            <Typography sx={{ mb: 2, color: "#37474f" }}>
              "A crucial memory fragment..."
            </Typography>
            <Button
              disabled={essenceCount === 0}
              variant="contained"
              onClick={handleEssence}
              sx={{
                mt: 2, // Margin top before the button
                bgcolor: "#43a047", // Fresh green color
                "&:hover": {
                  bgcolor: "#388e3c", // Darker green on hover
                },
                padding: "10px 20px", // Bigger buttons for better interaction
              }}
            >
              Use
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
