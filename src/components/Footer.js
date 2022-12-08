import styled from "styled-components";

export default function Footer(props){
    const {movie} = props;
    return (
        <StyledFooter>
            <MovieCard key={movie.id}>
                <MovieBanner src={movie.posterURL} alt={movie.title} key={movie.id} />
            </MovieCard>
            <MovieInfo>
                <MovieTitle>{movie.title}</MovieTitle>
            </MovieInfo>
        </StyledFooter>
    );
}

const StyledFooter = styled.footer`
    display: flex;
    background-color: #DFE6ED;
    border: 1px solid #9EADBA;
    padding: 10px 14px;
    width: 100%;
    position: sticky;
    bottom: 0;
`;

const MovieCard = styled.div`
    padding: 8px;
    background-color: #FFF;
    border-radius: 3px;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
`;

const MovieBanner = styled.img`
    height: 72px;
    width: 48px;
    cursor: pointer;
`;

const MovieInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-left: 15px;
`;

const MovieTitle = styled.span`
    font-family: 'Roboto', sans-serif;
    font-size: 26px;
    font-weight: 400;
    color: #293845;
`;