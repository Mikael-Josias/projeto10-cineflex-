import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import Footer from "./Footer";

export default function Seats(props){
    const navigate = useNavigate();
    const {idSessao} = useParams();

    const [dayInfo, setDayInfo] = useState(null);
    const [movieInfo, setMovieInfo] = useState(null);
    const [seatsInfo, setSeatsInfo] = useState(null);

    const [selectedSeats, setSelectedSeats] = useState([]);
    const [userName, setUserName] = useState("");
    const [userCpf, setUserCpf] = useState("");

    const {data, setData, movieData, setMovieData, setSeatsData, seatsData} = props;

    const numeros = "0123456789".split("");

    const seatsUrl = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`;
    const bookSeatUrl = `https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many`;

    useEffect(() => {
        const promisse = axios.get(seatsUrl);
        promisse.then((p) => {
            setMovieData(p.data.movie)
            setDayInfo(p.data);
            console.log(p.data);
            setMovieInfo(p.data.movie);
            setSeatsInfo(p.data.seats);
        });
        promisse.catch((p) => console.log(p.message));
    }, []);

    function isNumber(value){
        const newValue = value.split("");
        const c = value[value.length - 1];
        console.log(value);
        console.log(c)
        console.log(numeros.includes(c));
        if (numeros.includes(c)) {
            setUserCpf(value);
        }
    }

    function selectSeat(id, num){
        const newArr = [...selectedSeats];
        const newSeatNumber = [...seatsData]

        if (selectedSeats.includes(id)) {
            const i = selectedSeats.indexOf(id);
            newArr.splice(i, 1);
            newSeatNumber.splice(i, 1);
        }else{
            newArr.push(id);
            newSeatNumber.push(num);
        }

        setSelectedSeats(newArr);
        setSeatsData(newSeatNumber);
        console.log(newSeatNumber);
    }

    function bookSeat(e){
        e.preventDefault();

        if (selectedSeats.length === 0) {
            console.log("Você precisa selecionar pelo menos um assento!");
        }
        if (userName === null || userName === undefined || userName === '' ) {
            console.log("Você precisa digitar um nome");
        }
        if (userCpf === null || userCpf === undefined || userCpf === '' ) {
            console.log("Você precisa digitar um cpf");
        }

        const newData = {...data};
        newData.seats.ids = selectedSeats;
        newData.seats.numbers = seatsData;
        setData(newData);

        const userData = {ids: selectedSeats, name: userName, cpf: userCpf};
        console.log(JSON.stringify(newData));
        const promisse = axios.post(bookSeatUrl, userData);
        promisse.then(() => navigate(`/${JSON.stringify(userData)}/success`));
        promisse.catch((err) => console.log(err));
    }

    if (setDayInfo === null || seatsInfo === null || movieInfo === null) {
        return <div>Carregando...</div>
    }

    return (
        <>
            <SeatsContainer>
                {seatsInfo.map((s) => (
                    <Seat key={s.id} >
                        <Checkbox type="checkbox" id={s.id} disabled={!s.isAvailable} bgColor={s.isAvailable? "#C3CFD9" : "#FBE192"} bdColor={s.isAvailable? "#808F9D" : "#F7C52B"} onChange={(e) => selectSeat(e.target.id, s.name)} data-test="seat" />
                        <SeatNumber htmlFor={s.id}>{s.name}</SeatNumber>
                    </Seat>
                ))}
                <SeatsInfo>
                    <SeatInfo>
                        <CheckboxInfo type="checkbox" defaultChecked disabled />
                        <span>Selecionado</span>
                    </SeatInfo>
                    <SeatInfo>
                        <CheckboxInfo type="checkbox" disabled bgColor="#C3CFD9" bdColor="#808F9D"/>
                        <span>Disponível</span>
                    </SeatInfo>
                    <SeatInfo>
                        <CheckboxInfo type="checkbox" disabled bgColor="#FBE192" bdColor="#F7C52B"/>
                        <span>Indisponível</span>
                    </SeatInfo>
            </SeatsInfo>
            </SeatsContainer>

            <BuySeatsForm onSubmit={(e) => bookSeat(e)}>
                <FormLabel>
                    Nome do comprador:
                    <FormInput type="text" placeholder="Digite seu nome..." value={userName} onChange={(e) => setUserName(e.target.value)} required data-test="client-name" />
                </FormLabel>
                <FormLabel>
                    CPF do comprador:
                    <FormInput type="number" placeholder="Digite seu CPF..." value={userCpf} onWheel={(e) => e.target.blur()} onChange={(e) => isNumber(e.target.value)} required data-test="client-cpf" />
                </FormLabel>

                <FormInput type="submit" value="Reservar assento(s)" data-test="book-seat-btn" />
            </BuySeatsForm>
            <Footer movie={movieInfo} session={dayInfo} />
        </>
    );
}

const SeatsContainer = styled.section`
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    flex-wrap: wrap;
    padding: 0 24px;
    margin: 0 auto;
    width: 375px;
`;

const Seat = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    position: relative;
    margin: 3px;
    height: 26px;
    width: 26px;
`;

const Checkbox = styled.input`
    position: absolute;
    top: 0;
    left: 0;
    border: 1px solid ${props => props.bdColor};
    border-radius: 50%;
    vertical-align: middle;
    appearance: none;
    background-color: ${props => props.bgColor};
    outline: none;
    margin: 0;
    height: 100%;
    width: 100%;

    &:checked{
        border-color: #0E7D71;
        background-color: #1AAE9E;
    }
`;

const SeatNumber = styled.label`
    font-family: 'Roboto', sans-serif;
    font-size: 11px;
    font-weight: 400;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 26px;
    width: 26px;
    z-index: 1;
    cursor: pointer;
`;

const SeatsInfo = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin: 20px auto 0 auto;
    width: 375px;
`;

const SeatInfo = styled.div`
    font-family: 'Roboto', sans-serif;
    font-size: 13px;
    font-weight: 400;
    color: #4E5A65;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 33%;
`;

const CheckboxInfo = styled.input`
    background-color: ${props => props.bgColor};
    border: 1px solid ${props => props.bdColor};
    border-radius: 50%;
    vertical-align: middle;
    appearance: none;
    outline: none;
    height: 26px;
    width: 26px;
    &:checked{
        border-color: #0E7D71;
        background-color: #1AAE9E;
    }
`;

const BuySeatsForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    margin: 40px auto 40px auto;
    width: 325px;
`;

const FormLabel = styled.label`
    display: flex;
    flex-direction: column;
    font-family: 'Roboto', sans-serif;
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 10px;
    width: 325px;
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