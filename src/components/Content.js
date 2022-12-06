import styled from "styled-components";

export default function Content(){
    return (
        <StyledContent>
            <ContentSubtitle>Selecione o {"filme"}</ContentSubtitle>
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