import React, { useEffect, forwardRef } from "react";
import styled from "styled-components";
import { Brightness3, WbSunny } from "@mui/icons-material";
import { SxProps } from "@mui/material";
import { Box } from "@mui/system";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CircleContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  overflow: hidden;
  border-radius: 50%;
  border: 2px solid black;
`;

const DaySection = styled.div<{ width: number }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: yellow;
  width: ${(props) => props.width}%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: width 0.5s;
`;

const NightSection = styled.div<{ width: number }>`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  background-color: darkblue;
  width: ${(props) => 100 - props.width}%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: width 0.5s;
`;

interface DayNightDurationProps {
  dayProportion: number;
  setDayProportion: React.Dispatch<React.SetStateAction<number>>;
  setNightSectionWidth?: (width: number) => void; // add this prop
  sx?: SxProps;
}

const DayNightDuration = forwardRef<HTMLDivElement, DayNightDurationProps>(({
  dayProportion,
  setDayProportion,
  setNightSectionWidth = () => {}, // provide a default implementation
  sx,
}, ref) => {
  useEffect(() => {
    setNightSectionWidth(100 - dayProportion); // pass the night section width back to the parent
  }, [dayProportion, setNightSectionWidth]);

  return (
    <Box sx={sx}>
      <Container>
        <CircleContainer>
          <DaySection width={dayProportion}>
            <WbSunny style={{ color: "orange", fontSize: "48px" }} />
          </DaySection>
          <NightSection width={dayProportion} ref={ref}>
            <Brightness3 style={{ color: "lightgray", fontSize: "48px" }} />
          </NightSection>
        </CircleContainer>
      </Container>
    </Box>
  );
});

export default DayNightDuration;

