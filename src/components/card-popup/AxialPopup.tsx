import React from "react";
import CardPopup from "./CardPopup";
import * as MuiIcons from "@mui/icons-material";
import DescriptionContent from "./content/DescriptionContent";

interface AxialTiltPopupProps {
  open: boolean;
  onClose: () => void;
  activity: string; // Represents the reason key (e.g., "satellite", "asteroid", etc.)
}

// Updated instructions dictionary for reasons of Earth's tilt
const floatingObject: Record<
  string,
  {
    title: string;
    description: string;
    bgColour: string;
    iconColour: string;
    iconName: keyof typeof MuiIcons;
  }
> = {
  satellite: {
    title: "Satellite",
    description: "Incorrect. \n The Earth's tilt happened long before satellites were launched.",
    bgColour: "#e0f7fa",
    iconColour: "#006064",
    iconName: "Satellite",
  },
  asteroid: {
    title: "Asteroid",
    description: "Correct. \n The leading theory is that a large mass such as an asteroid impact caused the Earth's tilt.",
    bgColour: "#ffebee",
    iconColour: "#c62828",
    iconName: "Brightness2",
  },
  anotherPlanet: {
    title: "Another Planet",
    description: "Incorrect. \n The Earth's tilt is not believed to be caused by another planet's gravitational pull.",
    bgColour: "#e8f5e9",
    iconColour: "#2e7d32",
    iconName: "Public",
  },
  ufo: {
    title: "UFO",
    description: "Incorrect. \n There is no evidence to suggest that UFOs caused the Earth's tilt.",
    bgColour: "#f3e5f5",
    iconColour: "#6a1b9a",
    iconName: "Deblur",
  },
};

const AxialTiltPopup: React.FC<AxialTiltPopupProps> = ({ open, onClose, activity }) => {
  const { title, description, bgColour, iconColour, iconName } =
    floatingObject[activity.toLowerCase()];
  return (
    <CardPopup
      open={open}
      onClose={onClose}
      bgColour={bgColour}
      iconName={iconName}
      iconColour={iconColour}
    >
      <DescriptionContent
        title={title}
        description={description}
        buttonFunction={onClose}
        buttonText="Got it!"
        buttonColour={bgColour}
      />
    </CardPopup>
  );
};

export default AxialTiltPopup;