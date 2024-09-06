import { ReactNode } from "react";
import { Season } from "./Enum";

export type AppContextProviderProps = { children: React.ReactNode };

// TODO: We only modify this interface when you add thing in app context
export interface AppContextType {
  testing: string;
  setTesting: (value: string) => void;
  isFoundationCompleted: IsFoundationCompleted;
  completeSpring: () => void;
  completeSummer: () => void;
  completeAutumn: () => void;
  completeWinter: () => void;
  completeAxialTilt: () => void;
  completeSolstice: () => void;
  earthPosition: number;
  currentSeason: Season;
  setEarthPosition: (position: number) => void;
  setCurrentSeason: (season: Season) => void;
  userName: string;
  setUserName: (name: string) => void;
  essences: number;
  usedEssences: number;
  useEssences: (essences: number) => void;
  commentMessage: Comment[];
  createCommentMessage: (message: string) => void;
}

export type IsFoundationCompleted = {
  isSeasonCompleted: IsSeasonCompletion;
  isAxialTilt: boolean;
  isSolstice: boolean;
};

export type IsSeasonCompletion = {
  isSpring: boolean;
  isSummer: boolean;
  isAutumn: boolean;
  isWinter: boolean;
};

export type SeasonInfo = {
  title: string;
  description: string;
  imageURL: string;
};

export type SeasonColor = {
  [key in Season]: string;
};

export type BadgesPopupProps = {
  open: boolean;
  onClose: () => void;
};

export type BadgeTask = {
  name: string;
  image: string;
  description: string;
  isCompleted: boolean;
};

export type BadgeData = {
  title: string;
  description: string;
  image: string;
  isCompleted: boolean;
  numberOfTasks: number;
  numberOfCompletedTasks: number;
  tasks: BadgeTask[];
};

export type BadgeTemplateProps = {
  badgeData: BadgeData;
};

// Enum for different types of question
export enum QuestionType {
  SINGLE_SELECT = "single_select",
  MULTI_SELECT = "multi_select",
  SINGLE_IMAGE_SELECT = "single_image_select",
  MULTI_IMAGE_SELECT = "multi_image_select",
}

// Type for an individual option
export type Option = {
  id: string;
  text: string;
  image?: string;
};

export type Question = {
  id: string;
  text: string;
  type: QuestionType;
  options: Option[];
  answerId: string[];
};

export type Quiz = {
  questions: Question[];
};
export type Comment = {
  sender: string;
  message: string;
};
