import { useState } from "react";
import styled from "styled-components";

import Movies from "./Movies";
import Schedule from "./Schedule";

export default function Content(){
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);

    return (
        <StyledContent>
            <ContentSubtitle>Selecione o {"filme"}</ContentSubtitle>
            {selectedMovie === null ? <Movies setSelectedMovie={setSelectedMovie} /> : null}
            {selectedMovie !== null && selectedDate === null ? <Schedule movie={selectedMovie} /> : null}
        </StyledContent>
    );
}

const StyledContent = styled.main`
    background-color: #FFF;
    width: 100%;
`;

const ContentSubtitle = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Roboto', sans-serif;
    font-size: 24px;
    font-weight: 400;
    height: 110px;
    width: 100%;
`;