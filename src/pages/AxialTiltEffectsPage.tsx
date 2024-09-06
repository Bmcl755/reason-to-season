import { Box, Button, Icon, Tooltip, Typography } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Earth } from "../assets/exports";
import { Sun } from "../assets/exports";
import { SunRaysArrow } from "../assets/exports";
import { SunRaysThick } from "../assets/exports";
import InstructionsPopup from "../components/card-popup/InstructionsPopup";
import SunPercentageBar from "../components/axial-tilt/SunPercentageBar";
import QuizPopup from "../components/card-popup/QuizPopup";
import { AxialTiltQuestions } from "../utils/quizContent";
import AxialTiltReview from "../components/comment/AxialTiltReview";
import { AppContext } from "../contexts/AppContextProvider";
import { useNavigate } from "react-router-dom";
import QuizIcon from '@mui/icons-material/Quiz';

const BackgroundContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 1px;
  width: 1px;
  border-radius: 50%;
  box-shadow: -42vw -4vh 0px 0px #fff, 25vw -41vh 0px 0px #fff,
    -20vw 49vh 0px 1px #fff, 5vw 40vh 1px 1px #fff, 29vw 19vh 1px 0px #fff,
    -44vw -13vh 0px 0px #fff, 46vw 41vh 0px 1px #fff, -3vw -45vh 0px 1px #fff,
    47vw 35vh 1px 0px #fff, 12vw -8vh 1px 0px #fff, -34vw 48vh 1px 1px #fff,
    32vw 26vh 1px 1px #fff, 32vw -41vh 1px 1px #fff, 0vw 37vh 1px 1px #fff,
    34vw -26vh 1px 0px #fff, -14vw -49vh 1px 0px #fff, -12vw 45vh 0px 1px #fff,
    -44vw -33vh 0px 1px #fff, -13vw 41vh 0px 0px #fff, -36vw -11vh 0px 1px #fff,
    -23vw -24vh 1px 0px #fff, -38vw -27vh 0px 1px #fff, 16vw -19vh 0px 0px #fff,
    28vw 33vh 1px 0px #fff, -49vw -4vh 0px 0px #fff, 16vw 32vh 0px 1px #fff,
    36vw -18vh 1px 0px #fff, -25vw -30vh 1px 0px #fff, -23vw 24vh 0px 1px #fff,
    -2vw -35vh 1px 1px #fff, -25vw 9vh 0px 0px #fff, -15vw -34vh 0px 0px #fff,
    -8vw -19vh 1px 0px #fff, -20vw -20vh 1px 1px #fff, 42vw 50vh 0px 1px #fff,
    -32vw 10vh 1px 0px #fff, -23vw -17vh 0px 0px #fff, 44vw 15vh 1px 0px #fff,
    -40vw 33vh 1px 1px #fff, -43vw 8vh 0px 0px #fff, -48vw -15vh 1px 1px #fff,
    -24vw 17vh 0px 0px #fff, -31vw 50vh 1px 0px #fff, 36vw -38vh 0px 1px #fff,
    -7vw 48vh 0px 0px #fff, 15vw -32vh 0px 0px #fff, 29vw -41vh 0px 0px #fff,
    2vw 37vh 1px 0px #fff, 7vw -40vh 1px 1px #fff, 15vw 18vh 0px 0px #fff,
    25vw -13vh 1px 1px #fff, -46vw -12vh 1px 1px #fff, -18vw 22vh 0px 0px #fff,
    23vw -9vh 1px 0px #fff, 50vw 12vh 0px 1px #fff, 45vw 2vh 0px 0px #fff,
    14vw -48vh 1px 0px #fff, 23vw 43vh 0px 1px #fff, -40vw 16vh 1px 1px #fff,
    20vw -31vh 0px 1px #fff, -17vw 44vh 1px 1px #fff, 18vw -45vh 0px 0px #fff,
    33vw -6vh 0px 0px #fff, 0vw 7vh 0px 1px #fff, -10vw -18vh 0px 1px #fff,
    -19vw 5vh 1px 0px #fff, 1vw 42vh 0px 0px #fff, 22vw 48vh 0px 1px #fff,
    39vw -8vh 1px 1px #fff, -6vw -42vh 1px 0px #fff, -47vw 34vh 0px 0px #fff,
    -46vw 19vh 0px 1px #fff, -12vw -32vh 0px 0px #fff, -45vw -38vh 0px 1px #fff,
    -28vw 18vh 1px 0px #fff, -38vw -46vh 1px 1px #fff, 49vw -6vh 1px 1px #fff,
    -28vw 18vh 1px 1px #fff, 10vw -24vh 0px 1px #fff, -5vw -11vh 1px 1px #fff,
    33vw -8vh 1px 0px #fff, -16vw 17vh 0px 0px #fff, 18vw 27vh 0px 1px #fff,
    -8vw -10vh 1px 1px #fff;
