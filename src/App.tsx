import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import Orbit from "./pages/Orbit.tsx";
import Landing from "./pages/Landing.tsx";
import { SolsticePage } from "./pages/SolsticePage.tsx";
import { AxialTiltPage } from "./pages/AxialTiltPage.tsx";
import { AxialTiltEffectsPage } from "./pages/AxialTiltEffectsPage.tsx";

const theme = createTheme({
  typography: {
    fontFamily: '"Inknut Antiqua", sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
  palette: {
    primary: {
      light: "#75c7d9",
      main: "#365486",
      dark: "#0f1035",
      contrastText: "#fff",
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Landing />}></Route>
            <Route path="/orbit" element={<Orbit />} />
            <Route path="/solstice" element={<SolsticePage />} />
            <Route path="/axial-tilt" element={<AxialTiltPage />} />
            <Route
              path="/axial-tilt-effects"
              element={<AxialTiltEffectsPage />}
            />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
