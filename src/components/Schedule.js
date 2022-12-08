import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

import Footer from "./Footer";

export default function Schedule(props){
    const {movieId} = useParams();
    const [movieSession, setMovieSession] = useState(null);

    const scheduleUrl = `https://mock-api.driven.com.br/api/v8/cineflex/movies/${movieId}/showtimes`;

    useEffect(() => {
        const promisse = axios.get(scheduleUrl);
        promisse.then((p) => setMovieSession(p.data));
        promisse.catch((p) => console.log(p.message));
    }, []);
    
    if (movieSession === null) {
        return <div>Carregando...</div>
    }

    return (
        <ScheduleSection>
            {movieSession.days.map((s) => (
                <ScheduleOption key={s.id}>
                    <DaySpan>{s.weekday} - {s.date}</DaySpan>
                    <TimeOption>
                        {s.showtimes.map((st) => (
                            <Link key={st.id} to={`/${movieId}/${st.id}/seats`} >
                                <RadioOption type="radio" id={st.id}/>
                                <LabelOption htmlFor={st.id} key={st.id}>{st.name}</LabelOption>
                            </Link>
                        ))}
                    </TimeOption>
                </ScheduleOption>
            ))}
            <Footer movie={movieSession} />
        </ScheduleSection>
    );
}

const ScheduleSection = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
`;

const ScheduleOption = styled.div`
    padding-left: 22px;
    width: 100%;
`;

const DaySpan = styled.span`
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
    font-weight: 400;
`;

const TimeOption = styled.div`
    display: flex;
    margin: 22px 0;
`;

const RadioOption = styled.input`
    visibility: collapse;
`;

const LabelOption = styled.label`
    font-family: 'Roboto', sans-serif;
    font-size: 18px;
    font-weight: 400;
    text-decoration: none;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #E8833A;
    margin: 0 8px;
    height: 40px;
    width: 80px;
    cursor: pointer;
`;