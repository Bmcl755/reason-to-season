import comment from "@mui/icons-material/comment";
import { Season } from "../types/Enum";
import { AppContextType, IsFoundationCompleted } from "../types/Types";
import { initialFoundationState } from "../utils/initialStates";

export const initialContextValues: AppContextType = {
  testing: "",
  setTesting: () => {},
  isFoundationCompleted: initialFoundationState,
  completeSpring: () => {},
  completeSummer: () => {},
  completeAutumn: () => {},
  completeWinter: () => {},
  completeAxialTilt: () => {},
  completeSolstice: () => {},
  earthPosition: 180,
  currentSeason: Season.Spring,
  setEarthPosition: () => {},
  setCurrentSeason: () => {},
  userName: "Newton",
  setUserName: () => {},
  essences: 0,
  usedEssences: 0,
  useEssences: () => {},
  commentMessage: [],
  createCommentMessage: () => {},
};
