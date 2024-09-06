import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { BadgeTemplate } from "./BadgeTemplate";
import { BadgeData, BadgeTask } from "../../types/Types";
import { AppContext } from "../../contexts/AppContextProvider";
import {
  Spring,
  Summer,
  Autumn,
  Winter,
  Axial,
  Equinox,
  Season,
  Expert,
  Animal,
  Farm,
  Weather,
} from "../../assets"; // Ensure these imports are correct

export const WeatherBadge = () => {
  // TODO
  const initialTasks: BadgeTask[] = [
    {
      name: "Rain, snow, and sun",
      image: Autumn,
      description: "Explore typical weather effects in typical seasons",
      isCompleted: false,
    },
    {
      name: "Wet, dry, and moonsoon",
      image: Spring,
      description: "See how different parts of the world experience the seasons",
      isCompleted: false,
    },
    {
      name: "Cyclones, hurricanes, and tropical storms",
      image: Summer,
      description: "Discover how seasonal changes can cause powerful weather events",
      isCompleted: false,
    },
  ];

  const [badgeData, setBadgeData] = useState<BadgeData>({
    title: "Weather",
    description:
      "Awarded for understanding seasonal effects on weather around the world",
    image: Weather,
    numberOfTasks: initialTasks.length,
    numberOfCompletedTasks: initialTasks.filter((task) => task.isCompleted)
      .length,
    isCompleted: initialTasks.every((task) => task.isCompleted),
    tasks: initialTasks,
  });
  return <BadgeTemplate badgeData={badgeData} />;
};
