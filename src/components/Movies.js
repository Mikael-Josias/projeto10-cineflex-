import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function Movies(){
    const [movies, setMovies] = useState(null);
    const moviesUrl = "https://mock-api.driven.com.br/api/v8/cineflex/movies";

    useEffect(() => {
        const promisse = axios.get(moviesUrl);
        promisse.then((p) => setMovies(p.data));
        promisse.catch((p) => console.log(p.message));
    }, []);

    if (movies === null) {
        return <div>Carregando...</div>
    }

    return (
        <MoviesSection>
                {movies.map((m) => <MovieCard key={m.id}><MovieBanner src={m.posterURL} alt={m.title} key={m.id} /></MovieCard>)}
        </MoviesSection>
    );
}

const MoviesSection = styled.section`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
`;

const MovieCard = styled.div`
    padding: 8px;
    margin: 23px;
    background-color: #FFF;
    border-radius: 3px;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
`;

const MovieBanner = styled.img`
    height: 193px;
    width: 129px;
    cursor: pointer;
`;