import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
        });
        promisse.catch((p) => console.log(p.message));
    }, []);

    if (setDayInfo === null) {
        return <div>Carregando...</div>
    }

    return (
        <>
            Footer
        </>
    );
}