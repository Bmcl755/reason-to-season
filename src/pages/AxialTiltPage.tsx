import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import * as MuiIcons from "@mui/icons-material";
import CardPopup from "../components/card-popup/CardPopup";
import DescriptionContent from "../components/card-popup/content/DescriptionContent";
import { useNavigate } from "react-router-dom";
import {
  Arrow,
  Asteroid,
  Collision,
  Earth,
  Hand,
  Mars,
  Satellite,
  UFO,
} from "../assets/exports";

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

const EarthContainer = styled.div<{ rotateAngle: number }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(${(props) => props.rotateAngle}deg);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20%;
  z-index: 1;
`;

const EarthImage = styled.img`
  width: 100%;
`;

const CollisionImage = styled.img`
  position: absolute;
  top: 42%;
  left: 42%;
  transform: translate(-50%, -50%);
  width: 8%;
  z-index: 1;
`;

const VerticalLine = styled.div`
  position: absolute;
  top: -10%;
  bottom: -10%;
  left: 50%;
  width: 2px;
  background-color: white;
  transform: translateX(-50%);
  z-index: 0;
`;

const DragBox = styled(Box)`
  position: absolute;
  bottom: calc(100% + 12%);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 15%;
  z-index: 2;
  cursor: grab;
`;

const HandImage = styled.img`
  margin-left: -25%;
  width: 100%;
`;

const ArrowImage = styled.img`
  width: 100%;
`;

const FloatingImage = styled.img`
  position: fixed;
  z-index: 1;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.2);
    cursor: pointer;
  }
`;

const moveAsteroid = keyframes`
    0% {
        left: -20%;
        top: 20%;
    }
    100% {
        left: 40%;
        top: 40%;
        transform: translate(-50%, -50%);
    }
`;

const EffectsEventButton = styled.button`
  background-color: #dad7d0;
  color: black;
  position: absolute;
  top: 5%;
  left: 50%;
  transform: translateX(-50%);
  padding-top: 0;
  padding-bottom: 0;
`;

const Text = styled.h1`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 5%;
  width: fit-content;
`;

const AnimatedAsteroid = styled(FloatingImage)<{ animate: boolean }>`
  ${(props) =>
    props.animate &&
    css`
      animation: ${moveAsteroid} 2s linear forwards;
    `}
