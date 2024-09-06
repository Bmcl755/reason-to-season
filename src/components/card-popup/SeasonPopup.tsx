import { Description } from "@mui/icons-material";
import CardPopup from "./CardPopup";
import * as MuiIcons from "@mui/icons-material";
import { Season } from "../../types/Enum";
import DescriptionContent from "./content/DescriptionContent";

interface SeasonPopupProps {
  open: boolean;
  onClose: () => void;
  season: Season;
}

// TODO: Add season info
const seasonDesigns: Record<
  string,
  {
    title: string;
    description: string;
    bgColour: string;
    iconColour: string;
    iconName: keyof typeof MuiIcons;
  }
> = {
  winter: {
    title: "Winter!",
    description:
      "Winter is the coldest season, with shorter days, longer nights, and lower temperatures. Snow often covers the ground, and people wear heavy clothing to stay warm. Activities like skiing and ice skating are popular.",
    bgColour: "#D6EAFB",
    iconColour: "#0065E1",
    iconName: "AcUnit",
  },
  spring: {
    title: "Spring!",
    description:
      "Spring is the season of renewal, marked by warmer temperatures and longer days. Flowers bloom, trees regain their leaves, and animals become more active. People enjoy outdoor activities like picnics and gardening.",
    bgColour: "#55903B",
    iconColour: "#A5C695",
    iconName: "LocalFlorist",
  },
  summer: {
    title: "Summer!",
    description:
      "Summer is the hottest season, featuring long, sunny days and short nights. People often wear light clothing and enjoy outdoor activities like swimming, barbecuing, and traveling. The days are filled with vibrant energy and warmth.",
    bgColour: "#FBDD49",
    iconColour: "#FF6813",
    iconName: "WbSunny",
  },
  autumn: {
    title: "Autumn!",
    description:
      "Autumn, or fall, is the season of transition, characterized by cooler temperatures and shorter days. Leaves change color and fall from trees. People often wear cozy sweaters and enjoy activities like apple picking and hiking.",
    bgColour: "#F95858",
    iconColour: "#E12727",
    iconName: "Spa",
  },
};

const SeasonPopup: React.FC<SeasonPopupProps> = ({ open, onClose, season }) => {
  const { title, description, bgColour, iconColour, iconName } =
    seasonDesigns[season.toLowerCase()];
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
export default SeasonPopup;
