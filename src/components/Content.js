import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";

import Movies from "./Movies";
import Schedule from "./Schedule";
import Seats from "./Seats";
import Success from "./Success";

export default function Content(){
    const [movieData, setMovieData] = useState(null);
    const [seatsData, setSeatsData] = useState([]);

    return (
        <StyledContent>
            <BrowserRouter>
                <ContentSubtitle>Selecione o {"filme"}</ContentSubtitle>
                <Routes>
                    <Route path="/" element={<Movies />} />
                    <Route path="/:movieId/schedules" element={<Schedule/>} />
                    <Route path="/:movieId/:scheduleId/seats" element={<Seats setMovieData={setMovieData} seatsData={seatsData} setSeatsData={setSeatsData} />} />
                    <Route path="/success" element={<Success movieData={movieData} seatsData={seatsData} />} />
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