`;

export const AxialTiltPage = () => {
  const navigate = useNavigate();

  const [showDragBox, setShowDragBox] = useState(false);
  const [animateAsteroid, setAnimateAsteroid] = useState(false);
  const [showCollision, setShowCollision] = useState(false);
  const [rotateAngle, setRotateAngle] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [text, setText] = useState("Investigate the cause of Axial Tilt");

  const handleMouseMove = (e: MouseEvent) => {
    if (dragging) {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const newMouseAngle =
        Math.atan2(mouseY - centerY, mouseX - centerX) * (180 / Math.PI);
      setRotateAngle(newMouseAngle + 90);
    }
  };

  const handleMouseUp = () => {
    if (dragging) {
      setDragging(false);
    }
  };

  const handleMouseDown = () => {
    setDragging(true);
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  const handleAsteroidClick = () => {
    setAnimateAsteroid(true);
    setText("");
  };

  const handleAnimationEnd = () => {
    setText("What angle did the asteroid tilt the earth?");
    setShowCollision(true);
    setShowDragBox(true);
    handleCausePopup();
  };

  const handleMarsClick = () => {
    setPopupTitle("Mars");
    setPopupDescription(
      "Incorrect. \n The Earth's tilt is not believed to be caused by another planet's gravitational pull."
    );
    setPopupIconName("Public"); // Assuming there's an icon named Public in MuiIcons
    setPopupIconColour("#000000"); // colour similar to mars
    setPopupBgColour("#F35A33");
    setPopupOpen(true);
  };

  const handleSatelliteClick = () => {
    setPopupTitle("Satellite");
    setPopupDescription(
      "Incorrect. \n The Earth's tilt happened long before satellites were launched."
    );
    setPopupIconName("Satellite"); // Assuming there's an icon named Satellite
    setPopupIconColour("#000000");
    setPopupBgColour("#006064");
    setPopupOpen(true);
  };

  const handleUfoClick = () => {
    setPopupTitle("UFO");
    setPopupDescription(
      "Incorrect. \n There is no evidence to suggest that Unidentified Flying Objects caused the Earth's tilt."
    );
    setPopupIconName("RocketLaunch"); // Assuming there's an icon named RocketLaunch
    setPopupIconColour("#6a1b9a");
    setPopupBgColour("#f3e5f5");
    setPopupOpen(true);
  };

  const handleCausePopup = () => {
    setPopupTitle("Axial Tilt - The Cause");
    setPopupDescription(
      "The Earth's axial tilt, is primarily the result of a massive collision with a large astronomical body early in the planet's history. This impact caused the Earth to tilt at an angle of about 23.5 degrees. This tilt is responsible for the seasonal variations we experience."
    );
    setPopupIconName("PriorityHigh");
    setPopupIconColour("#6a1b9a");
    setPopupBgColour("#f3e5f5");
    setPopupOpen(true);
  };

  const [popupOpen, setPopupOpen] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupDescription, setPopupDescription] = useState("");
  const [popupIconName, setPopupIconName] = useState("HelpOutline"); // Default icon
  const [PopupIconColour, setPopupIconColour] = useState("#000000"); // Default colour
  const [popupBgColour, setPopupBgColour] = useState("#ffffff");

  return (
    <Box>
      <BackgroundContainer />
      {rotateAngle > 22 && rotateAngle < 25 ? (
        <EffectsEventButton
          onClick={() => {
            navigate("/axial-tilt-effects");
          }}
        >
          <h2>Axial Tilt: The Effect</h2>
        </EffectsEventButton>
      ) : (
        <Text>{text}</Text>
      )}
      <EarthContainer rotateAngle={rotateAngle}>
        <VerticalLine />
        {showDragBox && (
          <DragBox onMouseDown={handleMouseDown}>
            <HandImage draggable={false} src={Hand} alt="Hand icon" />
            <ArrowImage draggable={false} src={Arrow} alt="Arrow icon" />
          </DragBox>
        )}
        <EarthImage src={Earth} alt="Picture of earth" draggable={false} />
      </EarthContainer>

      <AnimatedAsteroid
        src={Asteroid}
        alt="Asteroid"
        style={{ top: "30%", left: "25%", width: "8%" }}
        animate={animateAsteroid}
        onClick={handleAsteroidClick}
        onAnimationEnd={handleAnimationEnd}
        draggable={false}
      />

      {!animateAsteroid && (
        <div>
          <FloatingImage
            draggable={false}
            src={Mars}
            alt="Mars"
            style={{ bottom: "10%", left: "10%", width: "15%" }}
            onClick={handleMarsClick}
          />
          <FloatingImage
            draggable={false}
            src={Satellite}
            alt="Satellite"
            style={{ top: "30%", right: "20%", width: "10%" }}
            onClick={handleSatelliteClick}
          />
          <FloatingImage
            draggable={false}
            src={UFO}
            alt="UFO"
            style={{ bottom: "20%", right: "25%", width: "10%" }}
            onClick={handleUfoClick}
          />
        </div>
      )}

      {showCollision && (
        <CollisionImage draggable={false} src={Collision} alt="Collision" />
      )}

      <CardPopup
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
        bgColour={popupBgColour}
        iconName={popupIconName as keyof typeof MuiIcons} // Add 'as keyof typeof MuiIcons' to restrict the type of popupIconName
        iconColour={PopupIconColour}
      >
        <DescriptionContent
          title={popupTitle}
          description={popupDescription}
          buttonFunction={() => setPopupOpen(false)}
          buttonText="Got it!"
          buttonColour={popupBgColour} // Replace 'bgColour' with 'popupBgColour'
        />
      </CardPopup>
    </Box>
  );
};
