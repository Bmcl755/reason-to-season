import { IsFoundationCompleted } from "../types/Types";

export const initialFoundationState: IsFoundationCompleted = {
  isSeasonCompleted: {
    isSpring: false,
    isSummer: false,
    isAutumn: false,
    isWinter: false,
  },
  isAxialTilt: false,
  isSolstice: false,
};
