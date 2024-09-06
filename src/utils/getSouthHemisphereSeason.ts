import { Season } from "../types/Enum";

export const getSouthHemisphereSeason = (season: Season): Season => {
  if (season === Season.Spring) {
    return Season.Autumn;
  } else if (season === Season.Summer) {
    return Season.Winter;
  } else if (season === Season.Autumn) {
    return Season.Spring;
  } else {
    return Season.Summer;
  }
};
