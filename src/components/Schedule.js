import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import Footer from "./Footer";

export default function Schedule(props){
    const navigate = useNavigate();
    const {idFilme} = useParams();
    const [movieSession, setMovieSession] = useState(null);
    const {data, setData} = props;
    const scheduleUrl = `https://mock-api.driven.com.br/api/v8/cineflex/movies/${idFilme}/showtimes`;

    useEffect(() => {
        const promisse = axios.get(scheduleUrl);
        promisse.then((p) => {
            setMovieSession(p.data);
        });
        promisse.catch((p) => console.log(p.message));
    }, []);

    function selectSchedule(scheduleId, scheduleDay,scheduleWeekDay, scheduleHour){
        const newData = {...data};
        newData.movie.id = movieSession.id;
        newData.movie.id = movieSession.title;
        newData.session.id = scheduleId;
        newData.session.day = scheduleDay;
        newData.session.weekday = scheduleWeekDay;
        newData.session.hour = scheduleHour;

        setData(newData);
        navigate(`/assentos/${scheduleId}`);
    }
    
    if (movieSession === null) {
        return <div>Carregando...</div>
    }

    return (
        <ScheduleSection>
            {movieSession.days.map((s) => (
                <ScheduleOption key={s.id} data-test="movie-day" >
                    <DaySpan>{s.weekday} - {s.date}</DaySpan>
                    <TimeOption>
                        {s.showtimes.map((st) => (
                            <div key={st.id} onClick={() => selectSchedule(st.id, s.date ,s.weekday, st.name)} data-test="showtime" >
                                <RadioOption type="radio" id={st.id}/>
                                <LabelOption htmlFor={st.id} key={st.id}>{st.name}</LabelOption>
                            </div>
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
    font-style: normal;
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