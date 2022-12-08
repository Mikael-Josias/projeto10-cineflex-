import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Seats(props){
    const {movieId, scheduleId} = useParams();
    const seatsUrl = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${scheduleId}/seats`;

    useEffect(() => {
        const promisse = axios.get(seatsUrl);
        promisse.then((p) => console.log(p.data));
        promisse.catch((p) => console.log(p.message));
    }, []);

    return (
        <>
            seatsUrl
        </>
    );
}