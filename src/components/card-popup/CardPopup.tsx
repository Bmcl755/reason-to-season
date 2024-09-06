import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import DescriptionContent from "./content/DescriptionContent";

interface CardPopupProps {
  open: boolean;
  onClose: () => void;
  iconName: keyof typeof MuiIcons;
  bgColour?: string;
  iconColour?: string;
  children?: React.ReactNode;
}

const CardPopup: React.FC<CardPopupProps> = ({
  open,
  onClose,
  iconName,
  bgColour = "black",
  iconColour = "white",
  children,
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: children ? "auto" : 400,
    height: children ? "auto" : 500,
    aspectRatio: "4 / 5",
    minWidth: children ? "auto" : 320,
    minHeight: children ? "auto" : 400,
    maxWidth: "90%",
    maxHeight: "90vh",
    bgcolor: "background.paper",
    boxShadow: 24,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    p: 0,
  };

  const TopHalf = {
    backgroundColor: bgColour,
    height: "37%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const BottomHalf = {
    height: "63%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    color: "black",
  };

  const ContentContainer = {
    width: "95%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  };

  const ButtonContainer = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    padding: "16px 0",
  };

  const IconComponent = MuiIcons[iconName];

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Box sx={TopHalf}>
          {IconComponent && (
            <IconComponent style={{ fontSize: 80, color: iconColour }} />
          )}
        </Box>
        <Box sx={BottomHalf}>
          {children ? (
            <Box sx={ContentContainer}>{children}</Box>
          ) : (
            <Box sx={ContentContainer}>
              <DescriptionContent
                title="no title"
                description="no description"
                buttonFunction={onClose}
                buttonColour={bgColour}
              />
            </Box>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default CardPopup;
