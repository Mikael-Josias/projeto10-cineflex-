import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

export default function Seats(props){
    const {movieId, scheduleId} = useParams();

    const [dayInfo, setDayInfo] = useState(null);
    const [movieInfo, setMovieInfo] = useState(null);
    const [seatsInfo, setSeatsInfo] = useState(null);

    const seatsUrl = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${scheduleId}/seats`;

    useEffect(() => {
        const promisse = axios.get(seatsUrl);
        promisse.then((p) => {
            setDayInfo(p.data.day);
            setMovieInfo(p.data.movie);
            setSeatsInfo(p.data.seats);
            console.log(p.data.seats);
        });
        promisse.catch((p) => console.log(p.message));
    }, []);

    if (setDayInfo === null || seatsInfo === null || movieInfo === null) {
        return <div>Carregando...</div>
    }

    return (
        <SeatsContainer>
            {seatsInfo.map((s) => (
                <Seat key={s.id} >
                    <Checkbox type="checkbox" id={s.id} disabled={!s.isAvailable} bgColor={s.isAvailable? "#C3CFD9" : "#FBE192"} bdColor={s.isAvailable? "#808F9D" : "#F7C52B"}/>
                    <SeatNumber htmlFor={s.id}>{s.name}</SeatNumber>
                </Seat>
            ))}
        </SeatsContainer>
    );
}

const SeatsContainer = styled.section`
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    flex-wrap: wrap;
    padding: 0 24px;
`;

const Seat = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    position: relative;
    margin: 3px;
    height: 26px;
    width: 26px;
`;

const Checkbox = styled.input`
    position: absolute;
    top: 0;
    left: 0;
    border: 1px solid ${props => props.bdColor};
    border-radius: 50%;
    vertical-align: middle;
    appearance: none;
    background-color: ${props => props.bgColor};
    outline: none;
    margin: 0;
    height: 100%;
    width: 100%;

    &:checked{
        border-color: #0E7D71;
        background-color: #1AAE9E;
    }
`;

const SeatNumber = styled.label`
font-family: 'Roboto', sans-serif;
    font-size: 11px;
    font-weight: 400;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 26px;
    width: 26px;
    z-index: 1;
`;