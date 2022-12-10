import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Success(props){
    const navigate = useNavigate();
    const {movieData, seatsData} = props;

    console.log(seatsData);
    return (
        <SuccessContainer>
            <DataContainer>
                <SubcategoryTitle>Filme e sessão</SubcategoryTitle>
                <CategoryDataSpan>{movieData.movie.title}</CategoryDataSpan>
                <CategoryDataSpan>{`${movieData.day.date} ${movieData.name}`}</CategoryDataSpan>
            </DataContainer>
            <DataContainer>
                <SubcategoryTitle>Ingressos</SubcategoryTitle>
                {seatsData.map((s) => <CategoryDataSpan key={s}>Assento {s}</CategoryDataSpan>)}
            </DataContainer>
            <DataContainer>
                <SubcategoryTitle>Comprador</SubcategoryTitle>
                <CategoryDataSpan>Nome: João da Silva Sauro</CategoryDataSpan>
                <CategoryDataSpan>CPF: 123.456.789-10</CategoryDataSpan>
            </DataContainer>

            <FormInput type="submit" value="Voltar pra Home" onClick={() => navigate("/")}/>
        </SuccessContainer>
    );
}

const SuccessContainer = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    padding: 0 28px;
    margin: 0 auto 30px auto;
    width: 375px;
`;

const DataContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: 30px;
    width: 100%;
`;

const SubcategoryTitle = styled.h3`
    font-family: 'Roboto', sans-serif;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 10px;
`;

const CategoryDataSpan = styled.span`
    font-family: 'Roboto', sans-serif;
    font-size: 22px;
    font-weight: 400;
    color: #293845;
    margin-bottom: 5px;
`;

const FormInput = styled.input`
    font-family: 'Roboto', sans-serif;
    font-size: 18px;
    font-weight: 400;
    padding-left: 20px;
    height: 50px;

    &::placeholder{
        font-style: italic;
    }

    ${props => props.type === 'number' && `
        -webkit-appearance: none;
        margin: 0;
        -moz-appearance: textfield;
    `}

    ${props => props.type === 'submit' && `
        color: white;
        background-color: #E8833A;
        border: none;
        border-radius: 3px;
        margin-top: 50px;
        height: 40px;
        width: 225px;
        cursor: pointer;
    `}
`;