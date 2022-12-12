import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Movies(props){
    const navigate = useNavigate();
    const [movies, setMovies] = useState(null);
    const {setData} = props;
    const moviesUrl = "https://mock-api.driven.com.br/api/v8/cineflex/movies";

    useEffect(() => {
        const promisse = axios.get(moviesUrl);
        promisse.then((p) => setMovies(p.data));
        promisse.catch((p) => console.log(p.message));
    }, []);

    function selectMovie(movieId, movieTitle){
        setData({movie: {id: movieId, title: movieTitle}, session: {id: -1, day: "", weekday: "", hour: ""}, seats: {ids: [], numbers: []}, user: {name: "", cpf: ""}});
        navigate(`/sessoes/${movieId}`);
    }

    if (movies === null) {
        return <div>Carregando...</div>
    }

    return (
        <MoviesSection>
                {movies.map((m, i) => (
                        <MovieCard key={m.id}  id={i} onClick={() => selectMovie(m.id, m.title)} data-test="movie" >
                            <MovieBanner src={m.posterURL} alt={m.title} key={m.id} />
                        </MovieCard>
                ))}
        </MoviesSection>
    );
}

const MoviesSection = styled.section`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
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