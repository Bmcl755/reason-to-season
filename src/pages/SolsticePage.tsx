import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, useTheme } from "@mui/material";
import DayNightDuration from "../components/DayNightDuration";
import styled from "styled-components";
import InstructionsPopup from "../components/card-popup/InstructionsPopup";
import EarthSunSimulation from "../components/EarthSunSimulation";
import { calculateProportion } from "../utils/calculateProportion";
import { AppContext } from "../contexts/AppContextProvider";
import QuizPopup from "../components/card-popup/QuizPopup";
import { SolsticeActivityQuestions } from "../utils/quizContent";

const Slider = styled.input`
  margin-top: 20px;
  width: 300px;
`;

export const SolsticePage: React.FC = () => {
  const {
    earthPosition,
    setEarthPosition,
    completeSolstice,
    isFoundationCompleted,
  } = useContext(AppContext);
  const [previousPosition, setPreviousPosition] = useState<number>(0);
  const [dayProportion, setDayProportion] = useState<number>(60); // Initial value just after summer solstice
  const [nightSectionWidth, setNightSectionWidth] = useState<number>(0); // Track night section width
  const theme = useTheme();

  const [isVisibleOtherHemisphere, setIsVisibleOtherHemisphere] =
    useState<boolean>(false);
  const [isStep1Complete, setStep1Complete] = useState<boolean>(false);
  const [isStepTwoComplete, setStepTwoComplete] = useState<boolean>(false);
  const [isStepThreeComplete, setStepThreeComplete] = useState<boolean>(false);
  const [isStepFourComplete, setStepFourComplete] = useState<boolean>(false);
  const [isStepFiveComplete, setStepFiveComplete] = useState<boolean>(false);
  const [isQuizzing, setQuizzing] = useState<boolean>(false);
  const [hasLearnt, setHasLearned] = useState<boolean>(false);
  const [isInstructionsOpen, setInstructionsOpen] = useState(true); // Set this to true for instructions to immediately pop-up on first visit
  const [currentStep, setCurrentStep] = useState("step1");
  const [targetLine, setTargetLine] = useState<number>(100);
  const [shouldRunEffect, setShouldRunEffect] = useState<boolean>(true); // Control flag

  const handleOpenInstructions = (step: string) => {
    setCurrentStep(step);
    setInstructionsOpen(true);
  };

  const handleCloseInstructions = () => {
    if (currentStep === "step5" && !isStepFiveComplete) {
      setStepFiveComplete(true);
      setHasLearned(true);
    }
    setInstructionsOpen(false);
  };

  const navigate = useNavigate();

  const handleCloseQuiz = () => {
    setQuizzing(false);
    if (!isFoundationCompleted.isSolstice) {
      completeSolstice();
    }
    navigate("/orbit");
  };

  useEffect(() => {
    const isIncreasing = earthPosition > previousPosition;
    const initialProportion = calculateProportion(earthPosition, isIncreasing);
    setDayProportion(initialProportion);
    setPreviousPosition(earthPosition);
  }, [earthPosition]);

  useEffect(() => {
    if (!shouldRunEffect) return; // Stop running the effect after step 4 is completed

    if (
      earthPosition >= 90 &&
      earthPosition <= 100 &&
      !isStep1Complete &&
      !isStepTwoComplete
    ) {
      setEarthPosition(0);
      setTargetLine(100);

      handleOpenInstructions("step2");
      setStep1Complete(true);
      setIsVisibleOtherHemisphere(true);
    } else if (
      earthPosition >= 90 &&
      earthPosition <= 100 &&
      !isStepTwoComplete &&
      isStep1Complete
    ) {
      setEarthPosition(0);
      setTargetLine(0);
      handleOpenInstructions("step3");
      setStepTwoComplete(true);
    } else if (
      dayProportion >= 49 &&
      dayProportion <= 50 &&
      isStepTwoComplete &&
      !isStepThreeComplete
    ) {
      setTargetLine(0);
      setEarthPosition(0);
      handleOpenInstructions("step4");
      setStepThreeComplete(true);
    } else if (
      (dayProportion >= 68 && dayProportion <= 70) ||
      (nightSectionWidth >= 68 &&
        nightSectionWidth <= 70 &&
        isStepThreeComplete &&
        !isStepFourComplete)
    ) {
      setEarthPosition(0);
      handleOpenInstructions("step5");
      setStepFourComplete(true);
      setShouldRunEffect(false); // Stop the effect from running after step 4 is completed
    }

    console.log(`night: ${nightSectionWidth}`);
    console.log(`day: ${dayProportion}`);
  }, [earthPosition, nightSectionWidth, dayProportion, shouldRunEffect]);

  return (
    <div
      style={{
        flexDirection: "row",
        width: "100vw",
        height: "100vh",
        display: "flex",
      }}
    >
      <Box
        sx={{
          width: "75%",
          textAlign: "center",
          paddingTop: "4px",
        }}
      >
        {hasLearnt && (
          <Button
            sx={{
              bgcolor: "black",
              color: "white",
              width: "100px",
              borderRadius: "20px",
              border: "2px solid white",
              "&:hover": {
                bgcolor: "darkgray",
                color: "black",
              },
            }}
            onClick={() => {
              setQuizzing(true);
            }}
          >
            QUIZ
          </Button>
        )}
        <EarthSunSimulation earthAxialTilt={23.4} redLineTarget={targetLine} />

        <InstructionsPopup
          open={isInstructionsOpen}
          onClose={handleCloseInstructions}
          activity="solstice"
          step={currentStep}
        />
      </Box>
      {/* Side panel */}
      <Box
        alignItems="center"
        borderRadius={20}
        display="flex"
        flexDirection="column"
        justifyContent={isVisibleOtherHemisphere ? "space-between" : "center"}
        gap={isVisibleOtherHemisphere ? "0px" : "20px"}
        sx={{
          width: "20%",
          margin: 5,
          padding: 5,
          backgroundColor: theme.palette.primary.dark,
        }}
      >
        <Typography sx={{ color: "white" }}>Northern Hemisphere</Typography>
        <DayNightDuration
          dayProportion={100 - dayProportion}
          setDayProportion={setDayProportion}
        />

        <Typography
          sx={{
            color: "white",
            visibility: isVisibleOtherHemisphere ? "visible" : "hidden",
          }}
        >
          Southern Hemisphere
        </Typography>
        <DayNightDuration
          dayProportion={dayProportion}
          setDayProportion={setDayProportion}
          setNightSectionWidth={setNightSectionWidth}
          sx={{ visibility: isVisibleOtherHemisphere ? "visible" : "hidden" }}
        />
      </Box>
      <QuizPopup
        open={isQuizzing}
        onClose={handleCloseQuiz}
        quiz={SolsticeActivityQuestions}
      />
    </div>
  );
};

export default SolsticePage;
