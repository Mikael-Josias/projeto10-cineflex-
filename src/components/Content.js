import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";

import Movies from "./Movies";
import Schedule from "./Schedule";
import Seats from "./Seats";
import Success from "./Success";

export default function Content(){
    const [data, setData] = useState({movie: {id: -1, title: ""}, session: {id: -1, day: "", weekday: "", hour: ""}, seats: {ids: [], numbers: []}, user: {name: "", cpf: ""}});
    const [movieData, setMovieData] = useState(null);
    const [seatsData, setSeatsData] = useState([]);

    let subtitleText = "Selecione o filme";
    if(data.movie.id !== -1) subtitleText = "Selecione o horário";
    if(data.movie.id !== -1 && data.session.id !== -1) subtitleText = "Selecione o(s) assento(s)";
    if (data.movie.id !== -1 && data.session.id !== -1 && data.seats.ids.length !== 0) subtitleText = "Pedido feito com sucesso!"
    console.log(data)
    return (
        <StyledContent>
            <BrowserRouter>
                <ContentSubtitle subText={data.seats.ids.length !== 0}>{subtitleText}</ContentSubtitle>
                <Routes>
                    <Route path="/" element={<Movies setData={setData} />} />
                    <Route path="/sessoes/:idFilme" element={<Schedule data={data} setData={setData} />} />
                    <Route path="/assentos/:idSessao" element={<Seats data={data} setData={setData} movieData={movieData} setMovieData={setMovieData} seatsData={seatsData} setSeatsData={setSeatsData} />} />
                    <Route path="/sucesso" element={<Success data={data} />} />
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
    font-weight: ${props => props.subText ? "700" : "400"};
    color: ${props => props.subText ? "#247A6B" : "black"};
    height: 110px;
    width: 100%;
`;