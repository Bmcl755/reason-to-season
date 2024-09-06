import React from "react";
import CardPopup from "./CardPopup";
import * as MuiIcons from "@mui/icons-material";
import DescriptionContent from "./content/DescriptionContent";

interface InstructionsPopupProps {
  open: boolean;
  onClose: () => void;
  activity: string;
  step: string;
}

// Instructions dictionary
const instructions: Record<
  string,
  Record<
    string,
    {
      title: string;
      description: string;
      bgColour: string;
      iconColour: string;
      iconName: keyof typeof MuiIcons;
    }
  >
> = {
  axialTiltEffects: {
    step1: {
      title: "The Effects of Axial Tilt",
      description:
        "The Earth's axial tilt causes each hemisphere to receive different amounts of sunlight, creating seasons. When tilted toward the Sun, a hemisphere has longer, warmer days (summer); when tilted away, it has shorter, cooler days (winter). This variation shapes seasonal weather and temperatures.",
      bgColour: "#D45113",
      iconColour: "#FAC23E",
      iconName: "RotateRight",
    },
    step2: {
      title: "The Sun's Rays",
      description:
        "Having a look at the picture, we can see that the southern hemisphere has much less sun compared to the northern hemisphere which makes it winter down south and summer up north.",
      bgColour: "#E4572E",
      iconColour: "#FAC23E",
      iconName: "WbTwilight",
    },

    // these are just dummy instructions, replace with actual ones
  },
  solstice: {
    step1: {
      title: "Solstice - Step 1",
      description:
        "Drag the earth around the red line!\nSee how the amount of day/night in the northern hemisphere changes!.",
      bgColour: "#365486",
      iconColour: "#0F1035",
      iconName: "Rocket",
    },
    step2: {
      title: "Solstice - Step 2",
      description:
        "Drag the earth around the red line!\nSee how the amount of day/night in both the hemisphere change!",
      bgColour: "#365486",
      iconColour: "#0F1035",
      iconName: "Rocket",
    },
    step3: {
      title: "Solstice - Step 3",
      description:
        "There are some important times of year.        One is where day/night are the same. This is called he Equinox.        Drag Earth so that day and night are the same.",
      bgColour: "#365486",
      iconColour: "#0F1035",
      iconName: "Rocket",
    },
    step4: {
      title: "Solstice - Step 4",
      description:
        "Congratulations! The two other important times of the year are solstices, where night and day are at their most extreme lengths. When the night is longest we call it the Winter Solstice. When the day is longest we call it Summer Solstice. Position the earth so to create a Solstice.",
      bgColour: "#c0c0c0",
      iconColour: "#444444",
      iconName: "AcUnit",
    },
    step5: {
      title: "Solstice - Step 5",
      description:
        "Congratulations!        Have a drag around until you’re comfortable with how the Earth’s orbiteffects day length in the northern and southern hemispheres.        When you think you’ve mastered it, press the quiz button to test your knowledge!",
      bgColour: "#c0c0c0",
      iconColour: "#444444",
      iconName: "AcUnit",
    },
  },
};

const InstructionsPopup: React.FC<InstructionsPopupProps> = ({
  open,
  onClose,
  activity,
  step,
}) => {
  const instruction = instructions[activity][step];

  if (!instruction) {
    return null; // Handle the case where instruction is not found
  }

  const { title, description, bgColour, iconColour, iconName } = instruction;

  return (
    <CardPopup
      open={open}
      onClose={onClose}
      bgColour={bgColour}
      iconColour={iconColour}
      iconName={iconName}
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

export default InstructionsPopup;
