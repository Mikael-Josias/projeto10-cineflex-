import axios from "axios";
import { useEffect } from "react";

export default function Movies(){
    const moviesUrl = "https://mock-api.driven.com.br/api/v8/cineflex/movies";

    useEffect(() => {
        const promisse = axios.get(moviesUrl);
        promisse.then((p) => console.log(p.data));
        promisse.catch((p) => console.log(p.message));
    }, []);

    return (
        <>
            Movies.
        </>
    );
}