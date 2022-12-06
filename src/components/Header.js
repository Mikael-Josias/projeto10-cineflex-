import styled from "styled-components";

export default function Header(){
    return (
        <StyledHeader>
            <HeaderTitle>CINEFLEX</HeaderTitle>
        </StyledHeader>
    );
}

const StyledHeader = styled.header`
    text-align: center;
    background-color: #C3CFD9;
    padding: 16px 0;
    width: 100%;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
`;

const HeaderTitle = styled.h1`
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    font-weight: 400;
    color: #E8833A;
`;