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
} from "../../assets"; // Ensure these imports are correct

export const FarmingBadge = () => {
  // TODO
  const initialTasks: BadgeTask[] = [
    {
      name: "Sowing and Harvesting",
      image: Spring,
      description: "Learn the basic rhythm that defines agriculture around the world",
      isCompleted: false,
    },
    {
      name: "Matariki and Samhain",
      image: Summer,
      description: "See how seasonal agriculture has affected human cultures",
      isCompleted: false,
    },
    {
      name: "Winter Wheat and Atypical Crops",
      image: Autumn,
      description: "Explore how some crops defy the typical seasonal patterns",
      isCompleted: false,
    },
  ];

  const [badgeData, setBadgeData] = useState<BadgeData>({
    title: "Farming",
    description:
      "Awarded for exploring how the Earth's seasons influence agrilculture and humans..",
    image: Farm,
    numberOfTasks: initialTasks.length,
    numberOfCompletedTasks: initialTasks.filter((task) => task.isCompleted)
      .length,
    isCompleted: initialTasks.every((task) => task.isCompleted),
    tasks: initialTasks,
  });
  return <BadgeTemplate badgeData={badgeData} />;
};
