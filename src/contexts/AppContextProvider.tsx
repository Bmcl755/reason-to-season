import React, { useMemo, useState } from "react";
import {
  AppContextProviderProps,
  AppContextType,
  Comment,
  IsFoundationCompleted,
} from "../types/Types";
import { initialContextValues } from "./initialContextValues";
import { initialFoundationState } from "../utils/initialStates";
import { Season } from "../types/Enum";

export const AppContext =
  React.createContext<AppContextType>(initialContextValues);

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  // TODO: We can remove the testing, later on
  const [testing, setTesting] = useState<string>("Testing app context.");

  // This will be all the states we need, feel free to add more
  const [isFoundationCompleted, setIsFoundationCompleted] =
    useState<IsFoundationCompleted>(initialFoundationState);

  const [earthPosition, setEarthPosition] = useState(0);
  const [currentSeason, setCurrentSeason] = useState<Season>(Season.Spring);
  const [userName, setUserName] = useState<string>("Newton");
  // TODO change essence number
  const [essences, setEssences] = useState<number>(0);
  const [usedEssences, setUsedEssences] = useState<number>(0);
  // TODO change the message content
  const [commentMessage, setCommentMessage] = useState<Comment[]>([
    {
      sender: "Alice",
      message:
        "If the Earth's tilt changed, we could see completely different weather patterns. Summers and winters might become more extreme or even swap places!",
    },
    {
      sender: "Bob",
      message:
        "A different tilt would probably mess up our seasons. Imagine having winter in July and summer in January – it would be so strange!",
    },
    {
      sender: "Charlie",
      message:
        "Changing the Earth's tilt could affect how much sunlight different parts of the world get. Some places might get a lot hotter or colder.",
    },
  ]);

  const completeSeason = (season: string) => {
    setIsFoundationCompleted((prevState) => ({
      ...prevState,
      isSeasonCompleted: {
        ...prevState.isSeasonCompleted,
        [season]: true,
      },
    }));
  };

  const completeSpring = () => {
    completeSeason("isSpring");
    setEssences((prev) => prev + 1);
  };

  const completeSummer = () => {
    completeSeason("isSummer");
    setEssences((prev) => prev + 1);
  };

  const completeAutumn = () => {
    completeSeason("isAutumn");
    setEssences((prev) => prev + 1);
  };

  const completeWinter = () => {
    completeSeason("isWinter");
    setEssences((prev) => prev + 1);
  };

  const completeAxialTilt = () => {
    setIsFoundationCompleted((prevState) => ({
      ...prevState,
      isAxialTilt: true,
    }));
    setEssences((prev) => prev + 3);
  };

  const completeSolstice = () => {
    setIsFoundationCompleted((prevState) => ({
      ...prevState,
      isSolstice: true,
    }));
    setEssences((prev) => prev + 3);
  };

  const useEssences = (essencesUse: number) => {
    setEssences((prev) => prev - essencesUse); // Correctly updating the state
    setUsedEssences((prev) => prev + essencesUse); // Correctly updating the state
  };

  const createCommentMessage = (message: string) => {
    const newCommentMessage = [
      ...commentMessage,
      { sender: userName + " (You)", message: message },
    ];
    setCommentMessage(newCommentMessage);
  };

  const context = useMemo(
    () => ({
      testing,
      setTesting,
      isFoundationCompleted,
      completeSpring,
      completeSummer,
      completeAutumn,
      completeWinter,
      completeAxialTilt,
      completeSolstice,
      earthPosition,
      setEarthPosition,
      currentSeason,
      setCurrentSeason,
      userName,
      setUserName,
      essences,
      usedEssences,
      useEssences,
      commentMessage,
      createCommentMessage,
    }),
    [
      testing,
      isFoundationCompleted,
      earthPosition,
      currentSeason,
      userName,
      essences,
      usedEssences,
      commentMessage,
    ]
  );

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};
