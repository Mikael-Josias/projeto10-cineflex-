import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";

import Movies from "./Movies";
import Schedule from "./Schedule";
import Seats from "./Seats";

export default function Content(){
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [selectedSession, setSelectedSession] = useState(null);

    return (
        <StyledContent>
            <BrowserRouter>
                <ContentSubtitle>Selecione o {"filme"}</ContentSubtitle>
                <Routes>
                    <Route path="/" element={<Movies setSelectedMovie={setSelectedMovie} />} />
                    <Route path="/:movieId/schedules" element={<Schedule movie={selectedMovie} setSelectedSession={setSelectedSession} />} />
                    <Route path="/:movieId/:scheduleId/seats" element={<Seats session={selectedSession}/>} />
                </Routes>
            </BrowserRouter>
        </StyledContent>
    );
}

const StyledContent = styled.main`
    background-color: #FFF;
    width: 100%;
`;

const ContentSubtitle = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Roboto', sans-serif;
    font-size: 24px;
    font-weight: 400;
    height: 110px;
    width: 100%;
`;