import React, { useEffect, useState } from "react";
import { StoryFour, StoryOne, StoryThree, StoryTwo } from "../../../assets";
import { Box, Button, Modal, Typography } from "@mui/material";

interface StoryTellingProps {
  open: boolean;
  onClose: () => void;
  onOpenUserNameModal: () => void;
}

export const StoryTelling = ({
  open,
  onClose,
  onOpenUserNameModal,
}: StoryTellingProps) => {
  const handleClose = () => {
    onClose();
    onOpenUserNameModal();
  };
  const images = [
    { src: StoryOne, alt: "A scientist is sleeping under an apple tree" },
    { src: StoryTwo, alt: "Apple is falling from the tree" },
    { src: StoryThree, alt: "Apple hit the scientist's head" },
    { src: StoryFour, alt: "Scientist lost all his memories about seasons" },
  ];

  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    // Setup interval to change image every 3 seconds (3000 milliseconds)
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length); // Loop back to the first image after the last one
    }, 3000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <Modal open={open}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90vw",
          maxWidth: 600,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          id="story-modal-title"
          variant="h6"
          gutterBottom
          align="center"
          sx={{ color: "#FF0000", mb: 4 }}
        >
          Hi Adventurer! Ready for an exciting journey?
        </Typography>
        <Typography
          id="story-modal-description"
          variant="body2"
          gutterBottom
          sx={{ color: "black", mb: 1 }}
        >
          Meet Dr. Breeze, the brilliant season scientist! One sunny day, while
          he was sitting under an apple tree, a big apple fell right on his head
          and whoosh! all his knowledge about the seasons scattered around the
          world.
          <br />
          Now, he needs your help to gather his lost memories. Each task you
          complete helps Dr. Breeze remember more about how seasons affect
          farming, weather, and even animal migration.
        </Typography>
        <Typography
          align="center"
          gutterBottom
          sx={{ color: "red", fontSize: "1.5rem", mb: 2 }}
        >
          🍎 Help Dr. Breeze, and become a Season Expert yourself! 🍎
        </Typography>
        <Box
          component="img"
          src={images[index].src}
          alt={images[index].alt}
          sx={{
            width: "70%",
            maxWidth: "90%",
            height: "auto",
            transition: "transform 0.3s ease-in-out, filter 0.3s ease-in-out",
            mb: 3, // Margin bottom before the button
          }}
        />
        <Button
          variant="contained"
          fullWidth
          onClick={handleClose}
          sx={{
            mt: 1,
            borderRadius: 28,
            height: 40,
            bgcolor: "#4CAF50",
            color: "white",
            "&:hover": {
              bgcolor: "#4CAF50",
            },
          }}
          disableElevation
        >
          Next
        </Button>
      </Box>
    </Modal>
  );
};

export default StoryTelling;
