import React from "react";
import CardPopup from "../CardPopup";
import * as MuiIcons from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";

interface DescriptionContentProps {
    title: string,
    description: string,
    buttonText?: string,
    buttonFunction: () => void,
    buttonColour?: string,
}

const ContentContainer = {
    maxWidth: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  };
  const BottomHalf = {
    height: "100%",
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    color: "black",
  };

  const ButtonContainer = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    padding: "16px 0",
  };


// a basic content child for the CardPopup component.
// just a title and description centered in the middle

const DescriptionContent: React.FC<DescriptionContentProps> = ({
    title,
    description,
    buttonText = "Got it!",
    buttonColour = "Black",
    buttonFunction
}) => {
    

  return (
    <Box sx={BottomHalf}>
        <Box sx={ContentContainer}>
                <Typography
                    id="modal-title"
                    variant="h6"
                    component="h2"
                    gutterBottom>
                        {title}
                </Typography>
                <Typography
                    id="modal-description"
                    variant="body2"
                    align="center"
                    gutterBottom
                    sx={{ marginTop: 2 }}>
                        {description}
                </Typography>
            </Box>
            <Box sx={ButtonContainer}>
                <Button
                    variant="contained"
                    sx={{
                        borderRadius: 28,
                        height: 40,
                        width: 100,
                        backgroundColor: buttonColour,
                        color: "black",
                        "&.MuiButtonBase-root:hover": { bgcolor: buttonColour },
                    }}
                    onClick={buttonFunction}
                    disableElevation
                    >
                    {buttonText}
                </Button>
            </Box>
    </Box>
   
  );
};

export default DescriptionContent;
