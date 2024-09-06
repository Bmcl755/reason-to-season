import React, { useContext, useState } from "react";
import * as MuiIcons from "@mui/icons-material";
import { Box, Button, Modal, Typography, TextField } from "@mui/material";
import SosIcon from "@mui/icons-material/Sos";
import { AppContext } from "../../../contexts/AppContextProvider";

interface AskUserNameProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  iconName: keyof typeof MuiIcons;
  bgColour?: string;
  iconColour?: string;
  navigateHomePage: () => void;
}

export const AskUserName = ({
  open,
  onClose,
  title,
  description,
  iconName,
  bgColour,
  iconColour,
  navigateHomePage,
}: AskUserNameProps) => {
  const [name, setName] = useState("");
  const { setUserName, userName } = useContext(AppContext);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = () => {
    setUserName(name);
    onClose();
    navigateHomePage();
  };

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
          p: 4, // Consistent padding as the first modal
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ mb: 3, display: "flex", justifyContent: "center" }}>
          <SosIcon sx={{ color: "#FF0000", fontSize: "100px" }} />
        </Box>
        <Typography
          id="modal-title"
          variant="h6"
          gutterBottom
          align="center"
          sx={{ color: "#000000", mb: 2 }}
        >
          {title}
        </Typography>
        <Typography
          id="modal-description"
          variant="body2"
          align="center"
          gutterBottom
          sx={{ color: "#000000", mb: 2 }}
        >
          {description}
        </Typography>
        <TextField
          fullWidth
          label="Enter your name"
          variant="outlined"
          value={name}
          onChange={handleNameChange}
          sx={{ mt: 2, mb: 3, color: "#000000" }} // Improved spacing around the text field
        />
        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit}
          sx={{
            mt: 1,
            borderRadius: 28,
            height: 40,
            bgcolor: bgColour,
            color: "white",
            "&:hover": {
              bgcolor: bgColour,
            },
          }}
          disableElevation
        >
          Let's Start!
        </Button>
      </Box>
    </Modal>
  );
};

export default AskUserName;
