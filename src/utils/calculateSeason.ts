import { Season } from "../types/Enum";

export function calculateSeason(position: number): Season {
  if (position < 90) {
    return Season.Autumn;
  } else if (position < 180) {
    return Season.Summer;
  } else if (position < 270) {
    return Season.Spring;
  } else {
    return Season.Winter;
  }
}
