import { json, Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

export default function Success(props){
    const navigate = useNavigate();
    const {data} = props;
    

    return (
        <SuccessContainer>
            <DataContainer data-test="movie-info">
                <SubcategoryTitle>Filme e sessão</SubcategoryTitle>
                <CategoryDataSpan>{data.movie.title}</CategoryDataSpan>
                <CategoryDataSpan>{`${data.session.day} ${data.session.hour}`}</CategoryDataSpan>
            </DataContainer>
            <DataContainer data-test="seats-info">
                <SubcategoryTitle>Ingressos</SubcategoryTitle>
                {data.seats.numbers.map((s) => <CategoryDataSpan key={s}>Assento {s}</CategoryDataSpan>)}
            </DataContainer>
            <DataContainer data-test="client-info">
                <SubcategoryTitle>Comprador</SubcategoryTitle>
                <CategoryDataSpan>Nome: {data.user.name}</CategoryDataSpan>
                <CategoryDataSpan>CPF: {data.user.cpf}</CategoryDataSpan>
            </DataContainer>

            <Link to={"/"} data-test="go-home-btn">
                <FormInput type="submit" value="Voltar pra Home" onClick={() => navigate("/")}/>
            </Link>
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