import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";
import {AppContext} from "../contexts/AppContextProvider";
import AskUserName from "../components/card-popup/story/AskUserName";
import SosIcon from "@mui/icons-material/Sos";
import StoryTelling from "../components/card-popup/story/StoryTelling";
import EarthSunSimulation from "../components/EarthSunSimulation.tsx";
import Box from "@mui/material/Box";
import styled from "styled-components";

export const StyledButton = styled.button`
    background-color: #D9D9D9;
    position: fixed;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    width: 20%;
    color: #1a1a1a;
`;

const Landing: React.FC = () => {
    const navigate = useNavigate();
    const [isStoryPopupOpen, setStoryPopupOpen] = useState<boolean>(false);
    const [isUserNamePopupOpen, setUserNamePopupOpen] = useState<boolean>(false);
    const {testing} = useContext(AppContext);

    const handleUserNamePopup = () => {
        setUserNamePopupOpen((prev) => !prev);
    };

    const handleStoryTellingPopup = () => {
        setStoryPopupOpen((prev) => !prev);
    };

    return (
        <div style={{textAlign: "center", width: "100vw", height: "100vh"}}>
            <h1 style={{position: 'fixed', top: '5%', width: '100%', textAlign: 'center'}}>Reason to Season</h1>
            <EarthSunSimulation earthAxialTilt={23.5} isLanding={true}/>
            <StyledButton
                onClick={() => {
                    handleStoryTellingPopup();
                    // navigate("/orbit");
                }}
            >Start
            </StyledButton>
            <StoryTelling
                open={isStoryPopupOpen}
                onClose={handleStoryTellingPopup}
                onOpenUserNameModal={handleUserNamePopup}
            />
            <AskUserName
                open={isUserNamePopupOpen}
                onClose={handleUserNamePopup}
                title="Need your help!"
                description="Enter your name to help Dr. Breeze gather all his lost memories about the seasons."
                iconName="ErrorOutline"
                bgColour="#4CAF50"
                navigateHomePage={() => navigate("/orbit")}
            />
        </div>
    );
};

export default Landing;
