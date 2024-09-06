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
} from "../../assets"; // Ensure these imports are correct

export const SeasonFoundationBadge = () => {
  const { isFoundationCompleted } = useContext(AppContext);

  const initialTasks: BadgeTask[] = [
    {
      name: "Spring",
      image: Spring,
      description: "Explore Spring",
      isCompleted: isFoundationCompleted.isSeasonCompleted.isSpring,
    },
    {
      name: "Summer",
      image: Summer,
      description: "Explore Summer",
      isCompleted: isFoundationCompleted.isSeasonCompleted.isSummer,
    },
    {
      name: "Autumn",
      image: Autumn,
      description: "Explore Autumn",
      isCompleted: isFoundationCompleted.isSeasonCompleted.isAutumn,
    },
    {
      name: "Winter",
      image: Winter,
      description: "Explore Winter",
      isCompleted: isFoundationCompleted.isSeasonCompleted.isWinter,
    },
    {
      name: "Axial Tilt",
      image: Axial,
      description: "Understand what axial tilt is and how it causes the seasonal cycle",
      isCompleted: isFoundationCompleted.isAxialTilt,
    },
    {
      name: "Equinox",
      image: Equinox,
      description: "Understand seasonal effects on Earth's day/night cycle",
      isCompleted: isFoundationCompleted.isSolstice,
    },
  ];

  const [badgeData, setBadgeData] = useState<BadgeData>({
    title: "Season Foundation",
    description:
      "Awarded for mastering the knowledge of the four seasons, axial tilt, and equinoxes, celebrating a fundamental grasp of Earth's annual cycle.",
    image: Season,
    numberOfTasks: initialTasks.length,
    numberOfCompletedTasks: initialTasks.filter((task) => task.isCompleted)
      .length,
    isCompleted: initialTasks.every((task) => task.isCompleted),
    tasks: initialTasks,
  });

  useEffect(() => {
    setBadgeData((prev) => ({
      ...prev,
      tasks: initialTasks,
      isCompleted: initialTasks.every((task) => task.isCompleted),
    }));
  }, [isFoundationCompleted]);

  return <BadgeTemplate badgeData={badgeData} />;
};
