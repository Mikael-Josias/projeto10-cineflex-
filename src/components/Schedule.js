import axios from "axios";
import { useEffect } from "react";

export default function Schedule(props){
    const {movie} = props;
    const scheduleUrl = `https://mock-api.driven.com.br/api/v8/cineflex/movies/${movie.id}/showtimes`;


    useEffect(() => {
        const promisse = axios.get(scheduleUrl);
        promisse.then((p) => console.log(p.data));
        promisse.catch((p) => console.log(p.message));
    }, []);

    return (
        <>
            Schedule
        </>
    );
}