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
} from "../../assets"; // Ensure these imports are correct

export const AnimalBadge = () => {
  // TODO
  const initialTasks: BadgeTask[] = [
    {
      name: "Hibernation Basics",
      image: Spring,
      description: "Explore the basics of animal hibernation",
      isCompleted: false,
    },
    {
      name: "Hibernation Advanced",
      image: Summer,
      description: "Discover when and why animals go into hibernation",
      isCompleted: false,
    },
    {
      name: "Flying Migrations",
      image: Autumn,
      description: "Follow flocks of birds as they chase the changing seasons",
      isCompleted: false,
    },
    {
      name: "Swimming Migrations",
      image: Winter,
      description: "Cross oceans and mountain streams with whales and salmon",
      isCompleted: false,
    },
    {
      name: "Migrating with Legs",
      image: Spring,
      description: "March with crabs and frolick with wildebeest in search of greener pastures",
      isCompleted: false,
    },
  ];

  const [badgeData, setBadgeData] = useState<BadgeData>({
    title: "Animal",
    description:
      "Awarded for understanding seasonal impacts on the animals of the Earth.",
    image: Animal,
    numberOfTasks: initialTasks.length,
    numberOfCompletedTasks: initialTasks.filter((task) => task.isCompleted)
      .length,
    isCompleted: initialTasks.every((task) => task.isCompleted),
    tasks: initialTasks,
  });
  return <BadgeTemplate badgeData={badgeData} />;
};
