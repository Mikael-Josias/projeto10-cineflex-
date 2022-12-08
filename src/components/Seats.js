import axios from "axios";
import { useEffect } from "react";

export default function Seats(props){
    const {session} = props;

    const seatsUrl = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${session.id}/seats`;

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