`;

const VerticalLine = styled.div`
  height: 450px;
  width: 2px;
  margin-top: -25px;
  margin-left: -200px;
  background-color: white;
  transform: translateX(-50%);
  z-index: 3;
`;

const ButtonBox = styled.div`
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const AxialTiltEffectsPage = () => {
  const navigate = useNavigate();

  const { completeAxialTilt, isFoundationCompleted } = useContext(AppContext);

  const [isStepTwoComplete, setStepTwoComplete] = useState<boolean>(false);
  const [isInstructionsOpen, setInstructionsOpen] = useState(true); //set this to true = immediately pop-up on first visit
  const [currentStep, setCurrentStep] = useState("step1");
  const [isQuizzing, setQuizzing] = useState<boolean>(false);
  const [isReviewing, setReviewing] = useState<boolean>(false);

  const earthRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const axisLineRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startAngle, setStartAngle] = useState(0);
  const [currentRotation, setCurrentRotation] = useState(0);

  const [northHemisphereSunPercentage, setNorthHemisphereSunPercentage] =
    useState(0);
  const [southHemisphereSunPercentage, setSouthHemisphereSunPercentage] =
    useState(0);
  const sunPercentageChangePerDegree = 50 / 90;

  const [sunClicked, setSunClicked] = useState(false);

  const handleOpenInstructions = (step: string) => {
    setCurrentStep(step);
    setInstructionsOpen(true);
  };

  const handleCloseInstructions = () => {
    setInstructionsOpen(false);
  };

  const commentSubmit = () => {
    completeAxialTilt();
    navigate("/orbit");
  };

  const getAngle = (cx: number, cy: number, ex: number, ey: number): number => {
    const dy = ey - cy;
    const dx = ex - cx;
    const rad = Math.atan2(dy, dx);
    const deg = rad * (180 / Math.PI);
    return deg;
  };

  const calculateSunPercentage = (rotation: number) => {
    if (rotation > 360) {
      setCurrentRotation(rotation - 360);
      rotation = rotation - 360;
    }
    if (rotation <= 90) {
      const newSunPercentage = 50 + rotation * sunPercentageChangePerDegree;

      setNorthHemisphereSunPercentage(newSunPercentage);
      setSouthHemisphereSunPercentage(100 - newSunPercentage);
    } else if (rotation > 90 && rotation <= 270) {
      const newSunPercentage =
        50 + (100 - rotation * sunPercentageChangePerDegree);

      setNorthHemisphereSunPercentage(newSunPercentage);
      setSouthHemisphereSunPercentage(100 - newSunPercentage);
    } else if (rotation > 270 && rotation <= 360) {
      const newSunPercentage = (rotation - 270) * sunPercentageChangePerDegree;

      setNorthHemisphereSunPercentage(newSunPercentage);
      setSouthHemisphereSunPercentage(100 - newSunPercentage);
    }
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    if (!earthRef.current || !containerRef.current) return;

    setIsDragging(true);
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const startAngle = getAngle(centerX, centerY, event.clientX, event.clientY);
    setStartAngle(startAngle - currentRotation);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isDragging || !earthRef.current || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const newAngle = getAngle(centerX, centerY, event.clientX, event.clientY);
    const rotation = newAngle - startAngle;

    earthRef.current.style.transform = `rotate(${rotation}deg)`;
    axisLineRef.current!.style.transform = `rotate(${rotation}deg)`;
  };

  const handleMouseUp = () => {
    if (!earthRef.current) return;

    setIsDragging(false);
    const transform = earthRef.current.style.transform;
    const rotateMatch = transform.match(/rotate\(([-\d.]+)deg\)/);
    if (rotateMatch) {
      const rotation = parseFloat(rotateMatch[1]);
      if (rotation > 0) {
        setCurrentRotation(rotation);
      } else {
        setCurrentRotation(rotation + 360);
      }
    }
  };

  const applyCurrentRotation = () => {
    if (!earthRef.current) return;

    earthRef.current.style.transform = `rotate(${currentRotation}deg)`;
    axisLineRef.current!.style.transform = `rotate(${currentRotation}deg)`;
  };

  useEffect(() => {
    const handleMouseUpWindow = () => handleMouseUp();
    window.addEventListener("mouseup", handleMouseUpWindow);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mouseup", handleMouseUpWindow);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDragging, startAngle, currentRotation]);

  useEffect(() => {
    setCurrentRotation(23.5);
  }, []);

  useEffect(() => {
    if (currentRotation !== null) {
      calculateSunPercentage(currentRotation);
      applyCurrentRotation();
    }
  }, [currentRotation]);

  return (
    <div
      style={{
        flexDirection: "row",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <BackgroundContainer></BackgroundContainer>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            width: "250px",
          }}
        />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <ButtonBox>
          {isStepTwoComplete && (
            <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
            style={{
              backgroundColor: '#007FFF', // Green background
              color: 'white',             // White text
              padding: '15px 25px',       // Padding
              fontSize: '16px',           // Font size
              border: 'none',             // Remove border
              borderRadius: '5px',        // Rounded corners
              cursor: 'pointer',          // Pointer cursor on hover
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow
              transition: 'background-color 0.3s ease', // Smooth transition for hover effect
            }}
            onClick={() => {
              setQuizzing(true);
            }}>
              <Icon sx={{ mr: 1 }}>
                <QuizIcon />
              </Icon>
              <Typography
              >
                Quiz  
              </Typography>

              
            </Box>
          )}
          </ButtonBox>
          <Box
            sx={{
              width: "100%",
              height: "400px",
              display: "flex",
              flexDirection: "row",
            }}
          >
            {sunClicked ? (
              <Box
                sx={{ width: "100%", display: "flex", flexDirection: "row" }}
              >
                <Box
                  sx={{
                    width: "400px",
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                    zIndex: 2,
                  }}
                  ref={containerRef}
                  onMouseDown={handleMouseDown}
                >
                  <img
                    ref={earthRef}
                    src={Earth}
                    style={{
                      height: "100%",
                      userSelect: "none",
                      cursor: "pointer",
                    }}
                    alt="Picture of earth"
                    draggable={false}
                    onLoad={applyCurrentRotation}
                  />
                </Box>
                <VerticalLine
                  ref={axisLineRef}
                  onLoad={applyCurrentRotation}
                ></VerticalLine>
                <Box
                  sx={{
                    position: "relative",
                    zIndex: 1,
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                  }}
                >
                  <img
                    src={SunRaysThick}
                    style={{
                      width: "100%",
                      userSelect: "none",
                    }}
                    alt="Thick beams of sunlight"
                    draggable={false}
                  ></img>
                  <Box sx={{ width: "80px" }}></Box>
                  <img
                    src={SunRaysArrow}
                    style={{ width: "100%", userSelect: "none" }}
                    alt="Arrows portaying the suns rays"
                    draggable={false}
                  ></img>
                </Box>
              </Box>
            ) : (
              <Box
                sx={{ width: "100%", display: "flex", flexDirection: "row" }}
              >
                <Box
                  sx={{
                    width: "400px",
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                    zIndex: 2,
                  }}
                  ref={containerRef}
                  onMouseDown={handleMouseDown}
                >
                  <img
                    ref={earthRef}
                    src={Earth}
                    style={{
                      height: "100%",
                      userSelect: "none",
                      cursor: "pointer",
                    }}
                    alt="Picture of earth"
                    draggable={false}
                    onLoad={applyCurrentRotation}
                  />
                </Box>
                <VerticalLine
                  ref={axisLineRef}
                  onLoad={applyCurrentRotation}
                ></VerticalLine>
              </Box>
            )}
          </Box>
          <ButtonBox>
            {isStepTwoComplete && (
              <SunPercentageBar
                northHemisphereSunPercentage={northHemisphereSunPercentage}
                southHemisphereSunPercentage={southHemisphereSunPercentage}
              ></SunPercentageBar>
            )}
          </ButtonBox>
        </Box>

        <Box
          sx={{
            width: "150px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Tooltip
            open={!isStepTwoComplete}
            title="Click me!"
            placement="left"
            arrow
          >
            <img
              src={Sun}
              style={{
                width: "100%",
                userSelect: "none",
                cursor: "pointer",
              }}
              alt="Picture of the sun"
              draggable={false}
              onClick={() => {
                setSunClicked(!sunClicked);
                if (!isStepTwoComplete) {
                  handleOpenInstructions("step2");
                  setStepTwoComplete(true);
                }
              }}
            />
          </Tooltip>
        </Box>
      </Box>
      <InstructionsPopup
        open={isInstructionsOpen}
        onClose={handleCloseInstructions}
        activity="axialTiltEffects"
        step={currentStep}
      />
      <QuizPopup
        open={isQuizzing}
        onClose={() => {
          setQuizzing(false);
          setReviewing(true);
          if (isFoundationCompleted.isAxialTilt) {
            navigate("/orbit");
          }
        }}
        quiz={AxialTiltQuestions}
      />
      {!isFoundationCompleted.isAxialTilt && (
        <AxialTiltReview
          open={isReviewing}
          onClose={() => {
            setReviewing(false);
            commentSubmit();
          }}
        />
      )}
    </div>
  );
};
